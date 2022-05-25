<template>
  <div class="c-textarea">
    <label v-if="label">{{ label }}</label>
    <textarea
      cols="30"
      rows="10"
      :value="value"
      @input="updateValue"
      :class="{ invalid }"
    ></textarea>
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export default {
  name: "c-textarea",
  props: {
    label: String,
    value: String,
    invalid: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    let { value, invalid } = toRefs(props);

    function updateValue(e) {
      emit("update:value", e.target.value);
    }

    return {
      value,
      invalid: computed(() => invalid.value),
      updateValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-textarea {
  label {
    display: block;
    text-align: left;
    font-weight: 600;
    margin-bottom: 5px;
  }
  textarea {
    width: 100%;
    padding: 12px;
    margin: 0;
    outline: none;
    border: 1px solid #ccc;
    transition: 0.3s all;
    resize: none;

    &.invalid {
      input {
        border-color: red;
      }
    }
  }
}
</style>