<template>
  <div v-if="change">
    <div class="main-content">
      <div class="main-titel">
        <span>工单费用</span>
      </div>
      <div class="content">
        <div class="content-btn">
          <el-button class="init-button"
                     icon="el-icon-plus"
                     @click="drawer_vrisible = true">添加费用</el-button>
          <!-- 
        <el-button class="init-text" type="text">模板下载</el-button> -->
        </div>
        <!-- 查询重制 -->
        <div class="">
          <!-- 头部输入框 -->
          <input-form :formItem="input_form"></input-form>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="全部"
                         name="first"></el-tab-pane>
            <el-tab-pane label="未缴纳"
                         name="second"></el-tab-pane>
            <el-tab-pane label="已缴纳"
                         name="third"></el-tab-pane>
          </el-tabs>
          <div class="content-table">
            <tableData :config="table_config"></tableData>
            <div class="table-footer">
              <button @click="refundVrisible=true">退款</button>
              <button @click="Pay()">缴费</button>
              <button>删除</button>
              <button>详情</button>

            </div>
          </div>
          <table-pagination :pageSize='10'
                            :totalNumber="90"></table-pagination>
        </div>
      </div>
      <!-- 添加费用 -->
      <drawer :drawerVrisible='drawer_vrisible'
              @handleClose='getClose'
              :drawer_config="drawer_config"></drawer>
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
import drawer from '@/components/Drawer/drawer.vue'
import Refund from '@/views/charge/components/depositManagement/Refund.vue'
import Pay from '@/views/charge/components/dailyMayment/Pay.vue'
export default {
  data () {
    return {
      change: true,
      Pay_show: false,
      activeName: 'first',
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
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '费用名称', prop: 'table2', width: '180' },
          { label: '费用单号', prop: 'table3', width: '180' },
          { label: '交易号', prop: 'table4', width: '180' },
          { label: '房屋信息', prop: 'table5', width: '180' },
          { label: '费用金额', prop: 'table6', width: '180' },
          { label: '计费开始时间', prop: 'table7', width: '180' },
          { label: '计费结束时间', prop: 'table8', width: '180' },
          { label: '计费单价/单位', prop: 'table9', width: '180' },
          { label: '面积/用量/数量', prop: 'table10', width: '180' },
          { label: '已缴金额', prop: 'table11', width: '180' },
          { label: '应收总计', prop: 'table12', width: '180' },
          { label: '应收总计', prop: 'table13', width: '180' },
          { label: '状态', prop: 'table14', width: '180' },
          { label: '备注', prop: 'table15', width: '280' },
          { label: '创建人', prop: 'table16', width: '180' },
          { label: '更新时间', prop: 'table17', width: '180' },
        ],
        table_data: [
          {
            table1: 1,
            // 报事报修
            table2: '报事报修',
            table3: '330887878234',
            table4: '202008090006322',
            table5: '3-1-808',
            table6: '100',
            table7: '2020-08-01 10:22',
            table8: '2020-09-04',
            table9: '100元/次',
            table10: '1次',
            table11: '0',
            table12: '100',
            table13: '0',
            table14: '未缴纳',
            table15: '',
            table16: '任颢淳',
            table17: '2020-08-01',
          },
          {
            table1: 2,
            table2: '报事报修',
            table3: '330887878234',
            table4: '202008090006322',
            table5: '2 -3-808',
            table6: '100',
            table7: '2020-08-01 10:22',
            table8: '2020-09-04',
            table9: '100元/次',
            table10: '1次',
            table11: '0',
            table12: '100',
            table13: '0',
            table14: '已缴纳',
            table15: '',
            table16: '龚抗抗',
            table17: '2020-08-01',
          },
          {
            table1: 3,
            table2: '报事报修',
            table3: '330887878234',
            table4: '202008090006322',
            table5: '4-1-808',
            table6: '100',
            table7: '2020-08-01 10:22',
            table8: '2020-09-04',
            table9: '100元/次',
            table10: '1次',
            table11: '0',
            table12: '100',
            table13: '0',
            table14: '已缴纳',
            table15: '',
            table16: '段放',
            table17: '2020-08-01',
          }
        ]
      },
      input_form: [
        {
          type: 'select',
          label: '费用项目名称',
          placeholder: '请选择',
          value: '',
          prop: 'houssssd',
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
          prop: 'hou23sadasssssd'
        },
        {
          type: 'Input',
          label: '缴费人',
          placeholder: '请选择',
          prop: 'houses'
        },
        {
          type: 'Input',
          label: '联系方式',
          placeholder: '请输入',
          prop: 'housad22ssssd'
        },
        {
          type: 'startEndDate',
          label: '计费时间',
          rangeSeparator: '~',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '结束时间',
          prop: 'date1'
        },
        {
          type: 'select',
          label: '来源',
          placeholder: '请选择',
          value: '',
          prop: 'laiyuan',
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

        // 房屋信息
      ]
    }
  },
  components: {
    drawer,
    Refund,
    Pay
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    Pay () {
      this.change = false;
      this.Pay_show = true;
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false;
      this.refundVrisible = false;
      console.log(data + "投票管理父组件");
    },
    cancel (data) {
      this.Pay_show = false;
      this.change = true;
      console.log(data + "")
    }
  }
}
</script>
