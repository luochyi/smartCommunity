<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="childFroms"
                 :formObj='fromjson'>
        </VueForm>
      </FromCard>
      <div style="margin:30px"
           v-for="(item,index) in froms"
           :key="item.key">
        <FromCard>
          <span slot="title">业主关联 {{index+1}}</span>
          <span slot="btn">
            <el-button type="text"
                       @click='del(item)'><span style="color:#fb4702">删除</span></el-button>
          </span>
          <div class="">
            <VueForm ref="childFrom"
                     @ruleSubmit='ruleSubmit'
                     :formObj='item.addForm'>
              <template v-slot:residentId>
                <!--   @change='change(froms[index].addForm.ruleForm.residentId)' -->
                <el-select v-model="froms[index].addForm.ruleForm.residentId"
                           :remote-method='remoteMethod'
                           @change='(value) => change(froms[index].addForm.ruleForm.residentId,index,value)'
                           @focus='sefocus'
                           :loading="loading"
                           remote
                           style="width:240px"
                           filterable
                           placeholder="请选择">
                  <el-option v-for="item in options"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </VueForm>
          </div>
        </FromCard>
      </div>
      <div style="display:flex;justify-content: center;">
        <el-button @click="addForms()"
                   type="text"><span style="color:#fb4702">添加</span></el-button>
      </div>
      <div slot="footer">
        <button class="btn-orange"
                @click="onSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="drawerClose"><span>取消</span></button>
      </div>
    </Drawer>
  </div>
</template>

<script>

import { userResident, findParkingSpaceStatus, findParkingSpaceType, cpmParkingSpaceInsert, Login } from '@/api/basic'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: () => false
    },
    drawerTitle: {
      type: String,
      default: () => ""
    }
  },
  data () {
    return {
      loading: false,
      options: [],
      drawer_vrisible: false,
      bool: false,
      fromjson: {
        ruleForm: {
          code: null,
          status: null,
          type: null,
        },
        form_item: [
          {
            type: 'Input',
            label: '车位编号	',
            placeholder: '请输入',
            width: '50%',
            prop: 'code'
          },
          {
            type: 'Select',
            label: '状态',
            placeholder: '请输入',
            options: [
            ],
            width: '50%',
            prop: 'status'
          },
          {
            type: 'Select',
            label: '车位类型',
            placeholder: '请输入',
            options: [],
            width: '50%',
            prop: 'type'
          }
        ]
      },
      froms: [],
    }
  },
  mounted () {
    Login().then((res) => {
      console.log(res)
      sessionStorage.setItem('X-Admin-Token', res.token)
    })
    // 弹窗内下拉框
    findParkingSpaceStatus().then(res => {
      let arr = res.map(item => ({
        label: item.showName,
        value: item.showValue
      }))
      console.log(arr)
      this.fromjson.form_item[1].options = arr
    })
    findParkingSpaceType().then(res => {
      let arr = res.map(item => ({
        label: item.showName,
        value: item.showValue
      }))
      console.log(arr)
      this.fromjson.form_item[2].options = arr
    })
  },
  methods: {
    remoteMethod (val) {
      let reeData = {
        pageNum: 1,
        size: 20,
        name: val
      }
      this.loading = true
      userResident(reeData).then(res => {
        this.options = res.tableList
        this.loading = false

        console.log(res)
      })
    },
    sefocus () {
      let reeData = {
        pageNum: 1,
        size: 20
      }
      this.loading = true
      userResident(reeData).then(res => {
        this.options = res.tableList
        this.loading = false
        console.log(res)
      })
    },
    change (id, index, value) {
      this.options.map(item => {
        if (item.id === value) {
          this.froms[index].addForm.ruleForm.tel = item.tel
          this.froms[index].addForm.ruleForm.idType = item.idType
          this.froms[index].addForm.ruleForm.idNumber = item.idNumber
        }
      })

    },
    drawerClose () {
      this.drawer_vrisible = false;
      this.froms = []
      this.$refs.childFroms.reset()
      this.$emit('handleClose', 'Close')
    },
    ruleSubmit (val) {
      this.bool = val;
    },
    // 提交
    onSubmit () {
      // 检查form表单校验
      let resList = []
      this.froms.map(item => {
        resList.push(item.addForm.ruleForm.residentId)
      })
      let requestData = {
        code: this.fromjson.ruleForm.code,
        status: this.fromjson.ruleForm.status,
        type: this.fromjson.ruleForm.type,
        residentId: resList[0],
      }
      console.log(requestData)
      cpmParkingSpaceInsert(requestData).then(res => {
        if (res.status) {
          this.drawerClose()
        }
        console.log(res)
      })
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
            tel: null,
            name: null,
            idType: null,
            idNumber: null,
          },
          form_item: [
            {
              type: 'Slot',
              label: '业主姓名',
              placeholder: '请输入',
              width: '50%',
              slotName: 'residentId',
              prop: 'residentId'
            },
            {
              type: 'Input',
              label: '联系方式',
              placeholder: '请输入',
              width: '50%',
              disabled: true,
              prop: 'tel'
            },
            {
              type: 'Select',
              label: '证件类型',
              placeholder: '请输入',
              disabled: true,
              options: [
                { value: 1, label: '身份证' },
                { value: 2, label: '营业执照' },
              ],
              width: '50%',
              prop: 'idType'
            },
            {
              type: 'Input',
              label: '证件号码',
              placeholder: '请输入',
              disabled: true,
              width: '50%',
              prop: 'idNumber'
            }
          ]
        },
        key: Date.now()
      })
    }
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.drawer_vrisible = newValue
      }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

