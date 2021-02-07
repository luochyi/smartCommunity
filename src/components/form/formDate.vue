<style scoped>
.tips {
    margin: 20px;
    height: 38px;
    line-height: 38px;
    background: #fafafa;
    border-radius: 4px;
    opacity: 0.8;
    border: 1px solid #e8e8e8;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>客服信息</span>
    </div>
    <div class="content">
      <div>
        <div class="phone_title"><span>电话</span></div>
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
        <div class="phone_title"><span>微信</span></div>
        <div class="phone_row">
          <div class="phone_box">
            <div>
              <span class="phone_txt">微信号</span>
              <span class="phone_del">编辑</span>
            </div>
            <div>
              <span>1592830791</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加 -->
    <!-- 添加 -->
    <drawer ref="ruleForm"
            :drawerVrisible='drawer_vrisible'
            @handleClose='getClose'
            :drawer_config="drawer_config"
            :formHandler="form_handler">
      <template v-slot:picker>
        <el-date-picker type="date"
                        size="small"
                        v-model.trim="drawer_config.ruleForm.area"
                        style="width: 240px;"></el-date-picker>
      </template>
    </drawer>

  </div>
</template>

<script>
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
            drawer_vrisible: false,
            drawer_config: {
                drawer_vrisible: false,
                head_title: '添加预警联系方式',
                content_title: '基本信息',
                form_item: [
                    {
                        type: 'Radio',
                        label: '上架时间',
                        prop: 'status',
                        options: [
                            { value: 1, label: '手机' },
                            { value: 2, label: '普通座机' },
                            { value: 3, label: '400-800电话' },
                        ],
                        width: '100%',
                    },
                    {
                        type: 'Input',
                        label: '手机号',
                        placeholder: '请选择停车场',
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
        }
    },
    components: {
        drawer,
    },
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
        reset(fromData, refs) {
            console.log()
            refs.resetFields()
            // fromData.ruleForm.resetFields()
            // res.region = ''
        },
        // 添加
        addDrawer() {
            this.drawer_vrisible = true
        },
        getClose(data) {
            this.drawer_vrisible = false
        },
    },
}
</script>

<style scoped>
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
</style>
