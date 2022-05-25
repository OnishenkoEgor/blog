<template>
  <transition-group name="fade">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: "fade-transition",
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, visibility 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>