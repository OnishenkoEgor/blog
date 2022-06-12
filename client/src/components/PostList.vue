<template>
  <div class="posts">
    <div class="posts__list" v-if="posts.length > 0">
      <post-single v-for="post in posts" ></post-single>
    </div>
    <p v-else>Not found posts</p>
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
</style>
