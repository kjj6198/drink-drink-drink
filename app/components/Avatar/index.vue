<template>
  <img
    class="avatar"
    :src="src"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :alt="alt"
    v-bind="$props"
  />
</template>

<script>
export default {
  props: ['src', 'size', 'alt'],
};
</script>


<style scoped>
.avatar {
  border-radius: 50%;
  max-width: 100%;
  vertical-align: middle;
}

.avatar:hover {
  opacity: 0.7;
}
</style>
