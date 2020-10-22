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
          <form-datechildren
            :formItem="form_item"
            ref="formData"
          ></form-datechildren>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check" @click="onSubmit">
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
  data() {
    return {
      input: '',
      form_item: [
        {
          type: 'Input',
          label: '楼栋编号',
          placeholder: '请输入',
          prop: 'buildingNumber',
          // width: "100%"
          width: '100%'
        },
        {
          type: 'Input',
          label: '楼栋名称',
          placeholder: '请输入',
          prop: 'buildingName',
          // width: "100%"
          width: '100%'
        }
      ],
      value: '',
      options: [
        {
          value: '1',
          label: '黄金糕2'
        },
        {
          value: '2',
          label: '黄金2糕'
        },
        {
          value: '3',
          label: '黄金糕3'
        },
        {
          value: '4',
          label: '黄金4糕'
        },
        {
          value: '5',
          label: '黄金5糕'
        },
        {
          value: '选项1122',
          label: 'sadasd'
        }
      ],
      tableData: [
        {
          id: 1,
          ParkingNumber: 'A128',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        }
      ]
    }
  },
  components: {
    formDatechildren
  },
  methods: {
    onSubmit() {
      console.log(this.$refs.header.formData)
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
</style>
