<template>
  <div class="bg">
    <div class="main-content comprehensive">

      <div class="main-titel">
        <span>员工管理</span>
      </div>
      <div class="content"
           style="display:flex">
        <div class="orgLeft">
          <div class="org-search">
            <el-input placeholder="请输入内容"
                      v-model="filterText">
            </el-input>
          </div>
          <el-tree class="filter-tree"
                   :data="organizationData"
                   :expand-on-click-node='false'
                   :highlight-current="true"
                   :props="defaultProps"
                   @node-click="organizationChange"
                   default-expand-all
                   :filter-node-method="filterNode"
                   ref="tree">
          </el-tree>
        </div>
        <div class="orgRight content">
          <div class="flex  justify-between"
               style="padding-bottom:20px">
            <div class='flex align-center justify-between'
                 style="flex:5">
              <div>
                <span>员工名称：</span>
                <el-input placeholder="请输入内容"
                          size="small"
                          style="width:240px"
                          v-model="nickName">
                </el-input>
              </div>
              <div>
                <span>状态：</span>
                <el-select v-model="status"
                           size="mini"
                           placeholder="请选择"
                           style="width:240px">
                  <el-option v-for="item in statusOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class='flex align-center justify-center'
                 style="flex:2;">
              <el-button size="small"
                         @click="search()"
                         type="primary">查询</el-button>
              <el-button @click="reset()"
                         size="small">重置</el-button>

            </div>
            <div>
              <el-button size="small"
                         @click="addPerson()"
                         type="primary">新建员工</el-button>
            </div>
          </div>
          <!-- 表格 -->
          <el-table :data="tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    border
                    size='small'
                    default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column prop="nickName"
                             label="昵称（系统名）"
                             width="140"></el-table-column>
            <el-table-column prop="tel"
                             width="140"
                             label="电话">
            </el-table-column>
            <el-table-column prop="organizationName"
                             width="120"
                             label="部门名称">
            </el-table-column>
            <el-table-column prop="positionName"
                             width="100"
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
                             label="备注"></el-table-column>
            <el-table-column width="250"
                             label="操作">
              <template slot-scope="scope">
                <el-button @click="editLogin(scope.row)"
                           type="text"
                           size="small">编辑</el-button>
                <el-button @click="prohibitLogin = true"
                           type="text"
                           size="small">禁止登录 </el-button>
                <el-button @click="resetPassword = true"
                           type="text"
                           size="small">重置密码</el-button>
                <el-button @click="Deactivate = true"
                           type="text"
                           size="small">停用</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <template>
            <div class="pagination-box">
              <div class="pagination-item">
                <p>当前1-3，共3条 <span>每页显示10条</span></p>
              </div>
              <div class="pagination-item">
                <div class="block">
                  <el-pagination @current-change="handleCurrentChange"
                                 :page-size="10"
                                 :current-page='currentPage'
                                 background
                                 :pager-count="9"
                                 layout="prev, pager, next,jumper"
                                 :total="rowCount">
                  </el-pagination>
                </div>
              </div>
            </div>
          </template>
        </div>
        <!--重置密码-->
        <el-dialog title="重置密码"
                   width="480px"
                   top="40vh"
                   @close="resetDialog()"
                   :visible.sync="resetPassword">
          <div class="dialang-box">
            <el-input placeholder="请输入密码"
                      size="mini"
                      v-model="Password"
                      show-password
                      style="width:423px;height:32px"></el-input>
          </div>
          <div class="password-prompt">
            <span>重置密码后，系统不会发短信通知员工；请将密码告知员工，确保其正常使用。</span>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button size="mini"
                       @click="resetPassword = false">取 消</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="resetPasswordOk()">确 定</el-button>
          </span>
        </el-dialog>
        <!--禁止登陆-->
        <el-dialog title="禁止登陆"
                   width="480px"
                   top="40vh"
                   :visible.sync="prohibitLogin">
          <div class="password-prompt">
            <span>被禁止登录的账号在帐号密码正确的情况下也无法正常登录系统，确定禁止登录？</span>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button size="mini"
                       @click="prohibitLogin = false">取 消</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="prohibitLoginOk()">确 定</el-button>
          </span>
        </el-dialog>
        <!--停用-->
        <el-dialog title="停用帐号提示"
                   width="480px"
                   top="40vh"
                   :visible.sync="Deactivate">

          <div class="password-prompt">
            <span>确定要停用帐号？</span>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button size="mini"
                       @click="Deactivate = false">取 消</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="Deactivate = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
// import newRule from '@/views/company/components/personnelManagement/newRule.vue'
import { sysOrganizationList, sysUserFindById, sysUserList } from '@/api/company'
export default {
  data () {
    return {
      filterText: '',
      Password: '', //密码
      prohibitLogin: false, //禁止登陆
      resetPassword: false, //重置密码
      Deactivate: false, //停用
      handleId: null,  //操作id  用于编辑禁止登陆 重置密码、停用等
      // 表格数据
      tableData: [],
      // 组织结构
      organizationData: [],
      // 组织结构属性配置
      defaultProps: {
        children: 'organizationList',
        label: 'name',
      },
      currentPage: 1,
      limit: 10,
      pageCount: null,
      rowCount: null,
      organizationId: null,
      // 搜索条件
      nickName: null,
      // 搜索条件 
      status: null,
      statusOptions: [
        { value: 1, label: '正常' },
        { value: 2, label: '异常' }
      ]
    }
  },
  created () {
    this.getData()
    this.getTableData()
  },
  methods: {
    // 组织点击
    organizationChange (data) {
      console.log(data)
      this.organizationId = data.id
      this.getTableData()
    },
    //查询
    search () {
      this.getTableData()
    },
    // 重置
    reset () {
      this.nickName = null
      this.status = null
      this.getTableData()
    },
    // 禁止登录确认
    prohibitLoginOk () {
      this.prohibitLogin = false
    },
    // 重置密码确定
    resetPasswordOk () {
      this.resetPassword = false
    },
    // 重制密码对话框的关闭事件
    resetDialog () { },
    // 表格数据
    getTableData () {
      let resData = {
        pageNum: this.currentPage,
        size: this.limit,
        organizationId: this.organizationId,
        nickName: this.nickName,
        status: this.status,
      }
      sysUserList(resData).then(result => {
        console.log(result)
        this.tableData = result.tableList
        this.rowCount = result.rowCount

      })
    },
    // 新建员工
    addPerson () {

    },
    // 树形结构过滤
    filterNode (value, data) {
      console.log(value)
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 人员管理结构
    getData () {
      sysOrganizationList().then(res => {
        console.log(res)
        this.organizationData = res
      })
    },
    //编辑
    editLogin (row) {
      this.drawer = true
      console.log(row)
    },
    // 表格分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTableData()
    },
  },
  watch: {
    // 树形结构过滤
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },

}
</script>
<style scoped lang='scss'>
.status_icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 10px;
    border-radius: 50%;
    background: #52c41a;
}
.orgLeft {
    width: 20%;
    height: auto;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #cfd0dd;
    margin-right: 20px;
}
.org-search {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
}
.orgRight {
    flex: 1;
    height: 100%;
    overflow: auto;
    border: 1px solid #cfd0dd;
}
// .org-box {
//     box-sizing: content-box;
//     display: flex;
//     padding: 20px;
// }
.permission-input {
    width: 486px;
    margin-right: 88px;
}
.permission-btn {
    flex: 1;
}
.pagination-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.pagination-item {
    height: 68px;
    display: flex;
    align-items: center;
}
.password-prompt {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    text-align: left;
    line-height: 22px;
}
</style>
