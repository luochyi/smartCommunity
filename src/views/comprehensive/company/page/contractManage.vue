<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>员工合同</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增合同</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template v-slot:doc="slotData">
                            <div
                                style="color: blue; cursor: pointer"
                                v-if="slotData.data.fileDocUrl"
                                @click="download(slotData.data.fileDocUrl)"
                            >
                                {{ slotData.data.fileDocName }}
                            </div>
                            <div v-else>无</div>
                        </template>
                        <!-- <template slot="tabs">
                            <el-tabs
                                v-model="activeName"
                                @tab-click="handleClick"
                            >
                                <el-tab-pane
                                    label="全部"
                                    name="0"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="待巡检"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已巡检"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已完成"
                                    name="3"
                                ></el-tab-pane>
                            </el-tabs>
                        </template> -->
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button>编辑</button> -->
                                <!-- <button @click="isEnable(table_row)">启用/停用</button> -->
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
                            <template slot="title">合同信息</template>
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
                                    <template v-slot:greenAreaId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm.greenAreaId
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
    </div>
</template>

<script>
import { sysOrganizationFindAllDepartment, sysUserList } from '@/api/daily'
import { contractInsert } from '@/api/company'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            options: [],
            sysOptions: [],
            loading: false,
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
                        label: '部门',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'organizationId',
                        slotName: 'sysOrganization'
                    },
                    {
                        type: 'Select',
                        label: '入职人员',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'contractPerson',
                        options: []
                    },
                    {
                        type: 'DateTime',
                        label: '入职时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'entryDate'
                    },
                    {
                        type: 'Slot',
                        label: '上传文件',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fileDocUrl',
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
                        label: '部门名称',
                        prop: 'organizationName',
                        width: 'auto'
                    },
                    {
                        label: '姓名',
                        prop: 'name',
                        width: 'auto'
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.sex == 1) {
                                return '男'
                            } else {
                                return '女'
                            }
                        }
                    },
                    {
                        label: '手机号',
                        prop: 'tel',
                        width: 'auto'
                    },
                    {
                        label: '入职时间',
                        prop: 'entryDate',
                        width: 'auto'
                    },
                    {
                        label: 'doc，docx下载',
                        prop: 'fileDocUrl',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'doc'
                    }
                    // {
                    //     label: 'doc,docx文件名称',
                    //     prop: 'fileDocName',
                    //     width: 'auto'
                    // }
                ],
                table_data: [],
                url: 'contractList',
                search_item: [
                    {
                        type: 'select',
                        label: '部门',
                        placeholder: '请输入',
                        prop: 'organizationId',
                        options: []
                    },
                    {
                        type: 'Input',
                        label: '手机号',
                        placeholder: '请输入',
                        prop: 'tel'
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
    mounted() {
        let reeData = {
            pageNum: 1,
            size: 20
        }
        sysOrganizationFindAllDepartment(reeData).then((res) => {
            console.log(res)
            res.data.forEach((element) => {
                let obj = {
                    value: element.id,
                    label: element.name
                }
                this.config.search_item[0].options.push(obj)
            })

            // console.log(this.sysOptions);
        })
    },
    methods: {
        download(data) {
            this.$confirm('是否下载合同?', '下载提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '下载成功'
                    })
                    window.open(this.$ImgUrl + data)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下载'
                    })
                })
        },
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
            this.addForm.form_item[1].options = []
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
                    this.addForm.form_item[1].options.push(obj)
                })
                // console.log(this.addForm.form_item[3].options)
                this.loading = false
            })
        },
        // word 文件上传成功
        fileSuccess(res, file) {
            this.addForm.ruleForm.fileDocUrl = file.response.url
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
        },
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
        },
        // tabs切换
        // handleClick(tab, event) {
        //     let status = null
        //     if (this.activeName != 0) {
        //         status = this.activeName
        //     } else {
        //         status = null
        //     }
        //     const requestData = {
        //         pageNum: 1,
        //         size: 10,
        //         status: status
        //     }
        //     this.$refs.table.requestData(requestData)
        // },

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