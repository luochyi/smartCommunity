<template>
  <div class="main-content">
    <div class="main-titel"
         style="border-bottom: none">
      <span>商品管理</span>
    </div>
    <div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="线上商品"
                     name="first">
          <Online></Online>
        </el-tab-pane>
        <el-tab-pane label="发布记录"
                     name="second">
          <Release></Release>
        </el-tab-pane>
        <el-tab-pane label="草稿箱"
                     name="third">
          <Draft></Draft>
        </el-tab-pane>
        <el-tab-pane label="回收站"
                     :disabled="true"
                     name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Online from '@/views/commodity/components/commodityManagement/Online'
import Release from '@/views/commodity/components/commodityManagement/Release'
import Draft from '@/views/commodity/components/commodityManagement/Draft'

export default {
  data () {
    return {
      activeName: 'first'
    }
  },

  components: {
    Online,
    Release,
    Draft
  },
  computed: {},
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped>
.main-titel span {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  padding-left: 21px;
}
.content {
  padding: 20px;
}
.content-btn {
  padding-bottom: 20px;
}
.form-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.form-box > .form-input {
  margin-right: 170px;
}
.form-btn {
  flex: 1;
}
.input-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.input-box > div > span {
  color: #999999;
  font-size: 14px;
  padding-right: 10px;
}
.content-table {
  margin-top: 20px;
  border: 1px solid #f5f5f6;
}
</style>
