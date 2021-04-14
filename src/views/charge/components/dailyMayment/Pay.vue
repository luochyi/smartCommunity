<template>
  <div>
    <div class="box">
      <div class="box_box">
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
                <div>
                  <!-- <VueForm ref="vueForm"
                           @ruleSuccess='ruleSuccess'
                           :formObj='costFrom1'>
                  </VueForm> -->
                  <!-- <form-datechildren :formItem="form_item"
                                     ref="formData"></form-datechildren> -->
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>收费项目汇总</span>
                </div>
                <div>
                  <tableData :config="table_config"></tableData>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>备注</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item3"
                                     ref="formData"></form-datechildren>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>付款</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item4"
                                     ref="formData"></form-datechildren>
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
                       @click="cancel()">确定</el-button>
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
import formDatechildren from '@/components/form/formDatechildren'
import { dailyPaymentInsert } from '@/api/charge'
export default {
  components: {
    formDatechildren,
    paymentPreview
  },
  data () {
    return {
      paymentPreview: false,
      table_config: {
        thead: [
          { label: '费用名称', prop: 'table1', width: '110' },
          { label: '费用类型', prop: 'table2', width: '180' },
          { label: '计费时间段', prop: 'table3', width: '180' },
          { label: '计费单价/单位', prop: 'table4', width: '180' },
          { label: '面积/用量/数量', prop: 'table5', width: '180' },
          { label: '费用金额', prop: 'table6', width: '180' },
          { label: '已缴金额', prop: 'table7', width: '180' },
          { label: '应收金额', prop: 'table8', width: '180' },
        ],
        table_data: [
          {
            table1: "2020年物业费",
            table2: '物业管理费',
            table3: '2020-08-01 ～ 2021-07-31',
            table4: '2.9元/月/平方米',
            table5: '100平方米',
            table6: '1200',
            table7: '1000',
            table8: '200',
          },
        ]
      },
      form_item: [
        {
          type: 'Input',
          label: '房间号 ',
          placeholder: '请选择',
          value: '2-2-1403',
          prop: 'building ',
          width: '30%',
          disabled: true,
        },
        {
          type: 'Input',
          label: '客户姓名  ',
          placeholder: '请选择',
          value: '尹斐斐',
          prop: 'buildings',
          width: '30%',
          disabled: true,
        },
        {
          type: 'Input',
          label: '缴费人',
          placeholder: '请选择',
          value: '卢弦',
          prop: 'buildinsg ',
          width: '30%',
        },

        {
          type: 'Input',
          label: '收费总计',
          placeholder: '请选择',
          value: '1200',
          prop: 'i4',
          width: '30%',
          disabled: true,
        },
        {
          type: 'Input',
          label: '缴费时间 ',
          placeholder: '请选择',
          value: '2020-09-01',
          prop: 'i5',
          width: '30%',
        },
        {
          type: 'Input',
          label: '联系方式  ',
          placeholder: '请选择',
          value: '15825298338',
          prop: 'i6',
          width: '30%',
        },
      ]
      ,
      form_item3: [
        {
          type: 'textarea',
          label: '备注  ',
          rows: 4,
          placeholder: '请输入',
          prop: 'fyje',
          // width: "100%"
          width: '50%',

        }
      ]
      , form_item4: [
        {
          type: 'Input',
          label: '计费单价/单位 ',
          placeholder: '请选择',
          prop: 'building ',
          width: '100%',
        }, {
          type: 'Input',
          label: '计费单价/单位 ',
          placeholder: '请选择',
          prop: 'buildsing ',
          width: '100%',
        },
      ]
    }
  },
  methods: {
    cancel () {
      //       {
      //     "buildingUnitEstateId":1,
      //     "chargesTemplateDetailId":1,
      //     "beginDate":"2020-11-17 16:17:57",
      //     "endDate":"2020-11-17 16:17:57",
      //     "unitPrice":1.2,
      //     "type":1,
      //     "num":30,
      //     "dailyPaymentOrder":{
      //         "code":"eqeqr1231r112",
      //         "name":"张三",
      //         "tel":13734657847,
      //         "payType":3,
      //         "payPrice":36,
      //         "remake":"物业直接缴纳",
      //         "isPrinting":0
      //     }
      // }
      let resData = {
        "buildingUnitEstateId": 3,
        "chargesTemplateDetailId": 1,
        "beginDate": "2020-11-17 16:17:57",
        "endDate": "2020-11-17 16:17:57",
        "unitPrice": 1.2,
        "type": 1,
        "num": 30,
        "dailyPaymentOrder": {
          "code": "asdadsdasda",
          "name": "王五",
          "tel": 13734657847,
          "payType": 3,
          "payPrice": 36,
          "remake": "物业直接缴纳",
          "isPrinting": 0
        }
      }
      // dailyPaymentInsert(resData).then(result => {
      //   console.log(result)
      // })
      this.$emit('cancel', '取消')
    },
    dialogPreview () {
      this.paymentPreview = false;
    }
  }
}
</script>
<style scoped>
.box {
    position: relative;
    height: calc(100vh - 80px);
}
.box-body {
    margin: 20px;
    margin-bottom: 17px;
    background: #fff;
    overflow: auto;
    height: calc(100vh - 179px);
}
.item {
    padding-bottom: 28px;
}
.title {
    display: flex;
    align-items: center;
    padding-bottom: 26px;
}
.title span {
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
.box_footer {
    position: absolute;
    margin-top: 20px;
    width: 100%;
    bottom: 0;
    height: 81px;
    background: white;
}
.box_footer_content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
