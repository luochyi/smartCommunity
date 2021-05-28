<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>管家app紧急报警记录</span>
            </div>
            <div class="content">
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
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '用户名称', prop: 'name', width: 'auto' },
                    { label: '用户手机号', prop: 'tel', width: 'auto' },
                    { label: '部门名称', prop: 'organizationName', width: 'auto' },
                    { label: '报警时间', prop: 'createDate', width: 'auto' },
                ],
                table_data: [],
                url: 'alarmButlerOneButtonAlarmList',
                // search_item: [
                //     {
                //         type: 'Input',
                //         label: '房屋名称',
                //         placeholder: '请输入房屋名称（如1-1-101）',
                //         prop: 'roomName'
                //     },
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
