<template>
  <div class="main-content">
    <div class="main-titel"
         style="border-bottom: none">
      <span>订单结算列表</span>
    </div>

    <div class="content">
      <!-- 查询重制 -->

      <div class="">
        <input-form :formItem="input_form"
                    :btnWidth="'30%'"> </input-form>
        <div>
          <span class="el_lable">订单总额</span><span class="el_txt">¥10371.62</span>
          <span class="el_lable">订单总额</span><span class="el_txt"
                style="color: #FB4702;">¥10371.62</span>
        </div>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow">

          </tableData>
          <div class="table-footer">
            <button>查看</button>
            <button>编辑</button>
            <button>删除</button>
          </div>
        </div>
        <table-pagination :pageSize="10"
                          :totalNumber="100"></table-pagination>
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
      // 选中表格数据
      table_row: {},
      input_form: [
        {
          type: 'startEndDate',
          label: '时间范围',
          prop: 'p1',
          startPlaceholder: '请选择开始时间',
          rangeSeparator: ' ～',
          endPlaceholder: '结束时间',
        },

      ],
      // 表格数据
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          {
            label: '订单号',
            prop: 'table2',
            width: '180',
          },
          {
            label: '创建时间',
            prop: 'table3',
            width: '180',
          },
          { label: '订单总额', prop: 'table4', width: '100' },
          { label: '支付金额', prop: 'table5', width: '160' },
          { label: '所属供应商', prop: 'table6', width: '220' },
          { label: '支付税率', prop: 'table7', width: '180' },
          { label: '结算手续费', prop: 'table8', width: '180' },
          { label: '供应商商品结算金额', prop: 'table9', width: '180' },
          { label: '供应商实际结算金额', prop: 'table10', width: '180' },
          { label: '结算状态', prop: 'table11', width: '100' },
          { label: '结算账期(月)', prop: 'table12', width: '120' },
        ],
        table_data: [
          {
            table1: '1',
            table2: '323534520123',
            table3: '2020-08-10 12:31:29',
            table4: '¥1021300.00',
            table5: '¥1021300.00',
            table6: '浙江金桥股份有限公司',
            table7: '0.060',
            table8: '¥60.00',
            table9: '¥1021300.00',
            table10: '¥940.00',
            table11: '待结算',
            table12: '8'
          },
          {
            table1: '2',
            table2: '3235333340359',
            table3: '2020-08-10 12:31:29',
            table4: '¥1021300.00',
            table5: '¥1021300.00',
            table6: '宁波方特主题公园',
            table7: '0.060',
            table8: '¥60.00',
            table9: '¥1000.00',
            table10: '¥940.00',
            table11: '待结算',
            table12: '8'
          },
          {
            table1: '3',
            table2: '331234520359',
            table3: '2020-08-10 12:31:29',
            table4: '¥1021300.00',
            table5: '¥1021300.00',
            table6: '思域可达集团',
            table7: '0.060',
            table8: '¥60.00',
            table9: '¥1000.00',
            table10: '¥940.00',
            table11: '待结算',
            table12: '8'
          },
          {
            table1: '4',
            table2: '323534512359',
            table3: '2020-08-10 12:31:29',
            table4: '¥100012.00',
            table5: '¥100012.00',
            table6: '宁波集成股份有限公司',
            table7: '0.060',
            table8: '¥60.00',
            table9: '¥1000.00',
            table10: '¥940.00',
            table11: '待结算',
            table12: '8'
          },
          {
            table1: '5',
            table2: '323534520353',
            table3: '2020-08-10 12:31:29',
            table4: '¥121000.00',
            table5: '¥121000.00',
            table6: '斯巴达集团',
            table7: '0.060',
            table8: '¥60.00',
            table9: '¥1000.00',
            table10: '¥940.00',
            table11: '待结算',
            table12: '8'
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
.el_lable {
    font-size: 14px;
    padding-right: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 20px;
}
.el_txt {
    font-size: 16px;
    padding-right: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
}
</style>
