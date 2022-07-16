<template>
  <div class="login">
    <div class="qrcode">
      <img src="http://59.110.22.67:8081/images/app/qrcode.png" alt="二维码" style="height: 120px; width: 120px;">
    </div>
    <div class="login-window">
      <div class="login-form">
        <div>
          <h2 style="text-align: left; margin-left: 20px;">绥滨熬來灌区</h2>
          <h2 style="text-align: right; margin-right: 20px;">农业水价综合改革管理系统</h2>
        </div>
        <div>
          <el-input
            placeholder="请输入同户名"
            v-model="loginForm.username"
            style="margin: 5% 10% 0 10%; width: 80%;"
          >
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
          <el-input
            show-password
            placeholder="请输入密码"
            v-model="loginForm.password"
            style="margin: 10% 10% 0 10%; width: 80%;"
          >
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input>
          <el-button
            type="primary"
            style="margin: 10% 10% 0 10%; width: 80%;"
            @click="handleLogin"
          >登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      logining: false,
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    handleLogin() {
      this.logining = true;
      this.$http
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((response) => {
          if (response.data.token) {
            sessionStorage.setItem('logined', true);
            sessionStorage.setItem('username', this.loginForm.username);
            sessionStorage.setItem('password', this.loginForm.password);
            sessionStorage.setItem('token', response.data.token);
            this.$router.push('/');
          } else {
            this.$message.error('登录失败');
          }
          this.logining = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background: url('../assets/login_bg.jpg');
  background-size: cover;
  height: 100%;
  text-align: center;
}

.qrcode {
  position: absolute;
  right: 90px;
  top: 20px;
  height: 50px;
  width: 50px;
}

.login-window {
  background: url('../assets/login_form_bg.png');
  background-size: cover;
  position: relative;
  top: 20%;
  left: 25%;
  width: 800px;
  height: 420px;
  border-radius: 5px;
  @media screen and (max-width: 1200px) {
    width: 400px;
  }
}

.login-form {
  position: absolute;
  right: 0;
  width: 400px;
  height: 420px;
  background-color: aliceblue;
  border-radius: 5px;
}
</style>
