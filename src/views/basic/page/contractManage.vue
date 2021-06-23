<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>租赁合同管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增租赁合同</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                    <!-- slot 下载模板 -->
                        <template v-slot:doc="slotData">
                            <div
                                style="color: blue; cursor: pointer"
                                v-if="slotData.data.imgUrls[0]"
                                @click="download(slotData.data.imgUrls[0])"
                            >
                                {{ slotData.data.imgUrls[0].url}}
                            </div>
                            <div v-else>无</div>
                        </template>
                        <!-- tabs切换 -->
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
                                    label="启用"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="停用"
                                    name="2"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button>编辑</button> -->
                                <button @click="isEnable(table_row)">启用/停用</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增合同"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">合同模板上传</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <template slot="fileDocUrl">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadLeaseContractPdf`"
                                                :on-success="fileSuccess"
                                                :on-remove="wordRemove"
                                                :on-exceed="handleExceed"
                                                :file-list="wordList"
                                                accept=".pdf,.PDF"
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
                                                        >支持扩展名：pdf,PDF</span
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
import { leaseContractInsert,leaseContractEnable } from '@/api/basic'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            add_vrisible: false,
            loading: false,
            wordList: [],
            addForm: {
                ruleForm: {
                    fileUrls: [],
                },
                rules: {
                    fileUrls: [
                        {
                            required: true,
                            message: '请选择文件',
                            trigger: 'change'
                        }
                    ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '模板名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name',
                    },
                    {
                        type: 'Slot',
                        label: '上传文件',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fileUrls',
                        slotName: 'fileDocUrl'
                    }
                ]
            },
            table_row: [],
            activeName: '0',
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '模板名称',
                        prop: 'name',
                        width: 'auto'
                    },
                    {
                        label: '启用状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.status == 1) {
                                return '启用'
                            } else {
                                return '停用'
                            }
                        }
                    },
                    {
                        label: '创建人',
                        prop: 'createName',
                        width: 'auto'
                    },
                    {
                        label: '创建时间',
                        prop: 'createDate',
                        width: 'auto'
                    },
                    {
                        label: '模板预览下载',
                        prop: 'imgUrls',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'doc'
                    }
                ],
                table_data: [],
                url: 'leaseContractList',
                search_item: [
                    {
                        type: 'Input',
                        label: '模板名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                     {
                        type: 'select',
                        label: '启用状态',
                        placeholder: '请选择',
                        prop: 'status',
                        options:[
                            {
                                label:'启用',
                                value:1
                            },
                            {
                                label:'停用',
                                value:2
                            }
                        ]
                    },

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
        // 预览下载
        download(data) {
            this.$confirm('是否预览模板?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '预览成功'
                    })
                    window.open(this.$ImgUrl + data.url)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消预览'
                    })
                })
        },
        // word 文件上传成功
        fileSuccess(res, file) {
            this.addForm.ruleForm.fileUrls[0] = file.response.url
        },
        // word 文件上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        },
        // 移出
        wordRemove() {
            this.addForm.ruleForm.fileDocUrl = []
        },
        // word 文件上传之前
        beforeFileUpload(file) {
            console.log(file)
            this.addForm.ruleForm.fileDocName = file.name
            const isLt2M = file.size / 1024 / 1024 < 2
            const fileType =
                file.name.endsWith('.pdf') || file.name.endsWith('.PDF')
            console.log(fileType)
            if (!fileType) {
                this.$message.error('上传文件只能是 pdf/PDF 格式!')
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
        // 提交
        addSubmit() {
            if(this.addForm.ruleForm.name==null){
                this.$message({
                    message:'模板名称字数不可为空',
                    type:'error'
                })
                return
            }
            if(this.addForm.ruleForm.name.length>32){
                this.$message({
                    message:'模板名称字数不可超过32位',
                    type:'error'
                })
                return
            }
            if (this.wordList == []) {
                this.$message({
                    type: 'error',
                    message: '请上传文件'
                })
                return
            } else {
                let resData = {
                    ...this.addForm.ruleForm
                }
                leaseContractInsert(resData).then((res) => {
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
        // 启用、停用
        isEnable(data) {
            // console.log(data[0].id);
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            }else{
                leaseContractEnable({id:data[0].id}).then((res) => {
                     console.log(res)
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