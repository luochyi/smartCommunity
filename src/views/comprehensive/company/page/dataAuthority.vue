<template>
  <div>
    <div class="myContent">
      <div class='myContentTitle'>
        <span> 数据权限管理</span>
      </div>
      <div class="asideSj-tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础数据权限"
                       name="first">
            <basic-data></basic-data>
          </el-tab-pane>
          <el-tab-pane label="数据权限共享"
                       name="second">
            <data-permission></data-permission>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import basicData from '@/views/company/components/dataAuthority/basicData.vue'
import dataPermission from '@/views/company/components/dataAuthority/dataPermission.vue'
export default {
  data() {
    return {
      activeName: 'second',
    }
  },
  components: {
    basicData,
    dataPermission,
  },
  methods: {},
}
</script>
<style scoped>
.myContent {
  background: #fff;
  margin: 0 auto 20px;
  border-radius: 3px;
}
.myContentTitle {
  margin-bottom: 10px;
  padding: 0 20px 10px;
  color: #202332;
  font-size: 16px;
  line-height: 60px;
}
</style>
