<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>添加租户</span>
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

// reviseTenan
export default {
  data () {
    return {
      input: '',
      form_item: [
        {
          type: 'Input',
          label: '姓名',
          placeholder: '请输入',
          prop: 'userName',
          value: '高伟伟'
        },
        {
          type: 'Input',
          label: '手机号',
          placeholder: '请输入',
          prop: 'phone',
          value: '1585731365'
        },
        {
          type: 'Input',
          label: '出租房',
          placeholder: '请输入',
          prop: 'rentalRoom',
          value: '1-1-1101'
        },
        {
          type: 'Input',
          label: '车位号',
          placeholder: '',
          prop: 'parkingNumber',
          value: ''
        },
        {
          type: 'date',
          label: '起始日期',
          placeholder: '请选择日期',
          prop: 'startDate',
          value: '2020-06-23'
        },
        {
          type: 'date',
          label: '终止日期',
          placeholder: '请选择日期',
          prop: 'endDate',
          value: '2021-10-22'
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
