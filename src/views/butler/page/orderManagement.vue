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
      <span>派工单管理</span>
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
          <el-tab-pane label="待分配"
                       name="second"></el-tab-pane>
          <el-tab-pane label="已分配未接单"
                       name="third"></el-tab-pane>
          <el-tab-pane label="已处理"
                       name="fourth"></el-tab-pane>
          <el-tab-pane label="已确认已完成"
                       name="four12h"></el-tab-pane>
          <el-tab-pane label="已关闭"
                       name="fou2rth"></el-tab-pane>
          <el-tab-pane label="已取消"
                       name="fou3rth"></el-tab-pane>
          <el-tab-pane label="已作废"
                       name="four31th"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <tableData :config="table_config"></tableData>
          <div class="table-footer">
            <button>详情</button>
            <button>编辑</button>
            <button>派工</button>
            <button>回访</button>
            <button>作废</button>
            <button>删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '工单号', prop: 'table2', width: '180' },
          { label: '工单类型', prop: 'table3', width: '180' },
          { label: '状态', prop: 'table4', width: '180' },
          { label: '派工时间', prop: 'table5', width: '180' },
          { label: '工单时限', prop: 'table6', width: '180' },
          { label: '提交', prop: 'table7', width: '180' },
          { label: '提交人电话', prop: 'table8', width: '180' },
          { label: '操作人', prop: 'table9', width: 'auto' },
          { label: '操作地点', prop: 'table10', width: '180' },
          { label: '要求处理事项', prop: 'table11', width: '180' },
          { label: '派工备注', prop: 'table12', width: '180' },
          { label: '开始处理时间', prop: 'table13', width: '180' },
          { label: '回访时间', prop: 'table14', width: '180' },
          { label: '回访情况说明', prop: 'table15', width: '180' }
        ],
        table_data: [
          {
            table1: 1,
            table2: '330887879384',
            table3: '报事报修',
            table4: '已分配处理中',
            table5: '2020-01-20 12:00',
            table6: '8小时内处理',
            table7: '周玲慧',
            table8: '18850988790',
            table9: '卢志',
            table10: '1-2-0801',
            table11: '窗户坏了',
            table12: '快点来修',
            table13: '2020-01-20 14:00',
            table14: '2020-01-22 14:00',
            table15: '满意'
          },
          {
            table1: 2,
            table2: '330887879384',
            table3: '报事报修',
            table4: '待分配',
            table5: '2020-01-20 12:00',
            table6: '8小时内处理',
            table7: '马泽鹏',
            table8: '18850988790',
            table9: '姜铧绒',
            table10: '1-2-0701',
            table11: '下水道疏通',
            table12: '晚上来修，白天没人',
            table13: '2020-01-20 14:00',
            table14: '2020-01-22 14:00',
            table15: '满意'
          },
          {
            table1: 3,
            table2: '330887879384',
            table3: '报事报修',
            table4: '已处理',
            table5: '2020-01-20 12:00',
            table6: '8小时内处理',
            table7: '王珂',
            table8: '18850988790',
            table9: '秦维',
            table10: '1-2-0701',
            table11: '中央空调不冷',
            table12: '快点来修',
            table13: '2020-01-20 14:00',
            table14: '2020-01-22 14:00',
            table15: '满意'
          }
        ]
      },
      input_form: [
        {
          type: 'Input',
          label: '报修单号',
          placeholder: '请输入',
          prop: 'houssssd'
        },
        {
          type: 'Input',
          label: '报修人',
          placeholder: '请输入',
          prop: 'houses'
        },

        {
          type: 'select',
          label: '工单大类',
          placeholder: '请选择',
          value: [],
          prop: 'house',
          options: [
            { value: '1', label: '阿斯顿' },
            { value: '2', label: '阿斯as顿' }
          ]
        },
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '单元/楼栋/房号',
          prop: 'hous2wsssd'
        },
        {
          type: 'startEndDate',
          label: '发布时间',
          rangeSeparator: '~',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '结束时间',
          prop: 'date1'
        },
        {
          type: 'Input',
          label: '分配人',
          placeholder: '请输入',
          prop: 'hou22ssssd'
        },
        {
          type: 'Input',
          label: '维修人',
          placeholder: '请ss输入',
          prop: 'hou23ssssd'
        }
      ]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log('submit!')
    },
    ckimg () {
      this.showViewer = true
    }, // 关闭查看器
    closeViewer () {
      this.showViewer = false
    }
  }
}
</script>
