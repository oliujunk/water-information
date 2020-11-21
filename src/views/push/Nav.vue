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
      <el-menu-item index="/push/page1" @click="$router.push('/push/page1')">
        <span slot="title">定时推送设置</span>
      </el-menu-item>
      <el-menu-item index="/push/page2" @click="$router.push('/push/page2')">
        <span slot="title">预警推送设置</span>
      </el-menu-item>
      <el-menu-item index="/push/page3" @click="$router.push('/push/page3')">
        <span slot="title">人工推送</span>
      </el-menu-item>
      <el-menu-item index="/push/page4" @click="$router.push('/push/page4')">
        <span slot="title">推送信息查询</span>
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
