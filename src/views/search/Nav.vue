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
      <el-menu-item index="/search/page1" @click="$router.push('/search/page1')">
        <span slot="title">地表水查询</span>
      </el-menu-item>
      <el-menu-item index="/search/page2" @click="$router.push('/search/page2')">
        <span slot="title">雨情查询</span>
      </el-menu-item>
      <el-menu-item index="/search/page3" @click="$router.push('/search/page3')">
        <span slot="title">墒情查询</span>
      </el-menu-item>
      <el-menu-item index="/search/page4" @click="$router.push('/search/page4')">
        <span slot="title">气象查询</span>
      </el-menu-item>
      <el-menu-item index="/search/page5" @click="$router.push('/search/page5')">
        <span slot="title">水质查询</span>
      </el-menu-item>
      <el-menu-item index="/search/page6" @click="$router.push('/search/page6')">
        <span slot="title">管道查询</span>
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
