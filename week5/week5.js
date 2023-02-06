import productModal from "./components/productModal.js";
import pagination from "./components/pagination.js";


import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

const baseUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "panduola666";

// 規則載入
VeeValidate.defineRule("email", VeeValidateRules["email"]);
VeeValidate.defineRule("required", VeeValidateRules["required"]);
VeeValidate.defineRule("min", VeeValidateRules["min"]);
VeeValidate.defineRule("numeric", VeeValidateRules["numeric"]);
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"), // 切換成中文版
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證 默認:change
});

const app = Vue.createApp({
  data() {
    return {
      pagination: {},
      products: [],
      shoppingCart: {},
      tempProduct: {},
      isFinish: false,
      buyerInfo: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    finishShopping() {
      if (this.shoppingCart.carts.length) {
        this.isFinish = !this.isFinish;
      } else {
        alert("購物車沒有東西");
      }
    },
    getProducts(page = 1) {
      if (page <= 0 || page > this.pagination.total_pages) return;
      axios
        .get(`${baseUrl}/api/${apiPath}/products?page=${page}`)
        .then((res) => {
          const { pagination, products } = res.data;
          (this.pagination = pagination), products;
          this.products = products;
        });
    },
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      axios.post(`${baseUrl}/api/${apiPath}/cart`, { data }).then((res) => {
        alert(res.data.message);
        this.getCartList();
      });
    },
    getCartList() {
      axios.get(`${baseUrl}/api/${apiPath}/cart`).then((res) => {
        this.shoppingCart = res.data.data;
      });
    },
    putCartQty(id, product_id, qty) {
      const data = {
        product_id,
        qty,
      };
      axios
        .put(`${baseUrl}/api/${apiPath}/cart/${id}`, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCartList();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    deleteCart(id) {
      axios.delete(`${baseUrl}/api/${apiPath}/cart/${id}`).then((res) => {
        alert(res.data.message);
        this.getCartList();
      });
    },
    deleteAllCart() {
      axios.delete(`${baseUrl}/api/${apiPath}/carts`).then((res) => {
        alert("已清空購物車內容");
        this.getCartList();
      });
    },
    postOrder() {
      const data = this.buyerInfo;
      axios.post(`${baseUrl}/api/${apiPath}/order`, { data }).then((res) => {
        alert(res.data.message);
        this.buyerInfo = this.$options.data().buyerInfo;
        this.getCartList();
        this.isFinish = false;
      });
    },
  },
  mounted() {
    this.getProducts();
    this.getCartList();
  },
  components: {
    productModal,
    pagination,
    Loading
  },
});
console.log(app);
app.use('loading',vueLoadingOverlay)
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
