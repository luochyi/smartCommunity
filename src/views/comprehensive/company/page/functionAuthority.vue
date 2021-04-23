<template>
  <div>
    <div class="main-content comprehensive">
      <div class="main-titel"
           style="border-bottom:none;">
        <span>功能权限管理</span>
      </div>
      <div class="asideSj-tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="人员角色分配"
                       name="1">

            <role-assignments :show='activeName==="1"'></role-assignments>
          </el-tab-pane>
          <el-tab-pane label="角色权限设置"
                       name="2">
            <!-- <role-permissions></role-permissions> -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
// // admin/src/views/company/components/functionAuthority
import roleAssignments from '@/views/comprehensive/company/components/functionAuthority/roleAssignments.vue'
// import rolePermissions from '@/views/company/components/functionAuthority/rolePermissions.vue'
// functionAuthorityRoleList

export default {
  data () {
    return {
      activeName: '1',
    }
  },
  components: {
    roleAssignments,
    // rolePermissions,
  },
  methods: {},
}
</script>
<style scoped lang='scss' >
</style>
