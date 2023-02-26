<template>
  <div>
    <table class="table table-hover text-center">
      <thead>
        <tr>
          <th></th>
          <th>購買品項</th>
          <th>付款狀態</th>
          <th>應付款金額</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="align-middle"
          v-for="(order, index) in orders"
          :key="order.id"
        >
          <td>
            <button
              type="button"
              class="btn btn-close"
              @click="() => deleteOrder(order.id)"
              ref="deleteOrderBtn"
            ></button>
          </td>
          <td>
            <template v-for="product in order.products" :key="product.id">
              <p class="mb-0">
                {{ product.product.title }} * {{ product.qty }}
              </p>
            </template>
          </td>
          <td class="text-center">
            <input
              type="checkbox"
              :name="`is_paid${index}`"
              :id="`is_paid${index}`"
              class="me-2"
              style="transform: scale(1.3)"
              v-model="order.is_paid"
              @change="() => togglePaid(order.id, order)"
              ref="toggleBtn"
            />
            <label
              :for="`is_paid${index}`"
              :class="{
                'text-danger': !order.is_paid,
                'text-success fw-bold fs-5': order.is_paid,
              }"
              >{{ order.is_paid ? "已付款" : "尚未付款" }}</label
            >
          </td>
          <td>
            {{ order.total }}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="() => (currentOrder = order)"
            >
              訂單詳情
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title fs-4 text-white" id="exampleModalLabel">
              訂單詳情
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="col-3">
              <p class="fs-4">用戶資訊</p>
              <p>購買人：{{ currentOrder.user?.name }}</p>
              <p>電話：{{ currentOrder.user?.tel }}</p>
              <p>信箱：{{ currentOrder.user?.email }}</p>
              <p>地址：{{ currentOrder.user?.address }}</p>
            </div>
            <div class="col border-start">
              <p class="fs-4">訂單資訊</p>
              <div class="row">
                <p class="col">
                  成立時間：{{
                    new Date(currentOrder.create_at * 1000).toLocaleString()
                  }}
                </p>
                <p class="col fw-bold">
                  付款狀態：<span
                    :class="{
                      'text-danger': !currentOrder.is_paid,
                      'text-success': currentOrder.is_paid,
                    }"
                    >{{ currentOrder.is_paid ? "已付款" : "尚未付款" }}</span
                  >
                </p>
              </div>
              <p class="mb-0">訂單留言：</p>
              <p class="p-2 border">
                {{ currentOrder.message ? currentOrder.message : "無" }}
              </p>
            </div>
            <div class="col-12 border-top pt-5">
              <table
                class="table table-bordered border-dark table-hover align-middle text-center"
              >
                <caption>
                  購買細項
                </caption>
                <thead>
                  <tr>
                    <th>商品編號</th>
                    <th>品項</th>
                    <th>數量</th>
                    <th>金額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(product, index) in currentOrder.products"
                    :key="product.id"
                  >
                    <td>{{ index }}</td>
                    <td>{{ product.product.title }}</td>
                    <td>{{ product.qty }}</td>
                    <td>{{ product.total }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="fw-bolder fs-5">
                    <td colspan="3" class="text-end">總計</td>
                    <td>{{ currentOrder.total }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <router-link
            :to="`/admin/orders?page=${pagination.current_page - 1}`"
            class="page-link"
            aria-label="Previous"
            :class="{ disabled: !pagination.has_pre }"
            @click="() => getOrders(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </router-link>
        </li>
        <li
          class="page-item"
          v-for="(item, index) in pagination.total_pages"
          :key="index"
          :class="{ active: +this.$route.query.page === item }"
        >
          <router-link
            :to="`/admin/orders?page=${item}`"
            class="page-link"
            @click="() => changePage(item)"
            >{{ item }}</router-link
          >
        </li>
        <li class="page-item">
          <router-link
            :to="`/admin/orders?page=${pagination.current_page + 1}`"
            class="page-link"
            aria-label="Next"
            :class="{ disabled: !pagination.has_next }"
            @click="() => getOrders(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
import { mapActions } from "pinia";
import { userStore } from "../../stores/userStore.js";
const { VITE_APIPATH, VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      orders: [],
      currentOrder: {},
      pagination: {},
    };
  },
  computed: {},
  methods: {
    ...mapActions(userStore, ["checkLogin"]),
    changePage(page) {
      if (this.pagination.current_page === page) return;
      this.getOrders(page);
    },
    getOrders(page = 1) {
      this.$http
        .get(`${VITE_URL}/api/${VITE_APIPATH}/admin/orders?page=${page}`)
        .then((res) => {
          const { orders, pagination } = res.data;
          this.orders = orders;
          this.pagination = pagination;
        });
    },
    togglePaid(id, data) {
      this.$refs.toggleBtn.forEach((btn) => (btn.disabled = true));
      this.$http
        .put(`${VITE_URL}/api/${VITE_APIPATH}/admin/order/${id}`, { data })
        .then((res) => {
          alert(res.data.message);
          this.$refs.toggleBtn.forEach((btn) => (btn.disabled = false));
          this.getOrders();
        });
    },
    deleteOrder(id) {
      this.$refs.deleteOrderBtn.forEach((btn) => (btn.disabled = true));
      this.$http
        .delete(`${VITE_URL}/api/${VITE_APIPATH}/admin/order/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.getOrders(this.pagination.current_page);
          this.$refs.deleteOrderBtn.forEach((btn) => (btn.disabled = false));
        });
    },
  },
  mounted() {
    this.checkLogin();
    this.getOrders(this.$route.query.page);
  },
};
</script>
