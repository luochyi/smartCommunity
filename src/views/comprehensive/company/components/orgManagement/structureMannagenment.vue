<template>
  <div>
    <div class="org-form">
      <el-form :inline="true"
               :model="formInline"
               label-width="80px"
               size="mini"
               class="demo-form-inline">
        <el-form-item label="部门名称">
          <el-input v-model="formInline.user"
                    placeholder="请输入"
                    style="width:240px"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region"
                     placeholder="请选择"
                     style="width:240px;margin-right:120px;">
            <el-option label="正常"
                       value="shanghai"></el-option>
            <el-option label="异常"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="org-list">
      <template>
        <el-table :data="tableData"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  border
                  default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  :header-cell-style="{background: '#F5F5F6',color:'#606266'}">
          <el-table-column prop="Organization_level"
                           width="296"
                           label="组织机构层级"></el-table-column>
          <el-table-column prop="classification"
                           label="分类">
          </el-table-column>
          <el-table-column prop="main_principal"
                           label="主要负责人">
          </el-table-column>
          <el-table-column prop="phone"
                           label="电话"> </el-table-column>
          <el-table-column prop="people_number"
                           label="人数"> </el-table-column>
          <el-table-column prop="status"
                           label="状态">
            <template>
              <div class="status_box">
                <div class="status_icon">
                </div>
                <span>正常</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="Remarks"
                           label="备注"></el-table-column>
          <el-table-column prop="operating"
                           label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">编辑</el-button>
              <el-button type="text"
                         size="small">更多 <i class="el-icon-arrow-down"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!--点击编辑之后的弹窗-->
    <template>
      <el-drawer title="我是标题"
                 size="52%"
                 :visible.sync="drawer"
                 :with-header="false">
        <edit-department></edit-department>
      </el-drawer>
    </template>
  </div>
</template>

<script>
import editDepartment from '@/views/company/components/orgManagement/editDepartment.vue'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
      drawer: false,
      tableData: [
        {
          id: 1,
          Organization_level: '深圳市凯达来科技有限公司',
          classification: '公司',
          main_principal: '曾森',
          phone: '13607932521',
          people_number: 1800,
          status: '正常',
          Remarks: '—',
          operating: '编辑',
          children: [
            {
              id: 31,
              Organization_level: '运营部',
              classification: '公司',
              main_principal: '李健',
              phone: '18607932583',
              people_number: 1000,
              status: '正常',
              Remarks: '—',
              operating: '编辑',
              children: [
                {
                  id: 32,
                  Organization_level: '空调组',
                  classification: '公司',
                  main_principal: '王伟',
                  phone: '13707932583',
                  people_number: 1000,
                  status: '正常',
                  Remarks: '—',
                  operating: '编辑',
                },
              ],
            },
            {
              id: 33,
              Organization_level: '财务部',
              classification: '公司',
              main_principal: '李湘',
              phone: '13237932583',
              people_number: 1000,
              status: '正常',
              Remarks: '—',
              operating: '编辑',
              children: [
                {
                  id: 34,
                  Organization_level: '业务',
                  classification: '公司',
                  main_principal: '刘昊',
                  phone: '18607932583',
                  people_number: 1000,
                  status: '正常',
                  Remarks: '—',
                  operating: '编辑',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  components: {
    editDepartment,
  },
  methods: {
    handleClick(row) {
      this.drawer = true
      console.log(row)
    },
    onSubmit() {
      console.log('submit!')
    },

    lll() {
      console.log(1)
    },
  },
}
</script>

<style scoped>
.status_icon {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 10px;
  border-radius: 50%;
  background: #52c41a;
}
</style>
