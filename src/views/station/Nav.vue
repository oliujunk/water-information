<template>
  <div class="nav">
    <el-menu
      :default-active="$route.path"
      background-color="#208EF0"
      text-color="#fff"
      active-text-color="#ffd04b"
      :class="$store.state.collapse?'menu-bar-collapse-width':'menu-bar-width'"
      :collapse="$store.state.collapse"
      :collapse-transition="false"
      style="height: 100%; border: 0;"
    >
      <el-menu-item index="/station/page1" @click="$router.push('/station/page1')">
        <span slot="title">地表水测点</span>
      </el-menu-item>
      <el-menu-item index="/station/page2" @click="$router.push('/station/page2')">
        <span slot="title">雨情测点</span>
      </el-menu-item>
      <el-menu-item index="/station/page3" @click="$router.push('/station/page3')">
        <span slot="title">墒情测点</span>
      </el-menu-item>
      <el-menu-item index="/station/page4" @click="$router.push('/station/page4')">
        <span slot="title">气象测点</span>
      </el-menu-item>
      <el-menu-item index="/station/page5" @click="$router.push('/station/page5')">
        <span slot="title">水质测点</span>
      </el-menu-item>
      <el-menu-item index="/station/page6" @click="$router.push('/station/page6')">
        <span slot="title">管道测点</span>
      </el-menu-item>
      <el-menu-item index="/station/page7" @click="$router.push('/station/page7')">
        <span slot="title">视频测点</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.nav {
  text-align: left;
  height: 100%;
  width: 220px;
  min-width: 220px;
}
</style>
