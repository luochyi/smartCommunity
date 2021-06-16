<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>票据管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增票据</el-button
                    >
                </div>
                <!-- 导出 -->
                <div style="width: 50px">
                    <download-excel
                        class="export-excel-wrapper"
                        :fetch="fetchData"
                        :fields="json_fields"
                        :before-finish="finishDownload"
                        name="考勤记录.xls"
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
                        <template v-slot:goodsImgList="slotData">
                            <div v-if="slotData.data.goodsImgList.length">
                                <el-button
                                    class="init-text"
                                    type="text"
                                    @click="
                                        getPhotoView(slotData.data.goodsImgList)
                                    "
                                >
                                    <span>查看</span>
                                </el-button>
                            </div>
                            <div v-else>-</div>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="get(table_row)">领用</button>
                                <button @click="edit(table_row)">
                                    修改开票信息
                                </button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增票据"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <!-- slot上传 -->
                            <template slot="title">票据信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <template slot="fileDocUrl">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadContractDoc`"
                                                :on-success="fileSuccess"
                                                :on-remove="wordRemove"
                                                :on-exceed="handleExceed"
                                                :file-list="wordList"
                                                accept=".doc,.DOC,.docx,.DOCX"
                                                :limit="1"
                                                :before-upload="
                                                    beforeFileUpload
                                                "
                                            >
                                                <el-button
                                                    icon="el-icon-edit"
                                                    size="small"
                                                    >上传文件</el-button
                                                >
                                                <div
                                                    slot="tip"
                                                    class="el-upload__tip"
                                                >
                                                    <span
                                                        >支持扩展名：doc,docx</span
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
        <!-- 查看图片组件 -->
        <views-photo
            :isVisible="photos_Visible"
            :goodsImgsList="goodsImgsList"
            @closeViews="getclose"
        ></views-photo>
    </div>
</template>

<script>
// 引入查看照片组件
import viewsPhoto from '@/components/dialog/viewsPhoto'
import { DownloadExcel } from '@/plugins/DownloadExcel'
// import func from 'vue-editor-bridge'
export default {
    components: {
        viewsPhoto
    },
    data() {
        return {
            photos_Visible: false,
            add_vrisible: false,
            addDate: null,
            options: [],
            sysOptions: [],
            loading: false,
            addForm: {
                ruleForm: {
                    showName: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '显示名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'showName'
                    }
                ]
            },
            table_row: [],
            activeName: '0',
            // 导出模板
            json_fields: {
                上班打卡时间: 'startClockDate',
                下班打卡时间: 'endClockDate',
                补卡时间: 'cardReplacementDate',
                补卡操作人: 'operatorName',
                打卡人姓名: 'clockName',
                打卡人手机号: 'clockTel',
                打卡日期: 'createDate'
            },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '开票编号',
                        prop: 'code',
                        width: 'auto'
                    },
                    {
                        label: '开票类型',
                        prop: 'type',
                        width: 'auto'
                    },
                    {
                        label: '项目名称',
                        prop: 'name',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: '',
                search_item: [
                    {
                        type: 'Input',
                        label: '票据编号',
                        placeholder: '请选择日期',
                        prop: 'code'
                    },
                    {
                        type: 'Int',
                        label: '类型',
                        placeholder: '请输入',
                        prop: 'type'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请输入',
                        prop: 'clockStatus',
                        options: [
                            {
                                value: 1,
                                label: '已打卡'
                            },
                            {
                                value: 2,
                                label: '未打卡'
                            },
                            {
                                value: 3,
                                label: '已补卡'
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
        getPhotoView(item) {
            this.photos_Visible = true
            // let resData = {
            //   id: id,
            // }
            // userArticleOutFindGoodsImgById(resData).then(result => {
            //   console.log(result)
            this.goodsImgsList = item
            // })
        },
        getclose() {
            this.photos_Visible = false
        },
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                // url: 'attendanceRecordList',
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
        add() {
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.wordList = []
        },
        // 提交
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
        },
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
        },
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
    //过滤器 过滤日期
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.substring(0, 10)
        }
    }
}
</script>