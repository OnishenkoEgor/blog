<template>
  <div class="home">
    <div class="container">
      <Registration v-if="!logged"></Registration>
      <div class="account"></div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "HomeView",
  setup(props) {
    const store = useStore();
    return {
      logged: computed(() => store.getters.logged),
    };
  },
};
</script>
<style scoped lang="scss">
.home {
  .container {
    min-height: 100vh;
  }
}
</style>
