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
    <div class="main-titel"
         style="border-bottom:none">
      <span>服务请求</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="待处理"
                       name="first"></el-tab-pane>
          <el-tab-pane label="已完成"
                       name="second"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow">
            <template v-slot:table8="slotData">
              <div>
                <el-button class="init-text"
                           type="text">{{
                  slotData.data.table8
                }}</el-button>
              </div>
            </template>
          </tableData>
          <div class="table-footer">
            <button>编辑</button>
            <button>查看订单</button>
            <button>查看处理</button>
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
      activeName: 'first',
      // 选中表格数据
      table_row: {},
      // 表格数据
      table_config: {
        thead: [
          { label: '服务请求ID', prop: 'table1', width: '180' },
          { label: '订单ID', prop: 'table2', width: '200' },
          { label: '创建时间', prop: 'table3', width: '220' },
          { label: '处理时间', prop: 'table4', width: '220' },
          {
            label: '处理人',
            prop: 'table5',
            width: '120'
          },
          {
            label: '服务内容',
            prop: 'table6',
            width: '180'
          },
          { label: '回复内容', prop: 'table7', width: '220' }
        ],
        table_data: [
          {
            table1: '324520352',
            table2: '323534520387',
            table3: '2020-08-20 09:00:33',
            table4: '2020-08-20 09:00:33',
            table5: '何非希',
            table6:
              '用户反馈收到商品少件，要求商家回电协商处理，请商家24小时内联系用户处理 ',
            table7: '已经回电，但用户没接'
          },
          {
            table1: '323534520359',
            table2: '323534520359',
            table3: '2020-08-20 09:00:33',
            table4: '2020-08-20 09:00:33',
            table5: '张亮',
            table6:
              '用户反馈收到商品丢失，要求商家回电协商处理，请商家24小时内联系用户处理 ',
            table7: '以协商一致，重新发货'
          },
          {
            table1: '323534520312',
            table2: '323534520319',
            table3: '2020-08-20 09:00:33',
            table4: '2020-08-20 09:00:33',
            table5: '刘吨',
            table6:
              '用户反馈收到商品损坏，要求商家回电协商处理，请商家24小时内联系用户处理 ',
            table7: '已经回电，但用户没接'
          },
          {
            table1: '323534520359',
            table2: '323534520323',
            table3: '2020-08-20 09:00:33',
            table4: '2020-08-20 09:00:33',
            table5: '章东升',
            table6:
              '用户反馈收到商品丢失，要求商家回电协商处理，请商家24小时内联系用户处理 ',
            table7: '已经回电，但用户没接'
          },
          {
            table1: '323534523359',
            table2: '323534520359',
            table3: '2020-08-20 09:00:33',
            table4: '2020-08-20 09:00:33',
            table5: '何非希',
            table6:
              '用户反馈收到商品少件，要求商家回电协商处理，请商家24小时内联系用户处理 ',
            table7: '已经回电，但用户没接'
          }
        ]
      }
    }
  },

  methods: {
    // table选中行
    tableRow (data) {
      this.table_row = data
    },
    handleClick () { }
  }
}
</script>
