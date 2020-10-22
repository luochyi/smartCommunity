<template>

  <div>
    <el-drawer title="我是标题"
               :visible.sync="isVisibleDrawe"
               size="58%"
               :before-close="handleClose"
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
              <form-datechildren :formItem="form_item"
                                 :rulesItem="rules_item"
                                 ref="formData"></form-datechildren>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-submit el-icon-circle-check"
                    @click="onSubmit('ruleForm')"><span>提交</span></button>
            <button class="dra-cancel"
                    @click="handleClose()"><span>关闭</span></button>
          </div>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import formDatechildren from '@/components/form/formDatechildren'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    formDatechildren
  },
  data () {
    return {
      isVisibleDrawe: false,
      form_item: [
        {
          type: 'select',
          value: '',
          placeholder: '请选择楼栋/单元/室号',
          options: [
            {
              label: '一单元',
              value: '1'
            }
          ],
          label: '投票标题',
          prop: 'userNam2e',
          // disabled: 1
        },
        {
          type: 'span',
          value: '系统自动生成',
          label: '临时门禁卡号1',
          prop: 'da111te',
          // disabled: 1
        },
        {
          type: 'select',
          label: '业主',
          options: [],
          prop: 'date',
          disabled: true,
          // disabled: 1
        },
        {
          type: 'Input',
          value: '',
          label: '联系方式',
          prop: 'enddate',
          disabled: true,
        }
        ,
        {
          type: 'Input',
          value: '',
          label: '装修押金',
          prop: 'public',
          disabled: true,

        },
        {
          type: 'Input',
          value: '',
          label: '装修清理费',
          prop: 'imagePreview',
          disabled: true,

        }
        ,
        {
          type: 'Input',
          value: '',
          label: '公共设置修复费',
          prop: 'imagePreview1',
          width: '100%',
          disabled: true,

        }
        ,
        {
          type: 'select',
          value: '',
          label: '实际开始时间',
          prop: 'imagePreview2',
          disabled: true,

        }
        ,
        {
          type: 'select',
          value: '',
          label: '实际结束时间',
          prop: 'imagePreview3',
          disabled: true,

        }
        ,
        {
          type: 'select',
          value: '',
          label: '状态',
          prop: 'imagePreview4',
          options: []
        }
        ,
        {
          type: 'textarea',
          value: '',
          label: '状态',
          prop: 'textarea_1',
          width: '100%',
          rows: 8
        }
        // imagePreview
      ],
      rules_item: {
        date: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        userNam2e: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        enddate: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        public: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        imagePreview: [
          { required: true, message: '', trigger: 'blur' }
        ],
        imagePreview1: [
          { required: true, message: '', trigger: 'blur' }
        ],
        imagePreview2: [
          { required: true, message: '', trigger: 'blur' }
        ],
        imagePreview3: [
          { required: true, message: '', trigger: 'blur' }
        ],
        imagePreview4: [
          { required: true, message: '', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '', trigger: 'blur' }
        ]
        // date userNam2e
      },
    }
  },
  mounted () {
    console.log('---------mounted')
  },
  methods: {
    // 提交
    onSubmit () {
      console.log()
      this.$emit('handleClose', "onSubmit")
    },
    // 重置
    // 取消关闭esc
    handleClose () {
      this.$emit('handleClose', "Close")
    }
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
</style>
