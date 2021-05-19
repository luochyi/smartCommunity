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
            <el-input v-model.trim="search"
                      size='small'
                      placeholder="请输入搜索内容"
                      style="width:240px;margin:10px 0"></el-input>
            <div>
              <el-table :data="ftable"
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

          <!-- <el-tab-pane label="组织架构管理"
                       name="third"></el-tab-pane> -->
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
                <!-- parentList -->
                <template slot='parentId'>
                  <div v-if='parentList.length'>
                    <el-select v-model="addEidtForm.ruleForm.parentId"
                               style="width:240px"
                               placeholder="请选择">
                      <el-option v-for="item in parentList"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                  <!-- 没有上级部门 -->
                  <div v-else>
                    <el-input placeholder="请输入内容"
                              :value="falseParentName"
                              style="width:240px"
                              :disabled="true">
                    </el-input>
                  </div>

                </template>
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
                    <el-option v-for="item in userOptions"
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
      search: null, //搜索
      eidtId: null,  //修改id
      loading: false,  //加载动画
      tableData: [],   //表格数据
      parentList: [],   //上级部门列表
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
            type: 'Slot',
            label: '上级部门',
            width: '50%',
            placeholder: '请选择',
            prop: 'parentId',
            slotName: 'parentId'
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
      userOptions: [],    //负责人列表
      falseParentName: null,  //无上级部门 时显示内容
      ftable: null,
    }
  },
  created () {
    this.getData()
  },
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
    // 编辑
    edit (row) {
      // if(row.parentId)
      // console.log(row)

      // 没有父级部门
      this.falseParentName = row.name
      sysOrganizationFindById({ id: row.id }).then(res => {
        this.eidtId = res.id
        this.addEidtForm.ruleForm.name = res.name
        this.addEidtForm.ruleForm.parentId = res.parentId
        this.addEidtForm.ruleForm.leadingId = res.leadingId
        this.addEidtForm.ruleForm.sort = res.sort
        this.addEidtForm.ruleForm.remake = res.remake
        this.addEidtForm.ruleForm.categoryId = res.categoryId
        this.addEidtForm.ruleForm.leadingTel = res.leadingTel
        this.parentList = res.parentList ? res.parentList : []
        this.getUserList(res.actualName)
        this.addEidt_vrisible = true
      })
    },
    // 表格数据
    getData () {
      sysOrganizationList().then(res => {
        this.tableData = res
        this.ftable = res
        console.log('-')
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
        this.userOptions = res.tableList
      })
    },
    //  树形表格过滤
    handleTreeData (treeData, searchValuse) {
      if (!treeData || treeData.length === 0) {
        return []
      }
      const array = []
      for (let i = 0; i < treeData.length; i += 1) {
        let match = false
        for (let pro in treeData[i]) {
          if (typeof treeData[i][pro] === 'string') {
            match = treeData[i][pro].includes(searchValue)
            if (match) break
          }
        }
        if (this.handleTreeData(treeData[i].organizationList, searchValue).length > 0 || match) {
          array.push({
            ...treeData[i],
            organizationList: this.handleTreeData(treeData[i].organizationList, searchValue),
          })
        }
      }
      return array
    },
    treeTable () {
      var searchValue = this.search
      let treeData = this.tableData
      let handleTreeData = this.handleTreeData(treeData, searchValue)
      return handleTreeData
    },
  },
  watch: {
    search: {
      handler (value) {
        this.ftable = this.treeTable()
      },
      immediate: true,
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
