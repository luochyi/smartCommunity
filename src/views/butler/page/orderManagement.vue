
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>派工单管理</span>
    </div>
    <div class="content">
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
              <button @click="Dispatch(table_row)">派工</button>
              <button @click='onVisit(table_row)'>回访</button>
              <button @click='onCancel(table_row)'>作废</button>
              <button @click="del(table_row)">删除</button>
            </div>
          </template>
        </VueTable>
      </div>
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
</template>

<script>
import Dispatch from '@/views/butler/components/reportRepair/Dispatch'
import { dispatchRevisit, dispatchCancel } from '@/api/butler'

export default {
    data() {
        return {
            // 控制dialog显示隐藏
            // 选中表格数据
            addEidt_vrisible: false, // 添加修改
            Dispatch_vrisible: false, // 派工
            visit_vrisible: false, // 回访
            cancel_vrisible: false, // 作废
            table_row: [],
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '工单单号', prop: 'code', width: '180' },
                    {
                        label: '工单类型',
                        prop: 'workOrderTypeName',
                        width: '180'
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        width: '180',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '待分配'
                                    break
                                case 2:
                                    return '已分配未接单'
                                    break
                                case 3:
                                    return '已分配处理中'
                                    break
                                case 4:
                                    return '已处理'
                                    break
                                case 5:
                                    return '已分配处理中'
                                    break
                                case 6:
                                    return '已关闭'
                                    break
                                case 7:
                                    return '已作废'
                                    break
                                case 8:
                                    return '已取消'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    { label: '派工时间', prop: 'dispatchDate', width: '120' },
                    {
                        label: '工单时限',
                        prop: 'workOrderTimeLimit',
                        width: '180'
                    },
                    { label: '提交人', prop: 'createName', width: '180' },
                    { label: '提交人电话', prop: 'tel', width: '120' },
                    { label: '维修人', prop: 'operatorName', width: '120' },
                    { label: '房屋信息', prop: 'roomName', width: '180' },
                    {
                        label: '要求处理事项',
                        prop: 'reportDetail',
                        width: '180'
                    },
                    { label: '派工备注', prop: 'remake', width: '180' },
                    { label: '开始处理时间', prop: 'beginDate', width: '180' },
                    { label: '回访时间', prop: 'revisitDate', width: '180' },
                    {
                        label: '回访情况说明',
                        prop: 'revisitDetail',
                        width: '180'
                    }
                ],
                url: 'dispatchList',
                table_data: [],
                search_item: [
                    {
                        type: 'Input',
                        label: '工单单号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '提交人',
                        placeholder: '请输入',
                        prop: 'createName'
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
                        prop: 'beginDateStart'
                    },
                    {
                        type: 'endDate',
                        label: '结束时间',
                        placeholder: '请选择结束日期',
                        prop: 'beginDateEnd'
                    },
                    {
                        type: 'Input',
                        label: '维修人',
                        placeholder: '请输入维修人	',
                        prop: 'operatorName'
                    }
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            },
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
                    },
                    {
                        type: 'textarea',
                        label: '回访结果',
                        placeholder: '请输入',
                        width: '100%',
                        rows: 5,
                        prop: 'content'
                    }
                ],
                rules: {
                    content: [
                        {
                            required: true,
                            message: '请填写回访结果',
                            trigger: 'blur'
                        }
                    ],
                    revisitDate: [
                        {
                            required: true,
                            message: '请填写回访时间',
                            trigger: 'change'
                        }
                    ]
                }
            },
            // 作废
            cancelForm: {
                ruleForm: {
                    content: ''
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
                    content: [
                        {
                            required: true,
                            message: '请填写回访结果',
                            trigger: 'blur'
                        }
                    ]
                }
            },
            // tab默认绑定
            activeName: 0
        }
    },
    components: {
        Dispatch
    },
    methods: {
        // 作废
        onCancel(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            }
            this.cancel_vrisible = true
        },
        // 作废关闭
        cancelClose() {
            this.cancel_vrisible = false
            this.$refs.cancelFrom.reset()
        },
        // 作废验证通过提交

        cancelRuleSuccess() {
            let resData = {
                id: this.table_row[0].id,
                content: this.cancelForm.ruleForm.content
            }
            dispatchCancel(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.requestData()
                    this.cancelClose()
                }
            })
        },
        // 作废验证 提交验证
        cancelSubmit() {
            this.$refs.cancelFrom.submitForm()
        },
        // 回访关闭
        visitClose() {
            this.visit_vrisible = false
            this.$refs.visitFrom.reset()
        },
        // 回访验证通过提交
        visitRuleSuccess() {
            let resData = {
                id: this.table_row[0].id,
                content: this.visitForm.ruleForm.content,
                revisitDate: this.visitForm.ruleForm.revisitDate
            }
            dispatchRevisit(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.requestData()
                    this.visitClose()
                }
            })
        },
        // 回访提交 验证
        visitSubmit() {
            this.$refs.visitFrom.submitForm()
        },
        // 回访
        onVisit(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据的详情')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            }
            this.visit_vrisible = true
        },
        // 派工
        Dispatch(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (data[0].status !== 1) {
                this.$message.error('只能待分配状态可派工')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            }
            this.Dispatch_vrisible = true
            this.$refs.Dispatch.details(data[0].id)
        },
        DispatchSuccess() {
            this.$refs.table.requestData()
        },
        DispatchHandleClose() {
            this.Dispatch_vrisible = false
        },
        handleClick(tab, event) {
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
            this.$refs.table.requestData(requestData)
        },
        tableCheck(arr) {
            this.table_row = arr
        },
        // 删除
        del(data) {
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
                })
                    .then(() => {
                        this.$refs.table.tableDelete(arr)
                    })
                    .catch((action) => {})
            } else {
                this.$message.error('请选中需要删除的数据')
            }
        }
    }
}
</script>
