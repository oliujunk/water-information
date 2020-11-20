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
      <el-menu-item index="/report/page1" @click="$router.push('/report/page1')">
        <span slot="title">改革通知</span>
      </el-menu-item>
      <el-menu-item index="/report/page2" @click="$router.push('/report/page2')">
        <span slot="title">规章制度</span>
      </el-menu-item>
      <el-menu-item index="/report/page3" @click="$router.push('/report/page3')">
        <span slot="title">政策法规</span>
      </el-menu-item>
      <el-menu-item index="/report/page4" @click="$router.push('/report/page4')">
        <span slot="title">总结报告</span>
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
