<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>装修管理</span>
            </div>
            <div class="content">
                <div style="width: 50px">
                    <download-excel
                        class="export-excel-wrapper"
                        :fetch="fetchData"
                        :fields="json_fields"
                        :before-finish="finishDownload"
                        name="装修管理.xls"
                    >
                        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                        <el-button size="mini" icon="el-icon-folder-add" plain
                            >导出Excel</el-button
                        >
                    </download-excel>
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
                                <!-- <button @click="drop(table_row)">作废</button> -->
                                <!-- <button @click="del(table_row)">删除</button> -->
                                <button @click="audit(table_row)">审核</button>
                                <button @click="inspection(table_row)">
                                    指派完工检查人
                                </button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!--审核装修信息-->
                <el-dialog
                    title="审核装修信息"
                    width="480px"
                    top="40vh"
                    @close="dialogclose()"
                    :visible.sync="auditDialog"
                >
                    <div class="dialang-box">
                        <el-select
                            v-model="optionsVal"
                            placeholder="请选择是否通过"
                            size="small"
                            style="padding-bottom: 20px"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-input
                            placeholder="请输入装修通过/驳回原因"
                            size="mini"
                            type="textarea"
                            v-model="rejectReason"
                            style="width: 423px; height: 32px"
                        ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="auditDialog = false"
                            >取 消</el-button
                        >
                        <el-button size="mini" type="primary" @click="auditOk()"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
                <!-- 指派 -->
                <Drawer
                    drawerTitle="指派完工检查人"
                    @drawerClose="inspectionClose"
                    :drawerVrisible="inspection_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">选择完工检查人</template>
                            <template>
                                <VueForm
                                    ref="inspectionForm"
                                    :formObj="inspectionForm"
                                >
                                    <!-- Slot -->
                                    <template v-slot:sysOrganization>
                                        <el-select
                                            v-model="
                                                inspectionForm.ruleForm
                                                    .organizationId
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
                        <button class="btn-orange" @click="inspectionSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="inspectionClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
</template>

