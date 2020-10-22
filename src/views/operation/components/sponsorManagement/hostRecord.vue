<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>主办方记录</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="主办方单位">
                <span style="color:#666666">物业</span>
              </el-form-item>
              <el-form-item label="主办方记录">
                <div class="content-table">
                  <el-table
                    :data="tableData"
                    style="width: 100%"
                    highlight-current-row
                    :header-cell-style="{
                      background: '#F5F5F6',
                      color: '#999999'
                    }"
                  >
                    <el-table-column prop="status" label="序号" width="120">
                    </el-table-column>
                    <el-table-column prop="id" label="姓名"> </el-table-column>
                    <el-table-column prop="phone" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="ParkingType" label="报名时间">
                    </el-table-column>
                  </el-table>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check">
            <span>确认</span>
          </button>
          <!-- <button class="dra-cancel"><span>取消</span></button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
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
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
.dra-content {
  height: 100%;
}
.el-form-item {
  width: 100%;
}
</style>
