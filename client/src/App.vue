<template>
  <Header></Header>
  <router-view />
</template>
<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
export default {
  setup(props) {
    const store = useStore();
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    if (token && userId) {
      store.commit("setToken", token);
      store.commit("setUserId", userId);
    }
  },
};
</script>


<style lang="scss">
@import "./app.scss";
</style>
