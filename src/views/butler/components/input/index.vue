<style scoped>
.tips {
  margin: 20px;
  height: 38px;
  line-height: 38px;
  background: #fafafa;
  border-radius: 4px;
  opacity: 0.8;
  border: 1px solid #e8e8e8;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>公告管理</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline" style="margin:0 12px"></span>
        温馨提示：今日预计有
        <span style="color:rgba(251, 71, 2, 1)">3</span>
        户家庭发起装修，共计8户家庭未执行
      </p>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <input-form></input-form>
        <div class="content-table">
          <el-table
            :data="tableData"
            style="width: 100%"
            highlight-current-row
            :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
          >
            <el-table-column prop="id" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="ParkingNumber" label="公告标题" width="180">
            </el-table-column>
            <el-table-column prop="status" label="阅读量"> </el-table-column>
            <el-table-column prop="ParkingType" label="状态"> </el-table-column>
            <el-table-column prop="ParkingType" label="创建人">
            </el-table-column>
            <el-table-column prop="ParkingType" label="更新时间">
            </el-table-column>
          </el-table>
          <div class="table-footer">
            <button>预览</button>
            <button>修改</button>
            <button>打印</button>
            <button>发布</button>
            <button>删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import Tips from '@/views/butler/components/Tips'
export default {
  data() {
    return {
      // tips_json: {
      //   tips_txt: '温馨提示',
      //   tips_content: '今日预计有',
      //   tips_num1: '3',
      //   tips_content1: ' 户家庭发起装修，共计8户家庭未执行',
      //   tips_num2: '8'
      // },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    }
  },
  // components: {
  //   Tips
  // },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
