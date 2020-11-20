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
      <el-menu-item index="/management/page1" @click="$router.push('/management/page1')">
        <span slot="title">完善供水计量设施</span>
      </el-menu-item>
      <el-menu-item index="/management/page2" @click="$router.push('/management/page2')">
        <span slot="title">加强节水计数推广</span>
      </el-menu-item>
      <el-menu-item index="/management/page3" @click="$router.push('/management/page3')">
        <span slot="title">建立农业水权制度</span>
      </el-menu-item>
      <el-menu-item index="/management/page4" @click="$router.push('/management/page4')">
        <span slot="title">提高农业供水效益和效率</span>
      </el-menu-item>
      <el-menu-item index="/management/page5" @click="$router.push('/management/page5')">
        <span slot="title">探索创新终端用水管理方式</span>
      </el-menu-item>
      <el-menu-item index="/management/page6" @click="$router.push('/management/page6')">
        <span slot="title">加强水费征收与使用管理</span>
      </el-menu-item>
      <el-menu-item index="/management/page7" @click="$router.push('/management/page7')">
        <span slot="title">分级制定农业水价</span>
      </el-menu-item>
      <el-menu-item index="/management/page8" @click="$router.push('/management/page8')">
        <span slot="title">探索实行分类水价</span>
      </el-menu-item>
      <el-menu-item index="/management/page9" @click="$router.push('/management/page9')">
        <span slot="title">逐步推行分档水价</span>
      </el-menu-item>
      <el-menu-item index="/management/page10" @click="$router.push('/management/page10')">
        <span slot="title">建立农业用水精准补贴机制</span>
      </el-menu-item>
      <el-menu-item index="/management/page11" @click="$router.push('/management/page11')">
        <span slot="title">建立节水补贴机制</span>
      </el-menu-item>
      <el-menu-item index="/management/page12" @click="$router.push('/management/page12')">
        <span slot="title">落实精准补贴和节水奖励资金</span>
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
