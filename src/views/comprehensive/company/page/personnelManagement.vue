<template>
  <div class="bg">
    <div class="main-content comprehensive">

      <div class="main-titel">
        <span>人员管理</span>
      </div>
      <div class="content"
           style="display:flex">
        <div class="orgLeft">
          <div class="org-search">
            <el-input size="mini"
                      placeholder="请输入内容"
                      @change='searchchange'
                      suffix-icon="el-icon-search "> </el-input>
          </div>
          <el-tree size='small'
                   :data="organizationData"
                   default-expand-all
                   :props="defaultProps"
                   @node-click="organizationChange"
                   ref="tree"></el-tree>
        </div>
        <div class="orgRight content">
          <div class="org-box">
            <div class="permission-input">
              <template>
                <span>请选择部门：</span>
                <el-select v-model="select"
                           size="mini"
                           placeholder="请选择"
                           style="width:240px">
                  <el-option v-for="item in cities"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  </el-option>
                </el-select>
              </template>
            </div>
            <div class="permission-btn">
              <el-button size="small"
                         type="primary">查询</el-button>
              <el-button size="small">重置</el-button>
            </div>
            <div>
              <el-button size="small"
                         @click="drawer = true"
                         type="primary">新建规则</el-button>
            </div>
          </div>

          <el-table :data="tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    border
                    size='small'
                    default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column prop="table1"
                             label="昵称（系统名）"
                             width="120"></el-table-column>
            <el-table-column prop="table2"
                             label="电话">
            </el-table-column>
            <el-table-column prop="table3"
                             label="主要负责人">
            </el-table-column>
            <el-table-column prop="table4"
                             label="职位"> </el-table-column>
            <el-table-column prop="table5"
                             label="人数"
                             width='60'> </el-table-column>
            <el-table-column prop="table6"
                             label="状态">
              <template>
                <div class="status_box">
                  <div class="status_icon">
                  </div>
                  <span>正常</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="table7"
                             label="备注"
                             width='60'></el-table-column>
            <el-table-column prop="table8"
                             width="250"
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
          </el-table>
          <!-- 页码 -->
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
                   :visible.sync="drawer"
                   :with-header="false">
          <new-rule></new-rule>
        </el-drawer>
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
                       @click="resetPassword = false">确 定</el-button>
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
                       @click="prohibitLogin = false">确 定</el-button>
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
import { sysOrganizationList } from '@/api/company'

export default {
  data () {
    return {
      drawer: false, //抽屉控制
      Password: '', //密码
      prohibitLogin: false, //禁止登陆
      resetPassword: false, //重置密码
      Deactivate: false, //停用
      // 表格数据
      tableData: [
        {
          id: 1,
          table1: '汤飞刚',
          table2: '13607932583',
          table3: '房屋管理维修部',
          table4: '电工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
        {
          id: 2,
          table1: '鲁星',
          table2: '13607932233',
          table3: '房屋管理维修部',
          table4: '电工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
        {
          id: 3,
          table1: '王伟',
          table2: '15407932583',
          table3: '房屋管理维修部',
          table4: '电工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
        {
          id: 4,
          table1: '刘星',
          table2: '13607932583',
          table3: '房屋管理维修部',
          table4: '木工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
        {
          id: 5,
          table1: '李燕',
          table2: '15707932513',
          table3: '房屋管理维修部',
          table4: '电工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
        {
          id: 7,
          table1: '张勇',
          table2: '18107932523',
          table3: '房屋管理维修部',
          table4: '电工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
        {
          id: 8,
          table1: '王平',
          table2: '13207922583',
          table3: '房屋管理维修部',
          table4: '电工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
        {
          id: 9,
          table1: '刘学',
          table2: '13607233584',
          table3: '房屋管理维修部',
          table4: '水泥工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
        {
          id: 10,
          table1: '王鑫',
          table2: '17607932583',
          table3: '房屋管理维修部',
          table4: '木工',
          table5: '-',
          table6: '正常',
          table7: '—',
          table8: '编辑',
        },
      ],
      organizationData: [],
      defaultProps: {
        children: 'organizationList',
        label: 'name',
      },
      select: '',
      cities: [],
    }
  },
  // components: {
  //   newRule,
  // },
  created () {
    this.getData()
  },
  methods: {
    // 组织点击
    organizationChange (data) {
      console.log(data)
    },
    // 表格数据
    getData () {
      sysOrganizationList().then(res => {
        console.log(res)
        this.organizationData = res
      })
    },
    // 重制密码对话框的关闭事件
    resetDialog () { },
    //编辑
    editLogin (row) {
      this.drawer = true
      console.log(row)
    },
    // 表格分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
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
.org-box {
    box-sizing: content-box;
    display: flex;
    padding: 20px;
}
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