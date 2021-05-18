<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>装修管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <!-- <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增钥匙记录</el-button
                    > -->
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
                                <button @click="drop(table_row)">作废</button>
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <!-- <Drawer
                    drawerTitle="新增钥匙"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">钥匙信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm"> -->
                <!-- Slot -->
                <!-- <template v-slot:date>
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
                </Drawer> -->
            </div>
        </div>
    </div>
</template>

<script>
import { userDecorationInvalid } from '@/api/daily'

export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            // addForm: {
            //     ruleForm: {
            //         facilityName: null,
            //         num: null,
            //         correspondingPosition: null,
            //         storageLocation: null,
            //         administrator: null,
            //         tel: null
            //     },
            //     rules: {
            //         tel: [
            //             // {
            //             //     required: true,
            //             //     message: '请输入手机号',
            //             //     trigger: 'blur'
            //             // },
            //             {
            //             min: 11,
            //             max: 11,
            //             message: '请输入正确的手机号',
            //             trigger: 'blur',
            //             },
            //         ]
            //     },
            //     form_item: [
            //         {
            //             type: 'Input',
            //             label: '设施名称',
            //             placeholder: '请输入',
            //             width: '50%',
            //             prop: 'facilityName'
            //         },
            //         {
            //             type: 'Input',
            //             label: '钥匙数量',
            //             // disabled: true,
            //             placeholder: '请输入',
            //             width: '100%',
            //             prop: 'num'
            //         },
            //         {
            //             type: 'Input',
            //             label: '对应位置',
            //             placeholder: '请选择',
            //             width: '100%',
            //             prop: 'correspondingPosition'
            //         },
            //         {
            //             type: 'Input',
            //             label: '存放位置',
            //             placeholder: '请输入',
            //             width: '100%',
            //             prop: 'storageLocation'
            //         },
            //         {
            //             type: 'Input',
            //             label: '管理人',
            //             placeholder: '请输入',
            //             width: '100%',
            //             prop: 'administrator'
            //         },
            //         {
            //             type: 'Input',
            //             label: '管理人联系方式',
            //             placeholder: '请输入',
            //             width: '100%',
            //             prop: 'tel'
            //         }
            //     ]
            // },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '房屋信息', prop: 'roomName', width: '150' },
                    {
                        label: '申请人名称',
                        prop: 'applicationName',
                        width: 'auto'
                    },
                    {
                        label: '住户类型',
                        prop: 'applicationType',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.applicationType) {
                                case 1:
                                    return '业主'
                                    break
                                case 2:
                                    return '亲属'
                                    break
                                case 3:
                                    return '租客'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '申请人联系方式',
                        prop: 'applicationTel',
                        width: '130'
                    },
                    {
                        label: '业主姓名',
                        prop: 'residentName',
                        width: '80'
                    },
                    {
                        label: '业主联系方式',
                        prop: 'residentTel',
                        width: '130'
                    },
                    {
                        label: '施工单位',
                        prop: 'constructionUnit',
                        width: '130'
                    },
                    {
                        label: '门禁卡数量',
                        prop: 'userAccessCardNum',
                        width: '80'
                    },
                    {
                        label: '负责人',
                        prop: 'director',
                        width: '80'
                    },
                    {
                        label: '负责人联系方式',
                        prop: 'directorTel',
                        width: '130'
                    },
                    {
                        label: '装修押金',
                        prop: 'depositPrice',
                        width: 'auto'
                    },
                    {
                        label: '申请时间',
                        prop: 'applicationDate',
                        width: '180'
                    },
                    {
                        label: '预计开始时间',
                        prop: 'expectedBegin',
                        width: '180'
                    },
                    {
                        label: '预计结束时间',
                        prop: 'expectedEnd',
                        width: '180'
                    },
                    {
                        label: '实际开始时间',
                        prop: 'actualBegin',
                        width: '180'
                    },
                    { label: '实际结束时间', prop: 'actualEnd', width: '180' },
                    { label: '退还押金', prop: 'refundDeposit', width: 'auto' },
                    {
                        label: '是否退还门禁卡',
                        prop: 'isReturnAccessCard',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.isReturnAccessCard) {
                                case 1:
                                    return '归还'
                                    break
                                case 0:
                                    return '未归还'
                                    break
                            }
                        }
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        width: '200',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case -1:
                                    return '申请中'
                                    break
                                case -2:
                                    return '申请不通过'
                                    break
                                case -3:
                                    return '申请通过'
                                    break
                                case 1:
                                    return '未开始（已付押金)'
                                    break
                                case 2:
                                    return '装修中'
                                    break
                                case 3:
                                    return '完工检查申请中'
                                    break
                                case 4:
                                    return '完工检查不通过'
                                    break
                                case 5:
                                    return '完工检查通过'
                                    break
                                case 6:
                                    return '申请退款中'
                                    break
                                case 7:
                                    return '装修结束（已退押金)'
                                    break
                                case 8:
                                    return '已作废'
                                    break
                            }
                        }
                    },
                    { label: '延长时间', prop: 'extendTime', width: 'auto' },
                    { label: '延长原因', prop: 'extendReasons', width: 'auto' },
                    {
                        label: '最后一次完工检查是否合格',
                        prop: 'isQualified',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.isQualified) {
                                case 1:
                                    return '合格'
                                    break
                                case 0:
                                    return '不合格'
                                    break
                            }
                        }
                    },
                    { label: '备注', prop: 'remarks2', width: 'auto' }
                ],
                table_data: [],
                url: 'userDecorationList',
                search_item: [
                    {
                        type: 'Input',
                        label: '房屋信息',
                        placeholder: '请输入',
                        prop: 'roomName'
                    },
                    {
                        type: 'Input',
                        label: '业主姓名',
                        placeholder: '请输入',
                        prop: 'residentName'
                    },
                    {
                        type: 'Input',
                        label: '业主联系方式',
                        placeholder: '请输入',
                        prop: 'residentTel'
                    },
                    {
                        type: 'Input',
                        label: '施工单位',
                        placeholder: '请输入',
                        prop: 'constructionUnit'
                    },
                    {
                        type: 'Input',
                        label: '施工负责人',
                        placeholder: '请输入',
                        prop: 'constructionName'
                    },
                    {
                        type: 'Input',
                        label: '施工联系方式',
                        placeholder: '请输入',
                        prop: 'constructionTel'
                    },
                    {
                        type: 'select',
                        label: '最后一次完工检查情况',
                        placeholder: '请输入',
                        prop: 'isQualified',
                        options: [
                            { label: '合格', value: '1' },
                            { label: '不合格', value: '0' }
                        ]
                    },
                    {
                        type: 'select',
                        label: '装修状态',
                        placeholder: '请输入',
                        prop: 'status',
                        options: [
                            { label: '申请中', value: '-1' },
                            { label: '申请不通过', value: '-2' },
                            { label: '申请通过', value: '-3' },
                            { label: '未开始(已付押金)', value: '1' },
                            { label: '装修中', value: '2' },
                            { label: '完工检查申请中', value: '3' },
                            { label: '完工检查不通过', value: '4' },
                            { label: '完工检查通过', value: '5' },
                            { label: '申请退款中', value: '6' },
                            { label: '装修结束（已退押金）', value: '7' },
                            { label: '已作废', value: '8' }
                        ]
                    },
                    {
                        type: 'picker',
                        label: '实际开始时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'actualBegin',
                        endDate: 'actualEnd',
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
            keyManagementInsert(resData).then((res) => {
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
        drop(data) {
            if (data.length) {
                let arr = []
                for (let i = 0; i < this.table_row.length; i++) {
                    arr.push(this.table_row[i].id)
                }
                let resData = {
                    ids: arr
                }
                userDecorationInvalid(resData).then((res) => {
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
