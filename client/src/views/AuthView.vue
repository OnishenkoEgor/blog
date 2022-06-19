<template>
  <div class="auth">
    <div class="container">
      <h1>Authorization</h1>
      <div class="auth__select">
        <button @click="toggleModal('login')" disabled ref="login">
          Login
        </button>
        <button @click="toggleModal('registr')" ref="registr">
          Registration
        </button>
      </div>
      <registration-form v-if="modal == 'registr'"></registration-form>
      <login-form v-if="modal == 'login'"></login-form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup(props) {
    let modal = ref("login");
    let login = ref(null);
    let registr = ref(null);

    function toggleModal(needle) {
      modal.value = needle;
      registr.value.disabled = needle == "registr";
      login.value.disabled = needle == "login";
    }

    return {
      modal,
      toggleModal,
      login,
      registr,
    };
  },
};
</script>

<style scoped lang="scss">
.auth {
  &__select {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;

    button {
      padding: 0;
      background: none;
      color: #4db6ac;
      margin-right: 10px;

      &:last-child {
        margin-right: 0px;
      }

      &[disabled] {
        cursor: default;
        color: #4c4c4c;
      }
    }
  }
}
</style>
