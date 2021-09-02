<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>提醒通知</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增提醒</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增提醒"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">提醒内容</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <template v-slot:name>
                                        <el-select
                                            v-model="addForm.ruleForm.name"
                                            :remote-method="remoteMethod"
                                            @change="change"
                                            @focus="sefocus"
                                            :loading="loading"
                                            remote
                                            style="width: 240px"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </template>
                                </VueForm>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="addSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="addClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
</template>

<script>
import { userResident, userResidentListAll } from '@/api/basic'
import { remindInsert } from '@/api/company'
export default {
    data() {
        return {
            add_vrisible: false,
            options: [],
            loading: false,
            addForm: {
                ruleForm: {
                    name: null,
                    tel: null,
                    idType: null,
                    idNumber: null,
                    content: null,
                    title: null,
                    receiverAccount: null
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '提醒用户',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name',
                        slotName: 'name'
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
                            { value: 2, label: '营业执照' }
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
                    },
                    {
                        type: 'Input',
                        label: '提醒标题',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'title'
                    },
                    {
                        type: 'textarea',
                        label: '提醒内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    {
                        label: '标题',
                        prop: 'title',
                        width: '130'
                    },
                    {
                        label: '内容',
                        prop: 'content',
                        width: '230'
                    },
                    {
                        label: '发送时间',
                        prop: 'sendDate',
                        width: '230'
                    },
                    { label: '发送人姓名', prop: 'senderName', width: 'auto' },
                    {
                        label: '发送类型',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.type) {
                                case 1:
                                    return '系统广播'
                                    break
                                case 2:
                                    return '管理员消息'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '接收人姓名',
                        prop: 'receiverAccountName',
                        width: 'auto'
                    },
                    {
                        label: '消息状态',
                        prop: 'sendStatus',
                        width: '130',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.sendStatus) {
                                case 1:
                                    return '未读'
                                    break
                                case 3:
                                    return '已读'
                                    break
                                default:
                                    break
                            }
                        }
                    }
                ],
                table_data: [],
                url: 'remindList',
                search_item: [
                    {
                        type: 'Input',
                        label: '标题',
                        placeholder: '请输入',
                        prop: 'title'
                    },
                    {
                        type: 'select',
                        label: '发送类型',
                        placeholder: '请选择',
                        prop: 'type',
                        options: [
                            {
                                value: '1',
                                label: '系统广播'
                            },
                            {
                                value: '2',
                                label: '管理员消息'
                            }
                        ]
                    }
                    // Slot
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    methods: {
        remoteMethod(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val
            }
            this.loading = true
            userResidentListAll(reeData).then((res) => {
                this.options = res.tableList
                this.loading = false

                console.log(res)
            })
        },
        sefocus() {
            let reeData = {
                pageNum: 1,
                size: 20
            }
            this.loading = true
            userResidentListAll(reeData).then((res) => {
                this.options = res.tableList
                let obj = {
                    id: 0,
                    idNumber: '',
                    idType: '',
                    name: '（空）',
                    tel: ''
                }
                this.options.unshift(obj)
                this.loading = false
                console.log(this.options)
            })
        },
        change(value) {
            console.log(value)
            this.options.map((item) => {
                if (item.id === value) {
                    this.addForm.ruleForm.tel = item.tel
                    this.addForm.ruleForm.idType = item.idType
                    this.addForm.ruleForm.idNumber = item.idNumber
                    this.addForm.ruleForm.receiverAccount = value
                }
            })
        },
        drawerClose() {
            this.drawer_vrisible = false
            this.editId = null
            this.$refs.childFroms.reset()
            this.$refs.childFrom.reset()
            this.$emit('handleClose', 'Close')
        },
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            // this.addForm.ruleForm.interviewDate
            let resData = {
                ...this.addForm.ruleForm
            }
            remindInsert(resData).then((res) => {
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
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
        },
        // tabs切换
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
        // 表格选中
        tableCheck(data) {
            this.table_row = data
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
