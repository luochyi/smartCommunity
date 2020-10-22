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
          <el-form-item label="提取方式"
                        prop="exMethod">
            <el-radio v-model="ruleForm.exMethod"
                      label="1">使用物流配送</el-radio>
            <br>

            <span>运费模版</span>
            <el-input size="small"
                      style='width:240px;margin:0px 12px'
                      placeholder=""></el-input>
            <div class='btn_xj'>
              <span>新建模板</span>
            </div>
          </el-form-item>
          <el-form-item label="预售设置"
                        prop="preSet">
            <el-radio v-model="ruleForm.preSet"
                      label="1">非预售</el-radio>
            <br>
            <el-radio v-model="ruleForm.preSet"
                      label="2">全款预售</el-radio>
          </el-form-item>
          <el-form-item label="承诺发货时间"
                        prop="deliveryTime">
            <p class="txt_small">请严格按照承诺发货时间进行发货，超时发货会收到相关处罚，若当前商品报名预售活动，用户端展示的发货时间以预售发货时间为准</p>
            <el-select placeholder="请选择"
                       size="small"
                       style="width:240px"
                       v-model="ruleForm.deliveryTime">
              <el-option label="10天"
                         value="1">
              </el-option>
              <el-option label="13天"
                         value="2">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="售后服务"
                        prop="afterService">
            <el-checkbox-group v-model="ruleForm.afterService"
                               size="small">
              <el-checkbox label="提供发票"></el-checkbox>
              <br>
              <el-checkbox label="保修服务"></el-checkbox>
              <br>
              <el-checkbox label="7天无理由退换货，该类目商品须支持【7天无理由退换货】服务"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="客服电话"
                        prop="hotline">
            <el-input size="small"
                      v-model="ruleForm.hotline"
                      style='width:400px;'
                      placeholder="仅支持录入手机号、座机及400-800电话"></el-input>
          </el-form-item>
          <el-form-item label="商家备注"
                        prop="Remarks">
            <el-input size="small"
                      v-model="ruleForm.Remarks"
                      maxlength="50"
                      show-word-limit
                      style='width:400px;'
                      placeholder="该备注仅商家可见"></el-input>
          </el-form-item>
          <el-form-item label="上架时间"
                        prop="addedTime">
            <el-radio v-model="ruleForm.addedTime"
                      label="1">立即上架</el-radio>
            <br>
            <el-radio v-model="ruleForm.addedTime"
                      label="2">定时上架</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                exMethod: '1',
                preSet: '1',
                deliveryTime: '7天',
                afterService: [
                    '7天无理由退换货，该类目商品须支持【7天无理由退换货】服务',
                ],
                hotline: '',
                Remarks: '',
                addedTime: '1',
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
            },
        }
    },
    methods: {},
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
.box-title span {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
}
.txt_small {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
}
.add_commodity {
    width: 116px;
    text-align: center;
    height: 32px;
    line-height: 32px;
    background: #ffefe9;
    border-radius: 2px;
    border: 1px dashed #fb4702;
}
.add_commodity span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fb4702;
}
.btn_txt {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fb4702;
}
.btn_xj {
    cursor: pointer;
    text-align: center;
    line-height: 32px;
    display: inline-block;
    width: 76px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #fb4702;
}
.btn_xj span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fb4702;
}
</style>
