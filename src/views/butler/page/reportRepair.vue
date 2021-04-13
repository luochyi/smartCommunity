<style lang="scss" scoped>
.tips {
    margin: 20px;
    height: 38px;
    line-height: 38px;
    background: #fafafa;
    border-radius: 4px;
    opacity: 0.8;
    border: 1px solid #e8e8e8;
}
.main {
    margin: 20px;
    .head-box {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #cfd0dd;
        margin-bottom: 20px;
        .titel {
            line-height: 50px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            padding-left: 20px;
            border-bottom: 1px solid #d8d8d8;
        }
    }
    .box {
        background: #fff;
        padding: 20px;
        margin: 20px 0;
        border-radius: 4px;
        border: 1px solid #cfd0dd;

        .title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
        }
    }
}
</style>
<template>
  <div>
    <div v-if="handleChangeShow"
         class="main-content">
      <div class="main-titel">
        <span>投诉表扬</span>
      </div>
      <div class="tips">
        <p>
          <span class="el-icon-warning-outline"
                style="margin:0 12px"></span>
          温馨提示：今日新增保修
          <span style="color:rgba(251, 71, 2, 1)">13</span>
          条
        </p>
      </div>
      <div class="content">
        <div class="content-btn">
          <el-button class="init-button"
                     icon="el-icon-plus"
                     @click="add()">新增报修</el-button>
        </div>
        <div class="">
          <VueTable ref="table"
                    :config='config'
                    @tableCheck="tableCheck">
            <template slot="tabs">
              <el-tabs v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="全部"
                             name="0"></el-tab-pane>
                <el-tab-pane label="待分配"
                             name="1"></el-tab-pane>
                <el-tab-pane label="已分配未接单"
                             name="2"></el-tab-pane>
                <el-tab-pane label="已分配处理中"
                             name="3"></el-tab-pane>
                <el-tab-pane label="已处理"
                             name="4"></el-tab-pane>
                <el-tab-pane label="已确认已完成"
                             name="5"></el-tab-pane>
                <el-tab-pane label="已关闭"
                             name="6"></el-tab-pane>
                <el-tab-pane label="已作废"
                             name="7"></el-tab-pane>
                <el-tab-pane label="已取消"
                             name="8"></el-tab-pane>
              </el-tabs>
            </template>
            <template slot="footer">
              <div class="table-footer">
                <button @click='onDetails(table_row)'>详情</button>
                <button @click='edit(table_row)'>编辑</button>
                <button @click="Dispatch(table_row)">派工</button>
                <button @click='onVisit(table_row)'>回访</button>
                <button @click='onCancel(table_row)'>作废</button>
                <button @click="del(table_row)">删除</button>
              </div>
            </template>
          </VueTable>
        </div>
        <addEidt :drawerTitle="addEidtDrawerTitle"
                 ref="addEdit"
                 @submitSuccess='submitSuccess'
                 @handleClose="addEidtHandleClose"
                 :drawerVrisible='addEidt_vrisible'></addEidt>
        <Dispatch drawerTitle="派工"
                  ref="Dispatch"
                  @submitSuccess='DispatchSuccess'
                  @handleClose="DispatchHandleClose"
                  :drawerVrisible='Dispatch_vrisible'></Dispatch>

        <Drawer drawerTitle="回访"
                @drawerClose="visitClose"
                :drawerVrisible='visit_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">基本信息</template>
              <template>
                <VueForm ref="visitFrom"
                         @ruleSuccess='visitRuleSuccess'
                         :formObj='visitForm'></VueForm>
              </template>
            </FromCard>
          </div>
          <div slot="footer">
            <button class="btn-orange"
                    @click="visitSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
            <button class="btn-gray"
                    @click="visitClose"><span>取消</span></button>
          </div>
        </Drawer>

        <Drawer drawerTitle="作废"
                @drawerClose="cancelClose"
                :drawerVrisible='cancel_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">作废原因</template>
              <template>
                <VueForm ref="cancelFrom"
                         @ruleSuccess='cancelRuleSuccess'
                         :formObj='cancelForm'></VueForm>
              </template>
            </FromCard>
          </div>
          <div slot="footer">
            <button class="btn-orange"
                    @click="cancelSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
            <button class="btn-gray"
                    @click="cancelClose"><span>取消</span></button>
          </div>
        </Drawer>
      </div>
    </div>
    <div v-else>
      <div class="main">
        <div class="head-box">
          <div class="titel">
            <span>报修详情</span>
          </div>
          <div class="content">
            <span>已关闭</span>
            <div class='flex justify-between align-center'>
              <div>
                <span>374691283192</span>
              </div>
              <div>
                <button class="btn-orange"><span> 编辑</span></button>
                <button class="btn-orange"
                        @click="handleChangeShow=true"><span> 返回</span></button>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <span>报修详情</span>
          </div>
          <div class=''>
            <VueForm ref="vueForm"
                     :formObj='reportRepairFrom'>
              <template slot='type'>
                <span v-if="reportRepairFrom.ruleForm.type === 1">户内</span>
                <span v-if="reportRepairFrom.ruleForm.type === 2">户外</span>
              </template>
              <template slot='photo'>
                <el-image style="width: 245px; height: 138px"
                          :src="`${$ImgUrl}${reportRepairFrom.ruleForm.photo}` "
                          fit="fill"></el-image>
              </template>
            </VueForm>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <span>派工详情</span>
          </div>
          <div class=''>
            <VueForm ref="vueForm"
                     :formObj='DispatchFrom'>
            </VueForm>
          </div>
        </div>

        <div class="box">
          <div class="title">
            <span>处理进程记录</span>
          </div>
          <div class=''>
            <tableData :config="handleConfig">
            </tableData>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <span>客户评价</span>
          </div>
          <div class=''>

          </div>
        </div>
        <div class="box">
          <div class="title">
            <span>回访</span>
          </div>
          <div class=''>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import addEidt from '@/views/butler/components/reportRepair/addEidt'
