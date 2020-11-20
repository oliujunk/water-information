<template>
  <div class="nav-menu">
    <div class="title">绥滨农业水价综合改革管理系统</div>
    <div class="menu">
      <div class="menu-item" :class="{'current-menu-item':path === '/map'}" @click="handleSelect('/map')">一张图</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/basic'}" @click="handleSelect('/basic')">基本信息</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/management'}" @click="handleSelect('/management')">管理指标</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/effect'}" @click="handleSelect('/effect')">运行效果</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/water'}" @click="handleSelect('/water')">用水管理</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/performance'}" @click="handleSelect('/performance')">绩效考核</div>
      <div class="menu-item" :class="{'current-menu-item':path === '/report'}" @click="handleSelect('/report')">年度报告</div>
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
