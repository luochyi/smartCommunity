<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>物料出入库记录</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >添加出入库</el-button
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
                                <!-- <button @click="detail(table_row)">编辑</button> -->
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增出入库"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">出入库信息</template>
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
import { materialRecordInsert, materialList } from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            detail_vrisible: false,
            addDate: null,
            options: [],
            addForm: {
                ruleForm: {
                    name: null
                },
                rules: {},
                form_item: [
                    {
                        type: 'Select',
                        label: '物料名称',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'materialId',
                        options: []
                    },
                    {
                        type: 'Select',
                        label: '类型',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'type',
                        options: [
                            {
                                value: '1',
                                label: '出库'
                            },
                            {
                                value: '2',
                                label: '入库'
                            }
                        ]
                    },
                    {
                        type: 'Int',
                        label: '数量',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'num'
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
                    { label: '物料名称', prop: 'name', width: 'auto' },
                    {
                        label: '类型',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.type) {
                                case 1:
                                    return '出库'
                                    break
                                case 2:
                                    return '入库'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    { label: '数量', prop: 'num', width: 'auto' },
                    { label: '创建人名称', prop: 'createName', width: 'auto' },
                    { label: '创建时间', prop: 'createDate', width: 'auto' }
                ],
                table_data: [],
                url: 'materialRecordList',
                search_item: [
                    {
                        type: 'Input',
                        label: '物料名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'select',
                        label: '类型',
                        placeholder: '请输入',
                        prop: 'type',
                        options: [
                            {
                                value: '1',
                                label: '出库'
                            },
                            {
                                value: '2',
                                label: '入库'
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
    mounted() {
        materialList().then((res) => {
            console.log(res.tableList)
            res.tableList.forEach((ele) => {
                let obj = {
                    value: ele.id,
                    label: ele.name
                }
                this.addForm.form_item[0].options.push(obj)
            })
        })
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
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            materialRecordInsert(resData).then((res) => {
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
        // detail(data) {
        //     if (data.length != 1) {
        //         this.$message({
        //             message: '只能编辑一条数据',
        //             type: 'error'
        //         })
        //     } else {
        //         this.detail_vrisible = true
        //         console.log(data[0].id)
        //         this.detailForm.ruleForm.id = data[0].id
        //         this.detailForm.ruleForm.name = data[0].name
        //     }
        // },
        // detailClose() {
        //     this.$refs.detailForm.reset()
        //     this.detail_vrisible = false
        // },
        // detailSubmit() {
        //     let resData = {
        //         ...this.detailForm.ruleForm,
        //         id: this.detailForm.ruleForm.id
        //         // code: this.addForm.ruleForm.code,
        //         // name: this.addForm.ruleForm.name,
        //         // openStartDate: this.openStartDate,
        //         // openEndDate:  this.openEndDate,
        //         // imgUrls:this.addForm.ruleForm.imgUrls,
        //     }
        //     materialUpdate(resData).then((res) => {
        //         if (res.status) {
        //             this.$message({
        //                 message: res.message,
        //                 type: 'success'
        //             })
        //             this.$refs.table.loadData()
        //             this.detailClose()
        //         }
        //     })
        // },
        // dateTimeChange(arr) {
        //     this.addForm.ruleForm.openStartDate = arr[0]
        //     this.addForm.ruleForm.openEndDate = arr[1]
        // },
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
