// CopyRight Mark Polo 202102 - 202103 W2OL
<template>
  <div>
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

    <div class="about">
      <h2>西二寒假合作轮 前端 X JAVA</h2>
      <h1>小小网盘</h1>
      <h3>Based on Vue / Bootstrap / SpringBoot</h3>
      <h3>© Mark Polo & Planeter 2021 All Rights Reserved.</h3>
    </div>
</div>
</template>

<script>
export default {
  name: 'about'
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
    .biger {
      font-size: large;
    }
    .about {
      position: absolute;
      left: 32%;
      top: 28%;
      text-align: center;
      border: 1px solid gray;
      padding: 50px 70px 50px 70px;
      border-radius: 7px;
      background-color: rgba(112, 107, 107, 0.384);
    }
</style>
