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
      <el-menu-item index="/statistic/page1" @click="$router.push('/statistic/page1')">
        <span slot="title">平均水位统计</span>
      </el-menu-item>
      <el-menu-item index="/statistic/page2" @click="$router.push('/statistic/page2')">
        <span slot="title">平均流量统计</span>
      </el-menu-item>
      <el-menu-item index="/statistic/page3" @click="$router.push('/statistic/page3')">
        <span slot="title">水量统计</span>
      </el-menu-item>
      <el-menu-item index="/statistic/page4" @click="$router.push('/statistic/page4')">
        <span slot="title">雨情统计</span>
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
