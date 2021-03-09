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

    <div class="reg_form">
      <form @submit.prevent="reg">
        <div class="form-group">
          <label for="InputUsername1">用户名</label>
          <input
            type="text"
            class="form-control"
            id="InputUsername1"
            placeholder="用户名"
            v-model="form_reg.username"
          />
        </div>
        <div class="form-group">
          <label for="InputPassword1">密码</label>
          <input
            type="password"
            class="form-control"
            id="InputPassword1"
            placeholder="密码"
            v-model="form_reg.passwd1"
          />
        </div>
        <div class="form-group">
          <label for="InputPassword2">重复密码</label>
          <input
            type="password"
            class="form-control"
            id="InputPassword2"
            placeholder="重复密码"
            v-model="form_reg.passwd2"
          />
        </div>
        <button type="submit" class="btn btn-default cen">注册</button>
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
  name: 'register',
  data () {
    return {
      form_reg: { username: '', passwd1: '', passwd2: '', email: '' }
    }
  },
  methods: {
    reg () {
      if (this.form_reg.username === '') return alert('请输入账号！')
      else if (this.form_reg.passwd1 === '') return alert('请输入密码！')
      else if (this.form_reg.passwd1 !== this.form_reg.passwd2) return alert('重复密码不正确')
      axios({
        method: 'post',
        url: 'http://localhost:8088/register',
        data: {
          username: this.form_reg.username,
          password: this.form_reg.passwd1
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            if (response.data.rspCode === '000100') {
              return alert(response.data.rspMsg)
            }
            console.log(response)
            alert(response.data.rspMsg)
            window.location.replace('/')
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

.reg_form {
  position: absolute;
  left: 40%;
  top: 22%;
  border: 1px solid whitesmoke;
  padding: 50px 70px 70px 70px;
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

#controller {
  background-image: url(/static/img/53061497_p0.png);
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 94.5%;
}
</style>
