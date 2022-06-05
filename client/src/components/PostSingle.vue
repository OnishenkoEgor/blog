<template>
  <router-link>
    <p class="posts__title">{{ post.title }}</p>
    <p class="posts__content">{{ post.content }}</p>
    <router-link :to="`/users/${post.authorID}`" class="posts__author button">{{
      post.author
    }}</router-link>
  </router-link>
</template>

<script>
import { toRefs } from "@vue/reactivity";
export default {
  name: "post-single",
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    authorID: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    console.log(props);
    return {
      ...props,
    };
  },
};
</script>

<style></style>
