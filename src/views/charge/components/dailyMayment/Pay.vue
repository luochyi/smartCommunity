<template>
  <div>
    <div class="box">
      <div class="box_box"
           v-if="Pay_show">
        <div class="box-body">
          <div class="main-titel">
            <span>缴费</span>
          </div>
          <div class="content">
            <div class="">
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>收费信息确认</span>
                </div>
                <div class='box-item flex'>
                  <div class='li flex'>
                    <div class='label'>
                      <span>房间号</span>
                    </div>
                    <div class="flex">
                      <el-input disabled
                                :value='getData.roomName'
                                style="width: 240px;"
                                size="small"></el-input>
                    </div>
                  </div>
                  <div class='li flex'>
                    <div class='label'>
                      <span>收费总计 </span>
                    </div>
                    <div>
                      <el-input :value='getData.costPrice'
                                disabled
                                style="width: 240px;"
                                size="small"
                                placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                  <div class='li flex'>
                    <div class='label'>
                      <span>缴费人</span>
                    </div>
                    <div>
                      <el-input v-model="name"
                                style="width: 240px;"
                                size="small"
                                placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                  <!-- <div class='li flex'>
                    <div class='label'>
                      <span>缴费时间</span>
                    </div>
                    <div>
                      <el-date-picker v-model="createDate"
                                      value-format="yyyy-MM-dd HH:mm:ss"
                                      style="width: 240px;"
                                      type="datetime"
                                      placeholder="选择日期时间">
                      </el-date-picker>

                    </div>
                  </div> -->
                  <div class='li flex'>
                    <div class='label'>
                      <span>联系方式 </span>
                    </div>
                    <div>
                      <el-input v-model="tel"
                                style="width: 240px;"
                                size="small"
                                placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>收费项目汇总</span>
                </div>
                <div class="box-item ">
                  <tableData :config="table_config"></tableData>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>备注</span>
                </div>
                <div class="box-item ">
                  <div class='li'
                       style="width:100%">
                    <div class='label'>
                      <span>备注 </span>
                    </div>
                    <div>
                      <el-input v-model="remake"
                                type="textarea"
                                style="width: 480px;"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>付款</span>
                </div>
                <div class="box-item">
                  <div class="flex"
                       style="margin:20px 0">
                    <div class="label">
                      <span>付款方式 </span>
                    </div>
                    <div>
                      <el-radio-group v-model="payType">
                        <el-radio :label="1">支付宝</el-radio>
                        <el-radio :label="2">微信</el-radio>
                        <el-radio :label="3">现金</el-radio>
                        <el-radio :label="4">pos</el-radio>
                        <el-radio :label="5">银行卡</el-radio>
                        <el-radio :label="6">支票</el-radio>
                        <el-radio :label="7">转账</el-radio>
                        <el-radio :label="8">开发商代付</el-radio>

                      </el-radio-group>
                    </div>
                  </div>
                  <div class="flex"
                       style="margin:20px 0">
                    <div class="label">
                      <span>付款金额 </span>
                    </div>
                    <div>
                      <el-input v-model="payPrice"
                                style="width: 240px;"
                                size="small"
                                placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                  <!-- <div class="flex"
                       style="margin:20px 0">
                    <div class="label">
                      <span>支付单号 </span>
                    </div>
                    <div>
                      <el-input v-model="code"
                                style="width: 240px;"
                                size="small"
                                placeholder="请输入内容"></el-input>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box_footer">
        <div class="box_footer_content">
          <div class="content-btn">
            <el-button class="init-button"
                       icon="el-icon-circle-check"
                       @click="submit()">确定</el-button>
            <el-button class="init-button"
                       @click="cancel()">确定并打印</el-button>
            <el-button type="init-button2"
                       style="margin-right:10px"
                       plain
                       @click="paymentPreview = true">打印预览</el-button>
            <button class="dra-cancel"
                    @click="cancel()"><span>取消</span></button>

          </div>
        </div>

      </div>
    </div>
    <paymentPreview :dialogVisible="paymentPreview"
                    @dialogPreview="dialogPreview"></paymentPreview>
  </div>
</template>

<script>

