<template>
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
          <div class="user__info-input">
            <input v-model="user.name" :disabled="!current" />
            <img v-if="current" :src="require('@/assets/pen.svg')" alt="" />
          </div>
        </div>
        <div class="user__info-item">
          <p>Surname:</p>
          <div class="user__info-input">
            <input v-model="user.surname" :disabled="!current" />
            <img v-if="current" :src="require('@/assets/pen.svg')" alt="" />
          </div>
        </div>
        <div class="user__info-item">
          <p>Phone:</p>
          <div class="user__info-input">
            <input v-model="user.phone" :disabled="!current" />
            <img v-if="current" :src="require('@/assets/pen.svg')" alt="" />
          </div>
        </div>
        <div class="user__info-item">
          <p>Email:</p>
          <div class="user__info-input">
            <input v-model="user.email" :disabled="!current" />
            <img v-if="current" :src="require('@/assets/pen.svg')" alt="" />
          </div>
        </div>
      </div>
      <div class="user__actions"  v-if="current">
        <button class="user__edit" @click="edit" ref="saveBtn">Save</button>
        <button class="user__delete" @click="remove(user.id)">Delete</button>
      </div>
    </div>
    <p class="user__message" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref, toRefs } from "@vue/reactivity";
import { useUsers } from "@/hooks/useUsers";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  name: "user-card",
  props: {
    userId: String,
  },
  setup(props) {
    const { getUser, deleteUser, updateUser } = useUsers();
    const store = useStore();
    const router = useRouter();
    const { userId } = toRefs(props);
    const user = ref({});
    const defUser = ref({});
    const { logged } = ref(store.getters.logged);
    const saveBtn = ref(null);
    const message = ref("");

    getUser(userId.value).then((res) => {
      defUser.value = { ...res };
      user.value = res;
    });

    function remove(id) {
      deleteUser(id).then((res) => {
        if (res) {
          router.push({
            name: "users",
          });
        }
      });
    }

    function edit() {
      let diffProps = {};
      Object.keys(user.value)
        .filter((key) => {
          return user.value[key] !== defUser.value[key];
        })
        .forEach((key) => {
          diffProps[key] = user.value[key];
        });

      if (Object.keys(diffProps).length > 0) {
        updateUser(defUser.value.id, diffProps).then((res) => {
          if (res) {
            message.value = "User succesful updated";
            setTimeout(() => {
              message.value = "";
            }, 2500);
          }
        });
      }
    }

    return {
      user,
      current: computed(() => store.getters.currentUserId == userId.value),
      remove,
      edit,
      saveBtn,
      message,
    };
  },
};
</script>

<style lang="scss" scoped>
.user {
  padding: 40px 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;

  &__wrapper {
    display: grid;
    grid-template-columns: max-content 6fr;
    column-gap: 10%;
    row-gap: 30px;
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
      min-height: 100%;
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
      grid-template-columns: max-content max-content;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 600;
    }
    &-input {
      position: relative;
      input {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        border-bottom: 1px solid #000;
        outline: none;
        font-size: 16px;
        font-weight: 600;
        &:disabled {
          border: none;
        }
      }
      img{
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 12px;
      }
    }
  }
  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    grid-column: 1/3;

    button {
      padding-left: 40px;
      padding-right: 40px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  &__delete {
    background-color: #d32f2f;
    color: #fff;
    &:hover {
      background-color: #e53935;
    }
  }
  &__message {
  }
}
</style>
