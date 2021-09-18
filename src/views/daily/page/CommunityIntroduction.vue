<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>小区介绍</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增介绍</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="enable(table_row)">启用</button>
                                <button @click="edit(table_row)">编辑</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增介绍"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">介绍内容</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm" @ruleSuccess="addRuleSuccess">
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadCommunityIntroduction`"
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
                <!-- edit -->
                <Drawer
                    drawerTitle="修改介绍"
                    @drawerClose="editClose"
                    :drawerVrisible="edit_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">介绍内容</template>
                            <template>
                                <VueForm ref="editForm" :formObj="editForm">
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadCommunityIntroduction`"
                                                :on-success="ImgeSuccess"
                                                :file-list="imglist"
                                                :on-exceed="handleExceed"
                                                ref="myUpload"
                                                :limit="10"
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
                                                    >不上传则不修改</span
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
    communityIntroductionInsert,
    communityIntroductionEnable,
    communityIntroductionUpdate,
    communityIntroductionFindById
} from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            edit_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    imgUrls: []
                },
                rules: {
                  // 表单必填
                  name: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  content: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '模版名称',
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
                        label: '内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    }
                ]
            },
            editForm: {
                ruleForm: {
                    name: null,
                    imgUrls: [],
                    content: null
                },
                rules: {},
                form_item: [
                    {
                        type: 'Input',
                        label: '模版名称',
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
                        label: '内容',
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
                    { label: '模板名称', prop: 'name', width: 'auto' },
                    { label: '内容', prop: 'content', width: 'auto' },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '启用中'
                                    break
                                case 2:
                                    return '未启用'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '创建人名称',
                        prop: 'createName',
                        width: 'auto'
                    },
                    {
                        label: '最近修改时间',
                        prop: 'nearModifyDate',
                        width: 'auto'
                    },
                    { label: '创建时间', prop: 'createDate', width: 'auto' }
                ],
                table_data: [],
                url: 'communityIntroductionList',
                search_item: [
                    {
                        type: 'Input',
                        label: '模板名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请选择',
                        prop: 'status',
                        options: [
                            {
                                value: '1',
                                label: '启用中'
                            },
                            {
                                value: '2',
                                label: '未启用'
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
            this.add_vrisible = false
            this.$refs.myUpload1.clearFiles()
        },
        addRuleSuccess() {
          let resData = {
            ...this.addForm.ruleForm
          }
          communityIntroductionInsert(resData).then((res) => {
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
                communityIntroductionFindById({ id: data[0].id }).then(
                    (res) => {
                        console.log(res);
                        console.log(res.data.imgList);
                      if (res.data.imgList.length) {
                          res.data.imgList.forEach(element => {
                              let obj = {
                                name: element.url,
                                url: element.url
                            }
                            // this.$set(this.imglist, 0, obj)
                            this.imglist.push(obj)
                          });

                            // this.editForm.ruleForm.imgUrls = [
                            //     res.data.imgList[0].url
                            // ]
                            // this.$set(this.imglist, 0, obj)
                        } else {
                            this.editForm.ruleForm.imgUrls = []
                        }
                        this.editForm.ruleForm.name=res.data.name
                        this.editForm.ruleForm.content=res.data.content
                    }
                )
                // this.detailForm.ruleForm
            }
        },
        editClose() {
            this.$refs.editForm.reset()
            this.edit_vrisible = false
            this.$refs.myUpload.clearFiles()
        },
        editSubmit() {

            let resData = {
                ...this.editForm.ruleForm,
                id: this.editForm.ruleForm.id,
                imgUrls: this.editForm.ruleForm.imgUrls
            }
            communityIntroductionUpdate(resData).then((res) => {
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
            this.addForm.ruleForm.imgUrls.push(file.response.url)
            this.editForm.ruleForm.imgUrls.push(file.response.url)
            console.log(this.editForm.ruleForm.imgUrls);
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
        },
        // 表格选中
        tableCheck(data) {
            this.table_row = data
        },
        enable(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能启用一条',
                    type: 'error'
                })
            } else {
                communityIntroductionEnable({ id: data[0].id }).then((res) => {
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
