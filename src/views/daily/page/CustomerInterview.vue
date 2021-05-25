<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>客户访谈</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增访谈预约</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="tabs">
                            <el-tabs
                                v-model="activeName"
                                @tab-click="handleClick"
                            >
                                <el-tab-pane
                                    label="全部"
                                    name="0"
                                ></el-tab-pane>
                                <!-- <el-tab-pane label="未领取"
                             name="1"></el-tab-pane>
                <el-tab-pane label="已领取"
                             name="2"></el-tab-pane>
                 <el-tab-pane label="停用"
                             name="3"></el-tab-pane> -->
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增访谈"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">访谈内容</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <!-- Slot -->
                                    <template slot="date">
                                        <el-date-picker
                                            v-model="addForm.ruleForm.interviewDate"
                                            value-format='yyyy-MM-dd HH:mm:ss'
                                            type="date"
                                            placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                    </template>
                                    <template v-slot:sysOrganization>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm.organizationId
                                            "
                                            :remote-method="remoteMethod"
                                            @change="sChange"
                                            @focus="sefocus"
                                            :loading="loading"
                                            remote
                                            style="width: 240px"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in sysOptions"
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
import {
    interviewInsert,
    sysOrganizationFindAllDepartment,
    sysUserList
} from '@/api/daily'

export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            sysOptions: [],
            loading: false,
            addForm: {
                ruleForm: {
                    name:null,
                    tel:null,
                    interviewers:null,
                    content:null,
                    interviewDate:null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '客户姓名',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Int',
                        label: '客户手机号',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'tel'
                    },
                    {
                        type: 'Slot',
                        label: '部门',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'organizationId',
                        slotName: 'sysOrganization'
                    },
                    {
                        type: 'Select',
                        label: '访谈人',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'interviewers',
                        options: []
                    },
                    {
                        type: 'textarea',
                        label: '访谈内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'Slot',
                        label: '访谈时间',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'interviewDate',
                        slotName: 'date'
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
                        label: '客户姓名',
                        prop: 'name',
                        width: '130'
                    },
                    {
                        label: '客户手机号',
                        prop: 'tel',
                        width: '130'
                    },
                    {
                        label: '访谈人',
                        prop: 'interviewersName',
                        width: '130'
                    },
                    { label: '访谈内容', prop: 'content', width: 'auto' },
                    {
                        label: '访谈状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '未访谈'
                                    break
                                case 2:
                                    return '已访谈'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    { label: '访谈时间', prop: 'interviewDate', width: 'auto' },
                    {
                        label: '访谈回复内容',
                        prop: 'feedbackContent',
                        width: '130'
                    },
                    {
                        label: '访谈回复时间',
                        prop: 'feedbackDate',
                        width: '130'
                    },
                    {
                        label: '创建人',
                        prop: 'createName',
                        width: '130'
                    },
                    {
                        label: '创建时间',
                        prop: 'createDate',
                        width: '130'
                    }
                ],
                table_data: [],
                url: 'interviewList',
                search_item: [
                    {
                        type: 'Input',
                        label: '客户手机号',
                        placeholder: '请输入',
                        prop: 'tel'
                    },
                    {
                        type: 'select',
                        label: '访谈状态',
                        placeholder: '请选择',
                        prop: 'status',
                        options: [
                            {
                                value: '1',
                                label: '未访谈'
                            },
                            {
                                value: '2',
                                label: '已访谈'
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
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20
            }
            this.loading = true
            sysOrganizationFindAllDepartment(reeData).then((res) => {
                // console.log(res)
                this.sysOptions = res.data
                // console.log(this.sysOptions);
                this.loading = false
            })
        },
        remoteMethod(val) {
            this.getUserList(val)
        },
        sefocus() {
            this.getUserList()
        },
        change(value) {
            console.log(value) //sysUserList
        },
        //根据部门获取人员
        sChange(value) {
            this.addForm.form_item[3].options = []
            let sData = {
                pageNum: 1,
                size: 100,
                organizationId: value
            }
            sysUserList(sData).then((res) => {
                console.log(res)

                res.tableList.forEach((element) => {
                    let obj = {
                        value: element.id,
                        label: element.actualName
                    }
                    this.addForm.form_item[3].options.push(obj)
                })
                console.log(this.addForm.form_item[3].options)
                this.loading = false
            })
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
                interviewInsert(resData).then((res) => {
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
