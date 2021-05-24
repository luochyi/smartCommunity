<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>资讯分类</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增分类
                    </el-button>
                </div>
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <!-- <template slot="tabs">
              <el-tabs v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="全部"
                             name="0"></el-tab-pane>
                <el-tab-pane label="使用中"
                             name="1"></el-tab-pane>
                <el-tab-pane label="空置中"
                             name="2"></el-tab-pane>
                <el-tab-pane label="停用"
                             name="3"></el-tab-pane>
              </el-tabs>
            </template> -->
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="edit(table_row)">编辑</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增资讯分类"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">填写分类信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
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
                    drawerTitle="修改资讯分类"
                    @drawerClose="editClose"
                    :drawerVrisible="edit_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">填写分类信息</template>
                            <template>
                                <VueForm ref="editForm" :formObj="editForm">
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
    newsCategoryManagementInsert,
    newsCategoryManagementFindById,
    newsCategoryManagementUpdate
} from '@/api/operation'
export default {
    data() {
        return {
            add_vrisible: false,
            edit_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    name: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '分类名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    }
                ]
            },
            editForm: {
                ruleForm: {
                    name: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '分类名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            // activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '分类编号', prop: 'code', width: 'auto' },
                    { label: '分类类型', prop: 'name', width: 'auto' },
                    { label: '资讯数量', prop: 'num', width: 'auto' },
                    { label: '创建人名称', prop: 'createName', width: 'auto' },
                    { label: '添加时间', prop: 'createDate', width: '220' }
                ],
                table_data: [],
                url: 'newsCategoryManagementList',
                search_item: [
                    {
                        type: 'Input',
                        label: '分类编号',
                        placeholder: '请选择',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '分类名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '添加人',
                        placeholder: '请输入',
                        prop: 'createName'
                    }
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
            // let random = Math.floor(Math.random()*100000000)
            // this.addForm.ruleForm.code = random
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            newsCategoryManagementInsert(resData).then((res) => {
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
                newsCategoryManagementFindById({id:data[0].id}).then(res=>{
                  this.editForm.ruleForm.name = res.data.name
                  this.editForm.ruleForm.id = res.data.id
                  console.log(this.editForm.ruleForm.name);
                })
            }
        },
        editClose() {
            this.$refs.editForm.reset()
            this.edit_vrisible = false
        },
        editSubmit() {
            let resData = {
                ...this.editForm.ruleForm,
                id:this.editForm.ruleForm.id
            }
            newsCategoryManagementUpdate(resData).then((res) => {
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
        // // tabs切换
        // handleClick (tab, event) {
        //   let status = null
        //   if (this.activeName != 0) {
        //     status = this.activeName
        //   } else {
        //     status = null
        //   }
        //   const requestData = {
        //     pageNum: 1,
        //     size: 10,
        //     status: status
        //   }
        //   this.$refs.table.requestData(requestData);
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
