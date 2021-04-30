<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>工单费用</span>
      </div>
      <div class="content">
        <div class="">
          <VueTable ref="table"
                    :config='config'
                    @tableCheck="tableCheck">
            <!-- searchForm -->
            <template slot="tabs">
              <el-tabs v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="全部"
                             name="0"></el-tab-pane>
                <el-tab-pane label="未缴纳"
                             name="1"></el-tab-pane>
                <el-tab-pane label="部分缴纳"
                             name="2"></el-tab-pane>
              </el-tabs>
            </template>
            <template slot="footer">
              <div class="table-footer">
                <button>退款</button>
                <button>缴费</button>
                <button>删除</button>
                <button>详情</button>
              </div>
            </template>
          </VueTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '0',
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '费用名称', prop: 'name', width: '180' },
          { label: '费用单号', prop: 'dispatchListCode', width: '180' },
          { label: '交易号', prop: 'orderCode', width: '180' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '费用金额', prop: 'costPrice', width: '180' },
          { label: '计费开始时间', prop: 'beginDate', width: '180' },
          { label: '计费结束时间', prop: 'endDate', width: '180' },
          { label: '计费单价/单位', prop: 'unitPrice', width: '180' },
          { label: '面积/用量/数量', prop: 'num', width: '180' },
          { label: '已缴金额', prop: 'paidPrice', width: '180' },
          { label: '代收总计', prop: 'paymentPrice', width: '180' },
          { label: '应收总计', prop: 'totalPrice', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          { label: '备注', prop: 'remake', width: '280' },
          { label: '创建人', prop: 'createName', width: '180' },
          { label: '更新时间', prop: 'updateDate', width: '180' },
        ],
        table_data: [],
        url: 'workOrderCostList',
        // 是否请求后台
        // isRequest: false,
        search_item: [
          {
            type: 'select',
            label: '费用项目名称',
            placeholder: '请选择',
            value: '',
            prop: 'a',
            options: [
              {
                label: '水电费',
                value: 1
              },
              {
                label: '车辆费',
                value: 2
              }
            ],
          },

          {
            type: 'Input',
            label: '缴费人',
            placeholder: '请选择',
            prop: 'b'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'c'
          },
          {
            type: 'startDate',
            label: '计费时间',
            placeholder: '请选择开始日期',
            prop: 'd'
          },
          {
            type: 'endDate',
            label: '计费时间',
            placeholder: '请选择结束时间',
            prop: 'e'
          },
          {
            type: 'picker',
            label: '时间',
            placeholder: '楼栋/单元/房间号',
            prop: 'sss',
            startDate: 'sDate',
            endDate: 'eDate',
            width: '280px',
            value: null,
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      }
    }
  },
  methods: {
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
    }
  }
}
</script>
