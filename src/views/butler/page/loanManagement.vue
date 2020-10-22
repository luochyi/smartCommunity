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
      <span>借还管理</span>
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
          <el-tab-pane label="出借中"
                       name="second"></el-tab-pane>
          <el-tab-pane label="已还"
                       name="third"></el-tab-pane>
        </el-tabs>
        <tableData :config="table_config"
                   @clickrow='tableRow'></tableData>
        <div class="table-footer">
          <button @click="msg(table_row)">提醒</button>
          <button @click="del(table_row)">删除</button>

        </div>
        <table-pagination></table-pagination>
        <!-- 提醒 -->
        <Dialog :dialogVisible='dialog_visible'
                :dialog_config='dialog_config'
                @cancel='cancel'
                @confirm='confirm'>
        </Dialog>
      </div>
    </div>

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
      activeName: 'first',
      value1: 3.7,
      input_form: [
        {
          type: 'Input',
          label: '物品名称',
          placeholder: '请输入',
          prop: 'hojsuse'
        },

        {
          type: 'select',
          label: '物品状态',
          value: [],
          options: [],
          placeholder: '请选择',
          prop: 'selectstuats'
        },

        {
          type: 'Input',
          label: '借用人',
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
          label: '借用时间',
          rangeSeparator: '~',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '结束时间',
          prop: 'date1'
        }
      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '房屋信息', prop: 'table2', width: '180' },
          { label: '业主', prop: 'table3', width: '180' },
          { label: '联系方式', prop: 'table4', width: '180' },
          { label: '紧急联系人', prop: 'table5', width: '180' },
          { label: '联系方式', prop: 'table6', width: '180' },
          { label: '施工单位', prop: 'table7', width: '180' },
          { label: '门禁卡', prop: 'table8', width: '180' },
          { label: '负责人', prop: 'table9', width: '180' },
          { label: '联系方式', prop: 'table10', width: '180' },
          { label: '装修押金', prop: 'table11', width: '180' },
          {
            label: '申请时间',
            prop: 'table12',
            width: '180',
            sortable: true
          },
          {
            label: '预计开始时间',
            prop: 'table13',
            width: '180',
            sortable: true
          },
          {
            label: '预计结束时间',
            prop: 'table14',
            width: '180',
            sortable: true
          },
          {
            label: '实际开始时间',
            prop: 'table15',
            width: '180',
            sortable: true
          },
          {
            label: '实际结束时间',
            prop: 'table16',
            width: '180',
            sortable: true
          },
          { label: '垃圾清运费', prop: 'table17', width: '180' },
          { label: '公共设施修复', prop: 'table18', width: '180' },
          { label: '退还押金', prop: 'table19', width: '180' },
          { label: '是否退还门禁卡', prop: 'table20', width: '180' },
          { label: '状态', prop: 'table21', width: '180' },
          { label: '审批结果', prop: 'table22', width: '180', type: 'txtbtn' },
          { label: '审批时间', prop: 'table23', width: '180' },
          { label: '最后一次完工检查情况', prop: 'table24', width: '180' },
          { label: '备注', prop: 'table25', width: '100', type: 'tooltip' }
        ],
        table_data: [
          {
            table1: 1,
            table2: '1-1-0101',
            table3: '王珂佳',
            table4: '18850988790',
            table5: '周林会',
            table6: '18850988790',
            table7: '宏远装修公司',
            table8: '1',
            table9: '王珂佳',
            table10: '18845355790',
            table11: '¥5000',
            table12: '2020-08-20 12:00',
            table13: '2020-02-05',
            table14: '2020-04-09',
            table15: '2020-04-27',
            table16: '2020-09-14',
            table17: '',
            table18: '',
            table19: '',
            table20: '否',
            table21: '未开始',
            table22: {},
            table23: '',
            table24: '',
            table25: '业主损坏承重墙'
          },
          {
            table1: 2,
            table2: '1-1-102',
            table3: '周晓晓',
            table4: '13909078899',
            table5: '周林会',
            table6: '18850988790',
            table7: '宏远装修公司',
            table8: '1',
            table9: '马泽鹏',
            table10: '18845355790',
            table11: '¥5000',
            table12: '2020-08-20 12:00',
            table13: '2020-09-05',
            table14: '2020-01-09',
            table15: '2020-03-27',
            table16: '2020-02-14',
            table17: '¥1200',
            table18: '¥200',
            table19: '¥1200',
            table20: '是',
            table21: '装修中',
            table22: {},
            table23: '',
            table24: '',
            table25: ''
          },
          {
            table1: 3,
            table2: '1-1-0101',
            table3: '王珂佳',
            table4: '18850988790',
            table5: '周林会',
            table6: '18850988790',
            table7: '宏远装修公司',
            table8: '1',
            table9: '王珂佳',
            table10: '18845355790',
            table11: '¥5000',
            table12: '2020-08-20 12:00',
            table13: '2020-02-05',
            table14: '2020-04-09',
            table15: '2020-04-27',
            table16: '2020-09-14',
            table17: '',
            table18: '',
            table19: '',
            table20: '否',
            table21: '装修结束-已退押金',
            table22: {
              status: '不合格',
              label: '照片'
            },
            table23: '',
            table24: '',
            table25: ''
          },
          {
            table1: 4,
            table2: '1-1-0101',
            table3: '王珂佳',
            table4: '18850988790',
            table5: '周林会',
            table6: '18850988790',
            table7: '宏远搬家公司',
            table8: '1',
            table9: '马小明',
            table10: '18845355790',
            table11: '¥5000',
            table12: '2020-08-20 12:00',
            table13: '2020-03-10 15:12 ',
            table14: '2020-12-01',
            table15: '2020-04-08',
            table16: '2020-09-14',
            table17: '',
            table18: '',
            table19: '',
            table20: '否',
            table21: '装修结束-未退押金',
            table22: {
              status: '合格',
              label: '照片'
            },
            table23: '',
            table24: '',
            table25: '业主损坏承重墙'
          }
        ]
      },
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log('submit!')
    },
    tableRow (data) {
      this.table_row = data;
    },
    msg (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '提醒'
        this.dialog_config.content = '提醒成功已将消息发送给用户'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要提醒的用户');
      }
    },
    // 删除
    del (data) {
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
