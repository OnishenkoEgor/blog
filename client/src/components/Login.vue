<template>
  <div class="login">
    <div class="login__form">
      <div class="login__inputs">
        <c-input label="Email" v-model:value="email" :invalid="emailInvalid" />
        <c-input
          label="Password"
          v-model:value="password"
          :invalid="passInvalid"
        />
      </div>
      <div class="login__buttons">
        <button @click="submit" class="login__button">Login</button>
      </div>
    </div>
    <TransitionGroup name="message">
      <div v-if="message" class="login__message">
        <p>{{ message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { useLogin } from "@/hooks/useLogin";

export default {
  name: "login-form",
  setup(props) {
    const { post } = useRequest();
    const { login } = useLogin();
    const email = ref("");
    const password = ref("");
    const message = ref("");

    const emailInvalid = ref(false);
    const passInvalid = ref(false);

    function submit() {
      if (email.value && password.value) {
        emailInvalid.value = false;
        passInvalid.value = false;
        login(email.value, password.value).then((res) => {
          if (res.message) {
            message.value = res.message;
          } else if (res == true) {
            email.value = "";
            password.value = "";
            message.value = "Login succesful";
          } else {
            message.value = "Unknown error, please try again later";
          }
        });
      } else {
        emailInvalid.value = true;
        passInvalid.value = true;
      }
    }

    watch(message, (value, prevValue) => {
      if (value !== "") {
        setTimeout(() => {
          message.value = "";
        }, 2500);
      }
    });

    return {
      email,
      password,
      submit,
      message,
      emailInvalid,
      passInvalid,
    };
  },
};
</script>

<style scoped lang="scss">
.login {
  &__inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    padding-bottom: 50px;
  }

  &__buttons {
    margin-bottom: 30px;
    button {
      padding-left: 40px;
      padding-right: 40px;
      color: #fff;
      font-size: 16px;
      text-transform: capitalize;
    }
  }
}
.message-enter-active,
.message-leave-active {
  transition: 0.3s all;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
