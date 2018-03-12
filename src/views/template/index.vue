<template>
  <div class="app-container">
    <el-row :gutter="10">
      <div v-for="element in list">
        <el-col :span="6" style="margin: 10px;">
          <el-card style="height: 600px;width:320px">
            <div slot="header" class="clearfix">
              <span class="title" style="line-height: 44px;">{{ element.title }}</span>
            </div>
            <div v-for="e in element.list">
              <el-row class="item">
                <el-col :span="8"><img class="cell-img" :src="e.photo"></el-col>
                <el-col :span="16"><h3 class="list-title">{{ e.title }}</h3>
                  <p class="list-content">{{ e.content}}</p></el-col>
              </el-row>
            </div>

          </el-card>
          <div style="margin: 40px">
            <input type="text" :value="'http://qingtingtui.com/page/'+element.pid" :id="'text'+element.pid"/>
            <button class="custom-button blue-btn" size="mini" v-on:click="copy(element.pid)">复制</button>
            <router-link class="pan-btn blue-btn" :to="'/template/update/'+element.pid">修改</router-link>
            <button class="pan-btn blue-btn" v-on:click="delPage(element.pid)">删除</button>
          </div>
        </el-col>

      </div>
      <!--<el-col :span="6">-->
      <!--<el-card :body-style="{ padding: '0px' }">-->
      <!--<img src="../../assets/images/model1.png" class="image">-->
      <!--<div style="padding: 14px;">-->
      <!--<span style="line-height: 36px;">xxx名称</span>-->
      <!--<el-button style="float: right;" type="primary">修改</el-button>-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
      <!--<el-card :body-style="{ padding: '0px' }">-->
      <!--<img src="../../assets/images/model2.png" class="image">-->
      <!--<div style="padding: 14px;">-->
      <!--<span style="line-height: 36px;">xxx名称</span>-->
      <!--<el-button style="float: right;" type="primary">修改</el-button>-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
      <!--<el-card :body-style="{ padding: '0px' }">-->
      <!--<img src="../../assets/images/model3.png" class="image">-->
      <!--<div style="padding: 14px;">-->
      <!--<span style="line-height: 36px;">xxx名称</span>-->
      <!--<el-button style="float: right;" type="primary">修改</el-button>-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
      <!--<el-card :body-style="{ padding: '0px' }">-->
      <!--<img src="../../assets/images/model4.png" class="image">-->
      <!--<div style="padding: 14px;">-->
      <!--<span style="line-height: 36px;">xxxx名称</span>-->
      <!--<el-button style="float: right;" type="primary">修改</el-button>-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  import {getList, delPage} from '@/api/page'

  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      copy(pid) {
        document.getElementById("text" + pid).focus();
        document.getElementById("text" + pid).select();
        document.execCommand("Copy");
      },
      delPage(pid) {
        delPage(pid).then(response => {
          this.$router.go();
        })
      },
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.data
        })
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style>
  .item {
    padding: 9px 0;
    border-bottom: 1px solid #d1dbe5;
  }

  .cell-img {
    line-height: 3em;
    height: 3em;
  }

  .el-card__header {
    background: transparent url(../../assets/images/banner_control.png) no-repeat 0 0;
    text-align: center;
    padding: 18px 20px 0 20px;
  }

  .title {
    color: #fff;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 316px;
    height: 480px;
    overflow: scroll;
  }

  .list-title {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    font-size: 0.8em;
  }

  .list-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.6em;
    margin: 6px 0 0 0;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
