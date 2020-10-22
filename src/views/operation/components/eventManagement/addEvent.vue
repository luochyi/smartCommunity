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
            <el-form label-position="right"
                     :model="ruleForm"
                     label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="活动标题"
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
              <el-form-item label="活动内容"
                            prop="region">
                <el-input type="textarea"
                          :rows="5"
                          placeholder="请输入内容"
                          v-model="ruleForm.textarea">
                </el-input>
              </el-form-item>
              <el-form-item label="图片"
                            prop="region">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button icon="el-icon-edit"
                             size="small">上传图片</el-button>
                  <span>建议比例：3:2</span>
                  <div slot="tip"
                       class="el-upload__tip">
                    <span>支持扩展名：png.pdf.jpg</span>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
            <form-datechildren :formItem="form_item"
                               ref="formData"></form-datechildren>
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
import formDatechildren from '@/components/form/formDatechildren'
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

      form_item: [
        {
          type: 'Input',
          label: '活动地点',
          placeholder: '请输入',
          prop: 'userNam2e',
          width: '100%'
          // disabled: 1
        },
        {
          type: 'date',
          label: '活动开始时间',
          placeholder: '请选择',
          prop: 'endD3ate'
        },
        {
          type: 'date',
          label: '活动截止时间',
          placeholder: '请选择',
          prop: 'en1dDate'
        },
        {
          type: 'Input',
          label: '报名人数',
          placeholder: '请输入',
          prop: 'ph32one'
        },
        {
          type: 'Input',
          label: '参与人数',
          placeholder: '请输入',
          prop: 'ph23one'
        },
        {
          type: 'select',
          label: '收费标准',
          placeholder: '请选择',
          prop: 'sta43tus',
          options: [
            {
              value: '1',
              label: '半年付'
            },
            {
              value: '2',
              label: '一年付'
            }
          ]
        },
        {
          type: 'Input',
          label: '退费',
          placeholder: '请输入',
          prop: 'phon123e'
        },
        {
          type: 'Input',
          label: '联系人',
          placeholder: '请输入',
          prop: 'pho2ne'
        },
        {
          type: 'Input',
          label: '联系电话',
          placeholder: '请输入',
          prop: 'pho323ne'
        },
        {
          type: 'select',
          label: '状态',
          placeholder: '请选择租房状态',
          prop: 'sta32tus',
          options: [
            {
              value: '1',
              label: '已租'
            },
            {
              value: '2',
              label: '已售'
            }
          ]
        },
        {
          type: 'span',
          label: '创建人',
          value: '管理员',
          placeholder: '请输入',
          prop: 'pho32233ne',
          color: '#666666'
        }
      ],
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
  components: {
    formDatechildren
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
