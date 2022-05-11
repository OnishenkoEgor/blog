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

    if (token) {
      store.commit("setToken", token);
    }
  },
};
</script>


<style lang="scss">
@import "./app.scss";
</style>
