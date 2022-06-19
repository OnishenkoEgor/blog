<template>
  <div class="user" v-if="user">
    <div class="user__wrapper">
      <div class="user__image">
        <img
          :src="
            user.photo ??
            'https://www.pcfix.lt/wp-content/uploads/2019/10/default-user-image.png'
          "
          alt=""
          class="cover"
        />
      </div>
      <div class="user__content">
        <div class="user__info">
          <div class="user__name">
            {{ user.name }}
          </div>
          <div class="user_surname">
            {{ user.surname }}
          </div>
        </div>
        <div class="user__actions">
          <router-link
            class="button"
            :to="{ path: `/users/${user._id}`}"
            >Open</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { useUsers } from "@/hooks/useUsers";
export default {
  name: "user-single",
  props: {
    user: {
      type: Object,
      default: {},
      validator(user) {
        return user.hasOwnProperty("name");
      },
    },
  },
  setup(props, { emit }) {
    const { user } = toRefs(props);

    return {
      user
    };
  },
};
</script>

<style lang="scss" scoped>
.user {
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;

  &__wrapper {
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 180px 1fr;
  }

  &__image {
    overflow: hidden;
    img {
      transition: 1.2s 0.3s all;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }

  &__content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__info {
    text-align: left;
    text-transform: capitalize;
    line-height: 150%;
  }

  &__name {
    font-size: 20px;
    font-weight: 600;
  }
  &__surname {
    font-size: 16px;
    font-weight: 500;
  }

  &__actions {
    display: grid;
    grid-template-columns: 1fr ;
    column-gap: 8px;
    padding-top: 12px;
  }
}
</style>
