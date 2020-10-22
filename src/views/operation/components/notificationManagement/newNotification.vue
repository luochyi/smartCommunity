<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>新增公告</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="通知标题" prop="name">
                <el-input
                  size="small"
                  style="width:240px"
                  placeholder="请输入"
                  v-model="ruleForm.name"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="公告内容" prop="region">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="ruleForm.textarea"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="通知后缀" prop="region">
                <el-select
                  size="small"
                  style="width:240px;"
                  v-model="ruleForm.region"
                  placeholder="请天选后选择后缀"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <!-- <el-date-picker v-model="value1" placeholder="选择日期">
                </el-date-picker> -->
              </el-form-item>
              <el-form-item label="推送对象" prop="region">
                <div>
                  <el-checkbox v-model="checked">备选项</el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="checked">备选项</el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="checked">备选项</el-checkbox>
                </div>
                <div>
                  <el-select
                    size="small"
                    style="width:320px; margin-left:16px"
                    v-model="ruleForm.region"
                    disabled
                    placeholder="请天选后选择后缀"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="推送时间" prop="region">
                <div>
                  <el-radio v-model="radio" label="2">备选项</el-radio>
                </div>
                <div>
                  <el-radio v-model="radio" label="2">备选项</el-radio>
                </div>
                <div>
                  <el-date-picker
                    type="date"
                    size="small"
                    style="width:224px;margin-left:30px; margin-bottom:99px"
                    placeholder="选择日期"
                    disabled
                    v-model="ruleForm.date1"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check">
            <span>提交</span>
          </button>
          <button class="dra-cancel"><span>取消</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      radio: 1,
      input: '',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        textarea: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '黄金糕'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
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
