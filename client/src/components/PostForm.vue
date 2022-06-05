<template>
  <div class="post-form">
    <h1>Create post</h1>
    <div class="post-form__content">
      <c-input
        label="Title"
        v-model:value="postContent.title.value"
        :invalid="postContent.title.invalid"
      ></c-input>
      <c-textarea
        label="Content"
        v-model:value="postContent.content.value"
        :invalid="postContent.content.invalid"
      ></c-textarea>
      <button @click="createPost">Create</button>
    </div>
    <fade-transition>
      <div v-if="message" class="post-form__message">
        <p>{{ message }}</p>
      </div>
    </fade-transition>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { useStore } from "vuex";

export default {
  name: "post-form",
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

    const message = ref("");

    function createPost() {
      if (postContent.title.value && postContent.content.value) {
        post("/api/posts/create", {
          title: postContent.title.value,
          content: postContent.content.value,
          userId: store.getters.getUser.id,
        }).then((res) => {
          if (res.status == 200) {
            postContent.title.value = "";
            postContent.content.value = "";
          } else {
            postContent.title.invalid = true;
            postContent.content.invalid = true;
            setTimeout(() => {
              postContent.title.invalid = false;
              postContent.content.invalid = false;
            }, 1500);
          }
          message.value = res.body.message;
          setTimeout(() => {
            message.value = "";
          }, 1500);
        });
      } else {
        postContent.title.invalid = true;
        postContent.content.invalid = true;
        setTimeout(() => {
          postContent.title.invalid = false;
          postContent.content.invalid = false;
        }, 1500);
      }
    }

    return {
      postContent,
      createPost,
      message,
    };
  },
};
</script>

<style scoped lang="scss">
.post-form {
  &__content {
    background-color: #eee;
    border-radius: 4px;
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  button {
    margin-left: auto;
    margin-right: 0;
    color: #fff;
  }

  &__message {
    background-color: #eee;
    border-radius: 4px;
    font-size: 20px;
    text-align: center;
    padding: 15px;
    margin-top: 12px;
  }
}
</style>
