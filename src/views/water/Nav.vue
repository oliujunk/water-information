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
      <el-menu-item index="/water/page1" @click="$router.push('/water/page1')">
        <span slot="title">流速仪实测</span>
      </el-menu-item>
      <el-menu-item index="/water/page2" @click="$router.push('/water/page2')">
        <span slot="title">水位流量关系</span>
      </el-menu-item>
      <el-menu-item index="/water/page3" @click="$router.push('/water/page3')">
        <span slot="title">闸门量水</span>
      </el-menu-item>
      <el-menu-item index="/water/page4" @click="$router.push('/water/page4')">
        <span slot="title">供水关系管理</span>
      </el-menu-item>
      <el-menu-item index="/water/page5" @click="$router.push('/water/page5')">
        <span slot="title">渠道水量结算</span>
      </el-menu-item>
      <el-menu-item index="/water/page6" @click="$router.push('/water/page6')">
        <span slot="title">水费结算</span>
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
