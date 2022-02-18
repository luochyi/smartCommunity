<template>
  <div class="preview">
    <el-dialog :visible.sync="dialogVisible"
               :fullscreen='true'
               :before-close="handleClose">
      <div class="preview-header">
        <div class="esc-preview"
             @click="dialogPreview()">
          <i class="el-icon-s-marketing"
             style="font-size:24px;margin-left:33px;margin-right:9px"></i>
          <span>退出预览</span>
        </div>
      </div>
      <div class="preview_body">
        <div class="preview_content">
          <div class="preview_title">
            <span>河北远德物业服务集团有限公司</span>
          </div>
          <div class="preview_box">
            <div class="preview_item">
              <span>姓名：王倩</span>
            </div>
            <div class="preview_item">
              <span>房间号：2-2-303</span>
            </div>
            <div class="preview_item">
              <span>项目名称：测试</span>
            </div>
            <div class="preview_item">
              <span>付款时间：2020-09-01 10:22</span>
            </div>
          </div>
          <div class="preview_table">
            <el-table :data="tableData"
                      border
                      style="width: 100%">
              <el-table-column prop="table1"
                               label="收费项目">
              </el-table-column>
              <el-table-column prop="table2"
                               label="缴费开始时间">
              </el-table-column>
              <el-table-column prop="table3"
                               label="缴费结束时间">
              </el-table-column>
              <el-table-column prop="table4"
                               label="缴费期限">
              </el-table-column>
              <el-table-column prop="table5"
                               label="逾期天数">
              </el-table-column>
              <el-table-column prop="table6"
                               label="滞纳金">
              </el-table-column>
            </el-table>
          </div>
          <div>
            <div class="preview_box">
              <!-- <div class="preview_item">
                <span>开票类型：增值税专用发票</span>
              </div> -->
              <!-- <div class="preview_item">
                <span>实收金额人民币（大写）：壹仟贰佰圆整</span>
              </div> -->
              <div class="preview_item">
                <span>实收金额人民币（大写）：贰拾捌圆肆角贰分</span>
              </div>
            </div>
            <div class="preview_box">
              <div class="preview_item">
                <span>本收据不作为报销凭证，盖章有效，妥善保存，遗失不补。（白-客户，红-记账，黄-存根）</span>
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableData: [{
        table1: '物业费',
        table2: '2021-09-09',
        table3: '2021-09-11',
        table4: '2021-09-12',
        table5: '逾期四天',
        table6: '28.42',
      }]
    }
  },
  methods: {
    handleClose (done) {

    },
    dialogPreview () {
      this.$emit('dialogPreview', false)
    }
  },
  dialogVisible: {
    handler (newValue) {
      this.isVisibleDialog = newValue
      console.log(newValue + '----newValue')
    },
    immediate: true
  },
}
</script>

<style>
.preview .el-dialog__header {
  display: none;
}
.preview .el-table td,
.preview .el-table th {
  text-align: center;
}
.preview_body {
  width: 100%;
}
.el-dialog,
.el-pager li {
  background: rgba(255, 255, 255, 0.95);
  -webkit-box-sizing: border-box;
}
.preview .el-table tr th {
  color: #333333 !important;
  font-weight: 500;
}
.preview_content {
  width: 922px;
  height: 419px;
  opacity: 1.1;
  padding: 0 58px;
  background: #ffffff;
  margin: 108px auto;
  color: #333;
  border: 1px solid #979797;
}
.preview_title {
  text-align: center;
  height: 108px;
  line-height: 108px;
}
.preview_title span {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 28px;
}
.preview_box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
}
.preview_item span {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 20px;
}
.preview_table {
  margin-bottom: 80px;
}
</style>
