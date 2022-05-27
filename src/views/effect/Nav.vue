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
      <el-menu-item index="/effect/data" @click="$router.push('/effect/data')">
        <span slot="title">实时监测</span>
      </el-menu-item>
      <el-menu-item index="/effect/video" @click="$router.push('/effect/video')">
        <span slot="title">视频监控</span>
      </el-menu-item>
      <el-menu-item index="/effect/GIS" @click="$router.push('/effect/GIS')">
        <span slot="title">G I S</span>
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