import paymentPreview from "@/components/dialog/Preview.vue"
import { dailyPaymentInsertOrder } from '@/api/charge'
export default {
  components: {
    paymentPreview
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    PayShow: {
      type: Boolean,
      default: () => false,
    }
  },
  data () {
    return {
      paymentPreview: false,
      code: null,
      name: null,
      tel: null,
      payType: 1,
      payPrice: null,
      remake: null,
      isPrinting: null,
      Pay_show: false,
      createDate: '',
      radio: 0,
      getData: {},
      table_config: {
        thead: [
          { label: '费用名称', prop: 'name', width: 'auto' },
          {
            label: '计费时间段', prop: 'beginDate', width: '320', type: 'function', callback: (row, prop) => {
              return row.beginDate + '~' + row.endDate
            }
          },
          {
            label: '计费单价/单位', prop: 'unitPrice', width: 'auto', type: 'function', callback: (row, prop) => {
              // 收费类型（1.元/月 平方米，2.元/ 立方米，3.元/ 次）
              switch (row.type) {
                case 1:
                  return row.unitPrice + '元/月'
                  break;
                case 2:
                  return row.unitPrice + '元/ 立方米'
                  break;
                case 3:
                  return row.unitPrice + '元/ 次'
                  break;
                default:
                  break;
              }
            }
          },
          { label: '面积/用量/数量', prop: 'num', width: 'auto' },
          { label: '费用金额', prop: 'totalPrice', width: 'auto' },
          { label: '已缴金额', prop: 'paidPrice', width: 'auto' },
          { label: '应收金额', prop: 'paymentPrice', width: 'auto' },
        ],
        table_data: [
          // {
          //   beginDate: "2020-12-17 16:17:57"
          //   , costPrice: 3200
          //   , createName: "king"
          //   , endDate: "2020-12-18 16:18:01"
          //   , estateNo: 1
          //   , id: 1
          //   , name: "2020年物业费"
          //   , num: 100
          //   , paidPrice: 3200
          //   , paymentPrice: 0
          //   , remake: null
          //   , roomName: "1-1-101室"
          //   , roomNumber: "101室"
          //   , status: 3
          //   , totalPrice: 3200
          //   , type: 1
          //   , unitNo: 1
          //   , unitPrice: 2.9
          //   , updateDate: "2020-12-19 16:41:23"
          // }
        ]
      },
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', '取消')
    },
    submit () {
      let resData = {
        dailyPaymentId: this.getData.id,
        dailyPaymentOrder: {

          name: this.name,
          tel: this.tel,
          payType: this.payType,
          payPrice: this.payPrice,
          // createDate: this.createDate,
          remake: this.remake,
          isPrinting: 0,
        }
      }
      dailyPaymentInsertOrder(resData).then(result => {
        console.log(result)
        if (result.status) {
          this.$message({
            message: result.message,
            type: 'success'
          })
          this.$emit('paySubmit')
          this.cancel()
          // this.$refs.table.loadData()
          // this.receiverClose()
        }
      })
    },
    dialogPreview () {
      this.paymentPreview = false;
    },

  },
  watch: {
    tableData: {
      handler (newValue) {
        console.log(newValue)
        this.table_config.table_data = newValue
        this.getData = newValue[0]

      }
    },
    PayShow: {
      handler (newValue) {
        console.log(newValue)
        this.Pay_show = newValue
      }
    },
  }
}
</script>
<style scoped lang='scss'>
.box {
    position: relative;
    height: calc(100vh - 80px);
    .box-body {
        margin: 20px;
        margin-bottom: 17px;
        background: #fff;
        overflow: auto;
        height: calc(100vh - 179px);
    }
}

.item {
    padding-bottom: 28px;
}
.title {
    display: flex;
    align-items: center;
    padding-bottom: 26px;
    span {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 22px;
    }
    .line {
        display: inline-block;
        width: 3px;
        height: 16px;
        margin-right: 10px;
        background: rgba(251, 71, 2, 1);
    }
}

.box_footer {
    position: absolute;
    margin-top: 20px;
    width: 100%;
    bottom: 0;
    height: 81px;
    background: white;
    .box_footer_content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}

.box-item {
    padding: 0 108px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    flex-wrap: wrap;
    .li {
        width: 33.33%;
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
    .label {
        width: 61px;
        text-align: right;
        padding-right: 12px;
    }
}
</style>
