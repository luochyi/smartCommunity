<template>
    <div class="main-content">
        <div class="main-titel">
            <span>报表管理</span>
        </div>
        <div class="content">
            <div style="margin-left: 16px"></div>
            <div class="">
                <el-table
                    :data="tableData"
                    height="700"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="index" label="序号" width="80">
                    </el-table-column>
                    <el-table-column prop="type" label="功能大类" width="200">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="可导入报表模块"
                        width="220"
                    >
                    </el-table-column>
                    <el-table-column label="导入Excel" width="280">
                        <template slot-scope="scope">
                            <el-button
                                @click="download(scope.row)"
                                type="text"
                                size="small"
                                >下载模板</el-button
                            >
                            <el-button type="text" size="small">
                                <div>
                                    <!-- 导入 -->
                                    <el-upload
                                        :action="`${$baseUrl+scope.row.upload}`"
                                        :on-success="fileSuccess"
                                        :headers="token"
                                        :on-remove="wordRemove"
                                        :on-exceed="handleExceed"
                                        :file-list="wordList"
                                        accept=".xlsx,xls"
                                        :limit="1"
                                        :before-upload="beforeFileUpload"
                                    >
                                        <el-button
                                            icon="el-icon-edit"
                                            size="small"
                                            >上传文件</el-button
                                        >
                                        <div slot="tip" class="el-upload__tip">
                                            <span>支持扩展名：xls,xlsx</span>
                                        </div>
                                    </el-upload>
                                </div>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { DownloadExcel } from '@/plugins/DownloadExcel'
export default {
    data() {
        return {
            token: {
                'X-Admin-Token': sessionStorage['X-Admin-Token']
            },
            systemTime: '1',
            add_vrisible: true,
            addDate: null,
            table_row: [],
            wordList: [],
            addForm: {
                ruleForm: {
                    fileDocUrl: null,
                    fileDocName: null,
                    organizationId: null,
                    contractPerson: null,
                    entryDate: null
                },
                rules: {
                    fileDocUrl: [
                        {
                            required: true,
                            message: '请选择文件',
                            trigger: 'change'
                        }
                    ]
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '上传文件',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'file',
                        slotName: 'fileDocUrl'
                    }
                ]
            },
            // 上传img文件
            tableData: [
                {
                    index: '1',
                    type: '基础档案',
                    name: '房产管理',
                    url:
                        'https://test.kaidalai.cn/static/excel-model/%E6%88%BF%E5%B1%8B%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx',
                    upload:'uploadFile/UploadEstateFile'
                },
                {
                    index: '2',
                    type: '日常管理',
                    name: '服务浏览',
                    url:
                        'https://test.kaidalai.cn/static/excel-model/%E6%9C%8D%E5%8A%A1%E6%B5%8F%E8%A7%88%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx',
                    upload:'uploadFile/UploadServiceBrowsingFile'
                },
                {
                    index: '3',
                    type: '日常管理',
                    name: '钥匙管理',
                    url:
                        'https://test.kaidalai.cn/static/excel-model/%E9%92%A5%E5%8C%99%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx',
                    upload:'uploadFile/UploadKeyFile'
                },
                {
                    index: '4',
                    type: '日常管理',
                    name: '绿化区域',
                    url:
                        'https://test.kaidalai.cn/static/excel-model/%E7%BB%BF%E5%8C%96%E5%8C%BA%E5%9F%9F%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx',
                    upload:'uploadFile/UploadGreenAreaFile'
                },
            ],
            json_fields: {
                收费项目名称: 'name',
                房屋信息: 'roomName',
                计费开始时间: 'beginDate',
                计费结束时间: 'endDate',
                '计费单价/单位': 'unitPrice',
                '面积/用量/数量': 'num',
                费用金额: 'costPrice',
                已缴金额: 'paidPrice',
                应收金额: 'paidPrice',
                待缴金额: 'paymentPrice',
                状态: {
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '已缴纳'
                                break
                            default:
                                return '未缴纳'
                        }
                    }
                },
                创建人: 'createName',
                更新时间: 'updateDate',

                备注: 'remake'
            },
            activeName: '0'
        }
    },
    methods: {
        //获取当前时间
        download(data) {
            window.open(data.url)
        },
        getTime() {
            let nowDate = new Date()
            let date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                day: nowDate.getDate()
            }
            this.systemTime = date.year + '-' + 0 + date.month + '-' + date.day
        },
        // 表格选中
        tableCheck(data) {
            this.table_row = data
        },
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'dailyPaymentList',
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
            this.getTime()
            console.log(this.systemTime)
            this.tableData[0].time = this.systemTime
        },
        // word 文件上传成功
        fileSuccess(res, file) {
            this.addForm.ruleForm.fileDocUrl = file.response.url
            console.log(file.response)
            if(file.response.status==true){
                this.$message({
                    message:file.response.message,
                    type:'success'
                })
                this.wordList=[]
            }else{
                this.$message({
                    message:'导入失败',
                    type:'error'
                })
                this.wordList=[]
            }
        },
        // word 文件上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        },
        wordRemove() {
            this.addForm.ruleForm.fileDocUrl = null
        },
        // word 文件上传之前
        beforeFileUpload(file) {
            console.log(file)
            this.addForm.ruleForm.fileDocName = file.name
            const isLt2M = file.size / 1024 / 1024 < 2
            const fileType =
                file.name.endsWith('.xls') || file.name.endsWith('.xlsx')
            console.log(fileType)
            if (!fileType) {
                this.$message.error('上传头像图片只能是 xls/xlsx 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 2MB!')
            }
            return fileType && isLt2M
        },
        add() {
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.wordList = []
        },
        addSubmit() {
            if (this.addForm.ruleForm.fileDocUrl == null) {
                this.$message({
                    type: 'error',
                    message: '请上传文件'
                })
            } else {
                let resData = {
                    ...this.addForm.ruleForm
                }
                contractInsert(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.addClose()
                    }
                })
            }
        }
    }
}
</script>
