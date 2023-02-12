<template>
  <div>
    <h1>產品列表</h1>
    <table class="table table-hover align-middle text-center">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <div
              class="img mx-auto"
              style="
                width: 400px;
                height: 150px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
              "
              :style="{ 'background-image': `url(${product.imageUrl})` }"
            ></div>
          </td>
          <td>{{ product.title }}</td>
          <td>
            <p class="m-0" v-if="product.price === product.origin_price">
              {{ product.price }} 元
            </p>
            <div v-else>
              <del>原價 {{ product.origin_price }} 元</del>
              <p class="m-0 text-danger fs-5">
                現在只要 {{ product.price }} 元
              </p>
            </div>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="currentProduct = product"
            >
              商品內容
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="addCart(product.id)"
            >
              加入購物車
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          :class="{ disabled: !pagination.has_pre }"
          aria-label="Previous"
          @click="getProducts(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="`第${page}頁`"
        @click="getProducts(page)"
      >
        <button
          type="button"
          class="page-link"
          :class="{ active: page === pagination.current_page }"
        >
          {{ page }}
        </button>
      </li>
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          :class="{ disabled: !pagination.has_next }"
          aria-label="Next"
          @click="getProducts(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="productModal"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ currentProduct.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="col">
              <img
                :src="currentProduct.imageUrl"
                alt=""
                class="w-100"
                style="object-fit: cover; max-height: 300px"
              />
            </div>
            <div class="col">
              <h2>
                {{ currentProduct.title }}
                <span class="btn btn-primary rounded-pill">{{
                  currentProduct.category
                }}</span>
              </h2>
              <p>商品描述：</p>
              <p>{{ currentProduct.description }}</p>
              <p v-if="currentProduct.origin_price === currentProduct.price">
                {{ currentProduct.price }} 元
              </p>
              <div v-else>
                <del>原價 {{ currentProduct.origin_price }} 元</del>
                <p class="text-danger fs-4">
                  現在只要 {{ currentProduct.price }} 元
                </p>
              </div>
              <div class="d-flex">
                <select name="" id="" class="flex-fill" v-model="qty">
                  <option :value="i" v-for="i in 20" :key="'數量' + i">
                    {{ i }}
                  </option>
                </select>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="addCart(currentProduct.id, qty)"
                >
                  加入購物車
                </button>
              </div>
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
  </div>
</template>
<script>
import { Modal } from "bootstrap";
import { mapState, mapActions } from "pinia";
import { productsStore } from "../stores/productsStore.js";
import { cartsStore } from "../stores/cartsStore";
const { VITE_URL, VITE_APIPATH } = import.meta.env;

export default {
  data() {
    return {
      myModal: {},
      currentProduct: {},
      qty: 1,
    };
  },
  computed: {
    ...mapState(productsStore, ["products", "pagination"]),
  },
  methods: {
    ...mapActions(cartsStore, ["getCarts"]),
    ...mapActions(productsStore, ["getProducts"]),
    addCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      this.$http
        .post(`${VITE_URL}/api/${VITE_APIPATH}/cart`, { data })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          this.myModal.hide();
          this.qty = 1;
          this.getCarts();
        })
        .catch((err) => {
          alert(err.response.message);
        });
    },
  },
  mounted() {
    this.myModal = new Modal(this.$refs.productModal);
    this.getProducts(this.$route.query.page);
  },
};
</script>
<style lang="scss" scoped>
.img {
  width: 20rem;
}
</style>
