<template>
  <form action="" class="d-grid gap-3 p-3" @submit.prevent="login">
    <div>
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        name="Email"
        id="email"
        placeholder="請輸入 Email"
        class="form-control"
        v-model="user.username"
        required
        autocomplete
      />
    </div>
    <div>
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="請輸入 Password"
        class="form-control"
        v-model="user.password"
        required
        autocomplete
      />
    </div>
    <button type="submit" class="btn btn-primary rounded py-2 fs-5">
      登入
    </button>
  </form>
</template>
<script>
import { mapActions } from "pinia";
import { userStore } from "../stores/userStore.js";
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(userStore, ["checkLogin"]),
    login() {
      this.$http
        .post(`${VITE_URL}/admin/signin`, this.user)
        .then((res) => {
          const { expried, message, token } = res.data;
          document.cookie = `token=${token}; expires=${new Date(expried)};`;
          alert(message);
          this.$http.defaults.headers.common["Authorization"] = token;
          this.$router.push("/admin");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    console.log();
    if (document.cookie.match("token")) {
      alert("登入成功");
      this.checkLogin();
    }
  },
};
</script>
