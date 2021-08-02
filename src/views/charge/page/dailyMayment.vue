<template>
    <div>
        <div>
            <div class="main-content" v-show="!Pay_show">
                <!-- 日常缴费组件 -->
                <div class="main-titel">
                    <span>日常缴费</span>
                </div>
                <div class="content">
                    <div class="content-btn flex">
                        <el-button
                            class="init-button"
                            icon="el-icon-plus"
                            @click="addFee()"
                            >添加费用</el-button
                        >
                        <div style="margin-left: 16px">
                            <!--  :before-generate="startDownload"
                              :before-finish="finishDownload" -->
                            <download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="收费标准.xls"
                            >
                                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                                <el-button
                                    type="init-button2"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel>
                        </div>
                    </div>
                    <!-- 查询重制 -->
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
                                    <el-tab-pane
                                        label="未缴纳"
                                        name="1"
                                    ></el-tab-pane>
                                    <el-tab-pane
                                        label="部分缴纳"
                                        name="2"
                                    ></el-tab-pane>
                                </el-tabs>
                            </template>
                            <template slot="footer">
                                <div class="table-footer">
                                    <button @click="Pay(table_row)">
                                        缴费
                                    </button>
                                    <button @click="receiver(table_row)">
                                        推送提醒
                                    </button>
                                </div>
                            </template>
                        </VueTable>
                    </div>
                </div>
            </div>
            <!-- 添加费用组件 -->
        </div>

        <Drawer
            drawerTitle="添加缴费"
            @drawerClose="addClose"
            :drawerVrisible="add_vrisible"
        >
            <div style="padding: 30px">
                <FromCard>
                    <template slot="title">基本信息</template>
                    <template>
                        <VueForm
                            ref="addFrom"
                            @ruleSuccess="addRuleSuccess"
                            :formObj="addForm"
                        >
                            <template v-slot:rate>
                                        <el-input
                                            v-model="addForm.ruleForm.rate"
                                            size="small"
                                            style="width: 240px"
                                            placeholder="请输入"
                                        >
                                            <i
                                                slot="suffix"
                                                style="font-style: normal"
                                                class="metre"
                                                >%</i
                                            >
                                        </el-input>
                                    </template>
                            <template v-slot:chargesTemplateDetailId>
                                <el-select
                                    v-model="
                                        addForm.ruleForm.chargesTemplateDetailId
                                    "
                                    @change="
                                        (value) =>
                                            feeNameChange(value, feeNameList)
                                    "
                                    style="width: 240px"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="(item, index) in feeNameList"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </template>
                            <!-- 获取单元号 -->
                            <template v-slot:hours>
                                <el-select
                                    v-model="buildValue"
                                    filterable
                                    style="width: 30%; margin-right: 16px"
                                    placeholder="幢"
                                >
                                    <el-option
                                        v-for="item in buildOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                <el-select
                                    v-model="unitValue"
                                    filterable
                                    style="width: 30%; margin-right: 16px"
                                    placeholder="单元"
                                >
                                    <el-option
                                        v-for="item in unitOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                <el-select
                                    v-model="hoursValue"
                                    filterable
                                    style="width: 30%"
                                    placeholder="房间号"
                                    @change='getHours'
                                >
                                    <el-option
                                        v-for="item in hoursOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
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
                    <span> <i class="el-icon-circle-check"></i>提交</span>
                </button>
                <!-- <button class="btn-orange"><span>确认并打印</span></button>
            <button class="btn-orange"><span>打印预览</span></button> -->
                <button class="btn-gray" @click="addClose">
                    <span>取消</span>
                </button>
            </div>
        </Drawer>
        <Drawer
            drawerTitle="推送提醒"
            @drawerClose="receiverClose"
            :drawerVrisible="receiver_vrisible"
        >
            <div style="padding: 30px">
                <FromCard>
                    <template slot="title">基本信息</template>
                    <template>
                        <VueForm
                            ref="receiverFrom"
                            @ruleSuccess="receiverRuleSuccess"
                            :formObj="receiverForm"
                        >
                        </VueForm>
                    </template>
                </FromCard>
            </div>
            <div slot="footer">
                <button class="btn-orange" @click="receiverSubmit()">
                    <span> <i class="el-icon-circle-check"></i>发送</span>
                </button>
                <button class="btn-gray" @click="receiverClose">
                    <span>取消</span>
                </button>
            </div>
        </Drawer>
        <Pay
            v-show="Pay_show"
            @paySubmit="paySubmit"
            :PayShow="Pay_show"
            :tableData="table_row"
            @cancel="cancel"
        ></Pay>
    </div>
