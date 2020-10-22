<template>
  <div class="main-content">
    <div class="main-titel"
         style="border-bottom: none">
      <span>订单结算列表</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部"
                   name="first"></el-tab-pane>
      <el-tab-pane label="待结算"
                   name="second"></el-tab-pane>
      <el-tab-pane label="已结算"
                   name="trid"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <div>
          <input-form :formItem="input_form"
                      :btnWidth="'30%'"> </input-form>
        </div>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow">

          </tableData>
          <div class="table-footer">
            <button>结算</button>
          </div>
        </div>
        <table-pagination :pageSize="10"
                          :totalNumber="150"></table-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// conveniencePhone
export default {
  data () {
    return {
      date1: '',
      activeName: 'first',
      // 选中表格数据
      table_row: {},
      input_form: [
        {
          type: 'startEndDate',
          label: '结算时间',
          prop: 'p1',
          startPlaceholder: '请选择开始时间',
          rangeSeparator: ' ～',
          endPlaceholder: '结束时间'
        },
        {
          type: 'Input',
          label: '供应商名称',
          placeholder: '请输入商品编号',
          prop: 'p2'
        },

      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          {
            label: '所属供应商',
            prop: 'table2',
            width: '220',
          },
          {
            label: '订单数量',
            prop: 'table3',
            width: '120',
          },

          { label: '订单数量', prop: 'table4', width: '180' },
          { label: '创建时间', prop: 'table5', width: '180' },
          { label: '结束时间', prop: 'table6', width: '180' },
          { label: '结算时间', prop: 'table7', width: '180' },
          { label: '订单总额', prop: 'table8', width: '180' },
          { label: '支付金额', prop: 'table9', width: '180' },
          { label: '支付税率', prop: 'table10', width: '180' },
          { label: '结算手续费', prop: 'table11', width: '180' },
          { label: '供应商商品结算金额', prop: 'table12', width: '180' },
          { label: '供应商实际结算金额', prop: 'table13', width: '180' },
          { label: '结算状态', prop: 'table14', width: '180' },
          { label: '结算账期(月)', prop: 'table15', width: '120' },

        ],
        table_data: [
          {
            table1: '1',
            table2: '宁波世纪大厦',
            table3: '5898',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9'
          },
          {
            table1: '2',
            table2: '宁波绿地分公司',
            table3: '3233',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9'
          },
          {
            table1: '3',
            table2: '宁波建设银行分行',
            table3: '31233',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9'
          },
          {
            table1: '4',
            table2: '宁波医科达集团股份有限公司',
            table3: '331231',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9'
          },
          {
            table1: '5',
            table2: '宁波沙马家居外贸有限公司',
            table3: '32133',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9'
          },
        ]
      }
    }
  },

  methods: {
    // table选中行
    tableRow (data) {
      this.table_row = data
    }
  }
}
</script>
<style scoped>
</style>
