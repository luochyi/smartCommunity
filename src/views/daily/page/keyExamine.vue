<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>钥匙审核</span>
            </div>
            <div class="content">
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
                        <template v-slot:statuts = "slotData">
                            <span v-if="slotData.data.status === 1">待审核</span>
                            <span v-else-if="slotData.data.status === 2">审核通过</span>
                            <span v-else-if="slotData.data.status === 3" style="color:#FB4702">审核驳回</span>
                            <span v-else-if="slotData.data.status === 4" style="color:#FFA206">归还待审核</span>
                            <span v-else-if="slotData.data.status === 5" style="color:#FB4702">归还审核驳回</span>
                            <span v-else-if="slotData.data.status === 6" style="color:#999999">已归还</span>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="examine(table_row)">
                                    审核(借用)
                                </button>
                                <button @click="examine2(table_row)">
                                    审核(归还)
                                </button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="钥匙审核"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <!-- {{addForm2.ruleForm}} -->
                            <template slot="title">审核</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm" v-if="sign === 1">
                                </VueForm>
                                <VueForm ref="addForm2" :formObj="addForm2" v-else-if="sign === 2">
                                </VueForm>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="addSubmit()" v-if="sign === 1">
                            <span>
                                <i class="el-icon-circle-check"></i>借用审核提交</span
                            >
                        </button>
                        <button class="btn-orange" @click="addSubmit2()" v-else-if="sign === 2">
                            <span>
                                <i class="el-icon-circle-check"></i>归还审核提交</span
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
import { keyManagementInsert, keyBorrowExamine, keyBorrowreturnExamine } from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            sign: 0,
            addForm: {
                ruleForm: {
                    id:null,
                    status:null,
                    reason:null
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '审核状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options:[
                            {
                                label:'审核通过',
                                value: 2
                            },
                            {
                                label:'审核驳回',
                                value: 3
                            },
                        ]
                    },
                    {
                        type: 'textarea',
                        label: '驳回原因',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'reason',
                    }
                ]
            },
            addForm2: {
                ruleForm: {
                    id:null,
                    status:null,
                    reason:null
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '审核状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options:[
                            {
                                label:'审核通过',
                                value: 6
                            },
                            {
                                label:'审核驳回',
                                value: 5
                            },
                        ]
                    },
                    {
                        type: 'textarea',
                        label: '驳回原因',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'reason',
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
                    { label: '申请编号', prop: 'code', width: 'auto' },
                    { label: '申请人', prop: 'reviewerName', width: 'auto' 
                    // ,type:'function',
                    //     callback(row,prop){
                    //        if(row.tel){
                    //            return row.reviewerName + row.tel
                    //        }
                    //     }
                    },
                    { label: '身份', prop: 'identity', width: 'auto' },
                    { label: '联系方式', prop: 'tel', width: 'auto' },
                    { label: '对应设备', prop: 'facilityName', width: 'auto' },
                    {
                        label: '钥匙可借数量',
                        prop: 'loanableNum',
                        width: 'auto'
                    },
                    {
                        label: '审核状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'statuts'
                        // callback(row, prop) {
                        //     switch (row.status) {
                        //         case 1:
                        //             return '待审核'
                        //             break
                        //         case 2:
                        //             return '审核通过'
                        //             break
                        //         case 3:
                        //             return '审核驳回'
                        //             break
                        //         case 4:
                        //             return '归还待审核'
                        //             break
                        //         case 5:
                        //             return '归还审核驳回'
                        //             break
                        //         case 6:
                        //             return '已归还(归还审核通过)'
                        //             break
                        //         default:
                        //             break
                        //     }
                        // }
                    },
                    { label: '审核时间', prop: 'auditDate', width: 'auto' },
                    { label: '申请时间', prop: 'createDate', width: 'auto' }
                ],
                table_data: [],
                url: 'keyBorrowList',
                search_item: [
                    {
                        type: 'Input',
                        label: '申请编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '申请人',
                        placeholder: '请输入',
                        prop: 'reviewerName'
                    },
                    {
                        type: 'Input',
                        label: '身份',
                        placeholder: '请输入',
                        prop: 'identity'
                    },
                    {
                        type: 'Input',
                        label: '对应设备',
                        placeholder: '请输入',
                        prop: 'facilityName'
                    },
                    {
                        type: 'picker',
                        label: '申请时间',
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
    methods: {
        examine(data) {
            this.sign = 0
            if(data.length!=1){
                this.$message({
                    type:'error',
                    message:'只能审核一条数据'
                })
            }else{  
                console.log(data);
                this.sign = 1
                this.add_vrisible = true
                this.addForm.ruleForm.id = data[0].id
            }
        },
        examine2(data) {
            this.sign = 0
            if(data.length!=1){
                this.$message({
                    type:'error',
                    message:'只能审核一条数据'
                })
            }else{
                this.sign = 2
                console.log(data);
                this.add_vrisible = true
                this.addForm2.ruleForm.id = data[0].id
            }
        },
        addClose() {
            if (this.sign === 1) {
                this.$refs.addForm.reset()
            } else if (this.sign === 2) {
                this.$refs.addForm2.reset()
            }
            this.add_vrisible = false
        },
        addSubmit() {
            // this.add_vrisible = false
            /**
       * 
       *  code	       :null, 设施分类编号	是	[string]		
        2	name	       :null,   设施分类名称	是	[string]		
        3	openStartDate:null,	      开放开始时间	是	[datetime]	"3:41:44"	查看
        4	openEndDate	 :null,     开放结束时间	是	[datetime]	"21:41:44"	查看
        5	imgUrls:null,
       * 
       * **/
            let resData = {
                ...this.addForm.ruleForm
            }
            keyBorrowExamine(resData).then((res) => {
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
        addSubmit2() {
            // this.add_vrisible = false
            /**
       * 
       *  code	       :null, 设施分类编号	是	[string]		
        2	name	       :null,   设施分类名称	是	[string]		
        3	openStartDate:null,	      开放开始时间	是	[datetime]	"3:41:44"	查看
        4	openEndDate	 :null,     开放结束时间	是	[datetime]	"21:41:44"	查看
        5	imgUrls:null,
       * 
       * **/
            let resData = {
                ...this.addForm2.ruleForm
            }
            keyBorrowreturnExamine(resData).then((res) => {
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
        }
    }
}
</script>
