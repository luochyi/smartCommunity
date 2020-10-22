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
          <el-form-item label="售卖价"
                        prop="sellPrice">
            <el-input placeholder="必须大于0，最多保留两位小数"
                      style='width: 316px'
                      v-model="ruleForm.sellPrice">
              <i slot="suffix">(元)</i>
            </el-input>
          </el-form-item>
          <el-form-item label="划线价"
                        prop="underlinePrice">
            <el-input placeholder="划线价需高于售卖假，最多保留两位小数"
                      style='width: 316px'
                      v-model="ruleForm.underlinePrice">
              <i slot="suffix">(元)</i>
            </el-input>
          </el-form-item>
          <el-form-item label="商品规格"
                        prop="specifications">
            <p class="txt_small">1、商品规格需写明具体的斤数、克数、毫升等，且每一个sku中只能设置一款商品规格（如商品是乳液，sku中只能是乳液的不同规格，不得出现精华水、面霜等其他商品规格）
              <br>
              2、请准确填写并更新商品实际库存，超卖导致的虚假及延迟发货会引起用户投诉与平台处罚，商品规格将在用户选择规格下单时展示，最多支持三组，第一个商品规格可以添加规格图片
            </p>
            <div class="spe_box">
              <div>
                <el-input placeholder=""
                          style='width: 468px'
                          v-model="ruleForm.specifications">
                </el-input>
              </div>
              <div>
                <el-input placeholder=""
                          style='width: 196px'
                          v-model="ruleForm.specifications_color">
                </el-input>
              </div>
              <div>
                <el-input placeholder="输入属性值(如红色、s码)"
                          style='width: 196px'
                          v-model="ruleForm.specifications_color_x">

                </el-input>
                <el-button style="margin-left:10px">上传图片</el-button>
                <div>
                  <span class='btn_txt'>添加属性值</span>
                </div>
              </div>
            </div>
            <div class="spe_box">
              <div>
                <el-input placeholder=""
                          style='width: 468px'
                          v-model="ruleForm.specifications">
                </el-input>
              </div>
              <div>
                <el-input placeholder=""
                          style='width: 196px'
                          v-model="ruleForm.specifications_color">
                </el-input>
              </div>
              <div>
                <el-input placeholder="输入属性值(如红色、s码)"
                          style='width: 196px'
                          v-model="ruleForm.specifications_color_x">

                </el-input>
                <el-button style="margin-left:10px">上传图片</el-button>
                <div>
                  <span class='btn_txt'>添加属性值</span>
                </div>
              </div>
            </div>
            <div class="add_commodity">
              <span class='el-icon-plus'>添加商品</span>
            </div>
          </el-form-item>
          <el-form-item label="商品库存与价格"
                        prop="specifications">
            <p>批量设置 <span class="txt_small">在下方框中选择内容进行批量填充</span></p>
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
                sellPrice: '',
                underlinePrice: '',
                specifications: '颜色',
                specifications_color: '红色',
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
.spe_box {
    margin: 16px 0;
    padding: 16px;
    width: 872px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #e9e9e9;
}
.spe_box div {
    margin-bottom: 16px;
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
</style>
