<template>
  <div>
    <div class="box">
      <div class="box_box">
        <div class="box-body">
          <div class="main-titel">
            <span>供应商信息</span>
          </div>
          <div class="content">
            <div class="">
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>基本信息</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item"
                                     ref="formData">
                    <template v-slot:f5>
                      <el-upload class="upload-demo"
                                 ref="upload"
                                 action="https://jsonplaceholder.typicode.com/posts/"
                                 :file-list="fileList"
                                 :auto-upload="false">
                        <el-button slot="trigger"
                                   size="small"
                                   class="el-icon-upload2">上传文件</el-button>
                        <div class="upload_txt">
                          <span>(0/1)</span>
                        </div>
                      </el-upload>

                    </template>
                    <template v-slot:f6>
                      <el-upload class="upload-demo"
                                 ref="upload"
                                 action="https://jsonplaceholder.typicode.com/posts/"
                                 :file-list="fileList"
                                 :auto-upload="false">
                        <el-button slot="trigger"
                                   size="small"
                                   class="el-icon-upload2">上传文件</el-button>
                        <div class="upload_txt">
                          <span>(0/2)</span>
                        </div>
                      </el-upload>

                    </template>
                    <template v-slot:f7>
                      <el-upload class="upload-demo"
                                 ref="upload"
                                 action="https://jsonplaceholder.typicode.com/posts/"
                                 :file-list="fileList"
                                 :auto-upload="false">
                        <el-button slot="trigger"
                                   size="small"
                                   class="el-icon-upload2">上传文件</el-button>
                        <div class="upload_txt">
                          <span>(0/2)</span>
                        </div>
                      </el-upload>
                    </template>
                    <template v-slot:f9>
                      <el-radio v-model="radio"
                                label="1">是</el-radio>
                      <br>
                      <el-radio v-model="radio"
                                label="2">否</el-radio>
                    </template>
                  </form-datechildren>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>供应商退件收货地址</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item2"
                                     ref="formData"></form-datechildren>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>退件相关说明</span>
                </div>
                <div class="form3">
                  <!-- f3_1 -->
                  <form-datechildren :formItem="form_item3"
                                     ref="formData">
                    <template v-slot:f3_1>
                      <el-input type="textarea"
                                v-model="f3_1"
                                style="width:676px;"
                                placeholder="退货物品中请夹纸条，纸条需填写下单订单号、收货人信息、退换货原因、诉求">
                      </el-input>
                      <p class='input_p'>退货物品中请夹纸条，纸条需填写下单订单号、收货人信息、退换货原因、诉求</p>
                    </template>
                    <template v-slot:f3_2>
                      <el-input type="textarea"
                                v-model="f3_2"
                                style="width:676px;"
                                placeholder="退货运费不支持到付，到付按照拒收处理">
                      </el-input>
                      <p class="input_p">客户退货时可以看到警示信息，默认为上文，可修改</p>
                    </template>
                  </form-datechildren>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>登陆信息</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item4"
                                     ref="formData">
                    <template v-slot:f4_2>
                      <el-input placeholder="请输入密码"
                                v-model="input"
                                size="small"
                                style="width:320px;margin-right:10px"
                                show-password></el-input>
                      <spa style=" font-size: 12px; font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;
            color: #DB3939;">请输入六位数字作为账号登陆密码</spa>

                    </template>
                    <template v-slot:f4_3>
                      <el-input placeholder="请输入密码"
                                v-model="input"
                                size="small"
                                style="width:320px"
                                show-password></el-input>
                    </template>
                  </form-datechildren>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>常用打款帐号</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item5"
                                     ref="formData">
                    <template v-slot:f5_1>
                      <el-input placeholder="每月"
                                v-model="input"
                                size="small"
                                style="width:116px;">
                        <i slot="suffix">
                          号
                        </i>
                      </el-input>

                    </template>
                  </form-datechildren>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box_footer">
        <div class="box_footer_content">
          <div class="content-btn">
            <button class="inquire-button"
                    @click="cancel()">
              提交
            </button>
            <button class="dra-cancel"
                    @click="cancel()"><span>取消</span></button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formDatechildren from '@/components/form/formDatechildren'

