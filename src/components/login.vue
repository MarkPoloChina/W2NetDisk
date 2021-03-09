// CopyRight Mark Polo 202102 - 202103 W2OL
<template>
  <div id="controller">
    <header>
      <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header logo">
          </div>
          <div>
            <ul class="nav navbar-nav navbar-left ">
              <li><a href="/" class="biger"><span class="glyphicon glyphicon-cloud biger"></span> 首页</a></li>
              <li><a href="/about" class="biger"><span class="glyphicon glyphicon-info-sign biger"></span> 关于</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header><!-- 头部导航栏 -->

    <div class="login_form">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="InputUsername1">用户名</label>
          <input
            type="text"
            class="form-control"
            id="InputUsername1"
            v-model="form_login.username"
            placeholder="用户名"
          />
        </div>
        <div class="form-group">
          <label for="InputPassword1">密码</label>
          <input
            type="password"
            class="form-control"
            id="InputPassword1"
            v-model="form_login.passwd"
            placeholder="密码"
          />
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="form_login.rem" /> 记住我
          </label>
          <a href="/register" class="reg">注册新用户</a>
        </div>
        <button type="submit" class="btn btn-default">登录</button>
      </form>
    </div>

    <div class="info">
      <p>前端基于Bootstrap & Vue2</p>
      <p>后端基于SpringBoot</p>
      <p>© Mark Polo & Planeter 2021.2</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      form_login: { username: '', passwd: '', rem: true }
    }
  },
  methods: {
    login () {
      if (this.form_login.username === '') return alert('请输入账号！')
      else if (this.form_login.passwd === '') return alert('请输入密码！')
      var loginForm = new FormData()
      loginForm.append('username', this.form_login.username)
      loginForm.append('password', this.form_login.passwd)
      axios({
        method: 'post',
        url: 'http://localhost:8088/login',
        data: loginForm,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            if (response.data.status === 'error') {
              return alert(response.data.message)
            }
            sessionStorage.clear()
            sessionStorage.setItem('userid', response.data.id)
            sessionStorage.setItem('username', response.data.username)
            sessionStorage.setItem('role', response.data.role)
            sessionStorage.setItem('rootId', response.data.rootId)
            sessionStorage['token'] = response.headers.token
            alert('OK')
            if (response.data.role === 'ROLE_ADMIN') {
              window.location.replace('/center')
            } else {
              window.location.replace('/')
            }
          } else {
            alert('CON ERR')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.logo {
  background-image: url(/static/img/logo.png);
  background-size: cover;
  width: 200px;
  height: 50px;
}

body {
  padding-top: 50px;
  height: 100%;
}

html {
  height: 100%;
}

.login_form {
  position: absolute;
  left: 40%;
  top: 28%;
  border: 1px solid whitesmoke;
  padding: 50px 70px 50px 70px;
  border-radius: 7px;
  background-color: rgba(255, 255, 255, 0.384);
}

.info {
  position: absolute;
  bottom: 0px;
  text-align: center;
  left: 45%;
  color: whitesmoke;
}

.reg {
  right: 0px;
  position: absolute;
  color: white;
  font-weight: bold;
}

#controller {
  background-image: url(/static/img/53061497_p0.png);
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 94.5%;
}
</style>
