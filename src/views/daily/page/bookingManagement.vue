<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>预约管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <!-- <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增预约</el-button
                    > -->
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
                                <el-tab-pane
                                    label="未签到"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已签到"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已作废"
                                    name="3"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已取消"
                                    name="4"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已结束"
                                    name="5"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="edit(table_row)">编辑</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 编辑 -->
                <Drawer
                    drawerTitle="编辑预约"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">基本信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <!-- Slot -->
                                    <template v-slot:date>
                                        <el-time-picker
                                            is-range
                                            v-model="addDate"
                                            range-separator="至"
                                            @change="dateTimeChange"
                                            value-format="HH:MM:SS"
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围"
                                        >
                                        </el-time-picker>
                                    </template>
                                    <template v-slot:facilitiesCategoryId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm
                                                    .facilitiesCategoryId
                                            "
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
import {
    facilitiesAppointmentUpdate,
    facilitiesCategoryList,facilitiesManageList
} from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            options: [],
            addForm: {
                ruleForm: {
                    id:null,
                    code:null,
                    appointmentName:null,
                    appointmentTel:null,
                    facilitiesName:null,
                    appointmentStartDate:null,
                    appointmentEndDate:null,
                },
                form_item: [
                    {
                        type: 'span',
                        label: '预约编号',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'code',
                    },
                    {
                        type: 'span',
                        label: '预约人',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'appointmentName',
                    },
                    {
                        type: 'span',
                        label: '预约人电话',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'appointmentTel',
                    },
                    {
                        type: 'span',
                        label: '预约设施',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'facilitiesName',
                    },
                    {
                        type: 'DateTime',
                        label: '预约开始时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'appointmentStartDate',
                    },
                    {
                        type: 'DateTime',
                        label: '预约结束时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'appointmentEndDate',
                    },
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '预约编号', prop: 'code', width: 'auto' },
                    {
                        label: '设施类型',
                        prop: 'facilitiesCategoryName',
                        width: 'auto'
                    },
                    {
                        label: '预约设施',
                        prop: 'facilitiesName',
                        width: 'auto'
                    },
                    { label: '预约人', prop: 'appointmentName', width: 'auto' },
                    {
                        label: '预约人电话',
                        prop: 'appointmentTel',
                        width: 'auto'
                    },
                    {
                        label: '预约时间',
                        prop: 'appointmentStartDate',
                        width: 'auto'
                    },
                    {
                        label: '预约状态',
                        prop: 'status',
                        width: '220',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '未签到'
                                    break
                                case 2:
                                    return '已签到'
                                    break
                                case 3:
                                    return '已作废'
                                    break
                                case 4:
                                    return '已取消'
                                    break
                                case 5:
                                    return '已结束'
                                    break
                            }
                        }
                    },
                    { label: '申请时间', prop: 'createDate', width: '220' }
                ],
                table_data: [],
                url: 'facilitiesAppointmentList',
                search_item: [
                    {
                        type: 'Input',
                        label: '预约编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    // {
                    //     type: 'select',
                    //     label: '设施种类',
                    //     placeholder: '请选择',
                    //     options: [
                    //         { value: 1, label: '乒乓球场' },
                    //         { value: 2, label: '篮球场' },
                    //         { value: 3, label: '网球场' }
                    //     ],
                    //     prop: 'facilitiesCategoryId' //需要获取设施分类中的主键id和名称
                    // },
                    {
                        type: 'Input',
                        label: '预约人',
                        placeholder: '请输入',
                        prop: 'appointmentName'
                    },
                    {
                        type: 'select',
                        label: '预约状态',
                        placeholder: '请选择',
                        value: null,
                        options: [
                            { value: 1, label: '未签到' },
                            { value: 2, label: '已签到' },
                            { value: 3, label: '已作废' },
                            { value: 4, label: '已取消' },
                            { value: 5, label: '已结束' }
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'picker',
                        label: '预约时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'appointmentStartDate',
                        endDate: 'appointmentEndDate',
                        width: '230px'
                    },
                    {
                        type: 'picker',
                        label: '申请时间',
                        placeholder: '请输入',
                        prop: 'createDate',
                        startDate: 'createStartDate',
                        endDate: 'createEndDate',
                        width: '230px'
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
    created() {
        this.getUserList()
    },
    methods: {
        // 获取设备列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val
            }
            this.loading = true
            facilitiesCategoryList(reeData).then((res) => {
                // console.log(res)
                this.options = res.tableList
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
            console.log(value)
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        edit(data){
            if(data.length!=1){
                this.$message.error('只能编辑一条')
                return
            }
            this.add_vrisible = true
            this.addForm.ruleForm.id = data[0].id
            this.addForm.ruleForm.code = data[0].code
            this.addForm.ruleForm.appointmentName = data[0].appointmentName
            this.addForm.ruleForm.appointmentTel = data[0].appointmentTel
            this.addForm.ruleForm.facilitiesName = data[0].facilitiesName
            this.addForm.ruleForm.appointmentStartDate = data[0].appointmentStartDate
            this.addForm.ruleForm.appointmentEndDate = data[0].appointmentEndDate
        },
        // 新增预约提交
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            facilitiesAppointmentUpdate(resData).then((res) => {
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
    },
    watch: {
        'addForm.ruleForm.type': {
            handler(newVal) {
                this.addForm.form_item[1].options = []
                console.log(newVal)
                facilitiesManageList({ type: newVal }).then((res) => {
                    console.log(res)
                    res.tableList.forEach((ele) => {
                        let obj = {
                            value: ele.id,
                            label: ele.name
                        }
                        this.addForm.form_item[1].options.push(obj)
                    })
                })
            }
        }
    }
}
</script>
