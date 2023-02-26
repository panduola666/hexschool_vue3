<template>
  <div>
    <button
      type="button"
      class="btn btn-lg btn-primary float-end me-5"
      data-bs-toggle="modal"
      data-bs-target="#postModal"
      @click="() => currentProductInfo('new')"
    >
      新增商品
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="postModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="postModal"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="exampleModalLabel">
              {{ currentProduct.title ? "編輯商品" : "新增商品" }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <br />
            <div class="col-4">
              <label for="cover" class="fs-4">* 封面</label>
              <div
                class="border bg-white d-flex align-items-center justify-content-around"
                style="min-height: 200px"
              >
                <img
                  v-if="currentProduct.imageUrl"
                  :src="currentProduct.imageUrl"
                  alt=""
                  class="img-fluid"
                />
                {{ currentProduct.imageUrl ? "" : "請上傳封面" }}
              </div>
              <button
                type="button"
                class="btn py-2 btn-primary w-100 position-relative overflow-hidden"
              >
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  class="position-absolute bg-dark top-0 start-0 end-0 bottom-0 opacity-0"
                  style="cursor: pointer; transform: scale(2)"
                  @change="($event) => postImg($event)"
                />
                上傳圖片
              </button>
            </div>
            <div class="col d-flex flex-column gap-3">
              <div class="row">
                <div class="col">
                  <label for="title" class="fs-4">* 名稱</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="w-100"
                    v-model="currentProduct.title"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="category" class="fs-4">* 分類</label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    class="w-100"
                    v-model="currentProduct.category"
                  />
                </div>
                <div class="col">
                  <label for="unit" class="fs-4">* 單位</label>
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    class="w-100"
                    v-model="currentProduct.unit"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="origin_price" class="fs-4">* 原價</label>
                  <input
                    type="number"
                    name="origin_price"
                    id="origin_price"
                    class="w-100"
                    v-model.number="currentProduct.origin_price"
                  />
                </div>
                <div class="col">
                  <label for="price" class="fs-4">* 優惠價</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    class="w-100"
                    v-model.number="currentProduct.price"
                  />
                </div>
              </div>
              <div>
                <label for="description" class="fs-5">商品描述</label>
                <textarea
                  name="description"
                  id="description"
                  class="w-100"
                  rows="5"
                  v-model="currentProduct.description"
                ></textarea>
              </div>
              <div>
                <input
                  type="checkbox"
                  class="is_enabled me-1"
                  id="is_enabled"
                  v-model="currentProduct.is_enabled"
                />
                <label for="is_enabled">上架商品</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="postAJAX">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover align-middle text-center">
      <thead>
        <tr>
          <th></th>
          <th>商品名稱</th>
          <th>價格</th>
          <th>狀態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <button
              type="button"
              class="btn btn-close"
              @click="() => deleteProduct(product.id)"
            ></button>
          </td>
          <td>{{ product.title }}</td>
          <td>
            <p class="m-0" v-if="product.origin_price === product.price">
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
            <p class="text-success" v-if="product.is_enabled">已上架</p>
            <p class="text-danger" v-else>未上架</p>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#productModal"
              @click="() => showProduct(product.id)"
            >
              商品詳情
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#postModal"
              @click="() => currentProductInfo('editor', product.id)"
            >
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 商品詳情 Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="exampleModalLabel">
              {{ currentProduct.title }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="col">
              <img
                :src="currentProduct.imageUrl"
                :alt="currentProduct.title"
                class="w-100"
                style="object-fit: cover; max-height: 400px"
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
              <p
                class="fs-4"
                v-if="currentProduct.origin_price === currentProduct.price"
              >
                {{ currentProduct.price }} 元
              </p>
              <div v-else>
                <del>原價 {{ currentProduct.origin_price }} 元</del>
                <p class="text-danger fs-4">
                  現在只要 {{ currentProduct.price }} 元
                </p>
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
import { mapActions } from "pinia";
import { userStore } from "../../stores/userStore.js";
const { VITE_APIPATH, VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      postModal: {},
      currentProduct: {
        title: "",
        category: "",
        origin_price: "",
        price: "",
        unit: "",
        description: "",
        is_enabled: true,
        imageUrl: "",
      },
      products: [],
    };
  },
  methods: {
    ...mapActions(userStore, ["checkLogin"]),
    getProducts() {
      this.$http(`${VITE_URL}/api/${VITE_APIPATH}/admin/products/all`).then(
        (res) => {
          const { products } = res.data;
          this.products = Object.values(products);
        }
      );
    },
    showProduct(id) {
      const index = this.products.findIndex((product) => product.id === id);
      this.currentProduct = this.products[index];
    },
    currentProductInfo(config, id) {
      if (config === "editor" && id) {
        const index = this.products.findIndex((product) => product.id === id);
        this.currentProduct = { ...this.products[index] };
      }
      if (config === "new") {
        this.currentProduct = this.$options.data().currentProduct;
      }
    },
    // 點確定後
    postAJAX() {
      const data = this.currentProduct;
      if (!data.imageUrl) {
        alert("請上傳封面");
        return;
      }
      const id = data.id ? `/${data.id}` : "";
      let config = "post";
      if (id) config = "put";
      this.$http[config](`${VITE_URL}/api/${VITE_APIPATH}/admin/product${id}`, {
        data,
      })
        .then((res) => {
          alert(res.data.message);
          this.postModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    postImg(e) {
      const data = e.target.files[0];
      const formData = new FormData();
      formData.append("img", data);
      this.$http
        .post(`${VITE_URL}/api/${VITE_APIPATH}/admin/upload`, formData)
        .then((res) => {
          const { imageUrl } = res.data;
          this.currentProduct.imageUrl = imageUrl;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    deleteProduct(id) {
      this.$http
        .delete(`${VITE_URL}/api/${VITE_APIPATH}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.checkLogin();
    this.getProducts();
    this.postModal = new Modal(this.$refs.postModal);
  },
};
</script>
