<template>
  <transition-group name="users" tag="ul">
    <ul class="users-list" v-if="users.length > 0">
      <user-single v-for="user in users" :user="user"></user-single>
    </ul>
  </transition-group>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  name: "user-list",
  props: {
    users: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const { users } = toRefs(props);

    watch(users, (newUsers) => {
      console.log(newUsers);
    });
    return {
      users,
    };
  },
};
</script>

<style lang="scss" scoped>
.users-list {
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 32px;
}

.users-enter-active,
.users-leave-active {
  transition: opacity 0.5s;
}
.users-enter,
.users-leave-to {
  opacity: 0;
}
</style>
