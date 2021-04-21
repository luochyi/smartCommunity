<template>
  <div>
    <div class="myContent">
      <div class='myContentTitle'>
        <span>人员管理</span>
      </div>
      <div class="asideSj-tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="人员角色分配"
                       name="first">
            <role-assignments></role-assignments>
          </el-tab-pane>
          <el-tab-pane label="角色权限设置"
                       name="second">
            <role-permissions></role-permissions>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
// admin/src/views/company/components/functionAuthority
import roleAssignments from '@/views/company/components/functionAuthority/roleAssignments.vue'
import rolePermissions from '@/views/company/components/functionAuthority/rolePermissions.vue'

export default {
  data() {
    return {
      activeName: 'second',
    }
  },
  components: {
    roleAssignments,
    rolePermissions,
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
