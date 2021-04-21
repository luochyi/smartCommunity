<template>
  <div>
    <div class="main-content comprehensive">
      <div class="main-titel"
           style="border-bottom:none;">
        <span>组织架构管理</span>
      </div>

      <div class="content">
        <el-tabs v-model="activeName">
          <el-tab-pane label="组织架构管理"
                       name="first">
            <el-form :inline="true"
                     label-width="80px"
                     size="mini"
                     class="demo-form-inline">
              <el-form-item label="部门名称">
                <el-input v-model="name"
                          placeholder="请输入"
                          style="width:240px"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="status"
                           placeholder="请选择"
                           style="width:240px;margin-right:120px;">
                  <el-option label="正常"
                             :value="1"></el-option>
                  <el-option label="异常"
                             :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="search">查询</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
            <div>
              <el-table :data="tableData"
                        style="width: 100%;margin-bottom: 20px;"
                        row-key="id"
                        border
                        default-expand-all
                        :tree-props="{children: 'organizationList', hasChildren: 'hasChildren'}"
                        :header-cell-style="{background: '#F5F5F6',color:'#606266'}">
                <el-table-column prop="name"
                                 width="296"
                                 label="组织机构层级"></el-table-column>
                <el-table-column label="分类">

                  <template slot-scope="scope">
                    <div>
                      <div v-if="scope.row.categoryId ===1">
                        <span>公司</span>
                      </div>
                      <div v-else-if="scope.row.categoryId ===2">
                        <span>部门</span>
                      </div>
                      <div v-else-if="scope.row.categoryId ===3">
                        <span>工作组</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="leadingName"
                                 label="主要负责人">
                </el-table-column>
                <el-table-column prop="leadingTel"
                                 label="电话"> </el-table-column>
                <el-table-column prop="countNum"
                                 label="人数"> </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <div>
                      <div v-if="scope.row.status ===1">
                        <div class="status_box">
                          <div class="status_icon">
                          </div>
                          <span>正常</span>
                        </div>
                      </div>
                      <div v-else>
                        <div class="status_box">
                          <div class="status_icon danger">
                          </div>
                          <!-- #f56c6c -->
                          <span>停用</span>
                        </div>
                      </div>
                    </div>
                  </template>

                </el-table-column>
                <el-table-column prop="remake"
                                 label="备注"></el-table-column>
                <el-table-column prop="operating"
                                 label="操作">
                  <template slot-scope="scope">
                    <el-button @click="edit(scope.row)"
                               type="text"
                               size="small">编辑</el-button>
                    <el-button type="text"
                               size="small">更多 <i class="el-icon-arrow-down"></i></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>

          <el-tab-pane label="组织架构管理"
                       name="third"></el-tab-pane>
        </el-tabs>

      </div>
      <!-- 新增修改 -->
      <Drawer drawerTitle="编辑部门"
              @drawerClose="addEidtClose"
              :drawerVrisible='addEidt_vrisible'>
        <div style="padding:30px">
          <FromCard>
            <template slot="title">基本信息</template>
            <template>
              <VueForm ref="addEidtVueForm"
                       :formObj='addEidtForm'>
                <template slot='sort'>
                  <div>
                    <el-input-number v-model="addEidtForm.ruleForm.sort"
                                     controls-position="right"
                                     :min="1"
                                     :max="10"></el-input-number>
                  </div>

                </template>
                <template v-slot:leadingId>
                  <el-select v-model="addEidtForm.ruleForm.leadingId"
                             :remote-method='remoteMethod'
                             @change='change'
                             @focus='sefocus'
                             :loading="loading"
                             remote
                             style="width:240px"
                             filterable
                             placeholder="请选择">
                    <el-option v-for="item in options"
                               :key="item.id"
                               :label="item.actualName"
                               :value="item.id">
                    </el-option>
                  </el-select>
                </template>
                <!--   -->
              </VueForm>
            </template>
          </FromCard>
        </div>
        <div slot="footer">
          <button class="btn-orange"
                  @click="addEidtSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
          <button class="btn-gray"
                  @click="addEidtClose"><span>取消</span></button>
        </div>
      </Drawer>
    </div>
  </div>
