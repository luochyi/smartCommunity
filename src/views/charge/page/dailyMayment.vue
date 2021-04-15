<template>
  <div>
    <div>
      <div class="main-content">
        <!-- 日常缴费组件 -->
        <div class="main-titel">
          <span>日常缴费</span>
        </div>
        <div class="content">
          <div class="content-btn">
            <el-button class="init-button"
                       icon="el-icon-plus"
                       @click="addFee()">添加费用</el-button>
            <el-button type="init-button2"
                       icon="el-icon-folder-add"
                       plain>导出Excel</el-button>
          </div>
          <!-- 查询重制 -->
          <div class="">
            <VueTable ref="table"
                      :config='config'
                      @tableCheck="tableCheck">
              <template slot="tabs">
                <el-tabs v-model="activeName"
                         @tab-click="handleClick">
                  <el-tab-pane label="全部"
                               name="0"></el-tab-pane>
                  <el-tab-pane label="未缴纳"
                               name="1"></el-tab-pane>
                  <el-tab-pane label="部分缴纳"
                               name="2"></el-tab-pane>
                </el-tabs>
              </template>
              <template slot="footer">
                <div class="table-footer">
                  <button @click="Pay()">缴费</button>
                  <button @click="receiver(table_row)">推送提醒</button>
                </div>
              </template>
            </VueTable>
          </div>
        </div>
        <Drawer drawerTitle="添加缴费"
                @drawerClose="addClose"
                :drawerVrisible='add_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">基本信息</template>
              <template>
                <VueForm ref="addFrom"
                         @ruleSuccess='addRuleSuccess'
                         :formObj='addForm'>
                  <template v-slot:chargesTemplateDetailId>
                    <el-select v-model="addForm.ruleForm.chargesTemplateDetailId"
                               @change='(value) => feeNameChange(value,feeNameList)'
                               style="width:240px"
                               placeholder="请选择">
                      <el-option v-for="(item,index) in feeNameList"
                                 :key="index"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </template>

                  <template v-slot:buildingUnitEstateId>
                    <el-select v-model="addForm.ruleForm.buildingUnitEstateId"
                               :remote-method='remoteMethod'
                               @change='(value) => change(value,options)'
                               @focus='focus'
                               :loading="loading"
                               remote
                               style="width:240px"
                               filterable
                               placeholder="请选择">
                      <el-option v-for="(item,index) in options"
                                 :key="index"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </VueForm>
              </template>
            </FromCard>
          </div>
          <div slot="footer">
            <button class="btn-orange"
                    @click="addSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
            <!-- <button class="btn-orange"><span>确认并打印</span></button>
            <button class="btn-orange"><span>打印预览</span></button> -->
            <button class="btn-gray"
                    @click="addClose"><span>取消</span></button>
          </div>
        </Drawer>
        <Drawer drawerTitle="推送提醒"
                @drawerClose="receiverClose"
                :drawerVrisible='receiver_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">基本信息</template>
              <template>
                <VueForm ref="receiverFrom"
                         @ruleSuccess='receiverRuleSuccess'
                         :formObj='receiverForm'>
                </VueForm>
              </template>
            </FromCard>
          </div>
          <div slot="footer">
            <button class="btn-orange"
                    @click="receiverSubmit()"><span> <i class="el-icon-circle-check"></i>发送</span></button>
            <button class="btn-gray"
                    @click="receiverClose"><span>取消</span></button>
          </div>
        </Drawer>
        <!-- 添加费用 -->
        <!-- <drawer :drawerVrisible='drawer_vrisible'
                @handleClose='getClose'
                :drawer_config="drawer_config"></drawer> -->

      </div>
      <!-- 添加费用组件 -->
    </div>
    <!-- <addFee v-if="addFee_show"
            @cancel="cancel"></addFee>

    <Pay v-if="Pay_show"
         @cancel="cancel"></Pay> -->
  </div>

</template>

<script>
import { dailyPaymentFindEnableTempleDetail, dailyPaymentInsert, dailyPaymentPush } from '@/api/charge'
import { userResidentFindResidentNameBySearch } from '@/api/basic'

