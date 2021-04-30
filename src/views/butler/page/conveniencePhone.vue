<template>
  <div class="main-content">
    <div class="main-titel">
      <span>便民电话</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addBuild()"
                   icon="el-icon-plus">新增电话</el-button>
        <el-button type="init-button2"
                   icon="el-icon-time"
                   @click="InspectionDrawer()"
                   plain>定时检查</el-button>
      </div>
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template slot="footer">
          <div class="table-footer">
            <button @click="revise(table_row)">编辑</button>
            <button @click="del(table_row)">删除</button>
            <!-- <button>检查</button> -->

          </div>
        </template>
      </VueTable>
    </div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="childFrom"
                     @ruleSubmit='ruleSubmit'
                     :formObj='reviseForm'></VueForm>
          </template>
        </FromCard>
      </div>
      <div slot="footer">
        <button class="btn-orange"
                @click="onSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="drawerClose"><span>取消</span></button>
      </div>
    </Drawer>
    <!--定时检查-->
    <Drawer drawerTitle="定时检查"
            @drawerClose="InspectionDrawerClose"
            :drawerVrisible='Inspection_vrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="childFroms"
                     @ruleSubmit='ruleSubmit'
                     :formObj='InspectionForm'></VueForm>
          </template>
        </FromCard>
      </div>
      <div slot="footer">
        <button class="btn-orange"
                @click="InspectionSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="InspectionDrawerClose"><span>取消</span></button>
      </div>
    </Drawer>
    <!-- 删除提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>
