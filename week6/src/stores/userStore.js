import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

const { VITE_URL } = import.meta.env;

export const userStore = defineStore("userStore", {
  state: () => ({
    isLogin: false,
  }),
  actions: {
    checkLogin() {
      if (document.cookie.match("token")) {
        const token = document.cookie
          .split(";")
          .filter((item) => item.match("token"))[0]
          .split("=")[1];
        axios.defaults.headers.common["Authorization"] = token;
      }
      axios
        .post(`${VITE_URL}/api/user/check`)
        .then(() => {
          if (this.isLogin) return;
          this.isLogin = true;
          const path = router.currentRoute._value.fullPath;
          if (!path.includes("/admin")) router.push("/admin/products");
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.isLogin = false;
          router.push("/login");
        });
    },
  },
});
