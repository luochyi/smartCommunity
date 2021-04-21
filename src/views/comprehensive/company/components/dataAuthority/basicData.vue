<template>
  <div class="basic-conetent">
   <el-table
      :data="tableData"
       :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="权限">
      <template>
      <el-radio-group v-model="radio">
        <el-radio v-model="radio" label="3">私有</el-radio>
        <el-radio :label="6">公开只读</el-radio>
        <el-radio :label="9">公开读写</el-radio>
      </el-radio-group>
    </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '3',
       tableData: [{
          date: '2016-05-02',
          name: '李华',
          address: '组织架构'
        }, {
          date: '2016-05-04',
          name: '王朝松',
         address: '组织架构'
        }, {
          date: '2016-05-01',
          name: '李龙',
          address: '组织架构'
        }, {
          date: '2016-05-03',
          name: '章鑫',
           address: '组织架构'
        }]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .basic-conetent{
    padding: 20px;
  }
</style>
