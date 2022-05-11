<template>
  <div class="auth">
    <div class="container">
      <h1>Authorization</h1>
      <div class="auth__wrapper">
        <div class="auth__form">
          <p class="auth__form-title">Authorization form</p>
          <div class="auth__input">
            <label>Email</label>
            <input type="text" name="email" v-model="email" />
          </div>
          <div class="auth__input">
            <label>Password</label>
            <input type="text" name="password" v-model="password" />
          </div>
          <div class="auth__buttons">
            <button
              @click="formSubmit"
              class="auth__button"
              type="submit"
              data-action="login"
            >
              Login
            </button>
            <button
              @click="formSubmit"
              class="auth__button"
              type="submit"
              data-action="register"
            >
              Registration
            </button>
          </div>
        </div>
        <TransitionGroup name="message">
          <div v-if="message" class="auth__message">
            <p>{{ message }}</p>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRequest } from "@/hooks/useRequest";
import { useLogin } from "@/hooks/useLogin";

export default {
  setup(props) {
    const { post } = useRequest();
    const { login } = useLogin();
    const email = ref("");
    const password = ref("");
    const message = ref("");
    const formSubmit = (e) => {
      let action = e.target.dataset.action;
      if (email && password) {
        post(`/api/auth/${action}`, {
          email: email.value,
          password: password.value,
        })
          .then((res) => {
            if (res.status == 200) {
              switch (action) {
                case "register":
                  email.value = "";
                  password.value = "";
                  message.value = res.body.message;
                  break;
                case "login":
                  let logged = login(res.body.token);
                  if (logged) {
                    email.value = "";
                    password.value = "";
                    message.value = "Login success";
                  } else {
                    message.value = "Login failed";
                  }
                  break;
              }
              setTimeout(() => {
                message.value = "";
              }, 2500);
            } else {
              message.value = res.body.message;
            }
          })
          .catch((e) => {
            message.value = "Error on front-end";
          });
      }
    };
    return { email, password, formSubmit, message };
  },
};
</script>

<style scoped lang="scss">
.auth {
  &__form {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 20px;
    margin: 0 auto;
    background-color: #eee;
    border-radius: 4px;

    &-title {
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 600;
    }
  }

  &__input {
    width: 100%;
    margin-bottom: 20px;
    label {
      display: block;
      margin-bottom: 15px;
      text-align: left;
    }
    input {
      display: block;
      width: 100%;
      outline: none;
      border: 1px solid #fff;
      padding: 10px;
      color: #2c3e50;
      letter-spacing: 1px;
    }
  }

  &__buttons {
    display: grid;
    grid-template-columns: max-content max-content;
    column-gap: 20px;
  }

  &__message {
    border-radius: 4px;
    padding: 16px 22px;
    font-size: 20px;
    background-color: #eee;
    width: 500px;
    margin: 16px auto;
    p {
      margin: 0;
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