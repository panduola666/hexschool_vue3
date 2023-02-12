<template>
  <div>
    <nav>
      <ul class="nav nav-tabs align-items-end pt-2 px-1">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            :class="{ active: this.$route.fullPath === '/' }"
            aria-current="page"
            >首頁</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/products?page=1"
            class="nav-link"
            @click="getProducts(1)"
            :class="{ active: this.$route.fullPath.includes('products') }"
            >產品列表</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/carts"
            class="nav-link d-flex align-items-center gap-2"
            :class="{ active: this.$route.fullPath === '/carts' }"
            >購物車
            <span
              class="bg-danger text-white rounded py-1 px-2"
              style="font-size: 10px"
              >{{ carts.carts?.length }}</span
            >
          </router-link>
        </li>
        <li class="flex-fill"></li>
        <li class="nav-item text-end pe-4">
          <router-link
            to="/login"
            class="nav-link"
            :class="{ active: this.$route.fullPath === '/login' }"
            >廠商登入</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="container mt-3 pb-5">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
import { mapState, mapActions } from "pinia";
import { cartsStore } from "../stores/cartsStore";
import { productsStore } from "../stores/productsStore.js";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(cartsStore, ["carts"]),
  },
  methods: {
    ...mapActions(cartsStore, ["getCarts"]),
    ...mapActions(productsStore, ["getProducts"]),
  },
  components: {
    RouterLink,
    RouterView,
  },
  mounted() {
    this.getCarts();
  },
};
</script>
