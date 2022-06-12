<template>
  <div class="post-single">
    <p class="post-single__title">{{ title }}</p>
    <p class="post-single__content">{{ content }}</p>
    <div class="post-single__actions">
      <router-link
        :to="{ name: users, params: { id: authorID } }"
        class="button"
        >Author</router-link
      >
      <router-link :to="{ name: posts, params: { id } }" class="button"
        >Open</router-link
      >
    </div>
  </div>
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

<style lang="scss" scoped>
.post-single {
  display: block;
  padding: 12px 24px;
  text-align: left;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: 0.3s all;
  
  &:hover {
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  &__actions {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    column-gap: 16px;
  }
}
</style>