</template>
<script>
import { sysOrganizationList, sysOrganizationFindById, sysUserList, sysOrganizationUpdate } from '@/api/company'
export default {
  data () {
    return {
      addEidt_vrisible: false,
      activeName: 'first',
      name: null,
      status: null,
      eidtId: null,
      loading: false,
      tableData: [],
      addEidtForm: {
        ruleForm: {
          name: null,
          parentId: null,
          leadingId: null,
          sort: null,
          remake: null,
          categoryId: null,
          leadingTel: null,
        },
        form_item: [
          {
            type: 'Select',
            label: '上级部门',
            width: '50%',
            placeholder: '请选择',
            prop: 'parentId',
            options: []
          },
          {
            type: 'Input',
            label: '部门名称',
            placeholder: '请输入',
            prop: 'name',
            width: '50%'
          },
          {
            type: 'Slot',
            label: '负责人',
            width: '50%',
            placeholder: '请选择',

            prop: 'leadingId',
            slotName: 'leadingId'
          },
          {
            type: 'Select',
            label: '分类',
            width: '50%',
            placeholder: '请选择',
            prop: 'categoryId',
            options: [
              { value: 1, label: '公司' },
              { value: 2, label: '部门' },
              { value: 3, label: '工作组' }
            ]
          },
          {
            type: 'Input',
            label: '手机号',
            placeholder: '请输入',
            prop: 'leadingTel',
            disabled: true,
            width: '50%'
          },
          {
            type: 'Slot',
            label: '排序',
            placeholder: '请输入',
            width: '50%',
            rows: 5,
            prop: 'sort',
            slotName: 'sort'
          },
          {
            type: 'textarea',
            label: '备注',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'remake'
          }
        ]
      },
      options: []
    }
  },
  created () {
    this.getData()
  },
  // components: {
  //   structureMannagenment,
  //   organizationChart,
  // },

  methods: {
    // 负责人赛选
    remoteMethod (val) {
      this.getUserList(val)
    },
    // 负责人赛选
    sefocus () {
      this.getUserList('')
    },
    change (value) {
      console.log(value)
    },
    // 关闭
    addEidtClose () {
      this.addEidt_vrisible = false
    },
    // 提交
    addEidtSubmit () {
      console.log(this.addEidtForm.ruleForm)
      // 修改
      let resData = {
        id: this.eidtId,
        ...this.addEidtForm.ruleForm
      }
      sysOrganizationUpdate(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.addEidtClose()
          this.getData()
        }
      })
    },
    // 
    edit (row) {
      // if(row.parentId)
      console.log(row)
      sysOrganizationFindById({ id: row.id }).then(res => {
        this.eidtId = res.id
        this.addEidtForm.ruleForm.name = res.name
        this.addEidtForm.ruleForm.parentId = res.parentId
        this.addEidtForm.ruleForm.leadingId = res.leadingId
        this.addEidtForm.ruleForm.sort = res.sort
        this.addEidtForm.ruleForm.remake = res.remake
        this.addEidtForm.ruleForm.categoryId = res.categoryId
        this.addEidtForm.ruleForm.leadingTel = res.leadingTel
        this.getUserList(res.actualName)
        this.addEidt_vrisible = true
      })
    },
    // 表格数据
    getData () {
      sysOrganizationList().then(res => {
        console.log(res)
        this.tableData = res
      })
    },
    // 负责人查询
    getUserList (name) {
      let resData = {
        pageNum: 1,
        size: 100,
        actualName: name
      }
      sysUserList(resData).then(res => {
        this.options = res.tableList
      })
    },
    // 查询
    search () {
      this.tableData = this.tableData.filter(data => (!this.name || !this.status) || data.name.toLowerCase().includes(this.name.toLowerCase()))
      console.log(this.tableData)
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
    &.danger {
        background: #f56c6c;
    }
}
</style>
