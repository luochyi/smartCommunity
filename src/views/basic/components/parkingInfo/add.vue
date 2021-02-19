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
      <div style="margin:30px">
        <FromCard>
          <span slot="title">业主关联</span>

          <div class="">
            <VueForm ref="childFrom"
                     @ruleSubmit='ruleSubmit'
                     :formObj='addForm'>
              <template v-slot:name>
                <el-select v-model="addForm.ruleForm.name"
                           :remote-method='remoteMethod'
                           @change='change'
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

import { userResident, userResidentFindByIdOne, findParkingSpaceStatus, findParkingSpaceType, cpmParkingSpaceInsert, cpmParkingSpaceFindById, cpmParkingSpaceUpdate } from '@/api/basic'
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
      editId: null,
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
      addForm: {
        ruleForm: {
          tel: null,
          name: null,
          idType: null,
          idNumber: null,
          residentId: null,
        },
        form_item: [
          {
            type: 'Slot',
            label: '业主姓名',
            placeholder: '请输入',
            width: '50%',
            slotName: 'name',
            prop: 'name'
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
    }
  },
  mounted () {
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
        let obj = {
          id: 0,
          idNumber: "",
          idType: '',
          name: "（空）",
          tel: "",
        }
        this.options.unshift(obj)
        this.loading = false
        console.log(this.options)
      })
    },
    change (value) {
      console.log(value)
      this.options.map(item => {
        if (item.id === value) {
          this.addForm.ruleForm.tel = item.tel
          this.addForm.ruleForm.idType = item.idType
          this.addForm.ruleForm.idNumber = item.idNumber
          this.addForm.ruleForm.residentId = value
        }
      })
    },
    drawerClose () {
      this.drawer_vrisible = false;
      this.editId = null;
      this.$refs.childFroms.reset()
      this.$refs.childFrom.reset()
      this.$emit('handleClose', 'Close')
    },
    // 修改
    edit (id) {
      let findData = {
        id: id
      }
      this.editId = id
      cpmParkingSpaceFindById(findData).then(res => {
        this.fromjson.ruleForm.code = res.code
        this.fromjson.ruleForm.status = res.status
        this.fromjson.ruleForm.type = res.type
        let userData = {
          id: res.residentId
        }
        userResidentFindByIdOne(userData).then(result => {
          this.addForm.ruleForm.idNumber = result.userResident.idNumber
          this.addForm.ruleForm.name = result.userResident.name
          this.addForm.ruleForm.tel = result.userResident.tel
          this.addForm.ruleForm.idType = result.userResident.idType
          this.addForm.ruleForm.residentId = res.residentId
        })
      })
      this.editBool = true;
      this.drawer_vrisible = true;
    },
    ruleSubmit (val) {
      this.bool = val;
    },
    // 提交
    onSubmit () {
      let requestData = {
        code: this.fromjson.ruleForm.code,
        status: this.fromjson.ruleForm.status,
        type: this.fromjson.ruleForm.type,
        residentId: this.addForm.ruleForm.residentId,
      }
      //  editId true 修改 否则添加
      if (this.editId) {
        requestData.id = this.editId;
        cpmParkingSpaceUpdate(requestData).then(res => {
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$emit('addEidtSuccess')
            this.drawerClose()
          }
          console.log(res)
        })
      } else {
        cpmParkingSpaceInsert(requestData).then(res => {
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$emit('addEidtSuccess')
            this.drawerClose()
          }
          console.log(res)
        })
      }
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

