<template>
  <div class="main-content">
    <div class="main-titel"
         style="border-bottom: none">
      <span>供应商账单</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="日账单"
                   name="first"></el-tab-pane>
      <el-tab-pane label="月账单"
                   name="second"></el-tab-pane>
      <el-tab-pane label="微信"
                   name="third"></el-tab-pane>
      <el-tab-pane label="支付宝"
                   name="fourth"></el-tab-pane>
      <el-tab-pane label="周期打款"
                   name="tab5"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <!-- 查询重制 -->
      <div class="pay_title">
        <p>1、可查看前一日的在线支付已结算订单账户汇总，资金收益将按照订单的支付方式进入微信账户，支付宝账户和周期打款账户
          <br>
          2、账单生成存在一定延时，如未查询到相应订单，请耐心等待
          <br>

          3、下载账单明细：点击“查看明细”-进入“订单流水明细”-点击“生成报表”
        </p>
      </div>

      <div class="">
        <div style="margin:20px 0">
          <el-date-picker v-model="date1"
                          type="daterange"
                          size="small"
                          range-separator="~"
                          start-placeholder="请选择开始时间 "
                          end-placeholder="结束时间"
                          style="width:280px">
          </el-date-picker>
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
      activeName: 'first',
      // 选中表格数据
      table_row: {},
      // 表格数据
      table_config: {
        thead: [
          { label: '日期', prop: 'table1', width: 'auto' },
          {
            label: '订单数',
            prop: 'table2',
            width: 'auto',
          },
          {
            label: '总收入',
            prop: 'table3',
            width: 'auto',
          },
          { label: '总转出', prop: 'table4', width: 'auto' },

        ],
        table_data: [
          {
            table1: '2020-08-20',
            table2: '23',
            table3: '¥1981.47',
            table4: '¥0.00',
          },
          {
            table1: '2020-08-20',
            table2: '13',
            table3: '¥12981.47',
            table4: '¥0.00',
          },
          {
            table1: '2020-08-20',
            table2: '24',
            table3: '¥1281.42',
            table4: '¥0.00',
          }, {
            table1: '2020-08-20',
            table2: '43',
            table3: '¥1211.17',
            table4: '¥0.00',
          },
          {
            table1: '2020-08-20',
            table2: '28',
            table3: '¥981.47',
            table4: '¥0.00',
          },
          {
            table1: '2020-08-20',
            table2: '29',
            table3: '¥1921.00',
            table4: '¥0.00',
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
.pay_title p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 30px;
}
</style>
