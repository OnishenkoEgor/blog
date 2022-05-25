<template>
  <div class="posts">
    <div class="posts__list">
      <router-link
        v-for="post in posts"
        :to="`/posts/${post._id}`"
        class="posts__item"
      >
        <p class="posts__title">{{ post.title }}</p>
        <p class="posts__content">{{ post.content }}</p>
        <router-link :to="`/users/${post.authorID}`" class="posts__author">{{
          post.author
        }}</router-link>
      </router-link>
    </div>
  </div>
</template>
<script>
import { useRequest } from "@/hooks/useRequest";
import { ref } from "@vue/reactivity";
export default {
  name: "Post-list",
  props:{
    params:{
      type:Object,
      default:{}
    }
  },
  setup(props) {
    const { get } = useRequest();
    const posts = ref({});
    console.log(props.params)
    get(`/api/posts/${''}`).then((res) => {

      posts.value = res.response;
    });

    return {
      posts,
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
    color:blue;
  }
}
</style>
