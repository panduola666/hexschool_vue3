<template>
  <div>後台首頁</div>
</template>
<script>
import { mapActions } from "pinia";
import { userStore } from "../../stores/userStore.js";

export default {
  methods: {
    ...mapActions(userStore,["checkLogin"])
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
