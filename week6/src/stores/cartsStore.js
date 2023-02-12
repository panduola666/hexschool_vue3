import { defineStore } from "pinia";
import axios from "axios";

const { VITE_URL, VITE_APIPATH } = import.meta.env;

export const cartsStore = defineStore("cartsStore", {
  state: () => ({
    carts: {},
  }),
  actions: {
    async getCarts() {
      try {
        const cartsData = await axios.get(
          `${VITE_URL}/api/${VITE_APIPATH}/cart`
        );
        const { data } = cartsData.data;
        this.carts = data;
      } catch (err) {
        alert(err.response.data.message);
      }
    },
    deleteCart(id) {
      axios
        .delete(`${VITE_URL}/api/${VITE_APIPATH}/cart/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.getCarts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    deleteAllCarts() {
      axios
        .delete(`${VITE_URL}/api/${VITE_APIPATH}/carts`)
        .then(() => {
          alert('購物車已清空');
          this.getCarts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    editorCart(id, qty) {
      console.log("變更數量");
      console.log(id, qty);
    },
  },
});
