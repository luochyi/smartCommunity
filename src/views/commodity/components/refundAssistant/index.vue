<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>极速退款助手</span>
      </div>
      <div style="padding:20px">
        <div class="body1">
          <div>
            <div>
              <div class='body1_icon'>
                <span class="el-icon-check"></span>
              </div>
              <span> 退款成功</span>
            </div>
            <div class="body1_p">
              <p>申请退款金额 ¥99.8</p>
            </div>
          </div>
        </div>
        <div class="body2">
          <div class="p">
            <p>订单信息</p>
          </div>
          <div class="body2_box">
            <div class="body2_itme">
              <div class='body2_itme_img'>
              </div>
              <div class='body2_itme_txt'>
                <p>已处理</p>
                <span>处理倒计时</span>
              </div>
            </div>
            <div class="body2_itme">
              <div class='body2_itme_img'>
              </div>
              <div class='body2_itme_txt'>
                <p>已处理</p>
                <span>处理倒计时</span>
              </div>
            </div>
            <div class="body2_itme">
              <div class='body2_itme_img'>
              </div>
              <div class='body2_itme_txt'>
                <p>已处理</p>
                <span>处理倒计时</span>
              </div>
            </div>
            <div class="body2_itme">
              <div class='body2_itme_img'>
              </div>
              <div class='body2_itme_txt'>
                <p>已处理</p>
                <span>处理倒计时</span>
              </div>
            </div>
          </div>
          <div class="hr">
          </div>
          <div class="body2_form">
            <form-datechildren :formItem="form_item"
                               ref="formData">
            </form-datechildren>
          </div>
          <div class="hr">
          </div>
          <div class="body2_form">
            <form-datechildren :formItem="form_item2"
                               ref="formData">
              <template v-slot:f1>
                <div class="body2_form_img">

                </div>
              </template>
              <template v-slot:f5>
                <div class="body2_form_box">
                  <div class="body2_form_img">
                  </div>
                  <div class="body2_form_txt">
                    <p class="body2_form_title">俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食</p>
                    <p class='body2_form_price'>¥99.8</p>
                    <span class='body2_form_number'>数量 4</span>
                  </div>
                </div>
              </template>
            </form-datechildren>
          </div>
          <!-- 备注信息 -->
          <div class='Remarks_box'>
            <div class="table_titel">
              <div><span>售后备注</span></div>
              <div>
                <el-button class="init-text"
                           @click="drawer_vrisible = true"
                           type="text">添加备注</el-button>
              </div>
            </div>
            <div>
              <tableData :config="table_config"
                         @clickrow="tableRow">
              </tableData>
            </div>
          </div>
          <div class='Remarks_box'>
            <div class="table_titel">
              <div><span>操作记录</span></div>
            </div>
            <div>
              <tableData :config="table_config2"
                         @clickrow="tableRow">
              </tableData>
            </div>
          </div>
        </div>

      </div>

    </div>
    <drawer ref="ruleForm"
            :drawerVrisible='drawer_vrisible'
            @handleClose='getClose'
            :drawer_config="drawer_config"
            :formHandler="form_handler">

    </drawer>
  </div>