import Dispatch from '@/views/butler/components/reportRepair/Dispatch'
import { dispatchRevisit, dispatchCancel, reportRepairFindRepairDetail, repairWorkOrderDetail } from '@/api/butler'
export default {
  data () {
    return {
      // 费用明细
      handleConfig: {
        thead: [
          { label: '操作时间', prop: 'operationDate', width: 'auto' },
          {
            label: '操作类型', prop: 'operatorType', width: 'auto', type: 'function',
            callback: (row, prop) => {
              // 1.提交报修，2.派单，3.开始处理，4.处理完成，5.确认，6.回访，7.回退，8.作废，9.取消
              switch (row.operationType) {
                case 1:
                  return '提交报修';
                  break;
                case 2:
                  return '派单';
                  break;
                case 3:
                  return '开始处理';
                  break;
                case 4:
                  return '处理完成';
                  break;
                case 5:
                  return '确认';
                  break;
                case 6:
                  return '回访';
                  break;
                case 7:
                  return '回退';
                  break;
                case 8:
                  return '作废';
                  break;
                case 9:
                  return '取消';
                  break;
              }
            }
          },
          { label: '操作人', prop: 'operatorName', width: 'auto' },
          { label: '操作内容', prop: 'operatorContent', width: 'auto' },
        ],
        table_data: [
        ],
        loading: true,
        checkbox: false,
      },
      addEidtDrawerTitle: '',
      addEidt_vrisible: false,  // 添加修改
      Dispatch_vrisible: false,  // 派工
      visit_vrisible: false,  // 回访
      cancel_vrisible: false,  // 作废
      handleChangeShow: true, //  //
      // 选中表格数据
      table_row: [],
      // 回访
      visitForm: {
        ruleForm: {
          content: '',
          revisitDate: null
        },
        form_item: [
          {
            type: 'DateTime',
            label: '报修时间',
            placeholder: '请输入',
            width: '50%',
            prop: 'revisitDate'
          }, {
            type: 'textarea',
            label: '回访结果',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'content'
          }
        ],
        rules: {
          content: [{ required: true, message: '请填写回访结果', trigger: 'blur' }],
          revisitDate: [{ required: true, message: '请填写回访时间', trigger: 'change' }],
        }
      },
      // 作废
      cancelForm: {
        ruleForm: {
          content: '',
        },
        form_item: [
          {
            type: 'textarea',
            label: '作废原因',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'content'
          }
        ],
        rules: {
          content: [{ required: true, message: '请填写回访结果', trigger: 'blur' }]
        }
      },
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '报修单号', prop: 'code', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '报修人', prop: 'repairmanName', width: '120' },
          { label: '报修人电话', prop: 'repairTel', width: '180' },
          { label: '报修时间', prop: 'repairDate', width: '180' },
          { label: '分配人', prop: 'distributorName', width: '120' },
          { label: '维修人', prop: 'operatorName', width: '120' },
          { label: '工单时限', prop: 'workOrderTimeLimit', width: '180' },
          { label: '来源', prop: 'fromsName', width: '180' }
        ],
        url: 'reportRepairList',
        table_data: [],
        search_item: [
          {
            type: 'Input',
            label: '报修单号',
            placeholder: '请输入',
            prop: 'code'
          },
          {
            type: 'Input',
            label: '报修人',
            placeholder: '请输入',
            prop: 'repairman'
          },
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '单元/楼栋/房号',
            prop: 'roomName'
          },
          {
            type: 'startDate',
            label: '开始日期',
            placeholder: '请选择开始日期',
            prop: 'repairDateStart'
          },
          {
            type: 'endDate',
            label: '结束时间',
            placeholder: '请选择结束日期',
            prop: 'repairDateEnd'
          },
          {
            type: 'Input',
            label: '分配人',
            placeholder: '请输入分配人',
            prop: 'distributor'
          },
          {
            type: 'Input',
            label: '维修人',
            placeholder: '请输入维修人	',
            prop: 'operator'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      reportRepairFrom: {
        ruleForm: {
          type: null,
          froms: '业主来电',
          fileUrls: [],
          reportDetail: null,
          repairName: null,
          tel: null,
          repairDate: null,
          repairFrom: 1,
          dispatchName: null,
          photo: null,
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
          }
          ,
          {
            type: 'Slot',
            label: '照片',
            width: '100%',
            prop: 'photo',
            slotName: 'photo'
          }
        ],
      },
      DispatchFrom: {
        //         code: "076d8f26be5546bfaef9913d4dd9a681"
        // dispatchDate: "2021-04-30 00:00:00"
        // id: 9
        // operatorName: "维修2"
        // remake: "哈哈哈哈"
        // workOrderTimeLimitName: "24小时内处理"
        // workOrderTypeDetailName: "测试工单明细4"
        // workOrderTypeName: "报修业务"
        ruleForm: {
          workOrderTypeName: null,
          workOrderTimeLimitName: null,
          workOrderTypeDetailName: null,
          type: null,
          remake: null,
          dispatchDate: null,
          operator: null,
        },
        form_item: [
          {
            type: 'span',
            label: '工单大类',
            width: '50%',
            prop: 'workOrderTypeName',
          },
          {
            type: 'span',
            label: '工单子类',
            width: '50%',
            prop: 'workOrderTypeDetailName'
          },
          {
            type: 'span',
            label: '工单时限',
            width: '50%',
            prop: 'workOrderTimeLimitName'
          },
          {
            type: 'span',
            label: '派工类型',
            width: '50%',
            prop: 'type'
          },
          {
            type: 'span',
            label: '指派给',
            width: '50%',
            prop: 'operator',
            // options
          },
          {
            type: 'span',
            label: '预约时间 ',
            width: '50%',
            prop: 'dispatchDate'
          },
          {
            type: 'span',
            label: '派工备注',
            prop: 'remake'
          },

        ],
      },
      // tab默认绑定
      activeName: 0,
    }
  },
  components: {
    addEidt,
    Dispatch
  },
  methods: {
    // 
    // 详情、
    onDetails (data) {
      if (data.length > 1) {
        this.$message.error('只能操作一条数据');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      /**
       * 
       * type: null,
          froms: '业主来电',
          fileUrls: [],
          reportDetail: null,
          repairman: null,
          tel: null,
          repairDate: null,
          repairFrom: 1,
          dispatchName: null
       * */
      repairWorkOrderDetail({ id: data[0].id }).then(result => {
        console.log(result)
        this.reportRepairFrom.ruleForm.type = result.voRepair.type
        this.reportRepairFrom.ruleForm.fileUrls = result.voRepair.imgUrls[0].url
        this.reportRepairFrom.ruleForm.reportDetail = result.voRepair.reportDetail
        this.reportRepairFrom.ruleForm.repairName = result.voRepair.repairName
        this.reportRepairFrom.ruleForm.dispatchName = result.voRepair.dispatchName
        this.reportRepairFrom.ruleForm.photo = result.voRepair.imgUrls[0].url
        this.reportRepairFrom.ruleForm.tel = result.voRepair.tel
        this.reportRepairFrom.ruleForm.repairDate = result.voRepair.repairDate


        this.DispatchFrom.ruleForm.dispatchDate = result.voDispatch.dispatchDate
        this.DispatchFrom.ruleForm.remake = result.voDispatch.remake
        this.DispatchFrom.ruleForm.workOrderTimeLimitName = result.voDispatch.workOrderTimeLimitName
        this.DispatchFrom.ruleForm.workOrderTypeDetailName = result.voDispatch.workOrderTypeDetailName
        this.DispatchFrom.ruleForm.workOrderTypeName = result.voDispatch.workOrderTypeName
        this.DispatchFrom.ruleForm.operator = result.voDispatch.operatorName
        this.handleConfig.table_data = result.voProcessRecordList
        this.handleConfig.loading = false
        this.handleChangeShow = false
      })
      // reportRepairFindRepairDetail({ id: data[0].id }).then(result => {
      //   console.log(result)

      // })
    },
    // 作废
    onCancel (data) {
      if (data.length > 1) {
        this.$message.error('只能操作一条数据');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.cancel_vrisible = true;
    },
    // 作废关闭
    cancelClose () {
      this.cancel_vrisible = false;
      this.$refs.cancelFrom.reset()
    },
    // 作废验证通过提交

    cancelRuleSuccess () {
      let resData = {
        id: this.table_row[0].id,
        content: this.cancelForm.ruleForm.content
      }
      dispatchCancel(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$refs.table.requestData();
          this.cancelClose()

        }
      })
    },
    // 作废验证 提交验证
    cancelSubmit () {
      this.$refs.cancelFrom.submitForm()
    },
    // 回访关闭
    visitClose () {
      this.visit_vrisible = false;
      this.$refs.visitFrom.reset()
    },
    // 回访验证通过提交
    visitRuleSuccess () {
      let resData = {
        id: this.table_row[0].id,
        content: this.visitForm.ruleForm.content,
        revisitDate: this.visitForm.ruleForm.revisitDate
      }
      dispatchRevisit(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$refs.table.requestData();
          this.visitClose()

        }
      })
    },
    // 回访提交 验证
    visitSubmit () {
      this.$refs.visitFrom.submitForm()
    },
    // 回访
    onVisit (data) {
      if (data.length > 1) {
        this.$message.error('只能操作一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.visit_vrisible = true;
    },
    // 派工
    Dispatch (data) {
      if (data.length > 1) {
        this.$message.error('只能操作一条数据');
        return
      }
      if (data[0].status !== 1) {
        this.$message.error('只能待分配状态可派工');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.Dispatch_vrisible = true;
      this.$refs.Dispatch.details(data[0].id)
    },
    DispatchSuccess () {
      this.$refs.table.requestData();
    },
    DispatchHandleClose () {
      this.Dispatch_vrisible = false;
    },
    // 编辑
    edit (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.addEidt_vrisible = true;
      this.$refs.addEdit.edit(data[0].id)
    },
    // 新增
    add () {
      this.addEidt_vrisible = true
      this.addEidtDrawerTitle = '新增保修'
    },
    addEidtHandleClose () {
      this.addEidt_vrisible = false
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
    tableCheck (arr) {
      this.table_row = arr
    },
    // 删除
    del (data) {
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.table_row.length; i++) {
          arr.push(this.table_row[i].id)
        }
        this.$confirm('是否确认删除？删除不可恢复', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
          this.$refs.table.tableDelete(arr)
        }).catch(action => { });
      } else {
        this.$message.error('请选中需要删除的数据');
      }
    },
    // 添加修改成功
    submitSuccess () {
      this.$refs.table.loadData()
    },
  },
}
</script>
