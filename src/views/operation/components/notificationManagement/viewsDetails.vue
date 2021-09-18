<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>通知详情</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="通知标题">
                <span>疫情期间注意事项</span>
              </el-form-item>

              <el-form-item label="通知内容">
                <span
                  >疫情期间请大家带好口罩，进小区必须量体温并且戴口罩，如果不执行，一律不让进。</span
                >
              </el-form-item>
              <el-form-item label="通知后缀  ">
                <span>智慧小区</span>
              </el-form-item>
              <el-form-item label="推送对象">
                <div>
                  <el-checkbox v-model="checked" disabled>备选项</el-checkbox>
                </div>
                <div>
                  <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
                  <el-checkbox v-model="checked" disabled>备选项</el-checkbox>
                </div>
              </el-form-item>

              <el-form-item label="推送时间 ">
                <span>实时推送 2020-09-01 10:00:00</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check">
            <span>确认</span>
          </button>
          <!-- <button class="dra-cancel"><span>取消</span></button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
.content-titel2 {
  margin: 0px 0px 20px 30px;
  padding-top: 30px;
  border-top: 1px solid #e8e8e8;
}
.el-form-item {
  width: 100%;
}
</style>
