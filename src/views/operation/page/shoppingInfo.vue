<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>电商信息</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增电商信息</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
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
                                    label="空置中"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="使用中"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已停用"
                                    name="3"
                                ></el-tab-pane>
                            </el-tabs>
                        </template> -->
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button>编辑</button> -->
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增电商信息"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">信息内容</template>
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
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadElectronicCommerce`"
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
                                    <template v-slot:electronicCommerceCategoryId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm
                                                    .electronicCommerceCategoryId
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
import { electronicCommerceInsert, electronicCommerceCategoryList } from '@/api/operation'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            options: [],
            addForm: {
                ruleForm: {
                    title:null,
                    content:null,
                    electronicCommerceCategoryId:null,
                    imgUrls:[]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '电子商务标题',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'title'
                    },
                    {
                        type: 'Slot',
                        label: '电子商务类型',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'electronicCommerceCategoryId',
                        slotName: 'electronicCommerceCategoryId'
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
                        label: '电子商务内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '电子商务编号', prop: 'code', width: 'auto' },
                    // {
                    //     label: '设施类型',
                    //     prop: 'facilitiesCategoryName',
                    //     width: 'auto'
                    // },
                    { label: '电子商务标题', prop: 'title', width: 'auto' },
                    { label: '电子商务类型名称', prop: 'electronicCommerceCategoryName', width: 'auto' },
                    { label: '发布人', prop: 'createName', width: 'auto' },
                    { label: '发布时间', prop: 'createDate', width: '220' }
                ],
                table_data: [],
                url: 'electronicCommerceList',
                search_item: [
                    {
                        type: 'Input',
                        label: '电子商务编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '电子商务标题',
                        placeholder: '请输入',
                        prop: 'title'
                    },
                    // {
                    //     type: 'select',
                    //     label: '设施状态',
                    //     placeholder: '请选择',
                    //     value: null,
                    //     options: [
                    //         { value: 1, label: '空置中' },
                    //         { value: 2, label: '使用中' },
                    //         { value: 3, label: '已停用' }
                    //     ],
                    //     prop: 'status'
                    // },
                    {
                        type: 'Input',
                        label: '发布人',
                        placeholder: '请输入',
                        prop: 'createName'
                    },
                    {
                        type: 'picker',
                        label: '发布时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'createDateStart',
                        endDate: 'createDateEnd',
                        width: '280px'
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
    created() {
        this.getUserList()
    },
    methods: {
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val
            }
            this.loading = true
            electronicCommerceCategoryList(reeData).then((res) => {
                // console.log(res)
                this.options = res.tableList
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
            console.log(value)
        },
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            electronicCommerceInsert(resData).then((res) => {
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
        //  上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
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
