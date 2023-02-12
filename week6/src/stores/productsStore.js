import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

const { VITE_URL, VITE_APIPATH } = import.meta.env;

export const productsStore = defineStore("productsStore", {
  state: () => ({
    products: [],
    pagination: {},
  }),
  actions: {
    async getProducts(page) {
      if (page === this.pagination.current_page) return;
      const productsData = await axios.get(
        `${VITE_URL}/api/${VITE_APIPATH}/products?page=${page}`
      );
      const { products, pagination } = productsData.data;
      this.pagination = pagination;
      this.products = products;
      router.push({ query: { page: this.pagination.current_page } });
    },
  },
});
