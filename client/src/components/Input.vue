<template>
  <div class="c-input" :class="{ invalid }">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
    />
  </div>
</template>

<script>
import { computed, ref, toRefs } from "vue";
export default {
  name: "c-input",
  props: {
    label: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    invalid: {
      type: Boolean,
      default: false,
    },
    value: String,
  },
  setup(props, { emit }) {
    const { label, type, placeholder, invalid, value } = toRefs(props);

    function updateValue(e) {
      emit("update:value", e.target.value);
    }

    return {
      label,
      type,
      placeholder,
      invalid: computed(() => invalid.value),
      value,
      updateValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-input {
  label {
    display: block;
    text-align: left;
    font-weight: 600;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 12px;
    margin: 0;
    outline: none;
    border: 1px solid #ccc;
    transition: 0.3s all;
  }
  &.invalid {
    input {
      border-color: red;
    }
  }
}
</style>