// basic-admin/src/views/charge/components/dailyMayment/add.vue
// import drawer from '@/components/Drawer/drawer.vue'
// import addFee from '@/views/charge/components/dailyMayment/addFee.vue'
// import Pay from '@/views/charge/components/dailyMayment/Pay.vue'
export default {
  data () {
    let feeNameList = []
    dailyPaymentFindEnableTempleDetail().then(result => {
      console.log(result)
      result.data.map(item => {
        feeNameList.push({
          value: item.id,
          label: item.name,
          unitPrice: item.unitPrice,
          type: item.type
        })
      })
    })
    return {
      // 切换日常缴费组件和添加费用组件
      // addFee_show: false,
      // Pay_show: false,
      // change: true,
      feeNameList: feeNameList,
      feeData: {},
      options: [],
      table_row: [],
      add_vrisible: false,
      receiver_vrisible: false,
      loading: true,
      addForm: {
        ruleForm: {
          buildingUnitEstateId: null,
          chargesTemplateDetailId: null,
          beginDate: null,
          endDate: null,
          unitPrice: null,
          num: null,
          dailyPaymentOrder: null,
          totalPrice: null,
        },
        form_item: [
          {
            type: 'Slot',
            label: '费用名称',
            prop: 'chargesTemplateDetailId',
            slotName: 'chargesTemplateDetailId',
            width: '50%',
          },

          {
            type: 'Slot',
            label: '房屋信息 ',
            prop: 'buildingUnitEstateId',
            width: '50%',
            slotName: 'buildingUnitEstateId'
          },
          {
            type: 'DateTime',
            label: '计费开始时间',
            placeholder: '请选择开始时间',
            prop: 'beginDate',
            width: '50%',
          },
          {
            type: 'DateTime',
            label: '计费结束时间',
            placeholder: '请选择开始时间',
            prop: 'endDate',
            // width: "100%"
            width: '50%',
          },
          {
            type: 'Input',
            label: '计费单位/单价',
            placeholder: '请选择',
            prop: 'unitPrice',
            width: '50%',
            disabled: true,
          },
          {
            type: 'Input',
            label: '面积/用量  ',
            placeholder: '请输入',
            prop: 'num',
            // width: "100%"
            width: '50%',
          },
          {
            type: 'Input',
            label: '费用金额  ',
            placeholder: '请输入',
            prop: 'totalPrice',
            // width: "100%"
            width: '50%',
            disabled: true,
          },
        ],
        rules: {
          buildingUnitEstateId: [{ required: true, message: '请填写回访结果', trigger: 'blur' }],
          chargesTemplateDetailId: [{ required: true, message: '请填写回访时间', trigger: 'change' }],
          beginDate: [{ required: true, message: '请填写回访时间', trigger: 'change' }],
          endDate: [{ required: true, message: '请填写回访时间', trigger: 'change' }],
          unitPrice: [{ required: true, message: '请填写回访时间', trigger: 'change' }],
          type: [{ required: true, message: '请填写回访时间', trigger: 'change' }],
          num: [{ required: true, message: '请填写回访时间', trigger: 'change' }],
        }
      },
      receiverForm: {
        ruleForm: {
          content: '',
          name: '',
        },
        form_item: [
          {
            type: 'span',
            label: '推送人姓名',
            prop: 'name',
            width: '100%',
          },
          {
            type: 'textarea',
            label: '推送内容',
            rows: 4,
            prop: 'content',
            slotName: 'chargesTemplateDetailId',
            width: '100%',
          },

        ],
        rules: {
          content: [{ required: true, message: '请填写回访结果', trigger: 'blur' }],
        }
      },
      // 添加点击确认后弹出抽屉
      // 添加抽屉数据
      drawer_config: {
        drawer_vrisible: false,
        head_title: '访客编辑',
        content_title: '访客信息',
        ruleForm: {
          name: '何晓佳',
          jj: '',
        },
        form_item: [
          {
            type: 'span',
            label: '被推送人姓名',
            width: '100%',
            prop: 'name',
          },
          {
            type: 'textarea',
            label: '推送内容',
            placeholder: '请输入',
            rows: 6,
            width: '100%',
            prop: 'jj',
          },
        ],
      },
      activeName: '0',
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '收费项目名称', prop: 'name', width: '180' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '计费开始时间', prop: 'beginDate', width: '180' },
          { label: '计费结束时间', prop: 'endDate', width: '180' },
          { label: '计费单价/单位', prop: 'unitPrice', width: '180' },
          { label: '面积/用量/数量', prop: 'num', width: '180' },
          { label: '费用金额', prop: 'costPrice', width: '180' },
          { label: '已缴金额', prop: 'paidPrice', width: '180' },
          { label: '应收金额', prop: 'totalPrice', width: '180' },
          { label: '待缴金额', prop: 'paymentPrice', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          { label: '备注', prop: 'remake', width: '180' },
          { label: '创建人', prop: 'createName', width: '180' },
          { label: '更新时间', prop: 'updateDate', width: '180' },
        ],
        table_data: [],
        url: 'dailyPaymentList',
        search_item: [
          {
            type: 'select',
            label: '费用名称',
            placeholder: '请输入',
            value: '',
            prop: 'workOrderTypeDetailId',
            options: [
              {
                label: '水电费',
                value: '1',
              },
              {
                label: '车辆费',
                value: '2',
              },
            ],
          },
          {
            type: 'startDate',
            label: '计费时间',
            placeholder: '请选择开始日期',
            prop: 'beginDate',
          },
          {
            type: 'endDate',
            label: '计费时间',
            placeholder: '结束时间',
            prop: 'endDate',
          },
          {
            type: 'Input',
            label: '缴费人',
            placeholder: '请选择',
            prop: 'payName',
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'tel',
          },
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '楼栋/单元/房间号',
            prop: 'roomName',
          },
          // 房屋信息
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
    }
  },
  methods: {
    remoteMethod (val) {
      let reeData = {
        pageNum: 1,
        size: 20,
        name: val
      }
      this.loading = true
      userResidentFindResidentNameBySearch(reeData).then(res => {
        this.options = res.tableList.map(res => {
          return {
            value: res.estateId,
            label: res.roomName
          }
        })
        this.loading = false
      })
    },
    focus () {
      let reeData = {
        pageNum: 1,
        size: 20
      }
      this.loading = true
      userResidentFindResidentNameBySearch(reeData).then(res => {
        this.options = res.tableList.map(res => {
          return {
            value: res.estateId,
            label: res.roomName
          }
        })
        this.loading = false
        console.log(res)
      })
    },
    change (value, options) {
    },
    receiver (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message({
            message: '不能批量操作',
            type: 'error'
          })
          return
        }
        this.receiver_vrisible = true
        this.receiverForm.ruleForm.name = data[0].name
      } else {
        this.$message({
          message: '请选择需要操作的数据',
          type: 'error'
        })
      }

    },
    receiverClose () {
      this.receiver_vrisible = false
    },
    receiverRuleSuccess () {
      let resData = {
        sysMessage: {
          content: this.receiverForm.ruleForm.content
        },
        receiverAccountId: this.table_row[0].id
      }
      dailyPaymentPush(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$refs.table.loadData()
          this.receiverClose()
        }
      })
    },
    receiverSubmit () {
      this.$refs.receiverFrom.submitForm()
    },
    // 费用名称变化
    feeNameChange (value, options) {
      let data = options.find(function (item) {
        if (item.value === value) {
          return item;
        }
      });
      let str = ''
      switch (data.type) {
        case 1:
          str = '元/月 平方米'
          break;
        case 2:
          str = '元/月 立方米'
          break;
        case 3:
          str = '元/次'
          break;
      }
      // data
      this.feeData = data
      this.addForm.ruleForm.unitPrice = data.unitPrice + str
      console.log(value, options)
    },
    addRuleSuccess () {
      /***
       * 
       *  buildingUnitEstateId    :null,      	房产id	是	[int]		
        2	chargesTemplateDetailId	:null,        费用名称类型(取自 物业收费标准明细表)	是	[int]		
        3	beginDate	              :null,        计费开始时间	          是	[datetime]		
        4	endDate	                :null,      计费结束时间	              是	[datetime]		
        5	unitPrice	              :null,      计费单价	            是	[double]		
        6	type	                  :null,       计费单位（1.元/月 平方米，2.元/ 立方米，3.元/ 次）	是	[int]		
        7	num:null,
       * */
      let resData = {
        buildingUnitEstateId: this.feeData.value,
        chargesTemplateDetailId: this.addForm.ruleForm.chargesTemplateDetailId,
        beginDate: this.addForm.ruleForm.beginDate,
        endDate: this.addForm.ruleForm.endDate,
        unitPrice: this.feeData.unitPrice,
        type: this.feeData.type,
        num: this.addForm.ruleForm.num,
      }
      dailyPaymentInsert(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$refs.table.loadData()
          this.addClose()
        }
      })
    },
    addSubmit () {
      this.$refs.addFrom.submitForm()
    },
    addClose () {
      this.$refs.addFrom.reset()
      this.add_vrisible = false
    },
    handleClick (tab, event) {
      let status = null
      if (this.activeName != 0) {
        status = this.activeName
      } else {
        status = null
      }
      const requestData = {
        pageNum: 1,
        size: 10,
        status: status
      }
      this.$refs.table.requestData(requestData);
    },
    tableCheck (data) {
      this.table_row = data;

    },
    addFee () {
      this.add_vrisible = true
    },
    Pay () {
      this.change = false
      this.Pay_show = true
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false
      console.log(data + '投票管理父组件')
    },
    cancel (data) {
      this.addFee_show = false
      this.Pay_show = false

      this.change = true
    },
  },
  watch: {
    'addForm.ruleForm.num': {
      handler (newValue) {
        console.log(newValue)
        if (newValue && this.feeData.unitPrice) {
          this.addForm.ruleForm.totalPrice = (newValue * this.feeData.unitPrice).toFixed(2)
        }

      },
      immediate: true,
    }
  }
}
</script>
