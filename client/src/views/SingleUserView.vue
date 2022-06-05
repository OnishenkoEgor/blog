<template>
  <div class="container">
    <div class="user">
      <div class="user__wrapper">
        <div class="user__image">
          <img
            :src="
              user.photo ??
              'https://www.pcfix.lt/wp-content/uploads/2019/10/default-user-image.png'
            "
            alt=""
          />
        </div>
        <div class="user__info">
          <div class="user__info-item">
            <p>Name:</p>
            <i></i>
            <span> {{ user.name }}</span>
          </div>
          <div class="user__info-item">
            <p>Surname:</p>
            <i></i>
            <span> {{ user.surname }}</span>
          </div>
          <div class="user__info-item">
            <p>Phone:</p>
            <i></i>
            <span> {{ user.phone }}</span>
          </div>
          <div class="user__info-item">
            <p>Email:</p>
            <i></i>
            <span> {{ user.email }}</span>
          </div>
        </div>
      </div>
      <PostForm></PostForm>
      <h1>Posts</h1>
      <Post-list :posts="posts"></Post-list>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useUser } from "@/hooks/useUser";
import { useRequest } from "@/hooks/useRequest";
import { usePosts } from "@/hooks/usePosts.js";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export default {
  setup(props) {
    const { getPostsById } = usePosts();
    const { params } = useRoute();
    const { get } = useRequest();
    const { getUser } = useUser();
    const user = ref("");
    const posts = ref([]);

    function loadUser() {
      get(`/api/users/${params.id}`).then(({ response }) => {
        user.value = response;
      });
    }

    function loadPosts() {
      getPostsById(params.id).then((res) => (posts.value = res));
    }

    loadUser();
    loadPosts();

    return {
      user,
      posts,
    };
  },
};
</script>

<style scoped lang="scss">
.user {
  padding: 40px 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;

  &__wrapper {
    display: grid;
    grid-template-columns: max-content 6fr;
    column-gap: 10%;
    padding: 20px;
    border-radius: 12px;
    background-color: #eee;
  }
  &__image {
    position: relative;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    img {
      max-width: 100%;
      width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px 0;

    &-item {
      display: grid;
      grid-template-columns: max-content 1fr max-content;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
