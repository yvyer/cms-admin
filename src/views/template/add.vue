<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title" style="line-height: 44px;">{{ name }}</span>
          </div>
          <draggable :list="list1" class="dragArea" :options="{group:'article'}">
            <div v-for="element in list1">
              <el-row class="item">
                <el-col :span="8"><img class="cell-img" :src="element.photo"></el-col>
                <el-col :span="16"><h3 class="list-title">{{ element.title }}</h3>
                  <p class="list-content">{{ element.content}}</p></el-col>
              </el-row>
            </div>
          </draggable>
          <a class="draginner">由蜻蜓推提供技术支持</a>
        </el-card>
      </el-col>

      <el-col :span="10" :offset="4">
        <el-card class="box-card" :body-style="{ padding: '10px' }">
          <div class="item">
            <span style="line-height: 44px;">名称：{{ name }}</span>
            <el-button type="text" @click="open">修改</el-button>
          </div>
          <div>
            <div class="item">
              <span style="line-height: 44px;">文章列表</span>
              <el-popover
                ref="popover5"
                placement="left"
                width="320"
                v-model="visible2">
                <h3>添加文章</h3>
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                  <el-form-item label="文章题目" prop="title">
                    <el-input v-model="form.title"></el-input>
                  </el-form-item>
                  <el-form-item label="文章链接" prop="url">
                    <el-input v-model="form.url"></el-input>
                  </el-form-item>
                  <el-form-item label="文章简介" prop="content">
                    <el-input type="textarea" v-model="form.content"></el-input>
                  </el-form-item>
                  <el-form-item label="文章图片" prop="photo">
                    <el-upload
                      class="avatar-uploader"
                      action="http://qingtingtui.com/api/file/upload"
                      :headers="header"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.photo" :src="form.photo" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">添加</el-button>
                    <el-button type="text" @click="visible2 = false">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-popover>

              <el-button v-popover:popover5>添加</el-button>
            </div>
            <draggable :list="list2" class="dragArea" :options="{group:'article'}">
              <div v-for="(element, key) in list2">
                <el-row class="item">
                  <el-col :span="7"><img class="cell-img" :src="element.photo"></el-col>
                  <el-col :span="14"><h3 class="list-title">{{ element.title }}</h3>
                    <p class="list-content">{{ element.content}}</p></el-col>
                  <el-col :span="3">
                    <el-button type="text" @click="delArt(key)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </draggable>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-button type="primary" style="margin:10px;" v-on:click="save">保存</el-button>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import {getList, saveArticle} from '@/api/article'
  import { getToken, getAuthToken } from '@/utils/auth'

  export default {
    data() {
      return {
        header: { 'Authorization': 'Bearer LpuJ4mleBBx9EaYx4iRV_7Y_h1-JRQA-###1511023338###6bd16dc0'},
        type: 1,
        name: '蜻蜓推页面模板',
        content: [],
        editable: true,
        isDragging: false,
        delayedDragging: false,
        visible2: false,
        list1: [],
        list2: [],
        form: {
          title: '',
          content: '',
          url: '',
          photo: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入文章名称', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入文章简介', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
          url: [
            { type: 'url', required: true, message: '请输入文章链接', trigger: 'blur' }
          ],
          photo: [
            { required: true, message: '请添加文件', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      draggable
    },
    methods: {
      save() {
        saveArticle(this.list1, this.name).then(response => {
          this.$router.push({ path: '/template/index' });
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var formBase = this.form;
            this.list2.unshift({'title': formBase.title,'content': formBase.content,'url': formBase.url,'photo': formBase.photo});
            this.$refs[formName].resetFields();
            this.visible2 = false;
          } else {
            return false;
          }
        });
      },
      delArt(key) {
        this.list2.splice(key, 1);
      },
      open() {
        this.$prompt('请输入名称', '名称修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.name
        }).then(({value}) => {
          this.name = value;
          this.$message({
            type: 'success',
            message: '名称是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      },
      isNotInList1(v) {
        return this.list1.every(k => v.id !== k.id)
      },
      isNotInList2(v) {
        return this.list2.every(k => v.id !== k.id)
      },
      deleteEle(ele) {
        for (const item of this.list1) {
          if (item.id === ele.id) {
            const index = this.list1.indexOf(item);
            this.list1.splice(index, 1)
            break
          }
        }
        if (this.isNotInList2(ele)) {
          this.list2.unshift(ele)
        }
      },
      pushEle(ele) {
        this.list1.push(ele)
      },
      fetchData() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list1 = response.data.data.splice(0, 5)
          this.list2 = response.data.data
        })
      },
      handleAvatarSuccess(res, file) {
        if (!res.success) {
          this.form.photo = res.data;
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    created() {
//      this.fetchData()
    },
    computed: {
      filterList2() {
        return this.list2.filter(v => {
          if (this.isNotInList1(v)) {
            return v
          }
          return false;
        })
      }
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
  .dragArea {
    min-height: 20px;
  }
</style>
