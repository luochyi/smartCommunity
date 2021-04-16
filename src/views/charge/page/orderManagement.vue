<template>
  <div v-if="change">
    <div class="main-content">
      <div class="main-titel">
        <span>工单费用</span>
      </div>
      <div class="content">
        <div class="">
          <VueTable ref="table"
                    :config='config'
                    @tableCheck="tableCheck">
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
                <button @click="refundVrisible=true">退款</button>
                <button @click="Pay()">缴费</button>
                <button>删除</button>
                <button>详情</button>
              </div>
            </template>
          </VueTable>
        </div>
      </div>

      <!-- 退款 -->
      <Refund :drawerVrisible='refundVrisible'
              @handleClose='getClose'></Refund>
    </div>
    <!-- 缴费 -->
  </div>
  <div v-else>
    <Pay v-if="Pay_show"
         @cancel="cancel"></Pay>
  </div>
</template>

<script>
import Refund from '@/views/charge/components/depositManagement/Refund.vue'
import Pay from '@/views/charge/components/dailyMayment/Pay.vue'
export default {
  data () {
    return {
      change: true,
      Pay_show: false,
      // 退款
      refundVrisible: false,
      // 添加抽屉数据
      drawer_config: {
        drawer_vrisible: false,
        head_title: '添加押金',
        content_title: '基本信息',
        ruleForm: {
          p1: '',
          p2: '',
          p3: '',
          p4: '',
          p5: '',
          p6: '',
          p7: '5000',
          p8: '',
          p9: '',
          p10: '',
          p11: '',
          p12: ''
        },
        form_item: [
          {
            type: "Select",
            label: "费用项目名",
            value: '',
            placeholder: '请选择',
            width: "50%",
            options: [],
            prop: "p1",
          },
          {
            type: "Select",
            label: "费用类型",
            value: '',
            placeholder: '请选择',
            width: "50%",
            disabled: true,
            options: [],
            prop: "p2",
          }, {
            type: "Input",
            label: "房屋信息",
            value: '',
            placeholder: '请输入',
            width: "50%",
            prop: "p3",
          },
          {
            type: "Select",
            label: "来源",
            value: '',
            placeholder: '请选择',
            width: "50%",
            options: [],
            prop: "p4",
          },
          {
            type: "Input",
            label: "押金人姓名",
            value: '',
            placeholder: '请输入',
            width: "50%",
            prop: "p5",
          },

          {
            type: "Input",
            label: "押金人联系方式 ",
            value: '',
            placeholder: '请输入',
            width: "50%",
            prop: "p6",
          },
          {
            type: "Select",
            label: "押金金额",
            value: '',
            placeholder: '请选择',
            width: "50%",
            disabled: true,
            options: [],
            prop: "p7",
          },
          {
            type: "Select",
            label: "支付方式",
            value: '',
            placeholder: '请选择',
            width: "50%",
            options: [],
            prop: "p8",
          },
          {
            type: "date",
            label: "缴费时间",
            value: '',
            placeholder: '请选择时间',
            width: "100%",
            options: [],
            prop: "p9",
          },
          {
            type: "date",
            label: "装修开始时间",
            value: '',
            placeholder: '请选择时间',
            width: "50%",
            options: [],
            prop: "p10",
          },
          {
            type: "date",
            label: "装修结束时间",
            value: '',
            placeholder: '请选择时间',
            width: "50%",
            options: [],
            prop: "p11",
          },
          {
            type: "textarea",
            label: "备注",
            placeholder: "请输入",
            rows: 6,
            width: "100%",
            prop: "p12",
          }
        ],
      },
      drawer_vrisible: false,
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
        search_item: [
          {
            type: 'select',
            label: '费用项目名称',
            placeholder: '请选择',
            value: '',
            prop: 'chargesTemplateDetailId',
            options: [
              {
                label: '水电费',
                value: '1'
              },
              {
                label: '车辆费',
                value: '2'
              }
            ],
          },
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '楼栋/单元/房间号',
            prop: 'roomName'
          },
          {
            type: 'Input',
            label: '缴费人',
            placeholder: '请选择',
            prop: 'payName'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'tel'
          },
          {
            type: 'startDate',
            label: '计费时间',
            placeholder: '请选择开始日期',
            prop: 'beginDate'
          },
          {
            type: 'endDate',
            label: '计费时间',
            placeholder: '请选择结束时间',
            prop: 'endDate'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      }
    }
  },
  components: {
    Refund,
    Pay
  },
  methods: {
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
    tableCheck (data) {
      this.table_row = data;
    },
    Pay () {
      this.change = false;
      this.Pay_show = true;
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false;
      this.refundVrisible = false;
    },
    cancel (data) {
      this.Pay_show = false;
      this.change = true;
      console.log(data + "")
    }
  }
}
</script>
