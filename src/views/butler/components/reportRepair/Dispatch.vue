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
          <template v-slot:repairman>
            <el-select v-model="reportRepairFrom.ruleForm.repairman"
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
import { reportRepairFindRepairDetail, dispatchDispatch, workOrderTimeLimitList, workOrderTypeList, dispatchFindSysUserLikeActualName } from '@/api/butler'
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
          workOrderType: '报修业务',
          reportDetail: null,
          repairName: null,
          tel: null,
          repairDate: null,
          repairFrom: 1,
        },
        form_item: [
          {
            type: 'span',
            label: '工单大类',
            placeholder: '请输入',
            width: '50%',
            prop: 'workOrderType',
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
            type: 'Input',
            label: '指派给',
            placeholder: '请输入',
            width: '50%',
            prop: 'operator'
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
        ]
      },
    }
  },
  mounted () {

  },
  methods: {
    remoteMethod (val) {
      let reeData = {
        pageNum: 1,
        size: 20,
        name: val
      }
      this.loading = true
      dispatchFindSysUserLikeActualName(reeData).then(res => {
        this.options = res.tableList
        this.loading = false
      })
    },
    sefocus () {
      let reeData = {
        pageNum: 1,
        size: 20
      }
      this.loading = true
      dispatchFindSysUserLikeActualName(reeData).then(res => {
        this.options = res.tableList
        this.loading = false
        console.log(this.options)
      })
    },
    change (value) {
      console.log(value)
    },
    // vueForm 验证通过提交服务器
    ruleSuccess (val) {
    },
    // 提交调用子组件校验方法
    onSubmit () {
      this.$refs.vueForm.submitForm()
      /***
       * 
       *  dispatchListId  	  派工单id	是	[int]		
        2	workOrderType	      工单类型（取自工单类型管理）	是	[int]		
        3	workOrderTypeDetail	        工单类型明细（取自工单类型明细管理）	是	[int]		
        4	workOrderTimeLimit	        工单时限（取自工单时限管理）	是	[int]		
        5	type            	    派工类型（1.无偿服务，2.有偿服务）	是	[int]		
        6	dispatchDate	          派工时间	是	[datetime]		
        7	operator	          操作人【装修人】（物业表）	是	[int]		
        8	remake	            派工备注	是	[string]		
       * **/
      let resData = {
        dispatchListId: 33,
        workOrderType: 1,
        workOrderTypeDetail: 1,
        workOrderTimeLimit: 1,
        type: 1,
        dispatchDate: this.DispatchFrom.ruleForm.repairDate,
        operator: 10,
        remake: '哈哈哈哈',
      }
      dispatchDispatch(resData).then(res => {
        console.log(res)
      })
    },
    // 详情
    details (id) {
      let resData = {
        id: id,
      }

      reportRepairFindRepairDetail(resData).then(result => {
        console.log(result)
        // this.DispatchFrom
        this.DispatchFrom.ruleForm.type = result.type
        // this.DispatchFrom.ruleForm.fileUrls = result.imgUrls[0].url
        // this.fileUrls = result.imgUrls[0].url
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
      this.editId = 0
      this.reportRepairFrom.ruleForm.fileUrls = []
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