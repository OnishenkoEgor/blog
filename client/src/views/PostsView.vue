<template>
  <div class="posts">
    <div class="container">
      <h1>Posts</h1>
    </div>
    <div class="posts__list">
      <div v-for="post in posts" class="posts__item">
        <p>{{ post.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { useRequest } from "@/hooks/useRequest";
import { ref } from "@vue/reactivity";
export default {
  setup(props) {
    const { get } = useRequest();
    const posts = ref({});

    get("/api/posts/").then((res) => {
      posts.value = res.response;
    });

    return {
      posts,
    };
  },
};
</script>