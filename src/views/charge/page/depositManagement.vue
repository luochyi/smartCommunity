<template>
  <div class="main-content">
    <div class="main-titel">
      <span>押金管理</span>
    </div>

    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="未退"
                           name="1"></el-tab-pane>
              <el-tab-pane label="已退"
                           name="2"></el-tab-pane>
            </el-tabs>
          </template>
          <template slot="footer">
            <div class="table-footer">
              <button @click="refundVrisible=true">退款</button>
              <!-- <button>修改</button> -->
            </div>
          </template>
        </VueTable>
      </div>
    </div>
    <!-- 新增修改公告 -->
    <Drawer drawerTitle="退款"
            @drawerClose="getClose"
            :drawerVrisible='refundVrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="VueForm"
                     @ruleSuccess='refundRuleSubmit'
                     :formObj='refundForm'>
            </VueForm>
          </template>
        </FromCard>
      </div>
      <div slot="footer">
        <button class="btn-orange"
                @click="onSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="getClose"><span>取消</span></button>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '0',
      // 退款
      refundVrisible: false,
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '费用名称', prop: 'chargesTemplateDetailName', width: '180' },
          { label: '交易号', prop: 'orderCode', width: '180' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '押金人姓名', prop: 'depositName', width: '180' },
          { label: '押金人联系方式', prop: 'tel', width: '180' },
          { label: '缴费时间', prop: 'payDate', width: '180' },
          { label: '押金金额', prop: 'depositPrice', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          { label: '来源', prop: 'froms', width: '180' },
          { label: '支付方式', prop: 'payType', width: '180' },
          { label: '装修开始时间', prop: 'renovationDateStart', width: '180' },
          { label: '装修结束时间', prop: 'renovationDateEnd', width: '180' },
          { label: '备注', prop: 'remake', width: '280' },
          { label: '创建人', prop: 'createName', width: '180' },
          { label: '更新时间', prop: 'updateDate', width: '180' },
        ],
        table_data: [],
        url: 'depositManagementList',
        search_item: [
          {
            type: 'select',
            label: '费用名称',
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
            type: 'startDate',
            label: '计费时间',
            placeholder: '请选择开始日期',
            prop: 'payDateStart'
          },
          {
            type: 'endDate',
            label: '计费时间',
            placeholder: '请选择结束日期',
            prop: 'payDateEnd'
          },
          {
            type: 'select',
            label: '来源',
            placeholder: '请选择',
            value: '',
            prop: 'froms',
            options: [
              {
                label: '线下',
                value: '1'
              },
              {
                label: 'app',
                value: '2'
              }
            ],
          },
          {
            type: 'Input',
            label: '押金人',
            placeholder: '请选择',
            prop: 'depositName'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'tel'
          },

          // 房屋信息
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      refundForm: {
        ruleForm: {
          depositPrice: null,
          depositDeduction: null,
          refundType: null,
          refundPrice: null,
        },
        form_item: [
          {
            type: 'Input',
            label: '押金金额',
            placeholder: '请输入',
            width: '50%',
            disabled: true,
            prop: 'depositPrice',
          },
          // {
          //   type: 'DateTime',
          //   label: '退款时间',
          //   placeholder: '请输入',
          //   width: '50%',
          //   prop: 'scheduledReleaseTime'
          // },
          {
            type: 'Input',
            label: '押金扣除',
            placeholder: '请输入',
            width: '50%',
            prop: 'depositDeduction',
          },
          {
            type: 'Select',
            label: '退款方式',
            placeholder: '请输入',
            width: '50%',
            prop: 'refundType',
            options: [
              { label: '支付宝', value: 1 },
              { label: '微信', value: 2 },
              { label: '现金', value: 3 },
              { label: 'pos', value: 4 },
            ],
          },
          {
            type: 'Input',
            label: '退还金额',
            placeholder: '请输入',
            width: '50%',
            prop: 'refundPrice',
            disabled: true,
          },
        ],
        rules: {
          depositPrice: [{ required: true, message: '请输入押金金额', trigger: 'blur' }],
          depositDeduction: [{ required: true, message: '请输入退款时间', trigger: 'change' }],
          refundType: [{ required: true, message: '请输入押金扣除 ', trigger: 'blur' }],
        }
      }
    }
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
    refundSubmit () {

    },
    onSubmit () {
      this.$refs.VueForm.submitForm()
    },
    // 关闭抽屉
    getClose (data) {
      this.refundVrisible = false;
      console.log(data + "投票管理父组件");
    },
  }
}
</script>