export default {
    components: {
        formDatechildren,
    },
    data() {
        return {
            radio: 1,
            paymentPreview: false,
            input: '',
            fileList: [],
            form_item: [
                {
                    type: 'Input',
                    label: '供应商名称',
                    placeholder: '请输入供应商名称',
                    prop: 'f1',
                    elwidth: '320px',
                    width: '100%',
                },
                {
                    type: 'Input',
                    label: '供应商法人',
                    placeholder: '请输入供应商法人',
                    prop: 'f2',
                    elwidth: '320px',
                    width: '100%',
                },
                {
                    type: 'Input',
                    label: '供应商负责人',
                    placeholder: '请输入供应商名称',
                    prop: 'f3',
                    elwidth: '320px',
                    width: '100%',
                },
                {
                    type: 'Input',
                    label: '联系方式',
                    placeholder: '请输入供应商名称',
                    prop: 'f4',
                    elwidth: '320px',
                    width: '100%',
                },
                {
                    type: 'Slot',
                    label: '营业执照',
                    placeholder: '请输入供应商名称',
                    slotName: 'f5',
                    prop: 'f5',
                    width: '100%',
                },
                {
                    type: 'Slot',
                    label: '税务登记证 ',
                    placeholder: '请输入供应商名称',
                    slotName: 'f6',
                    prop: 'f6',
                    width: '100%',
                },
                {
                    type: 'Slot',
                    label: '组织机构代码证 ',
                    placeholder: '请输入供应商名称',
                    slotName: 'f7',
                    prop: 'f7',
                    width: '100%',
                },
                {
                    type: 'textarea',
                    label: '主营商品  ',
                    placeholder: '',
                    slotName: 'f8',
                    prop: 'f8',
                    elwidth: '676px',
                    elheight: '120px',
                    width: '100%',
                },
                {
                    type: 'Slot',
                    label: '是否审核 ',
                    placeholder: '请输入供应商名称',
                    slotName: 'f9',
                    prop: 'f9',
                    width: '100%',
                },
            ],
            form_item2: [
                {
                    type: 'Input',
                    label: '收货人',
                    placeholder: '请输入收货人姓名',
                    prop: 'f2_1',
                    width: '100%',
                    elwidth: '320px',
                },
                {
                    type: 'Input',
                    label: '联系方式 ',
                    placeholder: '请输入收货联系方式',
                    prop: 'f2_2',
                    width: '100%',
                    elwidth: '320px',
                },
                {
                    type: 'select',
                    label: '所在地区  ',
                    placeholder: '请选择',
                    prop: 'f2_3 ',
                    elwidth: '320px',
                    width: '100%',
                    options: [
                        {
                            value: '1',
                            label: '是',
                        },
                        {
                            value: '2',
                            label: '',
                        },
                    ],
                },
                {
                    type: 'Input',
                    label: '详细地址   ',
                    placeholder: '街道、门牌、小区、楼栋等信息',
                    prop: 'F2_4',
                    // width: "100%"
                    width: '100%',
                    elwidth: '676px',
                },
                // 费用金额
            ],
            form_item3: [
                {
                    type: 'Slot',
                    label: '商家备注   ',
                    prop: 'f3_1',
                    slotName: 'f3_1',
                    width: '100%',
                },
                {
                    type: 'Slot',
                    label: '商家备注   ',
                    prop: 'f3_2',
                    slotName: 'f3_2',

                    width: '100%',
                },
            ],
            form_item4: [
                {
                    type: 'Input',
                    label: '登陆账户 ',
                    placeholder: '请输入账户',
                    prop: 'f4_1',
                    elwidth: '320px',
                    width: '100%',
                },
                {
                    type: 'Slot',
                    label: '登陆密码 ',
                    placeholder: '请输入供应商名称',
                    slotName: 'f4_2',
                    prop: 'f4_2',
                    width: '100%',
                },
                {
                    type: 'Slot',
                    label: '确认密码 ',
                    placeholder: '请输入供应商名称',
                    slotName: 'f4_3',
                    prop: 'f4_3',
                    width: '100%',
                },
            ],
            form_item5: [
                {
                    type: 'Slot',
                    label: '账单生成日期  ',
                    placeholder: '请输入供应商名称',
                    slotName: 'f5_1',
                    prop: 'f5_1',
                    width: '100%',
                },
                {
                    type: 'Input',
                    label: '开户银行  ',
                    placeholder: '请输入',
                    prop: 'f5_2',
                    elwidth: '320px',
                    width: '100%',
                },
                {
                    type: 'Input',
                    label: '帐号  ',
                    placeholder: '请输入账户',
                    prop: 'f5_3',
                    elwidth: '320px',
                    width: '100%',
                },
                {
                    type: 'Input',
                    label: '支付税率  ',
                    placeholder: '请输入账户',
                    prop: 'f5_4',
                    elwidth: '320px',
                    width: '100%',
                },
                {
                    type: 'Input',
                    label: '结算手续费  ',
                    placeholder: '请输入账户',
                    prop: 'f5_5',
                    elwidth: '320px',
                    width: '100%',
                },
            ],
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel', '取消')
        },
    },
}
</script>
<style scoped lang="scss">
.form3 {
    .input_p {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
    }
}
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
.upload_txt {
    display: inline-block;
    margin-left: 8px;
    span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
    }
}
</style>
