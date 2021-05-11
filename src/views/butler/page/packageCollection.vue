<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>包裹代收</span>
      </div>
      <div class="content">
        <div class="content-btn">
          <el-button class="init-button"
                     @click="add()"
                     icon="el-icon-plus">新增包裹</el-button>
                     
        </div>
        
        <div class="">
          <VueTable ref="table"
                    :config='config'
                    @tableCheck="tableCheck">
            <template slot="tabs">
              <el-tabs v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="全部"
                             name="0"></el-tab-pane>
                <el-tab-pane label="未领取"
                             name="1"></el-tab-pane>
                <el-tab-pane label="已领取"
                             name="2"></el-tab-pane>
                <!-- <el-tab-pane label="停用"
                             name="3"></el-tab-pane> -->
              </el-tabs>
            </template>
            <template slot="footer">
              <div class="table-footer">
                <button>编辑</button>
                <button @click="del(table_row)">删除</button>

              </div>
            </template>
          </VueTable>
        </div>
        <!-- 新增 -->
        <Drawer drawerTitle="新增包裹"
                @drawerClose="addClose"
                :drawerVrisible='add_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">快递信息</template>
              <template>
                <VueForm ref="addForm"
                         :formObj='addForm'>
                  <!-- Slot -->
                  <template v-slot:date>
                    <el-time-picker is-range
                                    v-model="addDate"
                                    range-separator="至"
                                    @change='dateTimeChange'
                                    value-format='HH:MM:SS'
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    placeholder="选择时间范围">
                    </el-time-picker>
                  </template>
                </VueForm>
              </template>
            </FromCard>
          </div>
          <div slot="footer">
            <button class="btn-orange"
                    @click="addSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
            <button class="btn-gray"
                    @click="addClose"><span>取消</span></button>
          </div>
        </Drawer>

      </div>
    </div>
  </div>
</template>

<script>
import { facilitiesManageInsert } from '@/api/butler'
export default {
  data () {
    return {
      add_vrisible: false,
      addDate: null,
      addForm: {
        ruleForm: {
          name: null,
          code: 'hdede',
          facilitiesCategoryId:null,
          address:null
        },
        form_item: [
          {
            type: 'Input',
            label: '设施名称',
            placeholder: '请输入',
            width: '50%',
            prop: 'name'
          },
          // {
          //   type: 'Input',
          //   label: '添加人',
          //   placeholder: '请输入',
          //   width: '50%',
          //   prop: 'createName'
          // },
          // {
          //   type: 'Input',
          //   label: '电话',
          //   placeholder: '请输入',
          //   width: '50%',
          //   prop: 'name'
          // },
          {
            type: 'Input',
            label: '设施编号',
            disabled: true,
            placeholder: '请输入',
            width: '50%',
            prop: 'code'
          },
          {
            type: 'Select',
            label: '设施类型',
            placeholder: '请选择',
            width: '100%',
            options:[
              { value: 1, label: '乒乓球场' },
              { value: 2, label: '篮球场' },
              { value: 3, label: '网球场' },
            ],
            prop: 'facilitiesCategoryId',
          },
          {
            type: 'Input',
            label: '设施地址',
            placeholder: '请输入',
            width: '100%',
            prop: 'address'
          },

        ]
      },
      table_row: [],
      // 上传img文件
      imglist: [],
      activeName: '0',
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '包裹编号', prop: 'code', width: 'auto' },
          { label: '运单号', prop: 'facilitiesCategoryName', width: 'auto' },
          { label: '收件人', prop: 'addressee', width: 'auto' },
          { label: '联系方式', prop: 'tel', width: 'auto' },
          { label: '收件地址', prop: 'address', width: 'auto' },
          { label: '配送公司', prop: 'expressCompany', width: 'auto' },
          { label: '状态', prop: 'status', width: 'auto' },
          { label: '送达时间', prop: 'createDate', width: '220' },
        ],
        table_data: [],
        url: 'facilitiesManageList',
        search_item: [

          {
            type: 'Input',
            label: '包裹编号',
            placeholder: '请输入',
            prop: 'code',
          },
          {
            type: 'Input',
            label: '运单号',
            placeholder: '请输入',
            prop: 'name',
          },
          {
            type: 'Input',
            label: '收件人',
            placeholder: '请输入',
            prop: 'name',
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'tel',
          },
          {
            type: 'Input',
            label: '配送公司',
            placeholder: '请输入',
            prop: 'expressCompany',
          },
          {
            type: 'picker',
            label: '添加时间',
            placeholder: '请输入',
            prop: 'date',
            startDate: 'createStartDate',
            endDate: 'createEndDate',
            width: '280px',
          },
          // Slot
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      }
    }
  },
  methods: {
    add () {
      this.add_vrisible = true
    },
    addClose () {
      this.$refs.addForm.reset()
      this.add_vrisible = false
    },
    addSubmit () {
      let resData = {
        ...this.addForm.ruleForm
        // code: this.addForm.ruleForm.code,
        // name: this.addForm.ruleForm.name,
        // openStartDate: this.openStartDate,
        // openEndDate:  this.openEndDate,
        // imgUrls:this.addForm.ruleForm.imgUrls,
      }
      facilitiesManageInsert(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$refs.table.loadData()
          this.addClose()
        }
      })
    },
    dateTimeChange (arr) {
      this.addForm.ruleForm.openStartDate = arr[0]
      this.addForm.ruleForm.openEndDate = arr[1]
    },
    // tabs切换
    handleClick (tab, event) {
      let status = null
      if (this.activeName != 0) {
        status = this.activeName
      } else {
        status = null
      }
      const requestData = {
        pageNum: 1,
        size: 10,
        status: status
      }
      this.$refs.table.requestData(requestData);
    },

    // 表格选中
    tableCheck (data) {
      this.table_row = data;
    },
    // 删除
    del (data) {
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.table_row.length; i++) {
          arr.push(this.table_row[i].id)
        }
        this.$confirm('是否确认删除？删除不可恢复', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
          this.$refs.table.tableDelete(arr)
        }).catch(action => { });
      } else {
        this.$message.error('请选中需要删除的数据');
      }
    },
  }
}
</script>
