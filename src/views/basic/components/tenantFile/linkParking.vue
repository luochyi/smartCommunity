
<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>关联车位</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <form-datechildren :formItem="form_item"
                               ref="formData">

            </form-datechildren>
          </div>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check"><span>提交</span></button>
          <button class="dra-cancel"><span>取消</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formDatechildren from '@/components/form/formDatechildren'

export default {
  components: {
    formDatechildren
  },
  data () {
    return {
      input: '',
      options: [],
      form_item: [
        {
          type: 'span',
          label: '姓名',
          value: '高伟伟',
          prop: 'f4',
          width: '50%'
        },
        {
          type: 'span',
          label: '手机号',
          value: '15857314365',
          prop: 'f5',
          width: '50%'
        },
        {
          type: 'select',
          label: '车位',
          placeholder: 'A103',
          prop: 'status',
          options: [
            {
              value: '1',
              label: 'A104'
            },
            {
              value: '2',
              label: 'A103'
            },
            {
              value: '3',
              label: 'B100'
            }
          ]
        }

      ],
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
.el-form-item span {
    color: #666666;
    font-weight: 400;
    font-size: 14px;
}
</style>
