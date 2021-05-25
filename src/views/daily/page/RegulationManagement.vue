<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>规程管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增模板</el-button
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
                                <button @click="release(table_row)">
                                    发布
                                </button>
                                <button @click="edit(table_row)">编辑</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增模板"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">规程信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <template slot="fileDocUrl">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadRegulationManagementDoc`"
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
                <!-- edit -->
                <Drawer
                    drawerTitle="编辑模板"
                    @drawerClose="editClose"
                    :drawerVrisible="edit_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">规程信息</template>
                            <template>
                                <VueForm ref="editForm" :formObj="editForm">
                                    <template slot="fileDocUrl">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadRegulationManagementDoc`"
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
                        <button class="btn-orange" @click="editSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="editClose">
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
    regulationManagementInsert,
    regulationManagementRelease,
    regulationManagementFindById,
    regulationManagementUpdate
} from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            edit_vrisible: false,
            addDate: null,
             wordList: [],
            addForm: {
                ruleForm: {
                    fileDocUrl: null,
                    fileDocName: null
                },
                rules: {},
                form_item: [
                    {
                        type: 'Input',
                        label: '标题',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'title'
                    },
                    {
                        type: 'textarea',
                        label: '内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'Slot',
                        label: '上传文件',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fileDocUrl',
                        slotName: 'fileDocUrl'
                    },
                    {
                        type: 'Select',
                        label: '发布状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options: [
                            {
                                value: '1',
                                label: '已发布'
                            },
                            {
                                value: '2',
                                label: '未发布'
                            }
                        ]
                    }
                ]
            },
            editForm: {
                ruleForm: {
                    title: null,
                    content: null,
                    status: null,
                     fileDocUrl: null,
                    fileDocName: null
                },
                rules: {},
                form_item: [
                    {
                        type: 'Input',
                        label: '标题',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'title'
                    },
                    {
                        type: 'textarea',
                        label: '内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'Slot',
                        label: '上传文件',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fileDocUrl',
                        slotName: 'fileDocUrl'
                    },
                    {
                        type: 'Select',
                        label: '发布状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options: [
                            {
                                value: 1,
                                label: '已发布'
                            },
                            {
                                value: 2,
                                label: '未发布'
                            }
                        ]
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
                    { label: '规程标题', prop: 'title', width: 'auto' },
                    { label: '内容', prop: 'content', width: '600' },
                    {
                        label: '状态',
                        prop: 'status',
                        width: '180',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '已发布'
                                    break
                                case 2:
                                    return '未发布'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '创建人名称',
                        prop: 'createName',
                        width: '150'
                    },
                    {
                        label: '最近修改时间',
                        prop: 'nearModifyDate',
                        width: '150'
                    },
                    { label: '创建时间', prop: 'createDate', width: '150' }
                ],
                table_data: [],
                url: 'regulationManagementList',
                search_item: [
                    {
                        type: 'Input',
                        label: '规程标题',
                        placeholder: '请输入',
                        prop: 'title'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请选择',
                        prop: 'status',
                        options: [
                            {
                                value: '1',
                                label: '已发布'
                            },
                            {
                                value: '2',
                                label: '未发布'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '创建人',
                        placeholder: '请输入',
                        prop: 'createName'
                    },
                    {
                        type: 'picker',
                        label: '最近修改时间',
                        placeholder: '请输入',
                        prop: 'nearModifyDate',
                        startDate: 'nearModifyDateStart',
                        endDate: 'nearModifyDateEnd',
                        width: '220px'
                    },
                    {
                        type: 'picker',
                        label: '发布时间',
                        placeholder: '请输入',
                        prop: 'createDate',
                        startDate: 'createDateStart',
                        endDate: 'createDateEnd',
                        width: '220px'
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
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.wordList = []
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            regulationManagementInsert(resData).then((res) => {
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
        edit(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                this.edit_vrisible = true
                console.log(data[0].id)
                this.editForm.ruleForm.id = data[0].id
                
                regulationManagementFindById({ id: data[0].id }).then((res) => {
                    console.log(res.data)
                    this.editForm.ruleForm.title = res.data.title
                    this.editForm.ruleForm.content = res.data.content
                    this.editForm.ruleForm.fileDocUrl = res.data.fileDocUrl
                    this.editForm.ruleForm.fileDocName = res.data.fileDocName
                    let obj = {
                            name: res.data.fileDocName,
                            url: res.data.fileDocUrl
                        }
                        this.$set(this.wordList, '0', obj)
                     this.editForm.ruleForm.status = res.data.status
                })
                // this.detailForm.ruleForm
            }
        },
        editClose() {
            this.$refs.editForm.reset()
            this.edit_vrisible = false
        },
        editSubmit() {
            let resData = {
                ...this.editForm.ruleForm,
                id: this.editForm.ruleForm.id,
            }
            regulationManagementUpdate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.editClose()
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
        // word 文件上传成功
            fileSuccess(res, file) {
                this.addForm.ruleForm.fileDocUrl = file.response.url
                this.editForm.ruleForm.fileDocUrl = file.response.url
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
                this.editForm.ruleForm.fileDocName = file.name
                const isLt2M = file.size / 1024 / 1024 < 2
                const fileType =
                    file.name.endsWith('.doc') || file.name.endsWith('.docx')
                console.log(fileType)
                if (!fileType) {
                    this.$message.error('上传头像图片只能是 doc/docx 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 2MB!')
                }
                return fileType && isLt2M
            },
        //规程发布
        release(data) {
            if (data[0].status == 1 || data.length > 1) {
                this.$message({
                    message: '发布失败',
                    type: 'error'
                })
            } else {
                regulationManagementRelease({ id: data[0].id }).then((res) => {
                    console.log(res)
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
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
