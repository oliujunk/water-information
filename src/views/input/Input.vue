<template>
  <div class="management">
    <Nav></Nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from './Nav.vue';

export default {
  components: {
    Nav,
  },
};
</script>

<style lang="scss" scoped>
.management {
  display: flex;
  height: 100%;
}
.content {
  width: 100%;
  background-color: rgb(236, 236, 238);
}
</style>
