<template>
  <div>
    <div>
      <div class="box-title">
        <span>图文信息</span>
      </div>
      <div style="width:1000px;">
        <el-form label-width="180px" class="demo-ruleForm">
          <el-form-item
            label="商品品牌"
            prop="age"
            size="small"
            style="margin-top: 16px"
            :rules="[{ required: true, message: '年龄不能为空' }]"
          >
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div slot="tip" class="el-upload__tip" style="color: #999999;">
                1、主图至少一张图片，主图图片应包含商品正反面外包装图，若涉及活动，图片上需清晰体现活动时间和联系方式
                <br />
                2、仅支持png、jpg、jpeg格式；建议上传1:1图片，图片至少600*600，图片大小不超过1M
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item
            label="原产地 "
            prop="age"
            size="small"
            style="margin-top: 16px"
            :rules="[{ required: true, message: '年龄不能为空' }]"
          >
            <editor-bar style="width:100%"></editor-bar>
            <div style="color: #999999; font-size:12px">
              1、详情图图片应与商品相关，包含商品正反面外包装图，若涉及活动，图片上需清洗体现活动时间、联系方式
              <br />
              2、若商品为食品，反面外包装还需清晰度体现SC码，以及生产厂商、生产日期、有效期等详细信息
            </div>
            <!---->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import editorBar from '@/components/editor/editorBar.vue'
export default {
  components: { editorBar },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>
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
</style>
