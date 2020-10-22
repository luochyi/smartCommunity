<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>详情</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form
              ref="form"
              label-position="right"
              :model="form"
              label-width="100px"
            >
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="姓名">
                    <span>王康康</span>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="手机号">
                    <span>13380259377</span>
                  </el-form-item>
                </div>
              </div>
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="房屋产权1">
                    <span>1-2-303</span>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="房屋产权2">
                    <span>1-2-304</span>
                  </el-form-item>
                </div>
              </div>
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="车位产权1">
                    <span>A220</span>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="车位产权2">
                    <span>A206</span>
                  </el-form-item>
                </div>
              </div>
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="车辆1">
                    <span>浙BA1U88</span>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="车辆2">
                    <span>浙BC88U2</span>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div class="dra-content">
          <div class="content-titel">
            <span>家庭成员</span>
          </div>
          <div class="dra-table">
            <el-table
              :data="tableData"
              highlight-current-row
              :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
            >
              <el-table-column prop="id" label="序号" width="180">
              </el-table-column>
              <el-table-column prop="ParkingNumber" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="status" label="手机号"> </el-table-column>
              <el-table-column prop="ParkingType" label="身份">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check">
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
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      tableData: [
        {
          id: 1,
          ParkingNumber: 'A128',
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
.el-form-item span {
  color: #666666;
  font-weight: 400;
  font-size: 14px;
}
</style>
