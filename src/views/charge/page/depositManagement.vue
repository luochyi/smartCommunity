<template>
  <div class="main-content">
    <div class="main-titel">
      <span>预缴管理</span>
    </div>

    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <!-- <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="未退"
                           name="1"></el-tab-pane>
              <el-tab-pane label="已退"
                           name="2"></el-tab-pane>
            </el-tabs>
          </template> -->
          <template slot="footer">
            <div class="table-footer">
              <button @click="refund(table_row)">充值</button>
              <button @click="refund(table_row)">退款</button>
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
import { depositManagementRefund } from '@/api/charge'
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
          { label: '房屋信息', prop: 'roomName', width: 'auto' },
          { label: '住户姓名', prop: 'residentName', width: 'auto' },
          { label: '预缴金额', prop: 'advancePaymentPrice', width: 'auto' },
          { label: '最近充值时间', prop: 'nearDate', width: 'auto' },
        ],
        table_data: [],
        url: 'advancePaymentList',
        search_item: [
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '楼栋/单元/房间号',
            prop: 'roomName'
          },
          {
            type: 'Input',
            label: '住户名称',
            placeholder: '请输入',
            prop: 'residentName'
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
    refundRuleSubmit () {
      let resData = {
        decorationId: this.table_row[0].decorationId,
        depositManagementId: this.table_row[0].id,
        depositPrice: this.refundForm.ruleForm.depositPrice,
        depositDeduction: this.refundForm.ruleForm.depositDeduction,
        refundType: this.refundForm.ruleForm.refundType,
        refundPrice: this.refundForm.ruleForm.refundPrice,
      }
      console.log(resData)
      depositManagementRefund(resData).then(res => {
        console.log(res)
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$refs.table.requestData();
          this.getClose()
        }
      })
    },
    // 退款
    refund (data) {
      if (data.length > 1) {
        this.$message.error('只能操作一条数据');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.refundVrisible = true;
      // depositPrice
      this.refundForm.ruleForm.depositPrice = data[0].depositPrice
    },
    onSubmit () {
      this.$refs.VueForm.submitForm()
    },
    // 关闭抽屉
    getClose () {
      this.refundVrisible = false;
      this.$refs.VueForm.reset()

    },
  },
  watch: {
    // 'refundForm.ruleForm.depositDeduction': {
    //   handle (newVal) {
    //     console.log(newVal)
    //   },
    //   immediate: true
    // },
    'refundForm.ruleForm.depositDeduction': {
      handler (newVal) {
        console.log(newVal);
        this.refundForm.ruleForm.refundPrice = (this.refundForm.ruleForm.depositPrice - newVal).toFixed(2);
      },
      immediate: true
    },
  }
}
</script>
