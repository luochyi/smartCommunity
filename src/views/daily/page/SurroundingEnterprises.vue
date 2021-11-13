<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>周边企业</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增企业信息</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="tabs">
                            <el-tabs v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="全部"
                             name="0"></el-tab-pane>
                <el-tab-pane label="已发布"
                             name="1"></el-tab-pane>
                <el-tab-pane label="未发布"
                             name="2"></el-tab-pane>
              </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                <button @click="detail(table_row)">编辑</button>
                <button @click="lease(table_row)" v-if="activeName !== '1'">发布</button>
                <button @click="lease2(table_row)" v-else>取消发布</button>
                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增企业信息"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">基本信息</template>
                            <template>
                                <VueForm
                                    ref="addForm"
                                    :formObj="addForm"
                                    @ruleSuccess="addRuleSuccess"
                                >
                                    <!-- Slot -->
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadSurroundingEnterprisesImg`"
                                                :on-success="ImgeSuccess"
                                                :file-list="imglist"
                                                ref="myUpload1"
                                                :on-exceed="handleExceed"
                                                :limit="10"
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
                <!-- detail -->
                <Drawer
                    drawerTitle="编辑企业信息"
                    @drawerClose="detailClose"
                    :drawerVrisible="detail_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">基本信息</template>
                            <template>
                                <VueForm
                                    ref="detailForm"
                                    :formObj="detailForm"
                                    @ruleSuccess="detailRuleSuccess"
                                >
                                    <!-- Slot -->
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadSurroundingEnterprisesImg`"
                                                :on-success="ImgeSuccess"
                                                :file-list="imglist"
                                                :on-remove="handleChange"
                                                :on-change="handleChange2"
                                                ref="myUpload1"
                                                :on-exceed="handleExceed"
                                                :limit="10"
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
                        <button class="btn-orange" @click="detailSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="detailClose">
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
    surroundingEnterprisesInsert,
    surroundingEnterprisesUpdate,
    surroundingEnterprisesFindById,
    surroundingEnterprisesRelease,
    surroundingEnterprisesNoRelease
} from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            detail_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    name: null,
                    content: null,
                    imgUrls: [],
                    releaseStatus: null
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    imgUrls: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '企业名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
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
                        label: '公司介绍',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'Select',
                        label: '状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'releaseStatus',
                        options: [
                            {
                                label: '已发布',
                                value: 1
                            },
                            {
                                label: '未发布',
                                value: 2
                            }
                        ]
                    }
                ]
            },
            detailForm: {
                ruleForm: {
                    id: null,
                    name: null,
                    content: null,
                    imgUrls: [],
                    releaseStatus: null
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    imgUrls: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '企业名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
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
                        label: '公司介绍',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'Select',
                        label: '状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'releaseStatus',
                        options: [
                            {
                                label: '已发布',
                                value: 1
                            },
                            {
                                label: '未发布',
                                value: 2
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
                    { label: '企业名称', prop: 'name', width: 'auto' },
                    { label: '公司介绍', prop: 'content', width: 'auto' },
                    {
                        label: '发布状态',
                        prop: 'releaseStatus',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.releaseStatus) {
                                case 1:
                                    return '已发布'
                                    break
                                case 2:
                                    return '未发布'
                                    break
                            }
                        }
                    },
                    { label: '创建人', prop: 'createName', width: 'auto' },
                    {
                        label: '最近修改时间',
                        prop: 'modifyDate',
                        width: 'auto'
                    },
                    { label: '发布时间', prop: 'releaseDate', width: 'auto' }
                ],
                table_data: [],
                url: 'surroundingEnterprisesList',
                search_item: [
                    {
                        type: 'Input',
                        label: '企业名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'select',
                        label: '发布状态',
                        placeholder: '请选择',
                        prop: 'releaseStatus',
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
        handleChange(file, fileList) {
            // this.fileList = fileList.slice(-3);
            // console.log(file)
            // this.imglist = fileList
            if (file.url === undefined) {
                console.log(file.response.url)
                let arr = []
                this.detailForm.ruleForm.imgUrls.forEach((el) => {
                    if (el !== file.response.url) {
                        arr.push(el)
                    }
                })
                this.detailForm.ruleForm.imgUrls = arr
            } else {
                console.log(file.url)
                let arr = []
                this.detailForm.ruleForm.imgUrls.forEach((el) => {
                    if (el !== file.url) {
                        arr.push(el)
                    }
                })
                this.detailForm.ruleForm.imgUrls = arr
            }
            // console.log(fileList)
        },
        handleChange2(file, fileList) {
            // this.fileList = fileList.slice(-3);
            // console.log(file)
            // console.log(fileList)
            // let obj = {
            //     name: file.name,
            //     status: file.status,
            //     uid: file.uid,
            //     url: file.response.url
            // }
            // this.imglist.push(obj)
            // console.log(fileList)
        },
        add() {
            this.add_vrisible = true
            this.addForm.ruleForm.imgUrls = []
            this.imglist = []
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addRuleSuccess() {
            let resData = {
                ...this.addForm.ruleForm
            }
            // console.log('resData')
            // console.log(resData)
            surroundingEnterprisesInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    console.log(resData)
                    this.$refs.table.loadData()
                    this.addClose()
                }
            })
        },
        addSubmit() {
            this.$refs.addForm.submitForm()
        },
        detail(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                this.detail_vrisible = true
                console.log(data[0].id)
                this.detailForm.ruleForm.id = data[0].id
                this.imglist = []
                surroundingEnterprisesFindById({ surroundingEnterprisesId: data[0].id }).then((res) => {
                    // console.log(res.data)
                    if (res.data.imgList.length) {
                        res.data.imgList.forEach((element) => {
                            let obj = {
                                name: element.url,
                                url: element.url
                            }
                            this.imglist.push(obj)
                            this.detailForm.ruleForm.imgUrls.push(element.url)
                            // this.detailForm.ruleForm.imgUrls = this.imglist
                        })
                    } else {
                        this.detailForm.ruleForm.imgUrls = []
                    }
                    this.detailForm.ruleForm.name = res.data.name
                    this.detailForm.ruleForm.content = res.data.content
                    this.detailForm.ruleForm.status = res.data.status
                    // this.detailForm.ruleForm.imgUrls = res.data.imgUrls
                    // this.imglist = res.data.imgUrls
                    // this.detailForm.ruleForm.imgUrls = []
                    // this.imglist = []
                    // for (let index = 0; index < res.data.imgUrls.length; index++) {
                    //     this.detailForm.ruleForm.imgUrls.push(res.data.imgUrls[index].url)
                    //     this.imglist.push(res.data.imgUrls[index].url)
                    // }
                })
                // this.detailForm.ruleForm
            }
        },
        detailClose() {
            this.$refs.detailForm.reset()
            this.detail_vrisible = false
        },
        detailRuleSuccess() {
            // console.log(this.imglist)
            // this.detailForm.ruleForm.imgUrls = []
            // console.log('提交前验证')
            // this.detailForm.ruleForm.imgUrls.forEach(el => {
            //     console.log(el)
            // })
            // this.imglist.forEach(el => {
            //     this.detailForm.ruleForm.imgUrls.push(el.url)
            // })
            let resData = {
                ...this.detailForm.ruleForm,
                id: this.detailForm.ruleForm.id
            }
            surroundingEnterprisesUpdate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.detailClose()
                }
            })
        },
        detailSubmit() {
            this.$refs.detailForm.submitForm()
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
                releaseStatus: status
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
        //发布
        lease(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                surroundingEnterprisesRelease({ surroundingEnterprisesId: data[0].id }).then((res) => {
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
        //发布
        lease2(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                surroundingEnterprisesNoRelease({surroundingEnterprisesId: data[0].id}).then((res) => {
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
        // 图片上传成功
        ImgeSuccess(res, file) {
            this.addForm.ruleForm.imgUrls.push(file.response.url)
            this.detailForm.ruleForm.imgUrls.push(file.response.url)
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
        //  上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 10 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        }
    }
}
</script>
