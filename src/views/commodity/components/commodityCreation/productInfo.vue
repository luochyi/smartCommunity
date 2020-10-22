<template>
  <div>
    <div>
      <div class="box-title">
        <span>基本信息</span>
      </div>
      <div style="width:1000px;">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 size="small"
                 label-width="180px"
                 class="demo-ruleForm">
          <el-form-item label="商品分类"
                        prop="name">
            <span>已选： {{this.$store.state.CategorySelected }}</span>
            <el-button class="init-text"
                       type="text"
                       style="font-size:14px;margin-left:10px"
                       @click="revise()">修改</el-button>
          </el-form-item>
          <el-form-item label="商品标题"
                        prop="name">
            <el-input v-model="ruleForm.name"
                      maxlength="30"
                      show-word-limit
                      placeholder="需清晰描述所售商品，包含品牌信息，商品名称，商品规格，需审核后生效"></el-input>
          </el-form-item>
          <el-form-item label="推荐语"
                        prop="name1">
            <el-input v-model="ruleForm.name1"
                      maxlength="50"
                      show-word-limit
                      placeholder="请输入商品推荐语"></el-input>
          </el-form-item>

          <el-form-item label="类目属性 "
                        required>
            <span>错误填写类目、属性，可能会引起商品下架，影响您的正常销售，请认真填写</span>
            <div class="form_box">
              <el-form label-width="auto"
                       style="display:flex;"
                       class="demo-ruleForm">
                <el-form-item label="商品品牌"
                              prop="age"
                              size="small"
                              style="margin-top: 16px"
                              :rules="[
                    { required: true, message: '年龄不能为空' },
                    { type: 'number', message: '年龄必须为数字值' }
                  ]">
                  <el-input type="age"
                            autocomplete="off"
                            style="width:240px;margin-right:10px;"></el-input>
                  <el-button type="init-button2"
                             small="mini"
                             plain>添加品牌</el-button>
                </el-form-item>
                <el-form-item label="原产地 "
                              prop="age"
                              size="small"
                              style="margin-top: 16px"
                              :rules="[
                    { required: true, message: '年龄不能为空' },
                    { type: 'number', message: '年龄必须为数字值' }
                  ]">
                  <el-input type="age"
                            autocomplete="off"
                            style="width:240px"></el-input>
                </el-form-item>
                <el-form-item label="套装规格"
                              prop="age"
                              size="small"
                              style="margin-top: 16px">
                  <el-input type="age"
                            autocomplete="off"
                            style="width:240px"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-form-item>
          <el-form-item label="供应商"
                        prop="region">
            <el-select v-model="ruleForm.region"
                       placeholder="请选择活动区域">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式"
                        prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="在线支付"></el-radio>
              <el-radio label="货到付款"></el-radio>
              <el-radio label="在线支付/货到付款"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="订单库存计数"
                        prop="resource1">
            <el-radio v-model="ruleForm.resource1"
                      label="1">下单减库存</el-radio>
            <p style='
                  font-size: 12px;
                    font-weight: 400;
                    color: #999999;'>买家提交订单，扣减库存，存在恶拍风险</p>
            <el-radio v-model="ruleForm.resource1"
                      label="2">付款减库存</el-radio>
            <p style='
                  font-size: 12px;
                    font-weight: 400;
                    color: #999999;'>买家支付订单，扣减库存，存在超卖风险</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 删除提示弹窗-->
    <Dialog :dialogVisible="dialog_visible"
            :dialog_config="dialog_config"
            @cancel="cancel"
            @confirm="confirm">
    </Dialog>
  </div>
</template>
<script>
export default {
    data() {
        return {
            // 控制dialog显示隐藏
            dialog_visible: false,
            // 传入dialog的参数
            dialog_config: {
                title: '',
                content: '',
            },
            ruleForm: {
                name1: '',
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                resource1: '1',
                desc: '',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入商品标题',
                        trigger: 'blur',
                    },
                    {
                        min: 0,
                        max: 30,
                        message: '长度在 0 到 30 个字符',
                        trigger: 'blur',
                    },
                ],
                region: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change',
                    },
                ],
                date1: [
                    {
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change',
                    },
                ],
                date2: [
                    {
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change',
                    },
                ],
                type: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change',
                    },
                ],
                resource: [
                    {
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change',
                    },
                ],
                desc: [
                    {
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    methods: {
        revise() {
            this.dialog_config.title = '修改提示'
            this.dialog_config.content =
                '离开此页面会导致未保存的内容丢失，确定离开？'
            this.dialog_visible = true
        },
        // 监听子组件取消事件
        cancel() {
            this.dialog_visible = false
        },
        // 监听子组件确认事件
        confirm() {
            this.dialog_visible = false
            this.$emit('handleClose', false)
        },
    },
}
</script>
<style scoped>
.form_box {
    width: 800px;
    border: 1px solid #e8e8e8;
    /* height: 112px; */
}
.form_box .el-form {
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.box-title {
    padding: 15px 0px 24px 20px;
}
/*
el-icon-arrow-down
 */
.box-title span {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
}
</style>
