<template>
  <transition-group name="users" tag="ul">
    <ul v-if="users.length > 0">
      <user-single v-for="user in users" :user="user"></user-single>
    </ul>
  </transition-group>
</template>

<script>
import { ref, toRef } from "@vue/reactivity";
export default {
  name: "user-list",
  props: {
    users: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    console.log(props.users);
  },
};
</script>

<style lang="scss" scoped>
.users-enter-active,
.users-leave-active {
  transition: opacity 0.5s;
}
.users-enter,
.users-leave-to {
  opacity: 0;
}
</style>
