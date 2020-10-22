<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>查看发送记录</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%;padding:0 20px"
            highlight-current-row
            :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
          >
            <el-table-column prop="id" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="ParkingNumber" label="公告标题">
            </el-table-column>
            <el-table-column prop="ParkingNumber" label="公告标题">
            </el-table-column>
            <el-table-column prop="ParkingNumber" width="180" label="公告标题">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check" @click="onSubmit">
            <span>提交</span>
          </button>
          <button class="dra-cancel"><span>取消</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      tableData: [
        {
          id: 1,
          ParkingNumber: 'A128',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 2,
          ParkingNumber: 'A128',
          status: '已售',
          ParkingType: '临时车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 3,
          ParkingNumber: 'A1238',
          status: '已出租',
          ParkingType: '产权车位',
          owner: '吴彦祖',
          userName: '吴彦祖 ',
          phone: '18965334242'
        },
        {
          id: 4,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$refs.header.formData)
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
.dra-content {
  height: 100%;
}
</style>
