<template>
  <div class="user" v-if="user">
    <div class="user__wrapper">
      <div class="user__image">
        <img src="" alt="" />
      </div>
      <div class="user__info">
        <div class="user__name">
            {{user.name}}
        </div>
        <div class="user_surname"></div>
      </div>
      <div class="user__actions"><button></button><button></button></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "user-single",
  props: {
    user: {
      type: Object,
      default: {},
      validator(user) {
        return user.hasOwnProperty('name');
      },
    },
  },
  setup(props) {
    const { user } = ref(props);

    return {
      user
    };
  },
};
</script>

<style></style>
