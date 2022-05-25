<template>
  <div class="single-post">
    <div class="single-post__title">
      {{ post?.title }}
    </div>
    <div class="single-post__content">
      {{ post?.content }}
    </div>
    <div class="single-post__footer">
      <div class="single-post__author">
        {{ post?.author }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRequest } from "@/hooks/useRequest.js";
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";

export default {
  setup(props) {
    const { get } = useRequest();
    const { params } = useRoute();
    const post = ref({});

    get(`/api/posts/${params.id}`).then((res) => {
      post.value = res.response;
    });
    
    return {
      post,
    };
  },
};
</script>

<style></style>
