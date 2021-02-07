<template>
  <div class="main-content">
    <div class="main-titel">
      <span>售卖预警</span>
    </div>
    <div class="content">
      <div>
        <div class="phone_title"><span>预警联系方式（短信）</span></div>
        <div class="phone_row">
          <div class="phone_box">
            <div>
              <span class="phone_txt">手机</span>
              <span class="phone_del">删除</span>
            </div>
            <div>
              <span>1592830791</span>
            </div>
          </div>
          <div class="phone_add"
               @click="drawer_vrisible= true">
            <span class="el-icon-circle-plus-outline">
              添加
            </span>
          </div>
        </div>
      </div>
      <div style="margin-top:60px">
        <div class="phone_title"><span>预警设置</span></div>
      </div>
      <div>
        <el-form label-position="right"
                 label-width="120px">
          <el-form-item label="库存预警">
            <el-switch v-model="value"
                       active-text="开"
                       inactive-text="关"
                       class="switchStyle"
                       active-color="rgba(251, 71, 2, 1)">
            </el-switch>
            <p style="

font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #999999;
line-height: 20px;">
              商品库存为0即进行预警
            </p>
          </el-form-item>
          <el-form-item label="全局热卖预警">
            <el-switch v-model="value1"
                       active-text="开"
                       inactive-text="关"
                       class="switchStyle"
                       active-color="rgba(251, 71, 2, 1)">
            </el-switch>
            <span style="
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              line-height: 20px;
              padding:0 20px">预警值 2000</span>
            <span style="

font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #FB4702;
line-height: 20px;"
                  @click="drawer_vrisible2= true">设置</span>
          </el-form-item>
          <el-form-item label="库存预警">
            <span style="

font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #FB4702;
line-height: 20px;">添加商品</span>
            <tableData :config="table_config">
              <!-- slot="test" slot-scope=“data” -->
              <!-- v-slot:status="slotData" -->
              <template v-slot:table1="slotData">
                <div class="img">
                  <div>
                    <el-image style="width: 80px; height: 80px"
                              :src="slotData.data.table1[0].url"></el-image>
                  </div>
                  <div>
                    <span>{{ slotData.data.table1[0].span }}</span>
                  </div>
                </div>
              </template>
              <template v-slot:table5>
                <div>
                  <div>
                    <span style="

font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #FB4702;
padding-right: 20px;">编辑</span>
                    <span style="

font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #FB4702;
line-height: 20px;">删除</span>
                  </div>
                </div>
              </template>
            </tableData>
          </el-form-item>
        </el-form>
      </div>
      <!-- 添加 -->
      <drawer ref="ruleForm"
              :drawerVrisible='drawer_vrisible'
              @handleClose='getClose'
              :drawer_config="drawer_config"
              :formHandler="form_handler">
        <!-- 插入一个输入框 -->
        <template v-slot:phoneNumber>

          <el-input v-model.trim="drawer_config.ruleForm.phoneNumber"
                    style="width: 240px;margin-right:10px"></el-input>
          <el-button type="init-button2"
                     class="el-button-block"
                     @click="getVerCode()"
                     :disabled="code_disabled"
                     :loading="code_loading"
                     plain>{{code_text}}</el-button>
        </template>
      </drawer>
      <!-- 设置 -->
      <drawer ref="ruleForm"
              :drawerVrisible='drawer_vrisible2'
              @handleClose='getClose'
              :drawer_config="drawer_config2"
              :formHandler="form_handler">
        <!-- 插入一个输入框 -->
        <template v-slot:ts>
          <div class='ts'>
            <p>发货能力无法覆盖售卖量时，请及时转为预售</p>
          </div>
        </template>
      </drawer>
    </div>

  </div>

</template>

