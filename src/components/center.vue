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
              <li><a href="/center" class="biger"><span class="glyphicon glyphicon-cog biger"></span> 审核中心</a></li>
              <li><a href="/about" class="biger"><span class="glyphicon glyphicon-info-sign biger"></span> 关于</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle biger" data-toggle="dropdown">
                  <span class="glyphicon glyphicon-user biger"></span> {{ currentUserName }} <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                  <li><a>用户id {{currentUserId}}</a></li>
                  <li><a href="/about">关于</a></li>
                  <li><a href="javascript:void(0);" @click="logout">退出</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header><!-- 头部导航栏 -->
    <div class="mainbody3">
      <ol class="breadcrumb dirbar">
        <li class="active">审核中心</li>
      </ol>
      <div v-if="!isViewing" class="mainbody4">
        <table class="table table-hover mainfile">
          <thead>
            <tr>
              <th><input type="checkbox" v-model="selAll" /></th>
              <th class="table-filename">名称</th>
              <th>上传者</th>
              <th>大小</th>
              <th>上传日期</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in fileList"
              :key="item.id"
            >
              <th><input type="checkbox" v-model="item.isSel" /></th>
              <td>
                <span
                  class="glyphicon glyphicon-file"
                ></span
                ><a href="javascript:void(0);" @click="visitSau(item)">
                  {{ item.name }}</a
                >
              </td>
              <td>{{ item.userId }}</td>
              <td>{{getFileSize(item.size)}}</td>
              <td>{{getDpD(item.uploadTime)}}&nbsp;&nbsp;&nbsp;{{getDpT(item.uploadTime)}}</td>
            </tr>
          </tbody>
        </table>
        <div class="pagebar">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li>
                <a href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li v-for="index in (1, pageMax)" :key="index">
                <a href="javascript:void(0);" @click="turnTo(index)">{{
                  index
                }}</a>
              </li>
              <li>
                <a href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <nav class="navbar navbar-default toolbar2" role="navigation">
          <div class="container-fluid">
            <div>
              <ul class="nav navbar-nav navbar-left ">
                <li v-if="selOne">
                  <button
                    type="button"
                    class="btn btn-danger navbar-btn toolbar2-btn"
                    @click="refuseChk"
                  >
                    <span class="glyphicon glyphicon-remove"></span> 删除
                  </button>
                  <button
                    type="button"
                    class="btn btn-success navbar-btn toolbar2-btn"
                    @click="passChk"
                  >
                    <span class="glyphicon glyphicon-ok"></span> 通过
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div v-if="isViewing" class="mainbody4 pic">
        <img v-bind:src="urlViewing" class="pic">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'center',
  data () {
    return {
      fileList: [],
      selList: [],
      // listOri: [{id: 1, name: '实例1', isFolder: true, size: 2, time: 'YYYY:MM:DD', isSel: false}],
      currentUserId: 1,
      currentUserName: 'user',
      isViewing: false,
      selAll: false,
      pageMax: 1,
      urlViewing: '',
      currentPage: 1
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    selOne () {
      // var i
      // for (i = 0; i < this.fileList.length; i++) {
      //   if (this.fileList[i].isSel === true) {
      //     return true
      //   }
      // }
      // return false
      if (this.selList.length >= 1) {
        return true
      } else {
        return false
      }
    },
    selOnlyOne () {
      // var i
      // var cnt = 0
      // for (i = 0; i < this.fileList.length; i++) {
      //   if (this.fileList[i].isSel === true) {
      //     cnt = cnt + 1
      //   }
      // }
      // if (cnt === 1) {
      //   return true
      // } else {
      //   return false
      // }
      if (this.selList.length === 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 初始化
    initPage () {
      if (sessionStorage) {
        this.currentUserId = sessionStorage.getItem('userid')
        this.currentUserName = sessionStorage.getItem('username')
      }
      this.getFileList(this.currentPage)
      this.clearSelList()
    },
    // 访问类
    visitSau (item) {
      this.urlViewing = 'http://47.115.200.30:8088/view/' + item.id
      this.isViewing = true
    },
    // 加载视图类
    getFileList (page) {
      var _this = this
      axios({
        method: 'get',
        url: 'http://47.115.200.30:8088/admin/unreviewed',
        params: {
          pageNumber: page
        },
        headers: {
          Authorization: sessionStorage.token
        }
      }).then(function (response) {
        if (response.status === 200) {
          _this.fileList = response.data.data.content
          _this.pageMax = response.data.data.totalPages
        } else {
          console.log('INIT ERROR')
        }
      })
    },
    // 用户功能类
    // delFile () {
    //   var _this = this
    //   if (confirm('确定删除选定项？')) {
    //     axios({
    //       method: 'delete',
    //       url: 'http://47.115.200.30:8088/delete',
    //       headers: {
    //         Authorization: sessionStorage.token
    //       },
    //       data: this.selList
    //     }
    //     ).then(function (response) {
    //       if (response.status === 200) {
    //         _this.getFileList(this.currentPage)
    //       } else {
    //         console.log('delFile ERROR')
    //       }
    //     })
    //   }
    // },
    refuseChk () {
      var _this = this
      if (confirm('确定否决选定项？')) {
        axios({
          method: 'post',
          url: 'http://47.115.200.30:8088/admin/review',
          headers: {
            Authorization: sessionStorage.token
          },
          params: {
            isPass: false
          },
          data: this.selList
        }).then(function (response) {
          if (response.status === 200) {
            _this.getFileList(_this.currentPage)
          } else {
            console.log('INIT ERROR')
          }
        })
      }
    },
    passChk () {
      var _this = this
      if (confirm('确定通过选定项？')) {
        axios({
          method: 'post',
          url: 'http://47.115.200.30:8088/admin/review',
          headers: {
            Authorization: sessionStorage.token
          },
          params: {
            isPass: true
          },
          data: this.selList
        }).then(function (response) {
          if (response.status === 200) {
            _this.getFileList(_this.currentPage)
          } else {
            console.log('INIT ERROR')
          }
        })
      }
    },
    // 辅助类
    turnTo (page) {
      this.currentPage = page
      this.getFileList(this.currentPage)
    },
    clearSelList () {
      var i
      for (i = 0; i < this.fileList.length; i++) {
        this.fileList[i].isSel = false
      }
    },
    logout () {
      sessionStorage.clear()
      window.location.reload()
    },
    getFileSize (fileByte) {
      var fileSizeByte = fileByte
      var fileSizeMsg = ''
      if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB'
      else if (fileSizeByte === 1048576) fileSizeMsg = '1MB'
      else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB'
      else if (fileSizeByte > 1048576 && fileSizeByte === 1073741824) fileSizeMsg = '1GB'
      else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
      else fileSizeMsg = '文件超过1TB'
      return fileSizeMsg
    },
    getDpD (oriTime) {
      var transed = oriTime.split('.')
      var final = transed[0].split('T')
      return final[0]
    },
    getDpT (oriTime) {
      var transed = oriTime.split('.')
      var final = transed[0].split('T')
      return final[1]
    }
  },
  watch: {
    selAll: function () {
      var i
      if (this.selAll === true) {
        for (i = 0; i < this.fileList.length; i++) {
          this.fileList[i].isSel = true
        }
      } else {
        for (i = 0; i < this.fileList.length; i++) {
          this.fileList[i].isSel = false
        }
      }
    },
    fileList: {
      immediate: true,
      handler: function () {
        var i
        this.selList = []
        for (i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].isSel === true) {
            this.selList.push(this.fileList[i].id)
          }
        }
      },
      deep: true
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
    .sidebar {
      position: fixed;
      padding-top: 10px;
      width: 220px;
      background-color: whitesmoke;
      height: 100%;
    }
    .dirbar {
      position: fixed;
      width: 100%;
      margin-top: 12px;
    }
    .mainbody3 {
      padding-left: 10px;
      height: 100%;
    }
    .mainbody4 {
      padding-top: 50px;
      height: 100%;
    }
    .table-filename {
      width: 60%;
    }
    .pagebar {
      bottom: 80px;
      position: absolute;
      left: 47%;
    }
    .toolbar2 {
      bottom: 0px;
      position: absolute;
      width: 100%;
      padding-left: 40px;
    }
    .toolbar2-btn {
      margin-right: 15px;
    }
    .biger {
      font-size: large;
    }
    .conditionbar {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 200px;
      text-align: center;
      padding-top: 20px;
      padding-left: 20px;
      padding-right: 20px;
    }
    .take-border {
      border: 2px solid gray;
    }
    .word {
      padding-left: 10px;
    }
    .pic {
      width: 100%;
    }
    #revFile {
      display: none;
    }
</style>
