<template>
  <div class="home">
    <div class="container">
      <button @click="fetchData" style="color: #fff">Check Express</button>
      <button @click="changeChecked" style="color: #fff">Check Store</button>
      <p>{{ checked }}</p>
    </div>
  </div>
</template>

<script>
import { useRequest } from "../hooks/useRequest.js";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "HomeView",
  setup(props) {
    const { get } = useRequest();
    const store = useStore();

    function fetchData() {
      get("/api/auth/test-get").then((res) => {
        if (res.check) {
          alert("Connection working");
        }
      });
    }

    function changeChecked() {
      store.commit("changeChecker");
    }

    return {
      fetchData,
      changeChecked,
      checked: computed(() => store.getters.checked),
    };
  },
};
</script>
<style scoped lang="scss">
.home {
  .container {
    min-height: 100vh;
    display: grid;
    grid-auto-flow: row;
    grid-auto-columns: max-content;
    grid-auto-rows: max-content;
    align-content: center;
    justify-content: center;
    row-gap: 10px;
  }
}
</style>
