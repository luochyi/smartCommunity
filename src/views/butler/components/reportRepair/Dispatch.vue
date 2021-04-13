<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm :formObj='DispatchFrom'>
          <template slot='type'>
            <span v-if="DispatchFrom.ruleForm.type === 1">户内</span>
            <span v-if="DispatchFrom.ruleForm.type === 2">户外</span>
          </template>
          <template slot='fileUrls'>
            <template>
              <div>
                <el-image v-if="!editBool"
                          :src="`${$ImgUrl}/temp${fileUrls}`"
                          style="width: 104px; height: 104px"></el-image>
                <el-image v-else
                          :src="`${$ImgUrl}${fileUrls}`"
                          style="width: 104px; height: 104px"></el-image>
              </div>
            </template>
          </template>
        </VueForm>
      </FromCard>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="vueForm"
                 @ruleSuccess='ruleSuccess'
                 :formObj='reportRepairFrom'>
          <template slot='type'>
            <el-radio v-model="reportRepairFrom.ruleForm.type"
                      label="1">户外</el-radio>
            <el-radio v-model="reportRepairFrom.ruleForm.type"
                      label="2">户内</el-radio>
          </template>
          <template v-slot:operator>
            <el-select v-model="reportRepairFrom.ruleForm.operator"
                       :remote-method='remoteMethod'
                       @change='change'
                       @focus='sefocus'
                       :loading="loading"
                       remote
                       style="width:240px"
                       filterable
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </template>
        </VueForm>
      </FromCard>
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
import { reportRepairFindRepairDetail, dispatchDispatch, workOrderTimeLimitList, workOrderTypeList, workOrderType, dispatchFindSysUserLikeActualName } from '@/api/butler'
import { userResidentFindAllBySearch } from '@/api/basic'

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
    let resData = {
      pageNum: 1,
      size: 10
    }
    let workOrderTimeLimitListOptions = []
    workOrderTimeLimitList(resData).then(res => {
      // console.log(res.tableList)
      res.tableList.map(item => {
        workOrderTimeLimitListOptions.push({
          value: item.id,
          label: item.name
        })
      })
    })
    let workOrderTypeListOptions = []
    let resultData = {
      id: 1,
    }
    workOrderTypeList(resultData).then(res => {
      console.log(res)
      res.map(item => {
        workOrderTypeListOptions.push({
          value: item.id,
          label: item.name
        })
      })
    })
    return {
      options: [],
      loading: false,
      drawer_vrisible: false,
      editBool: false, //是否为编辑状态
      editId: 0,
      // 保修上传图片路径显示
      fileUrls: '',
      workOrderTypeId: null,
      dispatchListId: null,
      DispatchFrom: {
        ruleForm: {
          type: null,
          froms: '业主来电',
          fileUrls: [],
          reportDetail: null,
          repairman: null,
          tel: null,
          repairDate: null,
          repairFrom: 1,
          dispatchName: null
        },
        form_item: [
          {
            type: 'Slot',
            label: '报修区域',
            width: '50%',
            prop: 'type',
            slotName: 'type'
          },
          {
            type: 'span',
            label: '报修来源',
            placeholder: '请输入',
            width: '50%',
            prop: 'froms',
          },
          {
            type: 'span',
            label: '报修人',
            placeholder: '请输入',
            width: '50%',
            prop: 'repairName'
          },
          {
            type: 'span',
            label: '联系电话',
            placeholder: '请输入',
            width: '50%',
            prop: 'tel'
          },
          {
            type: 'span',
            label: '分配人',
            placeholder: '请输入',
            width: '50%',
            prop: 'dispatchName'
          },
          {
            type: 'span',
            label: '预约时间',
            placeholder: '请输入',
            width: '50%',
            prop: 'repairDate'
          },
          {
            type: 'span',
            label: '报修详情',
            width: '50%',
            prop: 'reportDetail'
          },
          {
            type: 'span',
            label: '照片',
            width: '50%',
            prop: 'fileUrls'
          },
        ],
      },
      reportRepairFrom: {
        ruleForm: {
          workOrderTypeText: null,
          workOrderTimeLimit: null,
          workOrderTypeDetail: null,
          type: null,
          remake: null,
          dispatchDate: null,
          operator: null,
        },
        form_item: [
          {
            type: 'span',
            label: '工单大类',
            placeholder: '请输入',
            width: '50%',
            prop: 'workOrderTypeText',
          },
          {
            type: 'Select',
            label: '工单子类',
            placeholder: '请输入',
            options: workOrderTypeListOptions,
            width: '50%',
            prop: 'workOrderTypeDetail'
          },
          {
            type: 'Select',
            label: '工单时限',
            placeholder: '请输入',
            options: workOrderTimeLimitListOptions,
            width: '50%',
            prop: 'workOrderTimeLimit'
          },
          {
            type: 'Select',
            label: '派工类型',
            placeholder: '请输入',
            options: [
              { value: 1, label: '无偿服务' },
              { value: 2, label: '有偿服务' },
            ],
            width: '50%',
            prop: 'type'
          },
          {
            type: 'Slot',
            label: '指派给',
            placeholder: '请输入',
            width: '50%',
            prop: 'operator',
            slotName: 'operator'
            // options
          },
          {
            type: 'DateTime',
            label: '预约时间 ',
            placeholder: '请输入',
            width: '50%',
            prop: 'dispatchDate'
          },
          {
            type: 'textarea',
            label: '派工备注',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'remake'
          },

        ],
        rules: {
          workOrderTypeText: [{ required: true, message: '', trigger: 'blur' }],
          workOrderTypeDetail: [{ required: true, message: '请选择工单子类', trigger: 'change' }],
          workOrderTimeLimit: [{ required: true, message: '请选择工单时限', trigger: 'change' }],
          operator: [{ required: true, message: '请选择指派给', trigger: 'change' }],
          type: [{ required: true, message: '请选择派工类型', trigger: 'change' }],
          remake: [{ required: true, message: '请输入派工备注', trigger: 'blur' }],
          dispatchDate: [{ required: true, message: '请选择预约时间', trigger: 'change' }],
        }
      },
    }
  },
  created () {
    console.log(this.reportRepairFrom.ruleForm.workOrderTimeLimit)
    console.log(this.reportRepairFrom.ruleForm.workOrderTypeDetail)

    let workOrderText = null
    let workOrderTypeId = null
    workOrderType().then(res => {
      this.reportRepairFrom.ruleForm.workOrderTypeText = res[0].name
      this.workOrderTypeId = res[0].id

    })
  },
  mounted () {
    dispatchFindSysUserLikeActualName({
      actualName: ''
    }).then(res => {
      console.log(res)
      this.options = res.options
    })
  },
  methods: {
    remoteMethod (val) {
      this.loading = true

      dispatchFindSysUserLikeActualName({
        actualName: val
      }).then(res => {
        this.loading = false
        this.options = res.data.map(item => {
          return {
            value: item.id,
            label: item.actualName
          }
        })
      })
    },
    sefocus () {
      this.loading = true
      dispatchFindSysUserLikeActualName({
        actualName: ''
      }).then(res => {
        console.log(res)
        this.loading = false
        this.options = res.data.map(item => {
          return {
            value: item.id,
            label: item.actualName
          }
        })
      })
    },
    change (value) {
      console.log(value)
    },
    // vueForm 验证通过提交服务器
    ruleSuccess (val) {
      let resData = {
        dispatchListId: this.dispatchListId,
        workOrderType: this.workOrderTypeId,
        workOrderTypeDetail: this.reportRepairFrom.ruleForm.workOrderTypeDetail,
        workOrderTimeLimit: this.reportRepairFrom.ruleForm.workOrderTimeLimit,
        type: this.reportRepairFrom.ruleForm.type,
        dispatchDate: this.reportRepairFrom.ruleForm.dispatchDate,
        operator:this.reportRepairFrom.ruleForm.operator,
        remake: this.reportRepairFrom.ruleForm.remake,
      }

      dispatchDispatch(resData).then(res => {
        console.log(res)
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$emit('submitSuccess')
          this.drawerClose()
        }
      })
    },
    // 提交调用子组件校验方法
    onSubmit () {
      this.$refs.vueForm.submitForm()
    },
    // 详情
    details (id) {
      let resData = {
        id: id,
      }
      reportRepairFindRepairDetail(resData).then(result => {
        this.dispatchListId = id
        this.DispatchFrom.ruleForm.type = result.type
        this.DispatchFrom.ruleForm.dispatchName = result.dispatchName
        this.DispatchFrom.ruleForm.reportDetail = result.reportDetail
        this.DispatchFrom.ruleForm.repairName = result.repairName
        this.DispatchFrom.ruleForm.tel = result.tel
        this.DispatchFrom.ruleForm.repairDate = result.repairDate
      })
    },
    drawerClose () {
      this.drawer_vrisible = false;
      this.$refs.vueForm.reset()
      this.$emit('handleClose', 'Close')
    },
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
.sys-image {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-right: 12px;
}
</style>