<script>
import drawerDetails from '@/views/butler/components/suggestConsultation/details.vue'
import drawer from '@/components/Drawer'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写'))
            } else {
                callback()
            }
        }
        return {
            drawer_vrisible2: false,
            value: true,
            value1: true,
            code_disabled: false,
            code_loading: false,
            code_text: '发送验证码',
            drawer_vrisible: false,
            drawer_config2: {
                head_title: '全局预售卖预警设置',
                content_title: '基本信息',
                form_item: [
                    {
                        type: 'Slot',
                        slotName: 'ts',
                        label: '',
                        width: '100%%',
                        prop: 'ts',
                    },
                    {
                        type: 'Input',
                        label: '预警值',
                        placeholder: '请输入',
                        prop: 'VerCode',
                        width: '100%',
                    },
                ],
            },
            drawer_config: {
                head_title: '添加预警联系方式',
                content_title: '基本信息',
                form_item: [
                    {
                        type: 'Slot',
                        slotName: 'phoneNumber',
                        label: '手机号',
                        placeholder: '请输入号码',
                        width: '100%%',
                        prop: 'phoneNumber',
                    },
                    {
                        type: 'Input',
                        label: '验证码',
                        placeholder: '输入验证码',
                        prop: 'VerCode',
                        width: '100%',
                    },
                ],
                ruleForm: {
                    phoneNumber: '',
                    status: '',
                    VerCode: '',
                },
                rules: {
                    status: [
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur',
                        },
                    ],
                    VerCode: [
                        {
                            required: true,
                            message: '请输入验证码',
                            trigger: 'blur',
                        },
                    ],
                    phoneNumber: [
                        {
                            required: true,
                            validator: validatePass,
                            trigger: 'blur',
                        },
                    ],
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

            table_config: {
                thead: [
                    {
                        label: '商品名称',
                        prop: 'table1',
                        width: '450',
                        type: 'slot',
                        slotName: 'table1',
                    },
                    { label: '商品ID', prop: 'table2', width: '280' },
                    {
                        label: '预警值',
                        prop: 'table3',
                        width: '180',
                    },
                    { label: '商品状态', prop: 'table4', width: '100' },
                    {
                        label: '操作',
                        prop: 'table5',
                        width: '140',
                        type: 'slot',
                        slotName: 'table5',
                    },
                ],
                table_data: [
                    {
                        table1: [
                            {
                                span:
                                    ' 俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
                                url:
                                    'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2222110592,1898022873&fm=26&gp=0.jpg',
                            },
                        ],

                        table2: '323534520359',
                        table3: '1000 ',
                        table4: '上架中',
                        table5: [
                            {
                                time: '2020-08-20 09:00',
                                status: '售卖中',
                            },
                        ],
                    },
                ],
            },
        }
    },
    components: { drawer },
    methods: {
        // 提交
        formValidate(fromData, refs) {
            //验证规则
            refs.validate((valid) => {
                if (valid) {
                    // 成功提交
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                    })
                    console.log('submit!!' + JSON.stringify(fromData.ruleForm))
                    this.getClose()
                } else {
                    // 失败保存
                    console.log('error submit!!')
                    return false
                }
            })
        },
        // 重置
        reset(fromData, refs) {
            console.log(fromData)
            refs.resetFields()
            // fromData.ruleForm.resetFields()
            // res.region = ''
            // this.$refs['ruleForm'].resetFields()
        },
        // 添加
        addDrawer() {
            this.drawer_vrisible = true
        },
        // / 倒计时countdown
        countdown(time) {
            console.log(time)
            // // 按钮文本
            // this.code_text = `倒计进${time}秒`
            if (time < 0) {
                this.code_disabled = false
                this.code_text = '  重新获取'
                return
            } else {
                this.code_disabled = true
                this.code_text = `倒计进${time}秒`
                time--
            }
            setTimeout(() => {
                this.countdown(time)
            }, 1000)
        },

        // 获取验证码
        getVerCode() {
            console.log(this.drawer_config.ruleForm.phoneNumber)
            if (!this.drawer_config.ruleForm.phoneNumber) {
                this.$message({
                    message: '手机号不能为空',
                    type: 'error',
                })
                return
            }
            this.countdown(60)
        },
        // 监听子组件传关闭事件
        getClose(data) {
            this.drawer_vrisible = false
            this.drawer_vrisible2 = false
        },
    },
}
</script>

<style scoped lang="scss">
.ts {
    position: relative;
    left: -60px;
    display: flex;
    max-width: 972px;
    min-width: 700px;
    width: 100%;
    height: 38px;
    line-height: 38px;
    background: #fafafa;
    border-radius: 4px;
    opacity: 0.8;
    border: 1px solid #e8e8e8;
    padding: 0 20px;
    box-sizing: border-box;
    p {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
    }
}
.phone_title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
}
.content {
    height: 100vh;
}
.phone_row {
    display: flex;
    margin-top: 23px;
}
.phone_box {
    width: 199px;
    height: 80px;

    box-sizing: border-box;
    padding: 10px;
    background: #ffffff;
    box-shadow: 0px 2px 16px 6px rgba(124, 124, 124, 0.1);
    border-radius: 2px;
}
.phone_box > div {
    display: flex;
    justify-content: space-between;
}
.phone_txt {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
}
.phone_del {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fb4702;
    line-height: 20px;
}
.phone_add {
    cursor: pointer;
    margin-left: 20px;
    width: 199px;
    font-size: 14px;
    line-height: 80px;
    text-align: center;
    height: 80px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px dashed #e8e8e8;
}
.img {
    display: flex;
}
.img div {
    margin-right: 23px;
}
.img span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
}
</style>
