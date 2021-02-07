<template>
  <div>
    <div class="box">
      <div class="box_box">
        <div class="box-body">
          <div class="box-title">
            <span>商品信息</span>
          </div>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="基础信息"
                         name="first">
              <production @handleClose='handleClose'></production>
            </el-tab-pane>
            <el-tab-pane label="图文信息"
                         name="second">
              <Graphic></Graphic>
            </el-tab-pane>
            <el-tab-pane label="价格库存"
                         name="third">
              <PriceInventory></PriceInventory>
            </el-tab-pane>
            <el-tab-pane label="服务与资质"
                         name="fourth">
              <Service></Service>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="box_footer">
        <div class="box_footer_content">
          <div class="content-btn">
            <el-button class="init-button"
                       @click="handleClose">发布</el-button>
            <el-button class="dra-cancel"
                       style="margin-right:10px">保存</el-button>
            <button class="dra-cancel"
                    @click="handleClose">
              <span>取消</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import production from './productInfo.vue'
import Graphic from './Graphic.vue'
import PriceInventory from './PriceInventory.vue'
import Service from './Service.vue'

export default {
  components: {
    production,
    Graphic,
    PriceInventory,
    Service,
  },
  data () {
    return {
      activeName: 'first',
      ruleForm: {
        name1: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        resource1: '',
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
    handleClose () {
      console.log(1)
      this.$emit('handleClose', false)
    },
    handleClick () { },
    cancel () { },
  },
}
</script>
<style scoped>
.box {
    /* 减去main的padding值 */
    /* width: calc(100% + 40px); */
    width: 100%;

    position: relative;
    /* top: -20px;
  left: -20px; */
    /* 减去头部距离 */
    height: calc(100vh - 80px);
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

.box-body {
    margin: 20px;
    margin-bottom: 17px;
    background: #fff;
    overflow: auto;
    height: calc(100vh - 179px);
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
