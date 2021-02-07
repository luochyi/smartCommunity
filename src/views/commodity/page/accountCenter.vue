<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>账户中心</span>
      </div>
      <div class="content">
        <p class='txt-btn'>在线支付账单</p>
        <div>
          <span class='titel'>平台服务费 </span>
          <el-input placeholder="请输入内容"
                    v-model="input"
                    size="small"
                    style="width:120px;  margin:26px 12px;"
                    :disabled="true">
          </el-input>
          <div class='btn'>
            <span>修改</span>
          </div>
        </div>
        <div class='box'>
          <div class="item">
            <div class="item-title">
              <span>支付宝账户</span>
            </div>
            <div class="item-box">
              <div>
                <div>
                  <p>暂未开通</p>
                </div>
                <div @click='addDrawer'>
                  <span>去开通</span>
                </div>
              </div>

            </div>
          </div>
          <div class="item">
            <div class="item-title">
              <span>微信账户</span> <span style="color: #FB4702;">编辑</span>
            </div>
            <div class="item-body">
              <div class='body-content'>
                <p>宁波永成物业有限公司</p>
                <p>621226*********3381</p>
                <p>中国工商银行</p>
              </div>
            </div>
            <div class="item-footer">
              <div>
                <p>动帐明细<span>¥1020.57</span></p>
              </div>
              <div>
                <p>2020-08-31 16:30:22</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- 添加 -->
    <drawer ref="ruleForm"
            :drawerVrisible='drawer_vrisible'
            @handleClose='getClose'
            :drawer_config="drawer_config"
            :formHandler="form_handler">
      <!-- 插入一个输入框 -->
      <template v-slot:f11>
        <el-upload action="#"
                   list-type="picture-card"
                   :auto-upload="false">
          <i slot="default"
             class="el-icon-plus"></i>
          <div slot="file"
               slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail"
                 :src="file.url"
                 alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%"
               :src="dialogImageUrl"
               alt="">
        </el-dialog>
      </template>
      <template v-slot:f12>
        <el-upload action="#"
                   list-type="picture-card"
                   :auto-upload="false">
          <i slot="default"
             class="el-icon-plus"></i>
          <div slot="file"
               slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail"
                 :src="file.url"
                 alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </template>
      <template v-slot:f13>
        <el-upload action="#"
                   list-type="picture-card"
                   :auto-upload="false">
          <i slot="default"
             class="el-icon-plus"></i>
          <div slot="file"
               slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail"
                 :src="file.url"
                 alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </template>
      <template v-slot:f14>
        <el-checkbox v-model="drawer_config.ruleForm.f14">我已阅读并同意 <span style="color:rgba(251, 71, 2, 1)">《支付宝协议》</span> </el-checkbox>
      </template>

    </drawer>
  </div>
</template>

<script>
import drawer from '@/components/Drawer'

export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            input: '',
            drawer_vrisible: false,
            drawer_config: {
                head_title: '请填写开户信息',
                content_title: '基本信息',
                form_item: [
                    {
                        type: 'span',
                        label: '主体名称 ',
                        prop: 'f1',
                        width: '100%',
                    },
                    {
                        type: 'span',
                        label: '营业执照编号 ',
                        prop: 'f2',
                        width: '100%',
                    },
                    {
                        type: 'span',
                        label: '法人姓名 ',
                        prop: 'f3',
                        width: '100%',
                    },
                    {
                        type: 'span',
                        label: '法人证件号码 ',
                        prop: 'f4',
                        width: '100%',
                    },
                    {
                        type: 'span',
                        label: '开户名',
                        prop: 'f5',
                        width: '100%',
                    },
                    {
                        type: 'Input',
                        label: '银行卡号 ',
                        elwidth: '320px',
                        prop: 'f6',
                        width: '100%',
                    },
                    {
                        type: 'Input',
                        label: '开户银行 ',
                        elwidth: '320px',
                        prop: 'f7',
                        width: '100%',
                    },
                    {
                        type: 'Input',
                        label: '银行所在地  ',
                        elwidth: '320px',
                        prop: 'f8',
                        width: '100%',
                    },
                    {
                        type: 'Select',
                        label: '开户支行 ',
                        elwidth: '320px',
                        options: [
                            { label: '宁波支行', value: '1' },
                            { label: '上海银行', value: '2' },
                        ],
                        prop: 'f9',
                        width: '100%',
                    },
                    {
                        type: 'Input',
                        label: '银行预留号码   ',
                        elwidth: '320px',
                        prop: 'f10',
                        width: '100%',
                    },
                    {
                        type: 'Slot',
                        slotName: 'f11',
                        label: '证件人像面',
                        placeholder: '请输入号码',
                        width: '100%',
                        prop: 'f11',
                    },
                    {
                        type: 'Slot',
                        slotName: 'f12',
                        label: '证件国徽面',
                        placeholder: '请输入号码',
                        width: '100%',
                        prop: 'f12',
                    },
                    {
                        type: 'Slot',
                        slotName: 'f13',
                        label: '营业执照',
                        placeholder: '请输入号码',
                        width: '100%',
                        prop: 'f13',
                    },
                    {
                        type: 'Slot',
                        slotName: 'f14',
                        label: '营业执照',
                        placeholder: '请输入号码',
                        width: '100%',
                        prop: 'f14',
                    },
                ],
                ruleForm: {
                    phoneNumber: '',
                    f1: '宁波永成物业有限公司 ',
                    f2: '42010300005740473Q ',
                    f3: '熊涵炼',
                    f4: '330303198012211583',
                    f5: '宁波永成物业有限公司 ',
                    f6: '',
                    f7: '',
                    f8: '',
                    f9: '',
                    f10: '',
                    f11: '',
                    f12: '',
                    f13: '',
                    f14: '',
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
        // 重置
        reset(fromData, refs) {
            console.log(fromData)
            refs.resetFields()
            // fromData.ruleForm.resetFields()
            // res.region = ''
            // this.$refs['ruleForm'].resetFields()
        },
        handleRemove(file) {
            console.log(file)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        handleDownload(file) {
            console.log(file)
        },
        // 添加
        addDrawer() {
            this.drawer_vrisible = true
        },
        // 监听子组件传关闭事件
        getClose(data) {
            this.drawer_vrisible = false
        },
    },
}
</script>

<style scoped>
.txt-btn {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fb4702;
    line-height: 20px;
}
.btn {
    display: inline-block;
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 60px;
    height: 32px;
    line-height: 32px;
    text-align: center;
}
.title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.box {
    display: flex;
}
.item {
    width: 420px;
    height: 304px;
    background: #ffffff;
    box-shadow: 0px 2px 16px 6px rgba(124, 124, 124, 0.1);
    border-radius: 2px;
    margin-right: 60px;
}
.item-title,
.item-footer {
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f6;
    padding: 0 20px;
}
.item-body {
    height: 180px;
    display: flex;
    justify-content: space-between;
}
.body-content {
    padding: 0 20px;
}
.body-content p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 40px;
}
.item-footer {
    border-top: 1px solid #f5f5f6;
    border-bottom: none;
}
.item-title span {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
}
.item-box {
    text-align: center;
    height: 241px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item-box p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 40px;
}
.item-box span {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fb4702;
}
.item-footer p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
}
.item-footer p span {
    padding-left: 10px;

    font-weight: 500;
    color: #333333;
}
.main-content {
    padding-bottom: 200px;
}
</style>