<script>
import {
    conveniencePhoneInsert,
    conveniencePhoneUpdate,
    conveniencePhoneUpdateReminder,
    conveniencePhoneFindById
} from '@/api/basic'
export default {
    data() {
        return {
            // 抽屉标题
            drawerTitle: '',
            Inspection_vrisible: false,
            // 是否通过校验
            bool: false,
            // 抽屉显示隐藏
            drawer_vrisible: false,
            // 控制弹窗为添加或修改  默认为true 添加
            drawerControl: true,
            // 控制dialog显示隐藏
            dialog_visible: false,
            // 弹窗提示
            dialog_config: {
                title: '删除提示',
                content: '是否确认删除？删除无法撤回！'
            },
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '名称', prop: 'name', width: 'auto' },
                    { label: '联系方式', prop: 'tel', width: 'auto' },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '正常'
                                    break
                                case 2:
                                    return '有误'
                                    break
                                case 3:
                                    return '空号'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '类型',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '业委会'
                                    break
                                case 2:
                                    return '绿化'
                                    break
                                case 3:
                                    return '快递'
                                    break
                                case 4:
                                    return '搬家'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '下次检查时间',
                        prop: 'nextControlDate',
                        width: 'auto'
                    },
                    { label: '检查状态', prop: 'checkStatus', width: 'auto' },
                    { label: '权重', prop: 'weight', width: 'auto' }
                ],
                url: 'conveniencePhoneList',
                data: {
                    pageNum: 1,
                    size: 10
                },
                // search_item
                search_item: [
                    {
                        type: 'Input',
                        label: '联系名称',
                        placeholder: '请输入内容',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '联系电话',
                        placeholder: '请输入',
                        prop: 'tel'
                    }
                ]
            },
            // 选中表格数据
            table_row: [],
            InspectionForm: {
                ruleForm: {
                    reminderInterval: null,
                    reminderContent: null
                },
                rules: {
                    reminderInterval: [
                        {
                            required: true,
                            message: '请选择定时检查时间',
                            trigger: 'blur'
                        }
                    ],
                    reminderContent: [
                        {
                            required: true,
                            message: '请填写提醒内容',
                            trigger: 'blur'
                        }
                    ]
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '提醒间隔',
                        placeholder: '请选择',
                        options: [
                            { value: 1, label: '一个月' },
                            { value: 2, label: '半年' }
                        ],
                        width: '100%',
                        prop: 'reminderInterval'
                    },
                    {
                        type: 'textarea',
                        label: '提醒内容',
                        placeholder: '请输入',
                        rows: 5,
                        width: '100%',
                        prop: 'reminderContent'
                    }
                ]
            },
            reviseForm: {
                ruleForm: {
                    name: null,
                    status: null,
                    tel: null,
                    weight: null,
                    type: null
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请填写楼栋名称',
                            trigger: 'blur'
                        }
                    ],
                    status: [
                        {
                            required: true,
                            message: '请填写楼栋名称',
                            trigger: 'blur'
                        }
                    ],
                    tel: [
                        {
                            required: true,
                            message: '请填写楼栋名称',
                            trigger: 'blur'
                        }
                    ],
                    weight: [
                        {
                            required: true,
                            message: '请填写楼栋名称',
                            trigger: 'blur'
                        }
                    ],
                    type: [
                        {
                            required: true,
                            message: '请填写楼栋名称',
                            trigger: 'blur'
                        }
                    ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '联系名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Int',
                        label: '联系方式',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'tel'
                    },
                    {
                        type: 'Select',
                        label: '状态',
                        placeholder: '请输入',
                        options: [
                            { value: 1, label: '正常' },
                            { value: 2, label: '有误' },
                            { value: 3, label: '空号' }
                        ],
                        width: '50%',
                        prop: 'status'
                    },
                    {
                        type: 'Select',
                        label: '类型',
                        placeholder: '请输入',
                        options: [
                            { value: 1, label: '业委会' },
                            { value: 2, label: '绿化' },
                            { value: 3, label: '快递' },
                            { value: 4, label: '搬家' }
                        ],
                        width: '50%',
                        prop: 'type'
                    },
                    {
                        type: 'Int',
                        label: '权重',
                        placeholder: '请输入权重',
                        width: '50%',
                        prop: 'weight'
                    }
                ]
            }
        }
    },
    mounted() {},
    methods: {
        ruleSubmit(val) {
            this.bool = val
        },
        // 增加或修改
        onSubmit() {
            this.$refs.childFrom.submitForm()
            if (this.bool) {
                if (this.drawerControl) {
                    // 添加
                    let requestData = {
                        name: this.reviseForm.ruleForm.name,
                        status: parseInt(this.reviseForm.ruleForm.status),
                        tel: this.reviseForm.ruleForm.tel,
                        weight: parseInt(this.reviseForm.ruleForm.weight),
                        type: parseInt(this.reviseForm.ruleForm.type)
                    }
                    conveniencePhoneInsert(requestData)
                        .then((res) => {
                            console.log(res)
                            if (res.status) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.getData()
                                this.drawerClose()
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    // 修改
                    let requestData = {
                        id: this.table_row[0].id,
                        name: this.reviseForm.ruleForm.name,
                        status: parseInt(this.reviseForm.ruleForm.status),
                        tel: this.reviseForm.ruleForm.tel,
                        weight: parseInt(this.reviseForm.ruleForm.weight),
                        type: parseInt(this.reviseForm.ruleForm.type)
                    }
                    conveniencePhoneUpdate(requestData)
                        .then((res) => {
                            console.log(res)
                            if (res.status) {
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.getData()
                                this.drawerClose()
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            }
        },
        tableCheck(arr) {
            this.table_row = arr
        },
        getData() {
            // 调用子组件的方法
            this.$refs.table.loadData()
        },
        // 弹窗关闭
        drawerClose() {
            this.$refs.childFrom.reset()
            for (let key in this.reviseForm.ruleForm) {
                this.reviseForm.ruleForm[key] = ''
            }
            this.drawer_vrisible = false
        },
        // 定时检查
        InspectionSubmit() {
            this.$refs.childFroms.submitForm()
            if (this.bool) {
                let requestData = {
                    reminderInterval: this.InspectionForm.ruleForm
                        .reminderInterval,
                    reminderContent: this.InspectionForm.ruleForm
                        .reminderContent
                }
                conveniencePhoneUpdateReminder(requestData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.getData()
                        this.InspectionDrawerClose()
                    }
                })
            }
        },
        InspectionDrawer() {
            this.Inspection_vrisible = true
        },
        InspectionDrawerClose() {
            this.Inspection_vrisible = false
            this.$refs.childFroms.reset()
            for (let key in this.InspectionForm.ruleForm) {
                this.InspectionForm.ruleForm[key] = ''
            }
        },
        addBuild() {
            this.drawerControl = true
            this.drawer_vrisible = true
            this.drawerTitle = '新增电话'
        },
        // 修改
        revise(data) {
            console.log(data)
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('只能单条数据修改')
                    return
                }
            } else {
                this.$message.error('请选中需要修改的数据')
                return
            }
            let resData = {
                id: data[0].id
            }
            conveniencePhoneFindById(resData).then((result) => {
                this.reviseForm.ruleForm.name = result.voConveniencePhone.name
                this.reviseForm.ruleForm.status =
                    result.voConveniencePhone.status
                this.reviseForm.ruleForm.tel = result.voConveniencePhone.tel
                this.reviseForm.ruleForm.weight =
                    result.voConveniencePhone.weight
                this.reviseForm.ruleForm.type = result.voConveniencePhone.type

                this.drawerControl = false
                this.drawerTitle = '修改电话'
                this.drawer_vrisible = true
            })
        },
        // 删除
        del(data) {
            if (data.length) {
                this.dialog_visible = true
            } else {
                this.$message.error('请选中需要删除的表格数据')
            }
        },
        // 监听删除取消事件
        cancel(data) {
            this.dialog_visible = false
        },
        // 监听删除确认确认事件
        confirm(data) {
            let arr = []
            for (let i = 0; i < this.table_row.length; i++) {
                arr.push(this.table_row[i].id)
            }
            // 调用子组件的方法
            this.$refs.table.tableDelete(arr)
            this.dialog_visible = false
        }
    }
}
</script>
<style scoped lang='scss'>
</style>
