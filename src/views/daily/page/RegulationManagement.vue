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
                                <button @click="release(table_row)">发布</button>
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
import { regulationManagementInsert,regulationManagementRelease ,regulationManagementFindById,regulationManagementUpdate} from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,edit_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                },
                rules: {
                },
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
                        type: 'Select',
                        label: '发布状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options:[
                            {
                                value:'1',
                                label:'已发布'
                            },
                            {
                                value:'2',
                                label:'未发布'
                            },
                        ]
                    }
                ]
            },
             editForm: {
                ruleForm: {
                    title:null,
                    content:null,
                    status:null
                },
                rules: {
                },
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
                        type: 'Select',
                        label: '发布状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options:[
                            {
                                value:'1',
                                label:'已发布'
                            },
                            {
                                value:'2',
                                label:'未发布'
                            },
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
                    { label: '内容', prop: 'content', width: 'auto' },
                    { label: '状态', prop: 'status', width: 'auto' ,type:'function',
                        callback(row,prop){
                            switch (row.status) {
                                case 1:
                                    return '已发布'
                                    break;
                                case 2:
                                    return '未发布'
                                    break;
                                default:
                                    break;
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
                    { label: '创建时间', prop: 'createDate', width: 'auto' },
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
                        options:[
                            {
                                value:'1',
                                label:'已发布'
                            },
                            {
                                value:'2',
                                label:'未发布'
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
                    // this.editForm.ruleForm.status = res.data.status
                    if(res.data.status==1){
                        this.editForm.ruleForm.status='已发布'
                    }else{
                        this.editForm.ruleForm.status='未发布'
                    }
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
                id: this.editForm.ruleForm.id
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
        //规程发布
        release(data){
           if(data[0].status==1||data.length>1){
               this.$message({
                   message:'发布失败',
                   type:'error'
               })
           }else{
                regulationManagementRelease({id:data[0].id}).then((res) => {
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
