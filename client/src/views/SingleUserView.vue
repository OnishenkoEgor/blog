<template>
  <div class="container">
    <user-card :userId="userId"></user-card>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";

export default {
  setup(props) {
    const { params } = useRoute();   

    return {
      userId: params.id,
    };
  },
};
</script>

<style scoped lang="scss"></style>
