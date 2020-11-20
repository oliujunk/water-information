<template>
  <div class="container">
    <NavMenu></NavMenu>
    <div style="height: 100%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue';

export default {
  name: 'Container',

  components: {
    NavMenu,
  },
};
</script>

<style lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
