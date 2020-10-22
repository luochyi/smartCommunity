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
              <span>活动信息</span>
            </div>
            <div class="">
              <!-- from 表单 -->
              <form-datechildren :formItem="form_item"
                                 :rulesItem="rules_item"
                                 ref="formData">
              </form-datechildren>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-submit el-icon-circle-check"><span>提交</span></button>
            <button class="dra-cancel"><span>重置</span></button>
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
          type: 'Input',
          label: '联系名称',
          prop: 'userName',
        },
        {
          type: 'Input',
          label: '联系方式',
          prop: 'phone',
        },
        {
          type: 'select',
          value: '',
          options: [],
          label: '提醒间隔',
          prop: 'userNam2e',
          // disabled: 1
        },
        {
          type: 'Input',
          label: '权重',
          prop: 'lever',
        },
        // imagePreview
      ],
      rules_item: {
        phone: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        userNam2e: [
          { required: true, message: '请选提醒间隔', trigger: 'change' },
        ],
        userName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        lever: [
          { required: true, message: '请输入', trigger: 'blur' }

        ]
      },

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
</style>