</template>
<script>
import formDatechildren from '@/components/form/formDatechildren'
import drawer from '@/components/Drawer'
export default {
    components: {
        formDatechildren,
        drawer,
    },
    data() {
        return {
            drawer_vrisible: false,
            form_item: [
                {
                    type: 'span',
                    label: '订单编号  ',
                    value: '323534520359 ',
                    prop: 'f1',
                    elwidth: '320px',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '订单状态  ',
                    value: '已与用户协商处理',
                    prop: 'f2',
                    elwidth: '320px',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '姓名   ',
                    value: '程靖 ',
                    prop: 'f3',
                    elwidth: '320px',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '电话  ',
                    value: '13297627409 ',
                    prop: 'f4',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '支付方式   ',
                    value: '已与用户协商处理 ',
                    prop: 'f5',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '结算手续费  ',
                    value: '0.060 ',
                    prop: 'f6',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '结算手续费  ',
                    value: '0.060 ',
                    prop: 'f7',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '结算手续费  ',
                    value: '0.060 ',
                    prop: 'f8',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '结算手续费  ',
                    value: '0.060 ',
                    prop: 'f9',
                    width: '33.33%',
                },
            ],
            form_item2: [
                {
                    type: 'Slot',
                    slotName: 'f1',
                    label: '用户凭证 ',
                    value: '-',
                    prop: 'f1',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '用户凭证   ',
                    value: '- ',
                    prop: 'f3',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '   ',
                    prop: 'f2',
                    width: '33.33%',
                },
                {
                    type: 'span',
                    label: '  退款说明 ',
                    value: '快递破损，物品丢失',
                    prop: 'f4',
                    width: '100%',
                },
                {
                    type: 'Slot',
                    slotName: 'f5',
                    label: '退款商品  ',
                    value: '-',
                    prop: 'f5',
                    width: '100%',
                },
            ],
            // 表格数据
            table_config: {
                thead: [
                    { label: '备注信息', prop: 'table1', width: 'auto' },
                    { label: '备注时间', prop: 'table2', width: 'auto' },
                ],
            },
            table_config2: {
                thead: [
                    { label: '操作类型', prop: 'table1', width: 'auto' },
                    { label: '操作内容', prop: 'table2', width: 'auto' },
                    { label: '操作人', prop: 'table3', width: 'auto' },
                    { label: '操作时间', prop: 'table4', width: 'auto' },
                ],
                table_data: [
                    {
                        table1: '申请退款',
                        table2: '多拍/错拍/不想要了',
                        table3: '程靖',
                        table4: '2020-8-10 10:23:12',
                    },
                    {
                        table1: '商家同意退款',
                        table2: '',
                        table3: '商家',
                        table4: '2020-8-11 10:23:12',
                    },
                ],
            },
            drawer_config: {
                head_title: '添加备注',
                content_title: '基本信息',
                form_item: [
                    {
                        type: 'textarea',
                        label: '备注信息',
                        prop: 'VerCode',
                        width: '100%',
                        rows: 6,
                    },
                ],
                ruleForm: {
                    VerCode: '',
                },

                // upload
            },
            form_handler: [
                {
                    label: '确定',
                    key: 'submit',
                    class: 'dra-submit',
                    handler: (fromData, refs) =>
                        this.formValidate(fromData, refs),
                },
                {
                    label: '重置',
                    key: 'reset',
                    class: 'dra-cancel',
                    // res是数据
                    handler: (fromData, refs) => this.reset(fromData, refs),
                },
            ],
        }
    },
    methods: {
        tableRow(data) {},
        // 监听子组件传关闭事件
        getClose(data) {
            this.drawer_vrisible = false
        },
    },
}
</script>

<style lang="scss" scoped>
.hr {
    width: 100%;
    height: 1px;
    background: #f5f5f6;
}
.body2_form {
    margin: 20px 0;
}
.Remarks_box {
    .table_titel {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        span {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
        }
    }
}
.body2 {
    .body2_form_img {
        width: 100px;
        height: 100px;
        background: #ccc;
    }
    .body2_form_box {
        display: flex;
    }
    .body2_form_txt {
        max-width: 310px;
        margin-left: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 25px;
        .body2_form_title {
            font-size: 16px;
            color: #333333;
        }
        .body2_form_price {
            font-size: 14px;
            color: #333333;
        }
        .body2_form_number {
            font-size: 14px;
            color: #999999;
        }
    }
}
.body2_box {
    margin: 20px 0;
    display: flex;

    .body2_itme {
        width: 25%;
        display: flex;
        align-items: center;
        .body2_itme_img {
            width: 56px;
            height: 56px;
            background: #ccc;
        }
        .body2_itme_txt {
            padding-left: 10px;
            line-height: 33px;
            p {
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #333333;
            }
            span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
            }
        }
    }
}
.body1 {
    padding: 22px;
    box-sizing: border-box;
    display: flex;
    height: 97px;
    border: 1px solid #f5f5f6;
    .body1_icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        border-radius: 50%;
        background: #25cf5d;
        span {
            color: #fff;
        }
    }
    span {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
    }
    .body1_p {
        margin-left: 40px;
        margin-top: 14px;
        p {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
        }
    }
}
.body2 {
    padding: 20px;
    margin-top: 20px;
    border: 1px solid #f5f5f6;
    .p {
        p {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
        }
    }
}
</style>

