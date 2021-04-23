<template>
  <div>
    <div>
      <div style="display:flex">
        <div class="lf">
          <div class="title">
            <span>全部员工</span>
          </div>
          <div class="lf-list">
            <div class='list-item'
                 v-for="item in roleList"
                 :key='item.id'>
              <div class="list-title">
                <span>{{item.name}}</span>
              </div>
              <div class='item'
                   v-for="role in item.voRoleList"
                   :key="role.id">
                <span>{{role.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rg content">
          <div class="flex  justify-between"
               style="padding-bottom:20px">
            <div class='flex align-center justify-between'
                 style="flex:5">
              <div>
                <span>员工名称：</span>
                <el-input placeholder="请输入内容"
                          size="small"
                          style="width:240px">
                </el-input>
              </div>
              <div>
                <span>状态：</span>
                <!-- <el-select size="mini"
                         placeholder="请选择"
                         style="width:240px">
                <el-option v-for="item in statusOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select> -->
              </div>
            </div>
            <div class='flex align-center justify-center'
                 style="flex:2;">
              <el-button size="small"
                         type="primary">查询</el-button>
              <el-button size="small">重置</el-button>

            </div>
            <div>
              <el-button size="small"
                         @click="drawer = true"
                         type="primary">新建员工</el-button>
            </div>
          </div>
          <!-- <el-table :data="tableData"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  border
                  size='small'
                  default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column prop="nickName"
                           label="昵称（系统名）"
                           width="180"></el-table-column>
          <el-table-column prop="tel"
                           label="电话">
          </el-table-column>
          <el-table-column prop="roleName"
                           label="主要负责人">
          </el-table-column>
          <el-table-column prop="positionName"
                           label="职位"> </el-table-column>
          <el-table-column prop="status"
                           width="120"
                           label="状态">
            <template>
              <div class="status_box">
                <div class="status_icon">
                </div>
                <span>正常</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remake"
                           label="备注"
                           width='180'></el-table-column>
          <el-table-column width="250"
                           label="操作">
            <template slot-scope="scope">
              <el-button @click="editLogin(scope.row)"
                         type="text"
                         size="small">编辑</el-button>
              <el-button @click="prohibitLogin = true"
                         type="text"
                         size="small">禁止登陆</el-button>
              <el-button @click="resetPassword = true"
                         type="text"
                         size="small">重置密码</el-button>
              <el-button @click="Deactivate = true"
                         type="text"
                         size="small">停用</el-button>
            </template>
          </el-table-column>
        </el-table> -->

          <!-- 页码 -->
          <!-- <template>
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
          </template> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { functionAuthorityRoleList } from '@/api/company'
export default {
  props: {
    show: {
      type: Boolean,
      default: () => false,
    }
  },
  data () {
    return {
      cities: [],
      value: '',
      drawer: false,
      item_title: '全部人员',
      tableData: [{
        dataName: '汤飞刚',
        allData: '房屋管理维修部',
        allFw: "电工",
        status: "-",
      },
      {
        dataName: '李玉刚',
        allData: '房屋管理维修部',
        allFw: "水泥工",
        status: "-",
      },
      {
        dataName: '李曾',
        allData: '房屋管理维修部',
        allFw: "水电工",
        status: "-",
      },
      {
        dataName: '张磊',
        allData: '房屋管理维修部',
        allFw: "保安",
        status: "-",
      }],
      roleList: []
    }
  },
  created () {
    this.GetTableData()
  },
  methods: {
    GetTableData () {
      let resData = {
        pageNum: 1,
        size: 10
      }
      functionAuthorityRoleList(resData).then(res => {
        console.log(res)
        this.roleList = res
      })
    },
    handleSizeChange (val) {
      this.drawer = 1
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.drawer = 1
      console.log(`当前页: ${val}`);
    }
  },
  watch: {
    show: {
      handler (newValue) {
        console.log(newValue)
        // this.GetTableData()
      }
    }
    // this.GetTableData ()

  }
}
</script>
<style lang="scss" scoped>
.status_icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 10px;
    border-radius: 50%;
    background: #52c41a;
}
.lf {
    width: 20%;
    height: auto;
    max-height: 600px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #cfd0dd;
    margin-right: 20px;
    padding: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    .title {
        font-weight: 500;
        color: #333333;
    }
    .list-item {
        margin-top: 20px;

        .list-title {
            font-weight: 400;
            color: #999999;
        }
        font-weight: 400;
        color: #333333;
        .item {
            padding: 15px;
            &:hover {
                background: #f6f6f6;
                border-radius: 2px;
            }
        }
    }
}
.rg {
    flex: 1;
    height: auto;
    overflow: auto;
    border: 1px solid #cfd0dd;
}
</style>