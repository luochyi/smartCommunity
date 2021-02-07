<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>新增主办方</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form label-position="right"
                     :model="ruleForm"
                     label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="主办方单位"
                            prop="name">
                <el-input size="small"
                          style="width:240px"
                          placeholder="请输入"
                          v-model="ruleForm.name">
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="活动内容" prop="region">
                <el-select
                  size="small"
                  style="width:240px"
                  v-model="ruleForm.region"
                  placeholder="请选择活动区域"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->
              <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/">
                <el-button icon="el-icon-edit"
                           size="small">上传图片</el-button>
                <div slot="tip"
                     class="el-upload__tip">
                  <span>支持扩展名：png.pdf.jpg</span>
                </div>
              </el-upload> -->
              <el-form-item label="营业执照"
                            prop="region">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button icon="el-icon-edit"
                             size="small">上传图片</el-button>
                  <div slot="tip"
                       class="el-upload__tip">
                    <span>支持扩展名：png.pdf.jpg</span>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="负责人"
                            prop="name">
                <el-input size="small"
                          style="width:240px"
                          placeholder="请输入"
                          v-model="ruleForm.name">
                </el-input>
              </el-form-item>
              <el-form-item label="联系方式"
                            prop="region">
                <el-select size="small"
                           style="width:240px"
                           v-model="ruleForm.region"
                           placeholder="请选择活动区域">
                  <el-option label="区域一"
                             value="shanghai"></el-option>
                  <el-option label="区域二"
                             value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件类型"
                            prop="name">
                <el-input size="small"
                          style="width:240px"
                          placeholder="请输入"
                          v-model="ruleForm.name">
                </el-input>
              </el-form-item>
              <el-form-item label="证件号码"
                            prop="name">
                <el-input size="small"
                          style="width:240px"
                          placeholder="请输入"
                          v-model="ruleForm.name">
                </el-input>
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
  data () {
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
      value: ''
    }
  },
  methods: {
    onSubmit () {
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
.el-form-item.el-form-item2 {
    width: 50%;
}
</style>
