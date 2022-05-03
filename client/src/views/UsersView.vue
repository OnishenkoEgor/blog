<template>
  <div class="container">
    <h1>Users</h1>
    <transition-group name="users" tag="ul">
      <li
        v-for="user in users"
        :key="user._id"
        :class="{ current: user._id == currentUserId }"
      >
        <p>{{ user.email }}</p>
        <div @click="deleteUser(user._id)" class="delete">Delete</div>
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
      post(`/api/auth/delete`, { id }).then((res) => {
        updateUsers();
      });
    }

    function updateUsers() {
      get("/api/auth/users").then((res) => {
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
ul{
  padding-left: 0;
}
li {
  display: grid;
  grid-template-columns: 1fr max-content;
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
}
.delete {
  padding: 6px 12px;
  border-radius: 2px;
  background-color: #ff3434;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s;
}
.users-enter,
.users-leave-to {
  opacity: 0;
}
</style>