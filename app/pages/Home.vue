<template>
  <div>
    <div>Hello world</div>
    <Button />
  </div>
</template>

<script>
import Button from '@/components/Button';
export default {
  data() {
    return {
      hello: 'world',
    };
  },
  components: {
    Button,
  },
};
</script>
