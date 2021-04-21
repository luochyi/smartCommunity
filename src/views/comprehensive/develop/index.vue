<template>
  <div class="content">
    <div class="banner">
      <img src=""
           alt="">
      <div class="banner-title">
        <h1>为物业企业赋能 打造数字化转型</h1>
        <p>数据开放平台 凯达来智慧社区的引领者</p>
      </div>
      <!-- <div class="btn-box">
        <el-button type="primary" style="width:158px;height: 50px">点击查询</el-button>
      </div> -->
    </div>
    <div class="table-content">
      <div class="table-input">
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="addDra = true">新增</el-button>
        <el-input placeholder="请输入"
                  prefix-icon="el-icon-search"
                  style="width:240px"></el-input>
      </div>
      <el-table :data="tableData"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%">
        <el-table-column prop="id"
                         label="ID"
                         width=100>
        </el-table-column>
        <el-table-column prop="dataName"
                         label="用户名"
                         width="auto">
        </el-table-column>
        <el-table-column prop="allData"
                         label="密码"
                         width="auto">
        </el-table-column>
        <el-table-column prop="allFw"
                         label="权限"
                         width="auto">
        </el-table-column>
        <el-table-column prop="status"
                         label="开发者密钥(AppSecret)"
                         width="auto">
        </el-table-column>
        <el-table-column prop="address"
                         label="操作">
          <template>
            <el-button type="text"
                       @click="Details = true"
                       size="small">查看</el-button>
            <el-button type="text"
                       size="small">删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template>
        <div class="pagination-box">
          <div class="pagination-item">
            <p>当前1-3，共3条 <span>每页显示10条</span></p>
          </div>
          <div class="pagination-item">
            <div class="block">
              <el-pagination @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :page-size="100"
                             background
                             :pager-count="9"
                             layout="prev, pager, next,jumper"
                             :total="900">
              </el-pagination>
            </div>
          </div>
        </div>
      </template>
    </div>
    <el-drawer title="我是标题"
               size='52%'
               :visible.sync="addDra"
               :with-header="false">
      <add-user></add-user>
    </el-drawer>
    <el-drawer title="我是标题"
               size='52%'
               :visible.sync="Details"
               :with-header="false">
      <views-details></views-details>
    </el-drawer>

  </div>

</template>

<script>
// /Users/apple/Desktop/xx/admin/src/views/develop/components/addUser.vue
import addUser from '@/views/develop/components/addUser.vue'
import viewsDetails from '@/views/develop/components/viewsDetails.vue'
export default {
  data() {
    return {
      addDra: false,
      Details: false,
      tableData: [
        {
          id: '1',
          dataName: 'admin',
          address: '1',
          allData: '******',
          allFw: '*车位数据、*门禁数据、*业主数据',
          status: 'skilisefashjskfjhak',
        },
        {
          id: '2',
          date: '2016-05-02',
          dataName: 'wang',
          address: '1',
          allData: '******',
          allFw: '*车位数据、*门禁数据、*业主数据、安放数据',
          status: 'dCZidKo46uUqysX1',
        },
        {
          id: '3',
          dataName: 'sang',
          address: '1',
          allData: '******',
          allFw: '*车位数据、*门禁数据、*业主数据、安放数据',
          status: 'dCZidKo46uUqyjdlsvsX1',
        },
      ],
    }
  },
  components: {
    addUser,
    viewsDetails,
  },
  methods: {
    // 表格分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  },
}
</script>

<style scoped>
.content {
  width: 100%;
  height: calc(100vh - 60px);
  overflow: auto;
}
.banner-title {
  width: 100%;
  text-align: center;
}
.banner-title h1 {
  margin-top: 83px;
  height: 91px;
  font-size: 50px;
  font-family: FZLTXHK--GBK1-0, FZLTXHK--GBK1;
  font-weight: normal;
  color: #333333;
  line-height: 69px;
}
.banner-title p {
  font-size: 30px;
  margin-bottom: 80px;
  font-family: FZLTXHK--GBK1-0, FZLTXHK--GBK1;
  font-weight: normal;
  color: #333333;
  line-height: 42px;
}
.btn-box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 220px;
}
.table-content {
  width: 80%;
  margin: auto;
}
.table-input {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.pagination-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pagination-item {
  height: 68px;
  margin-bottom: 60px;
  display: flex;
  align-items: center;
}
</style>