<script>
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {
    userDecorationNewExamine,
    sysOrganizationFindAllDepartment,
    sysUserList,
    userDecorationNewAssign
} from '@/api/daily'
export default {
    data() {
        return {
            options: [
                {
                    value: '2',
                    label: '装修通过'
                },
                {
                    value: '3',
                    label: '装修驳回'
                }
            ],
            optionsVal: null,
            inspection_vrisible: false,
            sysOptions: [],
            loading: false,
            thatId: null,
            rejectReason: null,
            auditDialog: false,
            inspectionForm: {
                ruleForm: {
                    organizationId: null,
                    tracker: null
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '选择部门',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'organizationId',
                        slotName: 'sysOrganization'
                    },
                    {
                        type: 'Select',
                        label: '完工检查人',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'tracker',
                        options: []
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            json_fields: {
                房屋信息: 'roomName',
                申请人名称: 'createName',
                申请时间: 'createDate',
                装修状态: {
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '装修申请中'
                                break
                            case 2:
                                return '装修中'
                                break
                            case 3:
                                return '装修驳回'
                                break
                            case 5:
                                return '申请完工检查'
                                break
                            case 6:
                                return '完工检查中'
                                break
                            case 7:
                                return '检查通过'
                                break
                            case 8:
                                return '检查不通过'
                                break
                        }
                    }
                },
                装修公司名称: 'director',
                装修负责人联系电话: 'directorTel',
                装修预计开始时间: 'expectedBegin',
                装修预计结束时间: 'expectedEnd',
                装修实际开始时间: 'actualBegin',
                装修实际结束时间: 'actualEnd',
                '装修通过/驳回原因': 'rejectReason',
                审核人名称: 'reviewerName',
                审核时间: 'auditDate',
                检查完工人名称: 'trackerName',
                最后一次完工检查是否合格: {
                    field: 'isQualified',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '合格'
                                break
                            case 2:
                                return '不合格'
                                break
                            default:
                                break
                        }
                    }
                }
            },
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '70' },
                    { label: '房屋信息', prop: 'roomName', width: '110' },
                    {
                        label: '申请人名称',
                        prop: 'createName',
                        width: 'auto'
                    },
                    {
                        label: '申请时间',
                        prop: 'createDate',
                        width: '200'
                    },
                    {
                        label: '装修状态',
                        prop: 'status',
                        width: '120',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '装修申请中'
                                    break
                                case 2:
                                    return '装修中'
                                    break
                                case 3:
                                    return '装修驳回'
                                    break
                                case 5:
                                    return '申请完工检查'
                                    break
                                case 6:
                                    return '完工检查中'
                                    break
                                case 7:
                                    return '检查通过'
                                    break
                                case 8:
                                    return '检查不通过'
                                    break
                            }
                        }
                    },
                    {
                        label: '装修公司负责人名称',
                        prop: 'director',
                        width: '130'
                    },
                    {
                        label: '装修负责人联系电话',
                        prop: 'directorTel',
                        width: '150'
                    },
                    {
                        label: '装修预计开始时间',
                        prop: 'expectedBegin',
                        width: '130'
                    },
                    {
                        label: '装修预计结束时间',
                        prop: 'expectedEnd',
                        width: '130'
                    },
                    {
                        label: '装修实际开始时间',
                        prop: 'actualBegin',
                        width: '200'
                    },
                    {
                        label: '装修实际结束时间',
                        prop: 'actualEnd',
                        width: '200'
                    },
                    {
                        label: '装修通过/驳回原因',
                        prop: 'rejectReason',
                        width: '200'
                    },
                    {
                        label: '审核人名称',
                        prop: 'reviewerName',
                        width: '180'
                    },
                    {
                        label: '审核时间',
                        prop: 'auditDate',
                        width: '200'
                    },
                    {
                        label: '检查完工人名称',
                        prop: 'trackerName',
                        width: '180'
                    },
                    {
                        label: '最后一次完工检查是否合格',
                        prop: 'isQualified',
                        width: '150',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.isQualified) {
                                case 1:
                                    return '合格'
                                    break
                                case 2:
                                    return '不合格'
                                    break
                                default:
                                    break
                            }
                        }
                    }
                ],
                table_data: [],
                url: 'userDecorationNewList',
                search_item: [
                    {
                        type: 'Input',
                        label: '装修公司负责人名称',
                        placeholder: '请输入',
                        prop: 'constructionUnit'
                    },
                    {
                        type: 'Int',
                        label: '装修负责人联系方式',
                        placeholder: '请输入',
                        prop: 'directorTel'
                    },
                    {
                        type: 'select',
                        label: '装修状态',
                        placeholder: '请输入',
                        prop: 'status',
                        options: [
                            { label: '装修申请中', value: '1' },
                            { label: '装修中', value: '2' },
                            { label: '装修驳回', value: '3' },
                            { label: '申请完工检查', value: '5' },
                            { label: '完工检查中', value: '6' },
                            { label: '检查通过', value: '7' },
                            { label: '检查不通过', value: '8' }
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
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'userDecorationNewList',
                data: {
                    pageNum: 1,
                    size: 100
                }
            }
            const data = await DownloadExcel(params, this)
            return data
        },
        // Excel进度
        ExcelLoading(page, pageCount) {
            const Loading = this.$loading({
                lock: true,
                text: `正在导出Excel${page}`,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            Loading.text = `正在导出Excel  ${page}/${pageCount}`
            console.log(Loading.text)
        },
        // Excel导出结束
        finishDownload() {
            const Loading = this.$loading()
            Loading.close()
        },
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
            this.inspectionForm.form_item[1].options = []
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
                        label: element.nickName
                    }
                    this.inspectionForm.form_item[1].options.push(obj)
                })
                console.log(this.inspectionForm.form_item[1].options)
                this.loading = false
            })
        },
        //审核
        audit(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条信息审核'
                })
                return
            }
            if (data[0].status != 1) {
                this.$message({
                    type: 'error',
                    message: '该状态不可审核'
                })
                return
            }
            this.auditDialog = true
            console.log(data)
            this.thatId = data[0].id
        },
        // 审核提交
        auditOk() {
            let resData = {
                id: this.thatId,
                status: this.optionsVal,
                rejectReason: this.rejectReason
            }
            console.log(resData)
            userDecorationNewExamine(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
            })
            this.auditDialog = false
            this.thatId = null
            this.optionsVal = null
            this.rejectReason = null
            this.$refs.table.loadData()
        },
        dialogclose() {},
        inspection(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条信息指派检查人'
                })
                return
            }
            if (data[0].status != 5) {
                this.$message({
                    type: 'error',
                    message: '该状态不可检查'
                })
                return
            }
            this.inspection_vrisible = true
            this.thatId = data[0].id
        },
        inspectionClose() {
            this.$refs.inspectionForm.reset()
            this.inspection_vrisible = false
        },
        inspectionSubmit() {
            let resData = {
                ...this.inspectionForm.ruleForm,
                id: this.thatId
            }
            userDecorationNewAssign(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
            })
            this.inspectionClose(), (this.thatId = null)
            this.$refs.table.loadData()
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
        }
    }
}
</script>
