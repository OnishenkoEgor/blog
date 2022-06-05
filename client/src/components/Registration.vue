<template>
  <div class="registration">
    <h1>Registration</h1>
    <div class="registration__form">
      <div class="registration__form-content">
        <c-input
          v-for="(item, index) in user"
          :placeholder="item.placeholder"
          :label="item.label"
          v-model:value="item.value"
          :invalid="item.invalid ?? false"
          :ref="
            (el) => {
              item.element = el;
            }
          "
        ></c-input>
      </div>
      <button @click="register" class="registration__submit">register</button>
      <fade-transition>
        <div
          v-if="message"
          class="registration__error"
          :class="{ error: error }"
        >
          {{ message }}
        </div>
      </fade-transition>
    </div>
  </div>
</template>
<script>
import { useRequest } from "../hooks/useRequest.js";
import { computed, reactive, ref, toRefs } from "vue";

export default {
  name: "registration-form",
  setup(props) {
    const { post } = useRequest();
    const message = ref("");
    const error = ref(false);

    const user = reactive({
      name: {
        label: "Name",
        placeholder: "Bruce",
        value: "",
      },
      surname: {
        label: "Surname",
        placeholder: "Wayne",
        value: "",
      },
      phone: {
        label: "Phone",
        placeholder: "8-888-888-88-88",
        value: "",
      },
      photo: {
        label: "Photo",
        placeholder: "",
        value: "",
      },
      email: {
        label: "Email",
        placeholder: "example@example.com",
        value: "",
      },
      password: {
        label: "Password",
        placeholder: "***",
        value: "",
      },
    });

    function register() {
      if (valid()) {
        post("/api/auth/register", {
          name: user.name.value,
          surname: user.surname.value,
          phone: user.phone.value,
          photo: user.photo.value,
          email: user.email.value,
          password: user.password.value,
        }).then((res) => {
          if (res.status == 200) {
            user.name.value = "";
            user.surname.value = "";
            user.phone.value = "";
            user.photo.value = "";
            user.email.value = "";
            user.password.value = "";
            error.value = false;
          } else {
            error.value = true;
          }
          message.value = res.body.message;
        });
      } else {
        message.value = "Please fill all input.";
        error.value = true;
      }
      setTimeout(() => {
        message.value = "";
        error.value = false;
      }, 3500);
    }

    function valid() {
      let valid = true;
      Object.keys(user).forEach((prop) => {
        if (user[prop].value == "") {
          user[prop].invalid = true;
          valid = false;
        } else {
          user[prop].invalid = false;
        }
      });
      return valid;
    }

    return {
      user,
      register,
      message,
      error,
    };
  },
};
</script>
<style scoped lang="scss">
.registration {
  &__form {
    &-content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 30px;
    }
  }
  &__submit {
    padding-left: 40px;
    padding-right: 40px;
    color: #fff;
    font-size: 16px;
    text-transform: capitalize;
  }
  &__error {
    margin-top: 40px;
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 18px;
    background-color: #4db6ac;

    &.error {
      background-color: #ff0000;
    }
  }
}
</style>
