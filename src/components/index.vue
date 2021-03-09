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
              <li v-if="isAdmin"><a href="/center" class="biger"><span class="glyphicon glyphicon-cog biger"></span> 管理员中心</a></li>
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
    <div class="sidebar">
    <ul class="nav nav-pills nav-stacked">
      <li role="presentation" class="active text-center"><a href="#">
          <span class="glyphicon glyphicon-folder-open"></span> 当前目录 {{ currentDir.name }}
        </a></li>
      <li role="presentation" class="text-center">子目录表</li>
      <li role="presentation" class="text-center" v-for="(item,index) in dirList" :key="index"><a href="javascript:void(0);" @click="visitDir(item)">
          <span class="glyphicon glyphicon-folder-close"></span> {{item.name}}
        </a></li>
      <li></li>
      <!-- <li role="presentation" class="text-center"><a href="#">
          <span class="glyphicon glyphicon-star"></span> 收藏夹
        </a></li>
      <li role="presentation" class="text-center"><a href="#"><span class="glyphicon glyphicon-trash"></span> 回收站</a>
      </li> -->
    </ul>
    <div class="conditionbar">
      <div class="progress take-border">
        <div class="progress-bar progress-bar-striped active" role="progressbar" :aria-valuenow="getpret(usedSize)" aria-valuemin="0"
          aria-valuemax="100" v-bind:style="styleObj">
          <span class="sr-only">{{getpret(usedSize)}}%</span>
        </div>
      </div>
      <div class="word">
        <p class="text-left"><strong>当前已用：</strong><span>{{ getFileSize(usedSize) }}</span></p>
        <p class="text-left"><strong>总容量：</strong><span>{{ limitSize }}GB</span></p>
      </div>
    </div>
  </div><!-- 侧边导航栏 -->
  <div class="mainbody">
    <ol class="breadcrumb dirbar">
      <li v-for="item in brcrList" :key="item.id"><a href="javascript:void(0);" @click="visitBrCrDir(item)">{{item.name}}</a></li>
    </ol>
    <div v-if="!isViewing" class="mainbody2">
      <table class="table table-hover mainfile">
        <thead>
          <tr>
            <th><input type="checkbox" v-model="selAll"></th>
            <th>过审</th>
            <th class="table-filename">名称</th>
            <th>大小</th>
            <th>上传日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in fileList" :key='item.id'>
            <th v-if="item.isAvailable"><input type="checkbox" v-model="item.isSel"></th>
            <th v-if="!item.isAvailable"><span class="glyphicon glyphicon-ban-circle"></span></th>
            <th><span class="glyphicon glyphicon-ok-circle" v-if="item.isAvailable"></span>
            <span class="glyphicon glyphicon-time" v-if="!item.isAvailable"></span></th>
            <td><span
                class="glyphicon glyphicon-file"></span><a href="javascript:void(0);" @click="visitSau(item)"> {{item.name}}</a></td>
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
            <li v-for="index in (1,pageMax)" :key='index'><a href="javascript:void(0);" @click="turnTo(index)">{{index}}</a></li>
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <nav class="navbar navbar-default toolbar" role="navigation">
        <div class="container-fluid">
          <div>
            <ul class="nav navbar-nav navbar-left ">
              <li><button type="button" class="btn btn-primary navbar-btn toolbar-btn" @click="upload"><span
                    class="glyphicon glyphicon-upload"></span> 上传</button></li>
              <input type="file" id="revFile" multiple="multiple" accept="image/*" @change="uploadCommit">
              <li v-if="selOne"><button type="button" class="btn btn-success navbar-btn toolbar-btn" @click="download"><span
                    class="glyphicon glyphicon-download"></span> 下载</button></li>
              <li v-if="selOnlyOne"><button type="button" class="btn btn-info navbar-btn toolbar-btn" @click="resetFileName"><span
                    class="glyphicon glyphicon-record"></span> 重命名</button></li>
              <li v-if="selOne"><button type="button" class="btn btn-danger navbar-btn toolbar-btn" @click="delFile"><span
                    class="glyphicon glyphicon-remove"></span> 删除</button></li>
            </ul>
            <ul class="nav navbar-nav navbar-right ">
              <li v-if="notRoot"><button type="button" class="btn btn-info navbar-btn toolbar-btn" @click="resetDirName"><span
                    class="glyphicon glyphicon-download"></span> 重命名当前文件夹</button></li>
              <li v-if="notRoot"><button type="button" class="btn btn-danger navbar-btn toolbar-btn" @click="delDir"><span
                    class="glyphicon glyphicon-remove"></span> 删除当前文件夹</button></li>
              <li><button type="button" class="btn btn btn-warning navbar-btn toolbar-btn" @click="newFolder"><span
                    class="glyphicon glyphicon-folder-open"></span> 新建文件夹</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div v-if="isViewing" class="mainbody2 pic">
      <img v-bind:src="urlViewing" class="pic">
    </div>
  </div>
