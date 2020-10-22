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
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="公告标题" prop="name">
                <el-input
                  size="small"
                  style="width:240px"
                  placeholder="请输入"
                  v-model="ruleForm.name"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="公告类型" prop="region">
                <el-select
                  size="small"
                  style="width:240px"
                  v-model="ruleForm.region"
                  placeholder="请选择活动区域"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公告图片" prop="region">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button icon="el-icon-edit" size="small"
                    >上传图片</el-button
                  >
                  <span>建议比例：3:2</span>
                  <div slot="tip" class="el-upload__tip">
                    <span>支持扩展名：png.pdf.jpg</span>
                  </div>
                </el-upload>
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
              <el-form-item label="活动区域" prop="region">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  size="small"
                  style="width:300px"
                >
                  <el-button icon="el-icon-edit" size="small"
                    >上传文件</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item label="状态" prop="region">
                <el-select
                  size="small"
                  style="width:240px;"
                  v-model="ruleForm.region"
                  placeholder="请选择活动区域"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <!-- <el-date-picker v-model="value1" placeholder="选择日期">
                </el-date-picker> -->
                <el-date-picker
                  type="date"
                  size="small"
                  style="width:240px;margin-left:30px; margin-bottom:99px"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button
            class="dra-submit el-icon-circle-check"
            @click="onSubmit('ruleForm')"
          >
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
      value: '',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          // console.log(this.ruleForm)
          this.$emit('submit', this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
