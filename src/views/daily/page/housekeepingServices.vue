<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>家政服务记录</span>
            </div>
            <div class="content">
                 <div  style="width: 50px"><download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="家政服务记录.xls"
                            >
                                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                                <el-button
                                    size="mini"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel></div>
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button @click="add(table_row)">审核</button>
                                <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="审核"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">审核信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
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
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadAnnouncement`"
                                                :on-success="ImgeSuccess"
                                                :file-list="imglist"
                                                :on-exceed="handleExceed"
                                                :limit="1"
                                                accept=".jpg,.png,.JPG,.PNG"
                                                :before-upload="
                                                    beforeAvatarUpload
                                                "
                                            >
                                                <el-button
                                                    icon="el-icon-edit"
                                                    size="small"
                                                    >上传图片</el-button
                                                >
                                                <span
                                                    style="
                                                        margin-left: 10px;
                                                        font-size: 12px;
                                                        color: #444444;
                                                    "
                                                    >建议比例：3:2</span
                                                >
                                                <div
                                                    slot="tip"
                                                    class="el-upload__tip"
                                                >
                                                    <span
                                                        >支持扩展名：png,jpg</span
                                                    >
                                                </div>
                                            </el-upload>
                                        </template>
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
import { DownloadExcel } from '@/plugins/DownloadExcel'
import { auditManagementReviewResult } from '@/api/basic'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    //   code: 'hdede',
                    //   facilitiesCategoryId:null,
                    //   address:null
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '审核状态',
                        placeholder: '请选择',
                        width: '100%',
                        options: [
                            { value: 1, label: '通过' },
                            { value: 2, label: '不通过' }
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'Slot',
                        label: '图片上传',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'imgUrls',
                        slotName: 'imgUrls'
                    },
                    {
                        type: 'textarea',
                        label: '备注',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'remakes'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            //表头
                json_fields: {
                申请人姓名:'proposerName',
                申请人手机号:'proposerTel',
                房屋名称:'roomName',
                服务类型:{
                    field: 'type',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                    return '室内清洁'
                                    break
                                case 2:
                                    return '洗涤护理'
                                    break
                                default:
                                    break
                        }
                    }
                },
                家政内容:'content',
                状态:{
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '待派单'
                                break;
                            case 2:
                                return '已派单'
                                break;
                            case 3:
                                return '处理中'
                                break;
                            case 4:
                                return '待支付'
                                break;
                            case 5:
                                return '待评价'
                                break;
                            case 6:
                                return '已完成'
                                break;
                            case 9:
                                return '已取消'
                                break;
                            default:
                                break;
                        }
                    }
                },
                // completion
                完成情况:{
                    field: 'completion',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '未完成'
                                break;
                            case 2:
                                return '已完成'
                                break;
                            default:
                                break;
                        }
                    }
                },
                处理人名称:'handlerName',
                处理人电话:'handlerTel',
                处理描述:'processDescription',
                处理时间:'handlingTime',
            },
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '申请人姓名', prop: 'proposerName', width: 'auto' },
                    {
                        label: '申请人手机号',
                        prop: 'proposerTel',
                        width: 'auto'
                    },
                    { label: '房屋名称', prop: 'roomName', width: 'auto' },
                    { label: '服务类型', prop: 'type', width: 'auto' ,type:'function',callback:(row,prop)=>{
                        switch (row.type) {
                            case 1:
                                return '室内清洁'
                                break;
                            case 2:
                                return '洗涤护理'
                                break;
                            default:
                                break;
                        }
                    }},
                    { label: '服务内容', prop: 'content', width: 'auto' },
                    { label: '状态', prop: 'status', width: 'auto' ,type:'function',callback:(row,prop)=>{
                        switch (row.status) {
                            case 1:
                                return '待派单'
                                break;
                            case 2:
                                return '已派单'
                                break;
                            case 3:
                                return '处理中'
                                break;
                            case 4:
                                return '待支付'
                                break;
                            case 5:
                                return '待评价'
                                break;
                            case 6:
                                return '已完成'
                                break;
                            case 9:
                                return '已取消'
                                break;
                            default:
                                break;
                        }
                    }},
                    { label: '完成情况', prop: 'completion', width: 'auto' ,type:'function',callback:(row,prop)=>{
                        switch (row.completion) {
                            case 1:
                                return '未完成'
                                break;
                            case 2:
                                return '已完成'
                                break;
                            default:
                                break;
                        }
                    }},
                    { label: '处理人名称', prop: 'handlerName', width: 'auto' },
                    { label: '处理人电话', prop: 'handlerTel', width: 'auto' },
                    { label: '处理描述', prop: 'processDescription', width: 'auto' },
                    { label: '处理时间', prop: 'handlingTime', width: 'auto' },
                ],
                table_data: [],
                url: 'housekeepingServiceList',
                search_item: [
                    {
                        type: 'select',
                        label: '服务类型',
                        placeholder: '选择服务类型',
                        prop: 'type',
                        options:[
                            {
                                label:'室内清洁',
                                value:1
                            },
                            {
                                label:'洗涤护理',
                                value:2
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '选择服务类型',
                        prop: 'status',
                        options:[
                            {
                                label:'待派单',
                                value:1
                            },
                            {
                                label:'已派单',
                                value:2
                            },
                            {
                                label:'处理中',
                                value:3
                            },
                            {
                                label:'待支付',
                                value:4
                            },
                            {
                                label:'待评价',
                                value:5
                            },
                            {
                                label:'已完成',
                                value:6
                            },
                            {
                                label:'已取消',
                                value:9
                            },
                        ]
                    },
                    ],
                //     {
                //         type: 'select',
                //         label: '审核状态',
                //         placeholder: '请选择',
                //         options: [
                //             { value: 1, label: '审核中' },
                //             { value: 2, label: '审核失败' },
                //             { value: 3, label: '审核成功' }
                //         ],
                //         prop: 'status'
                //     },
                //     {
                //         type: 'select',
                //         label: '申请身份',
                //         placeholder: '请选择',
                //         options: [
                //             { value: 1, label: '审核业主' },
                //             { value: 2, label: '审核亲属' },
                //             { value: 3, label: '审核租客' }
                //         ],
                //         prop: 'type'
                //     }
                // ],
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
                url: 'housekeepingServiceList',
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
        add(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                if (data[0].status !== 1) {
                    this.$message({
                        message: '该审核已结束',
                        type: 'error'
                    })
                } else {
                    this.add_vrisible = true
                }
            }
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm,
                id: this.table_row[0].id
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            auditManagementReviewResult(resData).then((res) => {
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
        },
        // 图片上传成功
        ImgeSuccess(res, file) {
            this.addForm.ruleForm.imgUrls[0] = file.response.url
        },
        // 图片文件上传之前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2
            const isJPG = file.type === 'image/png'
            const isPNG = file.type === 'image/jpeg'
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return (isJPG || isPNG) && isLt2M
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        }
    }
}
</script>
