<template>
    <div>
        <div class="main-content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="设施分类" name="first"
                    ><div class="content">
                        <div class="content-btn">
                            <el-button
                                class="init-button"
                                @click="add()"
                                icon="el-icon-plus"
                                >新增设施分类
                            </el-button>
                        </div>
                        <div class="">
                            <VueTable
                                ref="table"
                                :config="config"
                                @tableCheck="tableCheck"
                            >
                                <template slot="footer">
                                    <div class="table-footer">
                                        <button @click="edit(table_row)">
                                            编辑
                                        </button>
                                        <button @click="del(table_row)">
                                            删除
                                        </button>
                                    </div>
                                </template>
                            </VueTable>
                        </div>
                        <!-- 新增 -->
                        <Drawer
                            drawerTitle="新增设施分类"
                            @drawerClose="addClose"
                            :drawerVrisible="add_vrisible"
                        >
                            <div style="padding: 30px">
                                <FromCard>
                                    <template slot="title"
                                        >填写分类信息</template
                                    >
                                    <template>
                                        <VueForm
                                            ref="addForm"
                                            :formObj="addForm" @ruleSuccess="addRuleSuccess"
                                        >
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
                                                        :action="`${$baseUrl}upload/uploadAnnouncement`"
                                                        :on-success="
                                                            ImgeSuccess
                                                        "
                                                        :file-list="imglist"
                                                        :on-exceed="
                                                            handleExceed
                                                        "
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
                                        <i class="el-icon-circle-check"></i
                                        >提交</span
                                    >
                                </button>
                                <button class="btn-gray" @click="addClose">
                                    <span>取消</span>
                                </button>
                            </div>
                        </Drawer>
                        <!-- edit -->
                        <Drawer
                            drawerTitle="修改设施分类信息"
                            @drawerClose="editClose"
                            :drawerVrisible="edit_vrisible"
                        >
                            <div style="padding: 30px">
                                <FromCard>
                                    <template slot="title"
                                        >填写分类信息</template
                                    >
                                    <template>
                                        <VueForm
                                            ref="editForm"
                                            :formObj="editForm"
                                        >
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
                                            <!-- 上传图片 -->
                                            <template slot="imgUrls">
                                                <template>
                                                    <el-upload
                                                        :action="`${$baseUrl}upload/uploadFacilitiesCategory`"
                                                        :on-success="
                                                            ImgeSuccess
                                                        "
                                                        :file-list="imglist"
                                                        ref="myUpload"
                                                        :on-exceed="
                                                            handleExceed
                                                        "
                                                        :limit="1"
                                                        accept=".jpg,.png,.JPG,.PNG"
                                                        :before-upload="
                                                            beforeAvatarUpload
                                                        "
                                                    >
                                                        <el-button
                                                            icon="el-icon-edit"
                                                            size="small"
                                                            >修改图片</el-button
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
                                <button
                                    class="btn-orange"
                                    @click="editSubmit()"
                                >
                                    <span>
                                        <i class="el-icon-circle-check"></i
                                        >提交</span
                                    >
                                </button>
                                <button class="btn-gray" @click="editClose">
                                    <span>取消</span>
                                </button>
                            </div>
                        </Drawer>
                    </div></el-tab-pane
                >
                <el-tab-pane label="设备分类" name="second"
                    >
                    <deviceItem></deviceItem>
                    </el-tab-pane
                >
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {
    facilitiesCategoryInsert,
    facilitiesCategoryFindDetailById,
    facilitiesCategoryUpdate
} from '@/api/daily'
import deviceItem from './deviceItem.vue';
export default {
    components:{
        deviceItem
    },
    data() {
        return {
            add_vrisible: false,
            edit_vrisible: false,
            addDate:null,
            addForm: {
                ruleForm: {
                    code: '',
                    name: null,
                    openStartDate: null,
                    openEndDate: null,
                    imgUrls: [],
                    type:1
                },
                rules: {
                  // 表单必填
                  code: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  name: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '分类名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '类型编号',
                        placeholder: '请输入',
                        width: '100%',
                        disabled: true,
                        prop: 'code'
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
                        type: 'Slot',
                        label: '开放时间',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'date',
                        slotName: 'date'
                    }
                ]
            },
            editForm: {
                ruleForm: {
                    // code: '58767782',
                    name: null,
                    openStartDate: null,
                    openEndDate: null,
                    imgUrls: []
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '分类名称',
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
                        type: 'Slot',
                        label: '开放时间',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'date',
                        slotName: 'date'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: 'first',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '分类编号', prop: 'code', width: 'auto' },
                    { label: '设施类型', prop: 'name', width: 'auto' },
                    { label: '添加人', prop: 'createName', width: 'auto' },
                    { label: '设施数量', prop: 'num', width: 'auto' },
                    { label: '添加时间', prop: 'createDate', width: '220' }
                ],
                table_data: [],
                url: 'facilitiesCategoryList',
                search_item: [
                    {
                        type: 'Input',
                        label: '设施类型',
                        placeholder: '请选择',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '分类编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'picker',
                        label: '添加时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'createStartDate',
                        endDate: 'createEndDate',
                        width: '280px'
                    }
                    // Slot
                ],
                data: {
                    pageNum: 1,
                    size: 10,
                    type:1
                }
            }
        }
    },
    mounted(){

    },
    methods: {
        add() {
            this.add_vrisible = true
            let random = Math.floor(Math.random() * 100000000)
            this.addForm.ruleForm.code = random
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.imglist = []
            this.addDate = ''
        },
        addRuleSuccess() {
          let resData = {
            ...this.addForm.ruleForm
          }
          facilitiesCategoryInsert(resData).then((res) => {
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
        // 新增提交
        addSubmit() {
          this.$refs.addForm.submitForm()
        },
        // 编辑
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
                facilitiesCategoryFindDetailById({ id: data[0].id }).then(
                    (res) => {
                        console.log(res)
                        if (res.data.files.length) {
                            let obj = {
                                name: res.data.files[0].url,
                                url: res.data.files[0].url
                            }
                            this.editForm.ruleForm.imgUrls = [
                                res.data.files[0].url
                            ]
                            this.$set(this.imglist, 0, obj)
                        } else {
                            this.editForm.ruleForm.imgUrls = []
                        }
                        this.editForm.ruleForm.name = res.data.name
                        //编辑picker获取原opendate的值
                        let timer = res.data.openStartDate.split(':')
                        let timer2 = res.data.openEndDate.split(':')
                        console.log(timer,timer2);
                        this.addDate = [new Date(2021, 5, 24,timer[0], timer[1]),new Date(2021, 5, 24,timer2[0], timer2[1])]
                        console.log(this.addDate);
                        this.editForm.ruleForm.openStartDate = res.data.openStartDate
                        this.editForm.ruleForm.openEndDate = res.data.openEndDate
                    }
                )
            }
        },
        editClose() {
            this.$refs.editForm.reset()
            this.edit_vrisible = false
            this.$refs.myUpload.clearFiles()
            this.imglist = []
            this.addDate = ''
        },
        //提交
        editSubmit() {
            let resData = {
                ...this.editForm.ruleForm,
                id: this.editForm.ruleForm.id,
                imgUrls: this.editForm.ruleForm.imgUrls
            }
            facilitiesCategoryUpdate(resData).then((res) => {
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
        handleClick(tab, event) {
            console.log(tab, event)
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
