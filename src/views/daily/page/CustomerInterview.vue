<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>客户访谈</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增访谈预约</el-button
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
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增访谈"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">访谈内容</template>
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
import { regulationManagementInsert,regulationManagementRelease } from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                },
                rules: {
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '客户姓名',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'textarea',
                        label: '访谈内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'Select',
                        label: '访谈状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options:[
                            {
                                value:'1',
                                label:'已访谈'
                            },
                            {
                                value:'2',
                                label:'未访谈'
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
                    {
                        label: '客户姓名',
                        prop: 'createName',
                        width: '130'
                    },
                    { label: '访谈内容', prop: 'content', width: 'auto' },
                    { label: '访谈状态', prop: 'status', width: 'auto' ,type:'function',
                        callback(row,prop){
                            switch (row.status) {
                                case 1:
                                    return '已访谈'
                                    break;
                                case 2:
                                    return '未访谈'
                                    break;
                                default:
                                    break;
                            }
                        }
                    },
                    { label: '访谈时间', prop: 'createDate', width: 'auto' },
                ],
                table_data: [],
                url: 'regulationManagementList',
                search_item: [
                     {
                        type: 'Input',
                        label: '客户姓名',
                        placeholder: '请输入',
                        prop: 'createName'
                    },
                    {
                        type: 'select',
                        label: '访谈状态',
                        placeholder: '请选择',
                        prop: 'status',
                        options:[
                            {
                                value:'1',
                                label:'已访谈'
                            },
                            {
                                value:'2',
                                label:'未访谈'
                            }
                        ]
                    },
                    {
                        type: 'picker',
                        label: '访谈时间',
                        placeholder: '请输入',
                        prop: 'createDate',
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
    methods: {
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            this.$message({
                type:'success',
                message:'成功'
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
