<template>
  <div class="posts">
    <div class="posts__list">
      <router-link
        v-if="posts.length > 0"
        v-for="post in posts"
        :to="`/posts/${post._id}`"
        class="posts__item"
      >
        <p class="posts__title">{{ post.title }}</p>
        <p class="posts__content">{{ post.content }}</p>
        <router-link
          :to="`/users/${post.authorID}`"
          class="posts__author button"
          >{{ post.author }}</router-link
        >
      </router-link>
      <p v-else>Not found posts</p>
    </div>
  </div>
</template>
<script>
import { toRefs } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
export default {
  name: "post-list",
  props: {
    posts: {
      type: Array,
      required: true,
      default: [],
    },
  },
  setup(props) {
    const { posts } = toRefs(props);

    watch(posts, (first, second) => {
      posts.value = first;
    });

    return {
      posts: computed(() => posts.value),
    };
  },
};
</script>
<style scoped lang="scss">
.posts {
  &__item {
    display: block;
    margin-bottom: 15px;
    padding: 12px 24px;
    text-align: left;
    border: 1px solid #eee;
    border-radius: 8px;
    transition: 0.3s all;
    &:hover {
      box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
    }
  }
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  &__content {
  }
  &__author {
    display: block;
    width: max-content;
    margin-left: auto;
    margin-right: 0;
    text-align: right;
    color: #fff;
  }
}
</style>
