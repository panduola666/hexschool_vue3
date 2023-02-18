<template>
  <div>
    <h1>
      購物車
      <button
        type="button"
        class="btn btn-outline-danger float-end"
        @click="deleteAllCarts"
        v-if="carts.carts?.length"
      >
        清空購物車
      </button>
    </h1>
    <section
      v-if="carts.carts && !carts.carts.length"
      class="d-flex flex-column text-center align-items-center gap-3 border py-5 shadow"
    >
      <h2 class="h3">當前購物車沒有商品</h2>
      <router-link to="/products?page=1" class="btn btn-primary"
        >來去選購</router-link
      >
    </section>
    <div v-else>
      <table class="table table-hover align-middle text-center">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
            <th>總計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td>
              <button
                class="btn btn-outline-danger"
                @click="deleteCart(cart.id)"
              >
                X
              </button>
            </td>
            <td>{{ cart.product.title }}</td>
            <td>
              <select
                name=""
                id=""
                :value="cart.qty"
                class="w-25"
                @change="editorCart(cart, $event.target.value)"
              >
                <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
              </select>
              / {{ cart.product.unit }}
            </td>
            <td>{{ cart.product.price }}</td>
            <td>{{ cart.total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-end">總計</td>
            <td>{{ carts.total }}</td>
          </tr>
        </tfoot>
      </table>
      <h1 class="h3 text-center mt-5">確認訂單</h1>
      <VForm
        v-slot="{ errors }"
        action=""
        class="d-grid gap-3 w-75 mx-auto pb-5 orderForm"
        @invalid-submit="onInvalidSubmit"
        @submit="orderPost"
      >
        <div>
          <label for="email" class="form-label">Email</label>
          <VField
            type="email"
            name="Email"
            id="email"
            placeholder="請輸入 Email"
            class="form-control"
            v-model="buyerInfo.email"
            :class="{
              'is-invalid': errors['Email'],
              'is-valid': buyerInfo.email,
            }"
            rules="required|email"
          />
          <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div>
          <label for="name" class="form-label">收件人姓名</label>
          <VField
            type="text"
            name="姓名"
            id="name"
            placeholder="請輸入姓名"
            class="form-control"
            v-model="buyerInfo.name"
            :class="{
              'is-invalid': errors['姓名'],
              'is-valid': buyerInfo.name,
            }"
            rules="required"
          />
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>
        <div>
          <label for="tel" class="form-label">收件人手機</label>
          <VField
            type="tel"
            name="手機號碼"
            id="tel"
            placeholder="請輸入手機號碼"
            class="form-control"
            v-model="buyerInfo.tel"
            :class="{
              'is-invalid': errors['手機號碼'],
              'is-valid': buyerInfo.tel,
            }"
            rules="required|numeric|length:10"
          />
          <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
        </div>
        <div>
          <label for="address" class="form-label">收件人地址</label>
          <VField
            type="text"
            name="地址"
            id="address"
            placeholder="請輸入地址"
            class="form-control"
            v-model="buyerInfo.address"
            :class="{
              'is-invalid': errors['地址'],
              'is-valid': buyerInfo.address,
            }"
            rules="required"
          />
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div>
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="buyerMessage"
          ></textarea>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="w-50 btn btn-primary p-3"
            ref="submit-btn"
          >
            送出訂單
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email, length, numeric } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
defineRule("required", required);
defineRule("email", email);
defineRule("length", length);
defineRule("numeric", numeric);
configure({
  generateMessage: localize("tw", {
    code: "zh_TW",
    messages: {
      required: "{field} 必填",
      email: "{field} 格式錯誤",
      length: "{field} 需為 0:{length} 個字元",
      numeric: "{field} 須為數字",
    },
  }),
  validateOnInput: true,
});

import { cartsStore } from "../stores/cartsStore.js";
const { VITE_URL, VITE_APIPATH } = import.meta.env;

export default {
  data() {
    return {
      buyerInfo: {
        name: "",
        email: "",
        tel: "",
        address: "",
      },
      buyerMessage: "",
    };
  },
  computed: {
    ...mapState(cartsStore, ["carts"]),
  },
  methods: {
    ...mapActions(cartsStore, [
      "getCarts",
      "deleteCart",
      "deleteAllCarts",
      "editorCart",
    ]),
    orderPost() {
      this.$refs["submit-btn"].disabled = true;
      const data = {
        user: { ...this.buyerInfo },
        message: this.buyerMessage,
      };
      this.$http
        .post(`${VITE_URL}/api/${VITE_APIPATH}/order`, { data })
        .then((res) => {
          alert(res.data.message);
          this.$refs["submit-btn"].disabled = false;
          this.buyerInfo = this.$options.data().buyerInfo;
          this.buyerMessage = "";
          this.getCarts();
          this.$router.push("/");
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$refs["submit-btn"].disabled = false;
        });
    },
    onInvalidSubmit({ errors }) {
      console.log(errors);
      const firstError = Object.keys(errors)[0];
      document.querySelector(".orderForm")[firstError].focus();
    },
  },
  components: {
    VField: Field,
    VForm: Form,
    ErrorMessage,
  },
};
</script>
