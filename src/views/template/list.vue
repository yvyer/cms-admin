<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/model1.png" class="image">
          <div style="padding: 14px;">
            <span style="line-height: 36px;">列表模板</span>
            <router-link class="pan-btn blue-btn" to="/template/add">选择</router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/model2.png" class="image">
          <div style="padding: 14px;">
            <span style="line-height: 36px;">封面模版</span>
            <router-link class="pan-btn light-blue-btn" to="/template/add">选择</router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/model3.png" class="image">
          <div style="padding: 14px;">
            <span style="line-height: 36px;">分类置顶封面模版</span>
            <router-link class="pan-btn red-btn" to="/template/add">选择</router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/model4.png" class="image">
          <div style="padding: 14px;">
            <span style="line-height: 36px;">单页面分类模版</span>
            <router-link class="pan-btn pink-btn" to="/template/add">选择</router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style>

  .pan-btn {
    padding: 10px;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
