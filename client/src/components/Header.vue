<template>
  <nav class="nav">
    <div class="container">
      <div class="nav__wrapper">
        <div class="nav__logo">
          <router-link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                fill="#2c3e50"
                d="M217.6 96.1c-12.95-.625-24.66 9.156-25.52 22.37C191.2 131.7 201.2 143.1 214.4 143.1c79.53 5.188 148.4 74.09 153.6 153.6c.8281 12.69 11.39 22.43 23.94 22.43c.5156 0 1.047-.0313 1.578-.0625c13.22-.8438 23.25-12.28 22.39-25.5C409.3 191.8 320.3 102.8 217.6 96.1zM224 0C206.3 0 192 14.31 192 32s14.33 32 32 32c123.5 0 224 100.5 224 224c0 17.69 14.33 32 32 32s32-14.31 32-32C512 129.2 382.8 0 224 0zM172.3 226.8C157.7 223.9 144 235.8 144 250.6v50.37c0 10.25 7.127 18.37 16.75 21.1c18.13 6.75 31.26 24.38 31.26 44.1c0 26.5-21.5 47.1-48.01 47.1c-26.5 0-48.01-21.5-48.01-47.1V120c0-13.25-10.75-23.1-24.01-23.1l-48.01 .0076C10.75 96.02 0 106.8 0 120v247.1c0 89.5 82.14 160.2 175 140.7c54.38-11.5 98.27-55.5 109.8-109.7C302.2 316.1 247.8 241.8 172.3 226.8z"
              />
            </svg>
          </router-link>
        </div>
        <div class="nav__content">
          <div class="nav__menu">
            <router-link
              class="nav__link"
              v-for="item in items"
              :to="item.path"
              >{{ item?.name }}</router-link
            >
          </div>
          <div class="nav__icon" v-if="logged">
            <img
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, onBeforeMount, computed } from "vue";

export default {
  name: "Header",
  setup(props, context) {
    const items = ref([]);
    const router = useRouter();
    const store = useStore();

    items.value = router.getRoutes();

    return {
      items,
      logged: computed(() => store.getters.logged),
    };
  },
};
</script>

<style lang="scss">
.nav {
  padding: 15px 0;
  background-color: #4db6ac;

  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    align-items: center;
    column-gap: 30px;
  }

  &__logo {
    cursor: pointer;
    width: 45px;
  }

  &__menu {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    column-gap: 30px;
  }

  &__link {
    text-transform: capitalize;
    font-weight: 600;
    cursor: pointer;
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30px;
    cursor: pointer;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>