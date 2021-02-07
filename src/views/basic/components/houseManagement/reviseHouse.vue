<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>新增房屋</span>
      </div>
      <div>
        <contentBox style="margin:30px">
          <span slot="title">基本信息</span>
          <Form ref="childFroms"
                :formObj='fromjson'>
            <template v-slot:buildArea>
              <el-input v-model="fromjson.ruleForm.buildArea"
                        size="small"
                        style="width:240px"
                        placeholder="请输入">
                <i slot="suffix"
                   style="font-style:normal"
                   class="metre">㎡</i>
              </el-input>
            </template>
            <template v-slot:roomArea>
              <el-input v-model="fromjson.ruleForm.roomArea"
                        size="small"
                        style="width:240px"
                        placeholder="请输入">
                <i slot="suffix"
                   style="font-style:normal"
                   class="metre">㎡</i>
              </el-input>
            </template>
          </Form>
        </contentBox>
        <div style="margin:30px"
             v-for="(item,index) in froms"
             :key="item.key">
          <contentBox>
            <span slot="title">业主关联 {{index+1}}</span>
            <span slot="btn">
              <el-button type="text"
                         @click='del(item)'><span style="color:#fb4702">删除</span></el-button>
            </span>
            <div class="">
              <Form ref="childFrom"
                    @ruleSubmit='ruleSubmit'
                    :formObj='item.addForm'></Form>
            </div>
          </contentBox>
        </div>
        <div style="display:flex;justify-content: center;">
          <el-button @click="addForms()"
                     type="text"><span style="color:#fb4702">添加</span></el-button>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="btn-orange"
                  @click="onSubmit('childFrom')"><span><span><i class="el-icon-circle-check"></i></span> 提交</span></button>
          <button class="dra-cancel"><span>取消</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { UnitEstateFindById, Login, buildingUpdate } from '@/api/basic'
export default {
  data () {
    return {
      fromjson: {
        ruleForm: {
          buildingName: null,
          roomNumber: null,
          name: null,
          status: null,
          buildArea: null,
          roomstatus: null,
          roomArea: null,
        },
        rules: {},
        form_item: [
          {
            type: 'Select',
            label: '楼栋',
            placeholder: '请输入',
            options: [
              { value: 1, label: '身份证' },
              { value: 2, label: '营业执照' },

            ],
            width: '50%',
            prop: 'buildingName'
          },
          {
            type: 'Select',
            label: '单元号',
            placeholder: '请输入',
            options: [
              { value: 1, label: '身份证' },
              { value: 2, label: '营业执照' },
            ],
            width: '50%',
            prop: 'roomNumber'
          },
          {
            type: 'Input',
            label: '房屋名称',
            placeholder: '请输入',
            width: '50%',
            prop: 'name'
          },
          {
            type: 'Select',
            label: '房屋状态',
            placeholder: '请输入',
            options: [
              { value: 1, label: '身份证' },
              { value: 2, label: '营业执照' },
            ],
            width: '50%',
            prop: 'status'
          },
          {
            type: 'Slot',
            label: '建筑面积',
            placeholder: '请输入',
            width: '50%',
            prop: 'buildArea',
            slotName: 'buildArea'
          },
          {
            type: 'Select',
            label: '房屋类型',
            placeholder: '请输入',
            options: [
              { value: 1, label: '身份证' },
              { value: 2, label: '营业执照' },
            ],
            width: '50%',
            prop: 'roomstatus'
          },
          {
            type: 'Slot',
            label: '室内面积',
            placeholder: '请输入',
            width: '50%',
            prop: 'roomArea',
            slotName: 'roomArea'
          },
        ]
      },
      froms: [],
      value: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ruleSubmit () { },
    // 提交
    onSubmit () {
      // 检查form表单校验
      console.log(this.$refs.childFrom)
      for (let i = 0; i < this.froms.length; i++) {
        this.$refs.childFrom[i].submitForm()
      }
    },
    del (item) {
      console.log(item)
      let index = this.froms.indexOf(item)
      if (index !== -1) {
        this.froms.splice(index, 1)
      }
    },
    addForms () {
      let that = this
      this.froms.push({
        addForm: {
          ruleForm: {
            no: null,
            name: null,
            totalFloor: null
          },
          rules: {
            name: [
              {
                required: true,
                message: '请填写业主姓名',
                trigger: 'blur'
              }
            ],
            no: [
              { required: true, message: '请填写楼栋名称', trigger: 'blur' }
            ],
          },
          form_item: [
            {
              type: 'Int',
              label: '业主姓名',
              placeholder: '请输入',
              width: '50%',
              prop: 'name'
            },
            {
              type: 'Input',
              label: '联系方式',
              placeholder: '请输入',
              width: '50%',
              prop: 'tel'
            },
            {
              type: 'Select',
              label: '证件类型',
              placeholder: '请输入',
              options: [
                { value: 1, label: '身份证' },
                { value: 2, label: '营业执照' },

              ],
              width: '50%',
              prop: 'stuats'
            },
            {
              type: 'Input',
              label: '证件号码',
              placeholder: '请输入',
              width: '50%',
              prop: 'nameID'
            }
          ]
        },
        key: Date.now()
      })
      console.log(this.froms)
    },
    getData () {
      let requestData = {
        id: 1,
      }
      UnitEstateFindById(requestData)
        .then((res) => {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
    },
  }
}
</script>
<style lang="scss" scoped>
.content-titel.btn {
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>