</template>

<script>
import {
    dailyPaymentFindEnableTempleDetail,
    dailyPaymentInsert,
    dailyPaymentPush
} from '@/api/charge'
// import { userResidentFindResidentNameBySearch, GetTableData } from '@/api/basic'
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {
    cpmBuildingUnitFindAll,
    findByBuildingUnitId,
    findByBuildingId,
} from '@/api/basic'
// basic-admin/src/views/charge/components/dailyMayment/add.vue
// import drawer from '@/components/Drawer/drawer.vue'
// import addFee from '@/views/charge/components/dailyMayment/addFee.vue'
import Pay from '@/views/charge/components/dailyMayment/Pay.vue'
export default {
    data() {
        let feeNameList = []
        dailyPaymentFindEnableTempleDetail().then((result) => {
            result.data.map((item) => {
                feeNameList.push({
                    value: item.id,
                    label: item.name,
                    unitPrice: item.unitPrice,
                    type: item.type
                })
            })
        })
        return {
            // 切换日常缴费组件
            Pay_show: false,
            feeNameList: feeNameList,
            feeData: {},
            options: [],
            table_row: [],
            buildValue: null,
            buildOptions: [],
            // 单元
            unitValue: null,
            unitOptions: [],
            // 房屋
            hoursValue: null,
            hoursOptions: [],
            add_vrisible: false,
            receiver_vrisible: false,
            loading: true,
            pageCount: 1,
            currentPage: 1,
            addForm: {
                ruleForm: {
                    buildingUnitEstateId: null,
                    chargesTemplateDetailId: null,
                    beginDate: null,
                    endDate: null,
                    unitPrice: null,
                    num: null,
                    dailyPaymentOrder: null,
                    totalPrice: null,
                    rate:null,
                    paymentTerm:null
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '费用名称',
                        prop: 'chargesTemplateDetailId',
                        slotName: 'chargesTemplateDetailId',
                        width: '50%'
                    },

                    // {
                    //     type: 'Slot',
                    //     label: '房屋信息 ',
                    //     prop: 'buildingUnitEstateId',
                    //     width: '50%',
                    //     slotName: 'buildingUnitEstateId'
                    // },
                    {
                        type: 'Slot',
                        label: '房屋信息',
                        placeholder: '请输入',
                        width: '70%',
                        slotName: 'hours',
                        prop: 'buildingUnitEstateId'
                    },
                    {
                        type: 'DateTime',
                        label: '计费开始时间',
                        placeholder: '请选择开始时间',
                        prop: 'beginDate',
                        width: '50%'
                    },
                    {
                        type: 'DateTime',
                        label: '计费结束时间',
                        placeholder: '请选择开始时间',
                        prop: 'endDate',
                        // width: "100%"
                        width: '50%'
                    },
                    {
                        type: 'Input',
                        label: '计费单位/单价',
                        placeholder: '请选择',
                        prop: 'unitPrice',
                        width: '50%',
                        disabled: true
                    },
                    {
                        type: 'Int',
                        label: '面积/用量  ',
                        placeholder: '请输入',
                        prop: 'num',
                        // width: "100%"
                        width: '50%'
                    },
                    {
                        type: 'Input',
                        label: '费用金额  ',
                        placeholder: '请输入',
                        prop: 'totalPrice',
                        // width: "100%"
                        width: '50%',
                        disabled: true
                    },
                    {
                        type: 'Slot',
                        label: '费率',
                        width: '50%',
                        prop: 'rate',
                        slotName: 'rate'
                    },
                    {
                        type: 'DateTime',
                        label: '缴费期限',
                        placeholder: '请选择',
                        prop: 'paymentTerm',
                        // width: "100%"
                        width: '50%'
                    }
                ],
                rules: {
                    // buildingUnitEstateId: [
                    //     { required: true, message: '请选择', trigger: 'blur' }
                    // ],
                    // chargesTemplateDetailId: [
                    //     { required: true, message: '请选择', trigger: 'change' }
                    // ],
                    beginDate: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    endDate: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    unitPrice: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    num: [
                        {
                            required: true,
                            message: '请输入面积/用量',
                            trigger: 'change'
                        }
                    ]
                }
            },
            receiverForm: {
                ruleForm: {
                    content: '',
                    name: ''
                },
                form_item: [
                    {
                        type: 'span',
                        label: '收费项目名称',
                        prop: 'name',
                        width: '100%'
                    },
                    {
                        type: 'textarea',
                        label: '推送内容',
                        rows: 4,
                        prop: 'content',
                        slotName: 'chargesTemplateDetailId',
                        width: '100%'
                    }
                ],
                rules: {
                    content: [
                        {
                            required: true,
                            message: '请填写回访结果',
                            trigger: 'blur'
                        }
                    ]
                }
            },
            // 添加点击确认后弹出抽屉
            // 添加抽屉数据
            json_fields: {
                收费项目名称: 'name',
                房屋信息: 'roomName',
                计费开始时间: 'beginDate',
                计费结束时间: 'endDate',
                '计费单价/单位': 'unitPrice',
                '面积/用量/数量': 'num',
                费用金额: 'costPrice',
                已缴金额: 'paidPrice',
                应收金额: 'paidPrice',
                待缴金额: 'paymentPrice',
                状态: {
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '已缴纳'
                                break
                            default:
                                return '未缴纳'
                        }
                    }
                },
                创建人: 'createName',
                更新时间: 'updateDate',
                费率:'rate',
                缴费期限:'paymentTerm',
                滞纳金:'overdueFine',
                备注: 'remake'
            },
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '收费项目名称', prop: 'name', width: '180' },
                    { label: '房屋信息', prop: 'roomName', width: '180' },
                    { label: '计费开始时间', prop: 'beginDate', width: '180' },
                    { label: '计费结束时间', prop: 'endDate', width: '180' },
                    {
                        label: '计费单价/单位',
                        prop: 'unitPrice',
                        width: '180',
                        type: 'function',
                        callback: (row, prop) => {
                            // 收费类型（1.元/月 平方米，2.元/ 立方米，3.元/ 次）
                            switch (row.type) {
                                case 1:
                                    return row.unitPrice + '元/月'
                                    break
                                case 2:
                                    return row.unitPrice + '元/ 立方米'
                                    break
                                case 3:
                                    return row.unitPrice + '元/ 次'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    // { label: '计费单位', prop: 'type', width: '180' },
                    { label: '面积/用量/数量', prop: 'num', width: '180' },
                    { label: '费用金额', prop: 'costPrice', width: '180' },
                    { label: '已缴金额', prop: 'paidPrice', width: '180' },
                    { label: '应收金额', prop: 'totalPrice', width: '180' },
                    { label: '待缴金额', prop: 'paymentPrice', width: '180' },
                    { label: '状态', prop: 'status', width: '180',type:'function' ,
                        callback:(row,prop)=>{
                            // switch(row.status){
                            //     case 1:
                            //         return '未缴纳'
                            //         break;
                            //     case 2:
                            //         return '部分缴纳'
                            //         break;
                            //     case 3:
                            //         return '全部缴纳'
                            //         break;
                            // }
                            let timeDate = Math.round((new Date().getTime() - new Date(row.paymentTerm).getTime())/1000/60/60/24)  //到期时间
                            if(timeDate>0 && row.status!=3){
                                return '已欠费'
                            }else if(row.status==3){
                                return '全部缴纳'
                            }else if(timeDate<0 && row.status==1){
                                return '未缴纳'
                            }else if(timeDate<0 && row.status==2){
                                return '部分缴纳'
                            }
                        }
                    },
                    { label: '备注', prop: 'remake', width: '180' },
                    { label: '费率', prop: 'rate', width: '180' },
                    { label: '缴费期限', prop: 'paymentTerm', width: '180' },
                    { label: '逾期天数', width: '180' ,type:'function',
                    callback:(row,prop)=>{
                        // console.log(new Date(row.paymentTerm).getTime()) 缴纳期限的时间戳
                        let timeDate = Math.round((new Date().getTime() - new Date(row.paymentTerm).getTime())/1000/60/60/24)
                        // timeDate = (当前时间 - 期限日期) 的天数
                        if (timeDate < 0){
                            return '还有' + Math.abs(timeDate) + '天到期'
                        }else if(timeDate == 0){
                            return '今天到期'
                        }
                        return '逾期' + timeDate + '天'
                    }},
                    { label: '滞纳金', prop: 'overdueFine', width: '180' },
                    { label: '创建人', prop: 'createName', width: '180' },
                    { label: '更新时间', prop: 'updateDate', width: '180' }
                ],
                table_data: [],
                url: 'dailyPaymentList',
                search_item: [
                    {
                        type: 'select',
                        label: '费用名称',
                        placeholder: '请输入',
                        value: '',
                        prop: 'workOrderTypeDetailId',
                        options: [
                            {
                                label: '水电费',
                                value: '1'
                            },
                            {
                                label: '车辆费',
                                value: '2'
                            }
                        ]
                    },
                    {
                        type: 'startDate',
                        label: '计费时间',
                        placeholder: '请选择开始日期',
                        prop: 'beginDate'
                    },
                    {
                        type: 'endDate',
                        label: '计费时间',
                        placeholder: '结束时间',
                        prop: 'endDate'
                    },
                    {
                        type: 'Input',
                        label: '缴费人',
                        placeholder: '请选择',
                        prop: 'payName'
                    },
                    {
                        type: 'Input',
                        label: '联系方式',
                        placeholder: '请输入',
                        prop: 'tel'
                    },
                    {
                        type: 'Input',
                        label: '房屋信息',
                        placeholder: '楼栋/单元/房间号',
                        prop: 'roomName'
                    }
                    // 房屋信息
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    components: {
        Pay
    },
    mounted() {
        // 弹窗内下拉框
       console.log(new Date().getTime());
    },
    methods: {
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'dailyPaymentList',
                data: {
                    pageNum: 1,
                    size: 100
                }
            }
            const data = await DownloadExcel(params, this)
            return data
        },
        // Excel进度
        ExcelLoading(page, pageCount) {
            const Loading = this.$loading({
                lock: true,
                text: `正在导出Excel${page}`,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            Loading.text = `正在导出Excel  ${page}/${pageCount}`
            console.log(Loading.text)
        },
        // Excel导出结束
        finishDownload() {
            const Loading = this.$loading()
            Loading.close()
        },
        // 缴费成功
        paySubmit() {
            this.$refs.table.loadData()
        },
        // remoteMethod(val) {
        //     let reeData = {
        //         pageNum: 1,
        //         size: 20,
        //         name: val
        //     }
        //     this.loading = true
        //     userResidentFindResidentNameBySearch(reeData).then((res) => {
        //         this.options = res.tableList.map((res) => {
        //             console.log(res)
        //             return {
        //                 value: res.estateId,
        //                 label: res.roomName
        //             }
        //         })
        //         console.log(this.options)
        //         this.loading = false
        //     })
        // },
        // focus() {
        //     let reeData = {
        //         pageNum: 1,
        //         size: 20
        //     }
        //     this.loading = true
        //     userResidentFindResidentNameBySearch(reeData).then((res) => {
        //         this.options = res.tableList.map((res) => {
        //             return {
        //                 value: res.estateId,
        //                 label: res.roomName + '   ' + res.label
        //             }
        //         })
        //         this.loading = false
        //         console.log(res)
        //     })
        // },
        change(value) {
          console.log(value);
        },
        getHours(value){
          console.log(value);
          this.addForm.ruleForm.buildingUnitEstateId = value
        },
        receiver(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message({
                        message: '不能批量操作',
                        type: 'error'
                    })
                    return
                }
                this.receiver_vrisible = true
                this.receiverForm.ruleForm.name = data[0].name
            } else {
                this.$message({
                    message: '请选择需要操作的数据',
                    type: 'error'
                })
            }
        },
         unitData(value) {
            let resData = {
                id: value
            }
            findByBuildingId(resData).then((res) => {
                // 给单元号赋值
                this.unitOptions = res
            })
        },
        hoursData(value) {
            let resData = {
                id: value
            }
            findByBuildingUnitId(resData).then((res) => {
                console.log(res)
                this.hoursOptions = res
            })
        },
        receiverClose() {
            this.receiver_vrisible = false
        },
        receiverRuleSuccess() {
            let resData = {
                sysMessage: {
                    content: this.receiverForm.ruleForm.content
                },
                dailyPaymentId: this.table_row[0].id
            }
            dailyPaymentPush(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.receiverClose()
                }
            })
        },
        receiverSubmit() {
            this.$refs.receiverFrom.submitForm()
        },
        // 费用名称变化
        feeNameChange(value, options) {
            let data = options.find(function (item) {
                if (item.value === value) {
                    return item
                }
            })
            let str = ''
            switch (data.type) {
                case 1:
                    str = '元/月 平方米'
                    break
                case 2:
                    str = '元/月 立方米'
                    break
                case 3:
                    str = '元/次'
                    break
                default:
                    break
            }
            // data
            this.feeData = data
            this.addForm.ruleForm.unitPrice = data.unitPrice + str
        },
        addRuleSuccess() {
            /***
       *
       *  buildingUnitEstateId    :null,      	房产id	是	[int]
        2	chargesTemplateDetailId	:null,        费用名称类型(取自 物业收费标准明细表)	是	[int]
        3	beginDate	              :null,        计费开始时间	          是	[datetime]
        4	endDate	                :null,      计费结束时间	              是	[datetime]
        5	unitPrice	              :null,      计费单价	            是	[double]
        6	type	                  :null,       计费单位（1.元/月 平方米，2.元/ 立方米，3.元/ 次）	是	[int]
        7	num:null,
       * */
            let resData = {
                buildingUnitEstateId: this.addForm.ruleForm
                    .buildingUnitEstateId,
                chargesTemplateDetailId: this.addForm.ruleForm
                    .chargesTemplateDetailId,
                beginDate: this.addForm.ruleForm.beginDate,
                endDate: this.addForm.ruleForm.endDate,
                unitPrice: this.feeData.unitPrice,
                type: this.feeData.type,
                num: this.addForm.ruleForm.num,
                rate:this.addForm.ruleForm.rate,
                paymentTerm:this.addForm.ruleForm.paymentTerm
            }
            dailyPaymentInsert(resData).then((res) => {
                console.log(res)
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
        addSubmit() {
            this.$refs.addFrom.submitForm()
        },
        addClose() {
            this.$refs.addFrom.reset()
            this.add_vrisible = false
            console.log(1);
            this.buildValue=null,
            this.unitValue = null,
            this.hoursValue = null
        },
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
        tableCheck(data) {
            this.table_row = data
        },
        // 添加缴费信息
        addFee() {
          cpmBuildingUnitFindAll().then((res) => {
            this.buildOptions = res
        })
            this.add_vrisible = true
            
        },
        // 缴费
        Pay(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('不能批量编辑')
                    return
                }
                this.Pay_show = true
            } else {
                this.$message.error('请选择需要编辑的数据')
            }
        },
        // 关闭抽屉
        getClose(data) {
            this.drawer_vrisible = false
            
        },
        cancel(data) {
            this.Pay_show = false
        }
    },
    watch: {
        'addForm.ruleForm.num': {
            handler(newValue) {
                if (newValue && this.feeData.unitPrice) {
                    this.addForm.ruleForm.totalPrice = (
                        newValue * this.feeData.unitPrice
                    ).toFixed(2)
                }
            },
            immediate: true
        },
        buildValue: {
            handler(newValue) {
                this.unitData(newValue)
                this.unitValue = null
            },
            deep: true
        },
        unitValue: {
            handler(newValue) {
                this.hoursData(newValue)
                this.hoursValue = null
            },
            deep: true
        }
    }
}
</script>
