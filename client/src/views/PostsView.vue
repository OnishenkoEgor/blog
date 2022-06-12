<template>
  <div class="container">
    <h1>Posts</h1>
    <post-list :posts="posts"> </post-list>
  </div>
</template>
<script>
import { usePosts } from "@/hooks/usePosts.js";
import { computed, ref } from "vue";
export default {
  setup(props) {
    const { getPosts } = usePosts();
    const posts = ref([]);

    getPosts().then((res) => {
      posts.value = res;
    });

    return {
      posts: posts,
    };
  },
};
</script>
<style scoped lang="scss"></style>
