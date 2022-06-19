<template>
  <Header></Header>
  <div class="main">
    <router-view />
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useLogin } from "@/hooks/useLogin";
import { useUsers } from "@/hooks/useUsers";
export default {
  setup(props) {
    const store = useStore();
    const { validateToken, logout } = useLogin();
    const { getUser } = useUsers();

    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("id");

    if (token) {
      validateToken(token).then((res) => {
        if (res) {
          getUser(userId).then((user) => {
            store.commit("setUser", user);
          });
        }else{
          alert('token expiered')
        }
      });
    }
  },
};
</script>

<style lang="scss">
@import "./app.scss";
</style>