</div>

</template>
<script>
import axios from 'axios'
export default {
  name: 'index',
  data () {
    return {
      fileList: [],
      dirList: [],
      brcrList: [],
      selList: [],
      // listOri: [{id: 1, name: '实例1', isFolder: true, size: 2, time: 'YYYY:MM:DD', isSel: false}],
      currentUserId: 1,
      currentUserName: 'user',
      currentDirId: 0,
      currentDir: {},
      rootId: 0,
      isViewing: false,
      selAll: false,
      pageMax: 1,
      isAdmin: false,
      urlViewing: '',
      currentPage: 1,
      usedSize: 0,
      limitSize: 20
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    selOne () {
      if (this.selList.length >= 1) {
        return true
      } else {
        return false
      }
    },
    selOnlyOne () {
      if (this.selList.length === 1) {
        return true
      } else {
        return false
      }
    },
    notRoot () {
      if (this.currentDirId === this.rootId) return false
      else return true
    },
    styleObj () {
      var numTar
      var pret = this.usedSize / (1073741824 * this.limitSize)
      if (pret < 0.03) numTar = 3
      else numTar = pret * 100
      return {
        width: numTar + '%'
      }
    }
  },
  methods: {
    // 初始化
    initPage () {
      if (sessionStorage) {
        this.currentUserId = sessionStorage.getItem('userid')
        this.currentUserName = sessionStorage.getItem('username')
        this.rootId = sessionStorage.getItem('rootId')
        if (sessionStorage.getItem('role') === 'ROLE_ADMIN') {
          this.isAdmin = true
        }
      }
      this.currentDir = []
      this.currentDirId = this.rootId
      this.getFileList(this.currentPage)
      this.clearSelList()
      this.getDirList()
      var item = {name: 'ROOT', id: this.rootId}
      this.currentDir = item
      this.brcrList = []
      this.getbrcrList(item)
      this.getSize()
    },
    // 访问类
    visitSau (item) {
      this.urlViewing = 'http://47.115.200.30:8088/view/' + item.id
      this.isViewing = true
      this.getbrcrList(item)
    },
    visitDir (item) {
      if (this.isViewing === true) {
        this.urlViewing = ''
        this.isViewing = false
      }
      this.currentDirId = item.id
      this.currentDir = item
      this.currentPage = 1
      this.getFileList(this.currentPage)
      this.getDirList()
      this.getbrcrList(item)
    },
    visitBrCrDir (item) {
      if (this.isViewing === true) {
        this.urlViewing = ''
        this.isViewing = false
      }
      this.currentDirId = item.id
      this.currentDir = item
      this.currentPage = 1
      this.getFileList(this.currentPage)
      this.getDirList()
      while (this.brcrList.slice(-1)[0].id !== item.id) {
        this.brcrList.pop()
      }
    },
    // 加载视图类
    getSize () {
      var _this = this
      axios({
        method: 'get',
        url: 'http://47.115.200.30:8088/used',
        headers: {
          Authorization: sessionStorage.token
        },
        params: {
          userId: this.currentUserId
        }
      }).then(function (response) {
        if (response.status === 200) {
          _this.usedSize = response.data.data
        } else {
          console.log('INIT ERROR')
        }
      })
    },
    getFileList (page) {
      var _this = this
      axios.request({
        method: 'get',
        url: 'http://47.115.200.30:8088/page',
        headers: {
          Authorization: sessionStorage.token
        },
        // withCredentials: true,
        params: {
          userId: this.currentUserId,
          dirId: this.currentDirId,
          pageNumber: page
        }
      }).then(function (response) {
        if (response.status === 200) {
          _this.fileList = response.data.data.content // IF
          _this.pageMax = response.data.data.totalPages // IF
        } else {
          console.log('INIT ERROR')
        }
      })
    },
    getbrcrList (item) {
      this.brcrList.push(item)
    },
    getDirList () {
      var _this = this
      axios({
        method: 'get',
        headers: {
          Authorization: sessionStorage.token
        },
        params: {
          dirId: this.currentDirId
        },
        url: 'http://47.115.200.30:8088/dir/tree'
      }).then(function (response) {
        if (response.status === 200) {
          _this.dirList = response.data.data // IF
        } else {
          console.log('INIT ERROR')
        }
      })
    },
    // 用户功能类
    newFolder () {
      var newName = prompt('新文件夹名')
      var _this = this
      axios({
        method: 'post',
        url: 'http://47.115.200.30:8088/dir/create',
        headers: {
          Authorization: sessionStorage.token
        },
        data: {
          parentId: this.currentDirId,
          name: newName,
          userId: this.currentUserId
        }
      }).then(function (response) {
        if (response.status === 200) {
          _this.getDirList()
        } else {
          console.log('newFolder ERROR')
        }
      })
    },
    upload () {
      document.getElementById('revFile').click()
    },
    uploadCommit () {
      var i
      var _this = this
      var filedata = document.getElementById('revFile').files
      if (filedata === 0) return
      var formdata = new FormData()
      for (i = 0; i < filedata.length; i++) {
        formdata.append('files', filedata[i])
      }
      axios({
        method: 'post',
        url: 'http://47.115.200.30:8088/upload',
        params: {
          dirId: this.currentDirId,
          userId: this.currentUserId
        },
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: sessionStorage.token
        }
      }).then(function (response) {
        if (response.status === 200) {
          _this.getFileList(_this.currentPage)
          _this.getSize()
        } else {
          console.log('upload ERROR')
        }
      })
    },
    downloadsig (tarId) {
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none' // 防止影响页面
      iframe.style.height = 0 // 防止影响页面
      iframe.src = 'http://47.115.200.30:8088/download/' + tarId
      document.body.appendChild(iframe)
    },
    download () {
      var i, tarId
      for (i = 0; i < this.selList.length; i++) {
        tarId = this.selList[i]
        this.downloadsig(tarId)
      }
      this.clearSelList()
      this.getFileList(this.currentPage)
    },
    resetDirName () {
      var _this = this
      var text = prompt('新目录名：')
      axios({
        method: 'put',
        url: 'http://47.115.200.30:8088/dir/rename',
        headers: {
          Authorization: sessionStorage.token
        },
        params: {
          newName: text,
          dirId: this.currentDirId
        }
      }).then(function (response) {
        if (response.status === 200) {
          _this.brcrList.slice(-1).name = text
          _this.initPage()
        } else {
          console.log('resetDirName ERROR')
        }
      })
    },
    resetFileName () {
      var _this = this
      var text = prompt('新文件名：')
      var tarId
      tarId = this.selList[0]
      axios({
        method: 'put',
        url: 'http://47.115.200.30:8088/rename',
        headers: {
          Authorization: sessionStorage.token
        },
        data: {
          newName: text,
          fileId: tarId
        }
      }).then(function (response) {
        if (response.status === 200) {
          _this.getFileList(_this.currentPage)
        } else {
          console.log('resetFileName ERROR')
        }
      })
    },
    delFile () {
      var _this = this
      if (confirm('确定删除选定项？')) {
        axios({
          method: 'post',
          url: 'http://47.115.200.30:8088/delete',
          headers: {
            Authorization: sessionStorage.token
          },
          data: this.selList
        }
        ).then(function (response) {
          if (response.status === 200) {
            _this.getFileList(_this.currentPage)
            _this.getSize()
          } else {
            console.log('delFile ERROR')
          }
        })
      }
    },
    delDir () {
      var _this = this
      if (confirm('确定删除本文件夹及上述所有项？')) {
        axios({
          method: 'delete',
          url: 'http://47.115.200.30:8088/dir/delete',
          headers: {
            Authorization: sessionStorage.token
          },
          params: {
            dirId: this.currentDirId
          }
        }
        ).then(function (response) {
          if (response.status === 200) {
            _this.initPage()
          } else {
            console.log('delDir ERROR')
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
    },
    getpret (fileByte) {
      var pret = fileByte / (1073741824 * this.limitSize)
      if (pret < 0.03) return 3
      else return pret * 100
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
    }}
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
    .mainbody {
      padding-left: 230px;
      height: 100%;
    }
    .mainbody2 {
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
    .toolbar {
      bottom: 0px;
      position: absolute;
      width: 86%;
      padding-left: 40px;
      padding-right: 40px;
    }
    .toolbar-btn {
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
