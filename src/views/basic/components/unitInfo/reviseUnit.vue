<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>修改单元</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
            <form-datechildren :formItem="form_item" ref="formData"></form-datechildren>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button  class="dra-submit el-icon-circle-check" @click="onSubmit"><span>提交</span></button>
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
      form_item: [
        {
          type: 'select',
          label: '楼栋',
          placeholder: '请输入',
          prop: 'building ',
          value: '一栋',
          // width: "100%"
          width: '100%',
          options: [
            {
              value: '1',
              label: '一栋'
            },
            {
              value: '2',
              label: '2栋'
            }
          ]
        },
        {
          type: 'select',
          label: '单元（号）',
          placeholder: '请输入',
          prop: 'Unit',
          // width: "100%"
          width: '100%',
          value: '一单元',
          options: [
            {
              value: '1',
              label: '一单元'
            },
            {
              value: '2',
              label: '2单元'
            }
          ]
        },
        {
          type: 'Input',
          label: '总层数',
          placeholder: '请输入',
          prop: 'totalFloors',
          value: '28层',
          width: '100%'
        },
        {
          type: 'select',
          label: '是否有电梯',
          placeholder: '请输入',
          prop: 'elevator',
          // width: "100%"
          value: '有',
          width: '100%',
          options: [
            {
              value: '1',
              label: '有'
            },
            {
              value: '2',
              label: '无'
            }
          ]
        }
      ]
    }
  },
  components: {
    formDatechildren
  },
  methods: {
    onSubmit () {
      console.log(this.$refs.header.formData)
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
  .content-titel2{
    margin: 0px 0px 20px 30px;
    padding-top: 30px;
    border-top: 1px solid #E8E8E8;
  }
</style>
s
