<template>
  <div class="post-form">
    <h2>Create post</h2>
    <div class="post-form__content">
      <c-input
        label="Title"
        v-model:value="postContent.title.value"
        :ref="postContent.title.element"
      ></c-input>
      <c-textarea
        label="Content"
        v-model:value="postContent.content.value"
        :ref="postContent.content.element"
      ></c-textarea>
      <button @click="createPost">Create</button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { useStore } from "vuex";

export default {
  name: "PostForm",
  setup(props) {
    const { post } = useRequest();
    const store = useStore();

    const postContent = reactive({
      title: {
        value: "",
        invalid: false,
        placeholder: "Title",
      },
      content: {
        value: "",
        invalid: false,
        placeholder: "Content",
      },
    });

    function createPost() {
      if (postContent.title.value && postContent.content.value) {
        post("/api/posts/create", {
          title: postContent.title.value,
          content: postContent.content.value,
          userId: store.getters.getUser.id,
        }).then((res) => {
          console.log(res);
        });
      }
    }

    return {
      postContent,
      createPost,
    };
  },
};
</script>

<style scoped lang="scss">
.post-form {
  background-color: #eee;
  border-radius: 4px;
  padding: 15px;

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  button {
    margin-left: auto;
    margin-right: 0;
    color: #fff;
  }
}
</style>