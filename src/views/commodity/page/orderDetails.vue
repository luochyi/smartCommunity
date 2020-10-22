<template>
  <div class="main-content">
    <div class="main-titel"
         style="border-bottom: none">
      <span>订单流水明细</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="在线支付"
                   name="first"></el-tab-pane>
      <el-tab-pane label="货到付款"
                   name="second"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <!-- 查询重制 -->

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
          <!--    :header-cell-style="{ background: '#F5F5F6', color: '#999999' }" -->
          <el-table :data="tableData"
                    :cell-style="{'text-align':'center',color: '#666666'}"
                    :header-cell-style="{'text-align':'center',background: '#ffffff', color: '#333333'}"
                    border
                    style="width: 100%">
            <el-table-column label="订单信息"
                             width="auto">
              <el-table-column prop="table1"
                               label="订单号"
                               width="180">
              </el-table-column>
              <el-table-column prop="table2"
                               label="下单时间"
                               width="180">
              </el-table-column>
              <el-table-column prop="table3"
                               label="商品ID"
                               width="200">
              </el-table-column>
            </el-table-column>
            <el-table-column label="结算信息">
              <el-table-column prop="table4"
                               label="结算时间"
                               width="160">
              </el-table-column>
              <el-table-column prop="table5"
                               label="结算状态"
                               width="136">
              </el-table-column>
              <el-table-column prop="table6"
                               label="结算账户"
                               width="136">
              </el-table-column>
              <el-table-column prop="table7"
                               label="实际结算金额"
                               width="136">
              </el-table-column>
            </el-table-column>
            <el-table-column label="收入项">
              <el-table-column prop="table8"
                               label="订单实付"
                               width="136">
              </el-table-column>
              <el-table-column prop="table9"
                               label="平台服务费"
                               width="136">
              </el-table-column>
            </el-table-column>
            <el-table-column label="支出项">
              <el-table-column prop="table10"
                               label="订单退款"
                               width="136">
              </el-table-column>
              <el-table-column prop="table11"
                               label="账户转出"
                               width="136">
              </el-table-column>

            </el-table-column>

          </el-table>
        </div>
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
      tableData: [{
        table1: '323534520359',
        table2: '2020-08-22 14:22:22',
        table3: '56343575674567232',
        table4: '2020-08-23 14:22:22',
        table5: '已结算',
        table6: '微信',
        table7: '¥39.00',
        table8: '微信',
        table9: '¥4.00',
        table10: '¥0.00',
        table11: '¥0.00',
      }]

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
