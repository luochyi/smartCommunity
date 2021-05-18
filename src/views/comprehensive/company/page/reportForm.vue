<template>
    <div class="main-content">
        <div class="main-titel">
            <span>报表管理</span>
        </div>
        <div class="content">
            <div style="margin-left: 16px">
                <!--  :before-generate="startDownload"
                              :before-finish="finishDownload" -->
                <!-- <download-excel
                    class="export-excel-wrapper"
                    :fetch="fetchData"
                    :fields="json_fields"
                    :before-finish="finishDownload"
                    name="收费标准.xls"
                > -->
                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                <!-- <el-button
                        type="init-button2"
                        icon="el-icon-folder-add"
                        plain
                        >导出Excel</el-button
                    >
                </download-excel> -->
            </div>
            <div class="">
                <el-table
                    :data="tableData"
                    height="700"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="index" label="序号" width="80">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="可导出报表模块"
                        width="220"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="最近导出时间"
                        width="220"
                    >
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template>
                            <download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="收费标准.xls"
                            >
                                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                                <el-button
                                    type="init-button2"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel>
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
            systemTime: '1',
            add_vrisible: false,
            addDate: null,
            table_row: [],
            // 上传img文件
            tableData: [{ index: '1', name: '日常缴费', time: '2021-05-16' }],
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
        }
    }
}
</script>
