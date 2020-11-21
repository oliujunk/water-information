<template>
  <div class="nav-menu">
    <div class="title">桦南灌区综合管理系统</div>
    <div class="menu">
      <div class="menu-item" :class="{'current-menu-item':path === '/station'}" @click="handleSelect('/station')">监测站点管理</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/data'}" @click="handleSelect('/data')">实时数据监测</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/map'}" @click="handleSelect('/map')">GIS实时监测</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/video'}" @click="handleSelect('/video')">实时视频监控</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/input'}" @click="handleSelect('/input')">人工置数</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/search'}" @click="handleSelect('/search')">数据查询</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/statistic'}" @click="handleSelect('/statistic')">数据统计</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/push'}" @click="handleSelect('/push')">定时预警推送</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/warning'}" @click="handleSelect('/warning')">预警管理</div>
    </div>
    <div class="user-dropdown">
      <i class="el-icon-user-solid"></i>
      <el-dropdown
        trigger="click"
        placement="bottom"
        :hide-on-click="false"
        style="margin-left: 10px; user-select: none;"
      >
        <span class="el-dropdown-link" style="font-size: 20px; color: white;">
          {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button
              type="text"
              @click="logout"
              size="mini"
              style="width: 100%;"
            >退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',

  data() {
    return {
      path: this.$router.currentRoute.matched[1].path,
      username: sessionStorage.getItem('username'),
    };
  },

  methods: {
    handleSelect(path) {
      this.$router.push(path);
    },

    logout() {
      sessionStorage.clear();
      this.$router.push('/login');
    },
  },

  watch: {
    $route(to) {
      this.path = to.matched[1].path;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-menu {
  background: url('../assets/nav_bg.png');
  height: 110px;
  background-size: cover;
  display: flex;
  justify-content: space-between;
}

.title {
  line-height: 110px;
  color: aliceblue;
  font-size: 30px;
  margin: 0 50px 0 50px;
  font-weight: 700;
}

.menu {
  display: flex;
}

.menu-item {
  color: aliceblue;
  line-height: 110px;
  padding: 0 20px 0 20px;
  font-size: 18px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(64, 158, 239, 0.4);
}

.current-menu-item {
  background-color: rgba(64, 158, 239, 0.5);
  color: #ffd04b;
}

.user-dropdown {
  color: aliceblue;
  font-size: 20px;
  margin-right: 50px;
  cursor: pointer;
  margin-top: 40px;
}
</style>
