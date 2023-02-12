<template>
  <div>
    <nav>
      <router-link to="/">首頁</router-link>
      <router-link to="/products">產品</router-link>
      <router-link to="/orders">訂單</router-link>
      <router-link to="/login">廠家登出</router-link>
    </nav>
    <RouterView></RouterView>
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  components: {
    RouterLink,
    RouterView,
  },
};
</script>
