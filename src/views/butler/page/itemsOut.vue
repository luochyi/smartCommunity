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
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日预计有
        <span style="color:rgba(251, 71, 2, 1)">3</span>
        户家庭发起装修，共计8户家庭未执行
      </p>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <input-form :formItem="input_form"></input-form>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="全部"
                       name="first"></el-tab-pane>
          <el-tab-pane label="待出门"
                       name="second"></el-tab-pane>
          <el-tab-pane label="已出门"
                       name="third"></el-tab-pane>
          <el-tab-pane label="驳回申请"
                       name="fourth"></el-tab-pane>
        </el-tabs>

        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button>预览</button>
            <button>修改</button>
            <button>打印</button>
            <button>发布</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
    <!-- 删除提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      // 选中表格数据
      table_row: {},
      switch_disabled: '',
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '房屋信息', prop: 'table2', width: '180' },
          { label: '房屋状态', prop: 'table3', width: '180' },
          { label: '业主', prop: 'table4', width: '180' },
          { label: '联系方式', prop: 'table5', width: '180' },
          { label: '物品名称', prop: 'table6', width: '180' },
          { label: '物品照片', prop: 'table7', width: '180', type: 'imagebtn' },
          { label: '申请人', prop: 'table8', width: '180' },
          { label: '联系方式', prop: 'table9', width: '180' },
          { label: '搬运方式', prop: 'table10', width: '180' },
          {
            label: '预计出门时间',
            prop: 'table11',
            width: '180',
            sortable: true
          },
          {
            label: '实际出门时间',
            prop: 'table12',
            width: '180',
            sortable: true
          },
          { label: '出户出门', prop: 'table13', width: '180' },
          {
            label: '出门照片',
            prop: 'table14',
            width: '180',
            type: 'imagebtn'
          },
          { label: '状态', prop: 'table15', width: '180', sortable: true },
          { label: '备注', prop: 'table16', width: '180' }
        ],
        table_data: [
          {
            table1: 1,
            table2: '1-1-0101',
            table3: '出租中',
            table4: '王珂佳',
            table5: '18850988790',
            table6: '家具',
            table7: '1',
            table8: '>100kg',
            table9: '周玲慧',
            table10: '搬家公司',
            table11: '',
            table12: '2020-01-20 14:00',
            table13: '东门',
            table14: '1',
            table15: '已出门',
            table16: ''
          },
          {
            table1: 2,
            table2: '1-1-0102',
            table3: '入住',
            table4: '王珂佳',
            table5: '18850988790',
            table6: '家具',
            table7: '0',
            table8: '>100kg',
            table9: '周玲慧',
            table10: '搬家公司',
            table11: '2020-01-20 12:00 ',
            table12: '2020-01-20 14:00',
            table13: '东门',
            table14: '0',
            table15: '驳回申请',
            table16: '该房屋信息不准确'
          },
          {
            table1: 3,
            table2: '1-1-2201',
            table3: '空置',
            table4: '李章',
            table5: '133890909',
            table6: '电器',
            table7: '0',
            table8: '<50kg',
            table9: '花朵一直',
            table10: '自己搬运',
            table11: '2020-01-20 12:00 ',
            table12: '2020-01-20 14:00',
            table13: '东门',
            table14: '0',
            table15: '驳回申请',
            table16: ''
          },
          {
            table1: 4,
            table2: '1-1-0301',
            table3: '出租中',
            table4: '周丽',
            table5: '133890909',
            table6: '家电',
            table7: '0',
            table8: '50kg-100kg',
            table9: '黄安安',
            table10: '搬家公司',
            table11: '2020-01-20 19:00 ',
            table12: '2020-04-22 14:00',
            table13: '东门',
            table14: '0',
            table15: '同意',
            table16: ''
          },
          {
            table1: 5,
            table2: '1-1-0301',
            table3: '出租中',
            table4: '周丽',
            table5: '133890909',
            table6: '家电',
            table7: '0',
            table8: '50kg-100kg',
            table9: '黄安安',
            table10: '搬家公司',
            table11: '2020-01-20 19:00 ',
            table12: '2020-04-22 14:00',
            table13: '东门',
            table14: '0',
            table15: '同意',
            table16: ''
          },
          {
            table1: 6,
            table2: '1-1-0102',
            table3: '入住',
            table4: '王珂佳',
            table5: '18850988790',
            table6: '家具',
            table7: '1',
            table8: '>100kg',
            table9: '周玲慧',
            table10: '搬家公司',
            table11: '2020-01-20 12:00 ',
            table12: '2020-01-20 14:00',
            table13: '东门',
            table14: '1',
            table15: '驳回申请',
            table16: '该房屋信息不准确'
          },
          {
            table1: 7,
            table2: '1-1-2201',
            table3: '空置',
            table4: '李章',
            table5: '133890909',
            table6: '电器',
            table7: '1',
            table8: '<50kg',
            table9: '花朵一直',
            table10: '自己搬运',
            table11: '2020-01-20 12:00 ',
            table12: '2020-01-20 14:00',
            table13: '东门',
            table14: '0',
            table15: '驳回申请',
            table16: ''
          },
          {
            table1: 8,
            table2: '1-1-0101',
            table3: '出租中',
            table4: '王珂佳',
            table5: '18850988790',
            table6: '家具',
            table7: '1',
            table8: '>100kg',
            table9: '周玲慧',
            table10: '搬家公司',
            table11: '',
            table12: '2020-01-20 14:00',
            table13: '东门',
            table14: '1',
            table15: '已出门',
            table16: ''
          },
          {
            table1: 9,
            table2: '1-1-0102',
            table3: '入住',
            table4: '王珂佳',
            table5: '18850988790',
            table6: '家具',
            table7: '0',
            table8: '>100kg',
            table9: '周玲慧',
            table10: '搬家公司',
            table11: '2020-01-20 12:00 ',
            table12: '2020-01-20 14:00',
            table13: '东门',
            table14: '0',
            table15: '驳回申请',
            table16: '该房屋信息不准确'
          },
          {
            table1: 10,
            table2: '1-1-0101',
            table3: '出租中',
            table4: '王珂佳',
            table5: '18850988790',
            table6: '家具',
            table7: '1',
            table8: '>100kg',
            table9: '周玲慧',
            table10: '搬家公司',
            table11: '',
            table12: '2020-01-20 14:00',
            table13: '东门',
            table14: '1',
            table15: '已出门',
            table16: ''
          }
        ]
      },
      activeName: 'first',
      input_form: [
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '单元/楼栋/房号',
          prop: 'house'
        },
        {
          type: 'select',
          label: '出户出口',
          placeholder: '请选择',
          prop: 'sta43tus',
          options: [
            {
              value: '1',
              label: '半年付'
            },
            {
              value: '2',
              label: '一年付'
            }
          ]
        },
        {
          type: 'Input',
          label: '申请人',
          placeholder: '请输入',
          prop: 'pho323ne'
        },
        {
          type: 'Input',
          label: '联系方式',
          placeholder: '请输入',
          prop: 'houses'
        },
        {
          type: 'startEndDate',
          label: '实际出门时间',
          rangeSeparator: '~',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '结束时间',
          prop: 'date1'
        },

        {
          type: 'checkbox',
          label: '物品名称',
          prop: 'checksabox',
          value: [],
          options: [
            {
              value: '1',
              label: '全部'
            },
            {
              value: '2',
              label: '电器'
            },
            {
              value: '3',
              label: '家具'
            },
            {
              value: '4',
              label: '家纺'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    tableRow (data) {
      this.table_row = data;
    },
    // 删除
    del (data) {
      console.log(data)
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '是否确认删除？删除无法撤回！'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false;
    },
    // 监听子组件确认事件
    confirm (data) {
      this.dialog_visible = false;
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    },

  }
}
</script>
