import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

const { VITE_URL } = import.meta.env;

export const userStore = defineStore("userStore", {
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
          router.push("/admin");
          console.log("登入成功");
        })
        .catch((err) => {
          alert(err.response.data.message);
          router.push('/login');
        });
    },
  },
});
