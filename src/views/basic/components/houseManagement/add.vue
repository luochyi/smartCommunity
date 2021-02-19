<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="childFroms"
                 :formObj='fromjson'>
          <template v-slot:constructionArea>
            <el-input v-model="fromjson.ruleForm.constructionArea"
                      size="small"
                      style="width:240px"
                      placeholder="请输入">
              <i slot="suffix"
                 style="font-style:normal"
                 class="metre">㎡</i>
            </el-input>
          </template>
          <template v-slot:indoorArea>
            <el-input v-model="fromjson.ruleForm.indoorArea"
                      size="small"
                      style="width:240px"
                      placeholder="请输入">
              <i slot="suffix"
                 style="font-style:normal"
                 class="metre">㎡</i>
            </el-input>
          </template>
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
                     :formObj='item.addForm'></VueForm>
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
import { houseManagementInsert, cpmBuildingUnitFindAll, cpmBuildingUnitEstateFindById, findByBuildingId } from '@/api/basic'
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
      drawer_vrisible: false,
      bool: false,
      fromjson: {
        ruleForm: {
          buildingId: null,
          buildingUnitId: null,
          roomNumber: null,
          status: null,
          type: null,
          constructionArea: null,
          indoorArea: null,
        },
        rules: {
          buildingName: [
            {
              required: true,
              message: '请填楼栋',
              trigger: 'blur'
            }
          ],
        },
        form_item: [
          {
            type: 'Select',
            label: '楼栋',
            placeholder: '请输入',
            options: [],
            width: '50%',
            prop: 'buildingId'
          },
          {
            type: 'Select',
            label: '单元号',
            placeholder: '请输入',
            options: [
            ],
            width: '50%',
            prop: 'buildingUnitId'
          },
          {
            type: 'Input',
            label: '房屋名称',
            placeholder: '请输入',
            width: '50%',
            prop: 'roomNumber'
          },
          {
            type: 'Select',
            label: '房屋状态',
            placeholder: '请输入',
            options: [
              { value: 1, label: '入住' },
              { value: 2, label: '装修' },
              { value: 3, label: '空置' },
              { value: 4, label: '未售' },
              { value: 5, label: '已租' },
            ],
            width: '50%',
            prop: 'status'
          },
          {
            type: 'Slot',
            label: '建筑面积',
            placeholder: '请输入',
            width: '50%',
            prop: 'constructionArea',
            slotName: 'constructionArea'
          },
          {
            type: 'Select',
            label: '房屋类型',
            placeholder: '请输入',
            options: [
              { value: 1, label: '住宅' },
              { value: 2, label: '公寓' },
              { value: 3, label: '别墅' },
              { value: 4, label: '商铺' },
            ],
            width: '50%',
            prop: 'type'
          },
          {
            type: 'Slot',
            label: '室内面积',
            placeholder: '请输入',
            width: '50%',
            prop: 'indoorArea',
            slotName: 'indoorArea'
          },
        ]
      },
      froms: []
    }
  },
  mounted () {
    // 弹窗内下拉框
    cpmBuildingUnitFindAll().then(res => {
      this.fromjson.form_item[0].options = res
    })
  },
  methods: {
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
        // .submitForm()
        resList.push(item.addForm.ruleForm)

      })
      if (resList.length > 0) {
        for (let i = 0; i < resList.length; i++) {
          this.$refs.childFrom[i].submitForm()
          if (!this.froms[i].addForm.ruleForm.name) {
            return
          }
        }
      }
      let requestData = {
        estate: {
          buildingUnitId: this.fromjson.ruleForm.buildingUnitId,
          roomNumber: this.fromjson.ruleForm.roomNumber,
          status: this.fromjson.ruleForm.status,  //不输入业主信息 只能填4
          type: this.fromjson.ruleForm.type,
          constructionArea: parseInt(this.fromjson.ruleForm.constructionArea),
          indoorArea: parseInt(this.fromjson.ruleForm.indoorArea),
        },
        residentList: resList
      }
      console.log(requestData)
      houseManagementInsert(requestData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.drawerClose()
        }
      })
    },
    // 修改用户
    edit (id) {
      let findData = {
        id: id
      }
      cpmBuildingUnitEstateFindById(findData).then(res => {
        console.log(res)
        console.log(res.userResidentList)
      })
      this.drawer_vrisible = true;
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
              prop: 'idType'
            },
            {
              type: 'Input',
              label: '证件号码',
              placeholder: '请输入',
              width: '50%',
              prop: 'idNumber'
            }
          ]
        },
        key: Date.now()
      })
    },
    unitData (value) {
      let resData = {
        id: value
      }
      findByBuildingId(resData).then(res => {
        // 给单元号赋值
        this.fromjson.form_item[1].options = res
      })
    }
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.drawer_vrisible = newValue
      }
    },
    'fromjson.ruleForm.buildingId': {
      handler (newValue) {
        this.unitData(newValue)
        this.fromjson.ruleForm.buildingUnitId = null;
      },
      deep: true
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

