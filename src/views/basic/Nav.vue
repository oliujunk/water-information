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
      <el-menu-item index="/basic/page1" @click="$router.push('/basic/page1')">
        <span slot="title">水价改革单位名录</span>
      </el-menu-item>
      <el-menu-item index="/basic/page2" @click="$router.push('/basic/page2')">
        <span slot="title">水价改革概况</span>
      </el-menu-item>
      <el-menu-item index="/basic/page3" @click="$router.push('/basic/page3')">
        <span slot="title">基本情况</span>
      </el-menu-item>
      <el-menu-item index="/basic/page4" @click="$router.push('/basic/page4')">
        <span slot="title">灌溉面积</span>
      </el-menu-item>
      <el-menu-item index="/basic/page5" @click="$router.push('/basic/page5')">
        <span slot="title">水价改革面积</span>
      </el-menu-item>
      <el-menu-item index="/basic/page6" @click="$router.push('/basic/page6')">
        <span slot="title">用水合作组织</span>
      </el-menu-item>
      <el-menu-item index="/basic/page7" @click="$router.push('/basic/page7')">
        <span slot="title">用水单位参数设置</span>
      </el-menu-item>
      <el-menu-item index="/basic/page8" @click="$router.push('/basic/page8')">
        <span slot="title">用水情况</span>
      </el-menu-item>
      <el-menu-item index="/basic/page9" @click="$router.push('/basic/page9')">
        <span slot="title">水价管理</span>
      </el-menu-item>
      <el-menu-item index="/basic/page10" @click="$router.push('/basic/page10')">
        <span slot="title">改革进展</span>
      </el-menu-item>
      <el-menu-item index="/basic/page11" @click="$router.push('/basic/page11')">
        <span slot="title">计量点设施</span>
      </el-menu-item>
      <el-menu-item index="/basic/page12" @click="$router.push('/basic/page12')">
        <span slot="title">人员管理</span>
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
