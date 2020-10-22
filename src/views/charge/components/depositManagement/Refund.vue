<template>
  <div class="refund">
    <el-drawer :visible.sync="drawerVrisible"
               size="58%"
               :before-close="handleClose"
               :with-header="true">
      <div class="drawer-box">
        <div class="dra-header">
          <span>退款</span>
        </div>
        <div class="dra-body">
          <div class="dra-content">
            <div class="content-titel">
              <span>装修情况</span>
            </div>
            <div class="">
              <!-- from 表单 -->
              <form-datechildren :formItem="form_item"
                                 :rulesItem="rules_item"
                                 ref="formData">
              </form-datechildren>
            </div>
          </div>
          <div class="dra-content">
            <div class="content-titel">
              <span>退款消息确认</span>
            </div>
            <div class="">
              <form-datechildren :formItem="form_item2"
                                 :rulesItem="rules_item"
                                 ref="formData">
              </form-datechildren>

            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-submit el-icon-circle-check"
                    @click="handleClose('ruleForm')"><span>提交</span></button>
            <button class="dra-cancel"
                    @click="handleClose('ruleForm')"><span>取消</span></button>
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
    },
  },
  components: {
    formDatechildren
  },
  data () {
    return {
      isVisibleDrawe: false,
      input: '',
      form_item2: [
        {
          type: 'Input',
          label: '押金金额',
          value: '5000',
          disabled: true,
          prop: 'jine',
        },
        {
          type: 'date',
          label: '退款时间',
          value: '',
          placeholder: '请选择时间',
          prop: 'refunddate',
        },
        {
          type: 'Input',
          label: '押金扣除 ',
          placeholder: '请输入',
          prop: 'koucu',
        },
        {
          type: 'select',
          label: '退款方式',
          placeholder: '请选择',
          value: '',
          options: [
          ],
          prop: 'userNamse',
        },
        {
          type: 'Input',
          label: '退还金额  ',
          value: '自动填写',
          prop: 'th',
          disabled: true,
        },
      ],
      form_item: [
        {
          type: 'select',
          label: '装修状态',
          value: '装修结束-未退押金',
          options: [
          ],
          disabled: true,
          prop: 'userName',
        },
        {
          type: 'select',
          label: '完工检查结果',
          value: '合格',
          options: [
          ],
          disabled: true,
          prop: 'userName1',
        },
      ],
      rules_item: {},
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose', "Close")
    }
  },
  drawerVrisible: {
    handler (newValue) {
      this.isVisibleDrawe = newValue
      console.log(newValue)
    },
    immediate: true
  },
}
</script>

<style>
.refund .el-drawer__header {
  display: flex;
  height: 0;
  margin-bottom: 0;
  padding: 0;
}
:focus {
  outline: 0;
}
</style>
