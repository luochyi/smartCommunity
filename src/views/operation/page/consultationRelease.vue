<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>资讯信息</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >资讯发布</el-button
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
                                 <button @click="getNews">获取最新资讯</button>
                                <button @click="edit(table_row)">编辑</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="资讯发布"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">资讯内容</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadNews`"
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
                                    <template v-slot:newsCategoryId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm.newsCategoryId
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
                <!-- edit -->
                <Drawer
                    drawerTitle="修改资讯"
                    @drawerClose="editClose"
                    :drawerVrisible="edit_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">资讯内容</template>
                            <template>
                                <VueForm ref="editForm" :formObj="editForm">
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadNews`"
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
                                    <template v-slot:newsCategoryId>
                                        <el-select
                                            v-model="
                                                editForm.ruleForm.newsCategoryId
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
    newsManagementInsert,
    newsCategoryManagementList,newsManagementFindById,newsManagementUpdate,newsManagementUpdateCrawling
} from '@/api/operation'
export default {
    data() {
        return {
            add_vrisible: false,edit_vrisible: false,
            addDate: null,
            options: [],
            addForm: {
                ruleForm: {
                    title: null,
                    content: null,
                    newsCategoryId: null,
                    imgUrls: [],
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '资讯标题',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'title'
                    },
                    {
                        type: 'Slot',
                        label: '资讯类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'newsCategoryId',
                        slotName: 'newsCategoryId'
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
                        label: '资讯内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    }
                ]
            },
            editForm: {
                ruleForm: {
                    title: null,
                    content: null,
                    newsCategoryId: null,
                    imgUrls: [],
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '资讯标题',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'title'
                    },
                    {
                        type: 'Slot',
                        label: '资讯类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'newsCategoryId',
                        slotName: 'newsCategoryId'
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
                        label: '资讯内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
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
                    { label: '资讯编号', prop: 'code', width: 'auto' },
                    // {
                    //     label: '设施类型',
                    //     prop: 'facilitiesCategoryName',
                    //     width: 'auto'
                    // },
                    { label: '资讯标题', prop: 'title', width: 'auto' },
                    {
                        label: '资讯类型名称',
                        prop: 'newsCategoryName',
                        width: 'auto'
                    },
                    { label: '发布人', prop: 'createName', width: 'auto' },
                    { label: '发布时间', prop: 'createDate', width: '220' }
                ],
                table_data: [],
                url: 'newsManagementList',
                search_item: [
                    {
                        type: 'Input',
                        label: '资讯编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '资讯标题',
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
        getNews(){
            newsManagementUpdateCrawling().then(res=>{
                if(res.status){
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                    this.$refs.table.loadData()
                }
            })
        },
        
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val
            }
            this.loading = true
            newsCategoryManagementList(reeData).then((res) => {
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
            this.imglist = []
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
            newsManagementInsert(resData).then((res) => {
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
                console.log(data)
                this.editForm.ruleForm.id = data[0].id
                newsManagementFindById({ newsId: data[0].id }).then(
                    (res) => {
                        console.log(res)
                        if (res.data.imgList.length) {
                            let obj = {
                                name: res.data.imgList[0].url,
                                url: res.data.imgList[0].url
                            }
                            this.editForm.ruleForm.imgUrls = [
                                res.data.imgList[0].url
                            ]
                            this.$set(this.imglist, 0, obj)
                        } else {
                            this.editForm.ruleForm.imgUrls = []
                        }
                        this.editForm.ruleForm.title = res.data.title,
                        this.editForm.ruleForm.content = res.data.content,
                        this.editForm.ruleForm.newsCategoryId = res.data.newsCategoryId
                    }
                )
            }
        },
        editClose() {
            this.$refs.editForm.reset()
            this.edit_vrisible = false
            this.imglist = []
        },
        editSubmit() {
            let resData = {
                ...this.editForm.ruleForm,
                id:this.editForm.ruleForm.id,
                imgUrls:this.editForm.ruleForm.imgUrls
            }
            newsManagementUpdate(resData).then((res) => {
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
        // 图片上传成功
        ImgeSuccess(res, file) {
            this.addForm.ruleForm.imgUrls[0] = file.response.url
            this.editForm.ruleForm.imgUrls[0] = file.response.url
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
