<template>
  <div>
    <nav>
      <ul class="nav nav-tabs align-items-end pt-2 px-1">
        <li class="nav-item">
          <router-link
            to="/admin/products"
            class="nav-link"
            aria-current="page"
            :class="{ active: this.$route.fullPath === '/admin/products' }"
            >產品</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/orders?page=1"
            class="nav-link"
            aria-current="page"
            :class="{
              active: this.$route.fullPath.startsWith('/admin/orders'),
            }"
            >訂單</router-link
          >
        </li>
        <li class="flex-fill"></li>
        <li class="text-end pe-4 mb-2">
          <router-link to="/" class="btn btn-outline-primary"
            >回到首頁</router-link
          >
        </li>
        <li class="text-end pe-4 mb-2">
          <button type="button" class="btn btn-outline-primary" @click="logout">
            登出
          </button>
        </li>
      </ul>
    </nav>
    <div class="container-fluid mt-3">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script>
const { VITE_APIPATH, VITE_URL } = import.meta.env;
export default {
  methods: {
    logout() {
      document.cookie = `token=; expires=${new Date(0)};`;
      this.$http.post(`${VITE_URL}/logout`).then((res) => {
        alert(res.data.message);
        this.$router.push("/");
      });
    },
  },
};
</script>
