<template>

  <div>
    <el-drawer title="我是标题"
               :visible.sync="isVisibleDrawe"
               size="58%"
               :before-close="close"
               :with-header="false">
      <div class="drawer-box">
        <div class="dra-header">
          <span>投票详情</span>
        </div>
        <div class="dra-body">
          <div class="dra-content">
            <div class="content-titel">
              <span>基本信息</span>
            </div>
            <div class="">
              <el-form label-position="right"
                       label-width="100px"
                       size="small"
                       :model="formLabelAlign">
                <el-form-item label="类型"
                              style="width:100%">
                  <span>建议</span>
                </el-form-item>
                <el-form-item label="照片"
                              style="width:100%">
                  <el-image style="width: 140px; height: 100px"
                            :src="url"
                            fit="scale-down"></el-image>
                </el-form-item>
                <el-form-item label="反馈内容"
                              style="width:100%">
                  <div class="table_box">
                    <div>
                      <p>王小名</p>
                      <p>2020-02-12 10:00:00</p>
                    </div>
                    <div class="content_item">
                      <p>好的希望您们尽快处理</p>
                    </div>
                  </div>
                  <div class="table_box">
                    <div>
                      <p>王小名</p>
                      <p>2020-02-12 10:00:00</p>
                    </div>
                    <div class="content_item">
                      <p>好的希望您们尽快处理</p>
                    </div>
                  </div>
                  <div class="table_box">
                    <div>
                      <p>王小名</p>
                      <p>2020-02-12 10:00:00</p>
                    </div>
                    <div class="content_item">
                      <p>好的希望您们尽快处理</p>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="星级评分"
                              style="width:100%">
                  <el-rate v-model="rate"
                           :colors="colors"
                           disabled></el-rate>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="dra-content">
            <div class="content-titel">
              <span>回复反馈</span>
            </div>
            <div class="">
              <el-form label-position="right"
                       label-width="100px"
                       size="small"
                       :model="formLabelAlign">
                <el-form-item label="类型"
                              style="width:100%">
                  <span>
                    <el-input type="textarea"
                              :autosize="{ minRows: 6}"
                              placeholder="请输入内容"
                              v-model="textarea2">
                    </el-input>
                  </span>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-submit el-icon-circle-check"
                    @click="close"><span>提交</span></button>
            <button class="dra-cancel"
                    @click="close"><span>关闭</span></button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false,

    }
  },
  data () {
    return {
      isVisibleDrawe: false,
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      textarea2: '',
      colors: ['#FB4702', '#FB4702', '#FB4702'],
      rate: 5,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  mounted () {
  },
  methods: {

    close () {
      this.$emit('handleClose', "Close")
    },
    // 返回详情弹窗
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.isVisibleDrawe = newValue
        console.log(newValue)
      },
      immediate: true
    },

  }
}
</script>
<style scoped>
.content-titel2 {
  margin: 0px 0px 20px 30px;
  padding-top: 30px;
  border-top: 1px solid #e8e8e8;
}
.table_box {
  display: flex;
}
.table_box > div {
  padding: 14px;
  border: 1px solid #f5f5f6;
  width: 20%;
}
.table_box > div.content_item {
  border-left: 0;
  flex: 1;
}
</style>
