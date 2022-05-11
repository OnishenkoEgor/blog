<template>
  <div class="container">
    <h1>Users</h1>
    <transition-group name="users" tag="ul">
      <li
        class="user-item"
        v-for="user in users"
        :key="user._id"
        :class="{ current: user._id == currentUserId }"
      >
        <p>{{ user.email }}</p>
        <router-link
          class="user-item__button open"
          :to="{ name: 'user', params: { id: user._id } }"
          >Open</router-link
        >
        <div @click="deleteUser(user._id)" class="user-item__button delete">
          Delete
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRequest } from "@/hooks/useRequest.js";
import { useStore } from "vuex";

export default {
  name: "UsersView",
  setup(props) {
    let users = ref({});
    const { get, post } = useRequest();
    const store = useStore();

    function deleteUser(id) {
      post(`/api/delete`, { id }).then((res) => {
        updateUsers();
      });
    }

    function updateUsers() {
      get("/api/users").then((res) => {
        users.value = res.response;
      });
    }
    updateUsers();

    return {
      users,
      deleteUser,
      currentUserId: computed(() => store.getters.currentUserId),
    };
  },
};
</script>

<style scoped lang="scss">
ul {
  padding-left: 0;
}
.user-item {
  display: grid;
  grid-template-columns: 1fr max-content max-content;
  align-items: center;
  column-gap: 32px;
  padding: 16px;
  margin-bottom: 15px;
  border: 1px solid #eee;
  &.current {
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 20px;
    color: #111;
    text-align: left;
    margin: 0;
  }
  &__button {
    padding: 6px 12px;
    border-radius: 2px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
}
.delete {
  background-color: #ff3434;
}
.open {
  background-color: #4db6ac;
}

.users-enter-active,
.users-leave-active {
  transition: opacity 0.5s;
}
.users-enter,
.users-leave-to {
  opacity: 0;
}
</style>