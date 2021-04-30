<template>
  <div class="main-content">
    <div class="main-titel">
      <span>预约管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="add">新增预约</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <searchForm :formItem="search_item"
                    :btnWidth="'10%'">
          <template slot="date">
            <el-date-picker v-model="date"
                            style='width:280px'
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </template>
        </searchForm>
        <div>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="全部"
                         name="0"></el-tab-pane>
            <el-tab-pane label="未签到"
                         name="1"></el-tab-pane>
            <el-tab-pane label="已签到"
                         name="2"></el-tab-pane>
            <el-tab-pane label="已作废"
                         name="3"></el-tab-pane>
            <el-tab-pane label="已结束"
                         name="4"></el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <tableData :config="config"
                     @clickrow="tableRow">
            <template v-slot:stutas="slotData">
              <div>
                <span v-if="slotData.data.stutas===1"
                      style="color:#cccc">未完成</span>
                <span v-else-if="slotData.data.stutas===2">已完成</span>

              </div>
            </template>
          </tableData>
          <div class="table-footer">
            <button>详情</button>
            <button>作废</button>
          </div>
          <div>
            <table-pagination :pageSize='10'
                              :totalNumber='90'></table-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--预约 -->
    <Drawer :drawerTitle="addEidtTitle"
            @drawerClose="addEidtClose"
            :drawerVrisible='addEidt_vrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="addEidtVueForm"
                     :formObj='addEidtForm'>
               <template slot="date">
                  <el-date-picker v-model="date"
                                  style='width:280px'
                                  type="datetimerange"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期">
                  </el-date-picker>
                </template>
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
</template>

<script>
import facilitiesData from '@/api/data.js'
export default {
  data () {
    return {
      date: [],
      activeName: '0',
      // 业委会标题 业委会显示隐藏
      addEidtTitle: '',
      addEidt_vrisible: false,
      editId: 0,
      table_row: [],
      search_item: [
        {
          type: 'Input',
          label: '预约编号',
          placeholder: '请输入',
          prop: 'code',
        },
        {
          type: 'select',
          label: '设施种类',
          placeholder: '请选择',
          prop: 'positionId',
          value: '',
          options: [
            { value: 1, label: '篮球场' },
            { value: 2, label: '会议室' },
            { value: 3, label: '办公桌' },
          ]
        },
        {
          type: 'Input',
          label: '预约人',
          placeholder: '请输入',
          prop: 'bookingPerson',
        },
        {
          type: 'select',
          label: '预约状态',
          placeholder: '请选择',
          prop: 'bookingStatus',
          options: [
            { value: 1, label: '未签到' },
            { value: 2, label: '已签到' },
            { value: 3, label: '已作废' },
            { value: 4, label: '已结束' },
          ]
        },
        {
          type: 'Slot',
          label: '添加时间',
          placeholder: '请输入',
          prop: 'date',
          slotName: 'date'
        },
        {
          type: 'Slot',
          label: '申请时间',
          placeholder: '请输入',
          prop: 'requestDate',
          slotName: 'date'
        },
        // Slot
      ],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '预约编号', prop: 'code', width: 'auto' },
          { label: '设施类型', prop: 'ssname', width: 'auto' },
          { label: '预约设施', prop: 'yyss', width: 'auto' },
          { label: '预约人', prop: 'name', width: 'auto' },
          { label: '预约人电话', prop: 'bookingTel', width: 'auto' },
          { label: '预约时间', prop: 'bookingDate', width: '220' },
          { label: '预约人状态', prop: 'bookingStatus', width: 'auto' },
          { label: '申请时间', prop: 'requestDate', width: '220' },
        ],
        table_data: [
          {
            code: '1231231231312',
            name: '会议室',
            ssmc: '03',
            name: '张三',
            stutas: 1,
            ssqk: '正常',
            sszt: '使用中',
            date: '2020-04-13 19:00-20:30'
          },
          {
            code: '1231231231312',
            name: '会议室',
            ssmc: '03',
            name: '张三',
            stutas: 2,
            ssqk: '正常',
            sszt: '使用中',
            date: '2020-04-13 19:00-20:30'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      addEidtForm: {
        ruleForm: {
          residentId: null,
          positionId: null,
          age: null,
          educationId: null,
          roomName: null,
          profession: null,
          // sex: null,
          fileUrls: []
        },
        form_item: [
          { type: 'Input', label: '姓名', placeholder: '请输入姓名', width: '50%', prop: 'name', slotName: 'name' },
          {
            type: 'Input', label: '电话', width: '50%', prop: 'tel',disabled:true
          },
          {
            type: 'Input', label: '房屋信息', placeholder: '楼栋/单元/室号', width: '50%', prop: 'house',disabled:true
          },
          {
            type: 'Input', label: '设施编号',  width: '50%', prop: 'code', disabled: true,placeholder: '045512'
          },
          {
            type: 'Select', label: '设施类型', width: '50%', prop: 'facilitiesItem',
            options: [
              { value: 1, label: '篮球场' },
              { value: 2, label: '办公桌' }
            ]
          },
          {
            type: 'Select', label: '预约设施', width: '100%', prop: 'bookingFacilities',
            options: [
              { value: 1, label: '篮球场' },
              { value: 2, label: '办公桌' }
            ]
          },
          {
            type: 'Slot', label: '预约时间',  width: '100%', prop: 'date',slotName: 'date'
          }
        ],
        rules: {
        }
      },
      ownersObj: {}
    }
  },
  methods: {
    // tabs切换
    handleClick () {

    },
    // 添加修改弹窗提交验证通过
    addEidtRuleSubmit () {

    },
    // 添加修改弹窗提交
    addEidtSubmit () {
      this.addEidtClose()
    },
    // 添加成员 弹窗显示
    add () {
      this.addEidtTitle = '新增预约'
      this.addEidt_vrisible = true;
      console.log(facilitiesData)
    },
    // 修改 弹窗显示
    edit (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('不能批量编辑');
          return
        }
        this.addEidtTitle = '编辑任务'
        console.log(this.table_row)
      } else {
        this.$message.error('请选择需要编辑的数据');
      }
    },
    //  弹窗关闭显示
    addEidtClose () {
      // 初始化数据 重置
      this.editId = 0
      for (let key in this.addEidtForm.ruleForm) {
        this.$set(this.addEidtForm.ruleForm, key, null)
      }
      this.$refs.addEidtVueForm.reset()
      this.addEidt_vrisible = false
    },
    tableRow (data) {
      this.table_row = data
      console.log(data)
    },
    // 删除
    del (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      if (!arr.length) {
        this.$message.error('请选中需要删除的表格数据')
        return
      }
      this.$confirm('是否删除？删除不可找回', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$refs.table.tableDelete(arr)
      }).catch(action => { });
    }
  }
}
</script>
<style lang="scss" scoped>
.sys-image {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-right: 12px;
}
</style>
