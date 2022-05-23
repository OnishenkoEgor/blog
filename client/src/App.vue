<template>
  <Header></Header>
  <router-view />
</template>
<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRequest } from "@/hooks/useRequest.js";
export default {
  setup(props) {
    try {
      const store = useStore();
      const { get } = useRequest();
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");

      if (token) {
        store.commit("setToken", token);
        get(`/api/users/${userId}`).then((res) => {
          store.commit("setUser", res.response);
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


<style lang="scss">
@import "./app.scss";
</style>
