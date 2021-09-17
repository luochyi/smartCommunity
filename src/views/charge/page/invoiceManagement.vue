<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>票据管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增票据</el-button
                    >
                </div>
                <!-- 导出 -->
                <!-- <div style="width: 50px">
                    <download-excel
                        class="export-excel-wrapper"
                        :fetch="fetchData"
                        :fields="json_fields"
                        :before-finish="finishDownload"
                        name="考勤记录.xls"
                    >
                        上面可以自定义自己的样式，还可以引用其他组件button
                        <el-button size="mini" icon="el-icon-folder-add" plain
                            >导出Excel</el-button
                        >
                    </download-excel>
                </div> -->
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template v-slot:goodsImgList="slotData">
                            <div v-if="slotData.data.goodsImgList.length">
                                <el-button
                                    class="init-text"
                                    type="text"
                                    @click="
                                        getPhotoView(slotData.data.goodsImgList)
                                    "
                                >
                                    <span>查看</span>
                                </el-button>
                            </div>
                            <div v-else>-</div>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="get(table_row)">领用</button>
                                <!-- <button @click="edit(table_row)">
                                    修改开票信息
                                </button> -->
                                <button @click="del(table_row)">删除</button>
                                <button @click="print">打印</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增票据"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <!-- slot上传 -->
                            <template slot="title">票据信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm" @ruleSuccess="addRuleSuccess">
                                    <!-- Slot -->
                                    <template v-slot:hours>
                                        <el-select
                                            v-model="buildValue"
                                            filterable
                                            style="
                                                width: 30%;
                                                margin-right: 16px;
                                            "
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
                                            style="
                                                width: 30%;
                                                margin-right: 16px;
                                            "
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
        <el-dialog
            title="领用票据"
            width="480px"
            top="40vh"
            @close="dialogclose()"
            :visible.sync="getDialog"
        >
            <div class="dialang-box">
                <div style="margin: 10px">
                    领用人姓名：<el-input
                        placeholder="请输入领用人姓名"
                        size="small"
                        v-model="recipient"
                        style="width: 223px; height: 32px"
                    >
                    </el-input>
                </div>
                <div style="margin: 10px">
                    领用人手机号：<el-input
                        placeholder="请输入领用人手机号"
                        size="small"
                        maxlength="11"
                        v-model="recipientsTel"
                        @change="confirmTelephone"
                        style="width: 223px; height: 32px"
                    >
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="getDialog = false"
                    >取 消</el-button
                >
                <el-button size="mini" type="primary" @click="getOk()"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
        <Preview :dialogVisible="paymentPreview"
                    @dialogPreview="dialogPreview"></Preview>
        <!-- 查看图片组件 -->
        <!-- <views-photo
            :isVisible="photos_Visible"
            :goodsImgsList="goodsImgsList"
            @closeViews="getclose"
        ></views-photo> -->
    </div>
</template>

<script>
// 引入查看照片组件
import Preview from '@/views/charge/components/invoice/Preview'
// import { DownloadExcel } from '@/plugins/DownloadExcel'
import { paperRecipients, paperInsert } from '@/api/charge'
import {
    cpmBuildingUnitFindAll,
    findByBuildingUnitId,
    findByBuildingId
} from '@/api/basic'
// import func from 'vue-editor-bridge'
export default {
    components: {
        Preview
    },
    data() {
        return {
            //领用
            paymentPreview:false,
            recipient: null,
            recipientsTel: null,
            thatId: null,
            getDialog: false,
            // 楼栋
            buildValue: null,
            buildOptions: [],
            // 单元
            unitValue: null,
            unitOptions: [],
            // 房屋
            hoursValue: null,
            hoursOptions: [],
            photos_Visible: false,
            add_vrisible: false,
            addDate: null,
            options: [],
            sysOptions: [],
            loading: false,
            addForm: {
                ruleForm: {
                    rate: null,
                    estateId: null
                },
                rules: {
                  // 表单必填
                  estateId: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  code: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  type: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  name: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  totalPrice: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  rate: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  remake: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  invoiceTitleType: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  invoiceTitleName: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  tel: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  acquiringEin: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  bank: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  account: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  drawer: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  invoiceDate: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ]
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '房屋信息',
                        placeholder: '请输入',
                        width: '70%',
                        slotName: 'hours',
                        prop: 'estateId'
                    },
                    {
                        type: 'Input',
                        label: '开票编号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'code'
                    },
                    {
                        type: 'Select',
                        label: '开票类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'type',
                        options: [
                            {
                                label: '增值税专用发票',
                                value: 1
                            },
                            {
                                label: '增值税普通发票',
                                value: 2
                            },
                            {
                                label: '国税通用机打发票',
                                value: 3
                            },
                            {
                                label: '地税通用机打发票',
                                value: 4
                            },
                            {
                                label: '收据',
                                value: 5
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '项目名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '总金额',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'totalPrice'
                    },
                    {
                        type: 'Slot',
                        label: '税率',
                        width: '50%',
                        prop: 'rate',
                        slotName: 'rate'
                    },
                    {
                        type: 'Input',
                        label: '税额',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'taxation',
                        disabled: true
                    },
                    {
                        type: 'textarea',
                        label: '备注',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'remake'
                    },
                    {
                        type: 'Select',
                        label: '抬头类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'invoiceTitleType',
                        options: [
                            {
                                label: '企业单位',
                                value: 1
                            },
                            {
                                label: '个人',
                                value: 2
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '抬头名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'invoiceTitleName'
                    },
                    {
                        type: 'Input',
                        label: '联系电话',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'tel'
                    },
                    {
                        type: 'Input',
                        label: '购方税号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'acquiringEin'
                    },
                    {
                        type: 'Input',
                        label: '开户银行',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'bank'
                    },
                    {
                        type: 'Input',
                        label: '开户账号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'account'
                    },
                    {
                        type: 'Input',
                        label: '开票人姓名',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'drawer'
                    },
                    {
                        type: 'DateTime',
                        label: '开票时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'invoiceDate'
                    }
                ]
            },
            table_row: [],
            activeName: '0',
            // 导出模板
            // json_fields: {
            //     上班打卡时间: 'startClockDate',
            //     下班打卡时间: 'endClockDate',
            //     补卡时间: 'cardReplacementDate',
            //     补卡操作人: 'operatorName',
            //     打卡人姓名: 'clockName',
            //     打卡人手机号: 'clockTel',
            //     打卡日期: 'createDate'
            // },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '开票编号',
                        prop: 'code',
                        width: '200'
                    },
                    {
                        label: '开票类型',
                        prop: 'type',
                        width: '200',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.type) {
                                case 1:
                                    return '增值税专用发票'
                                    break
                                case 2:
                                    return '增值税普通发票'
                                    break
                                case 3:
                                    return '国税通用机打发票'
                                    break
                                case 4:
                                    return '地税通用机打发票'
                                    break
                                case 5:
                                    return '收据'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '项目名称',
                        prop: 'name',
                        width: 'auto'
                    },
                    {
                        label: '总金额',
                        prop: 'totalPrice',
                        width: 'auto'
                    },
                    {
                        label: '税率',
                        prop: 'rate',
                        width: '80'
                    },
                    {
                        label: '税额',
                        prop: 'taxation',
                        width: '150'
                    },
                    {
                        label: '开票房产名称',
                        prop: 'roomName',
                        width: 'auto'
                    },
                    {
                        label: '抬头类型',
                        prop: 'invoiceTitleType',
                        width: '120',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.invoiceTitleType) {
                                case 1:
                                    return '企业单位'
                                    break
                                case 2:
                                    return '个人'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '抬头名称',
                        prop: 'invoiceTitleName',
                        width: '150'
                    },
                    {
                        label: '购方税号',
                        prop: 'acquiringEin',
                        width: '150'
                    },
                    {
                        label: '联系电话',
                        prop: 'tel',
                        width: '150'
                    },
                    {
                        label: '开户银行',
                        prop: 'bank',
                        width: '150'
                    },
                    {
                        label: '开户账号',
                        prop: 'account',
                        width: '150'
                    },
                    {
                        label: '开票人姓名',
                        prop: 'drawer',
                        width: '100'
                    },
                    {
                        label: '开票时间',
                        prop: 'invoiceDate',
                        width: '150'
                    },
                    {
                        label: '备注',
                        prop: 'remake',
                        width: '150'
                    },
                    {
                        label: '领用状态',
                        prop: 'status',
                        width: '120',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '未领用'
                                    break
                                case 2:
                                    return '已领用'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '领用人姓名',
                        prop: 'recipient',
                        width: '120'
                    },
                    {
                        label: '领用时间',
                        prop: 'recipientsDate',
                        width: '150'
                    },
                    {
                        label: '录入人名称',
                        prop: 'createName',
                        width: '120'
                    },
                    {
                        label: '录入时间',
                        prop: 'createDate',
                        width: '150'
                    }
                ],
                table_data: [],
                url: 'paperList',
                search_item: [
                    {
                        type: 'Input',
                        label: '开票编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'select',
                        label: '类型',
                        placeholder: '请选择',
                        prop: 'type',
                        options: [
                            {
                                label: '增值税专用发票',
                                value: 1
                            },
                            {
                                label: '增值税普通发票',
                                value: 2
                            },
                            {
                                label: '国税通用机打发票',
                                value: 3
                            },
                            {
                                label: '地税通用机打发票',
                                value: 4
                            },
                            {
                                label: '收据',
                                value: 5
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: '抬头类型',
                        placeholder: '请选择',
                        prop: 'invoiceTitleType',
                        options: [
                            {
                                value: 1,
                                label: '企业单位'
                            },
                            {
                                value: 2,
                                label: '个人'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '抬头名称',
                        placeholder: '请选择',
                        prop: 'invoiceTitleName'
                    },
                    {
                        type: 'Int',
                        label: '联系电话',
                        placeholder: '请选择日期',
                        prop: 'tel'
                    },
                    {
                        type: 'select',
                        label: '领用情况',
                        placeholder: '请输入',
                        prop: 'status',
                        options: [
                            {
                                value: 1,
                                label: '未领用'
                            },
                            {
                                value: 2,
                                label: '已领用'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '领用人姓名',
                        placeholder: '请输入',
                        prop: 'recipient'
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
        // 弹窗内下拉框
        cpmBuildingUnitFindAll().then((res) => {
            this.buildOptions = res
        })
    },
    methods: {
        print(){
            this.paymentPreview =true
        },
        dialogPreview(){
            this.paymentPreview = false;
        },
        // getPhotoView(item) {
        //     this.photos_Visible = true
        //     // let resData = {
        //     //   id: id,
        //     // }
        //     // userArticleOutFindGoodsImgById(resData).then(result => {
        //     //   console.log(result)
        //     // this.goodsImgsList = item
        //     // })
        // },
        // getclose() {
        //     this.photos_Visible = false
        // },
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'paperList',
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
        add() {
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.buildValue = null
            this.wordList = []
        },
        addRuleSuccess() {
          let resData = {
            ...this.addForm.ruleForm
          }
          paperInsert(resData).then((res) => {
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
        // 提交
        addSubmit() {
          this.$refs.addForm.submitForm()
        },
        // 单元楼栋
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
        tableCheck(data) {
            this.table_row = data
        },
        get(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条票据领用'
                })
                return
            }
            if(data[0].status!=1){
                this.$message({
                    type: 'error',
                    message: '该票据不可领用'
                })
                return
            }
            this.getDialog = true
            console.log(data)
            this.thatId = data[0].id
        },
        //验证手机号
        confirmTelephone() {
            if (!/^1[0-9]{10}$/.test(this.recipientsTel))
                this.$message({
                    type:'error',
                    message:'请输入正确的手机号'
                })
        },
        // 审核提交
        getOk() {
            let resData = {
                id: this.thatId,
                recipient: this.recipient,
                recipientsTel: this.recipientsTel
            }
            console.log(resData)
            paperRecipients(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                    this.$refs.table.loadData()
                }
            })
            this.getDialog = false
            this.thatId = null
            this.recipient = null
            this.recipientsTel = null
        },
        dialogclose() {},
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
    },
    watch: {
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
        },
        hoursValue: {
            handler(newValue) {
                this.addForm.ruleForm.estateId = newValue
                console.log(this.addForm.ruleForm.estateId)
            },
            deep: true
        },
        'addForm.ruleForm.rate': {
            handler(newValue) {
                console.log(this.addForm.ruleForm.rate)
                console.log(this.addForm.ruleForm.totalPrice)
                this.addForm.ruleForm.taxation =
                    (this.addForm.ruleForm.rate *
                        this.addForm.ruleForm.totalPrice) /
                    100
            }
        },
        'addForm.ruleForm.totalPrice': {
            handler(newValue) {
                console.log(this.addForm.ruleForm.rate)
                console.log(this.addForm.ruleForm.totalPrice)
                this.addForm.ruleForm.taxation =
                    (this.addForm.ruleForm.rate *
                        this.addForm.ruleForm.totalPrice) /
                    100
            }
        },
        'addForm.ruleForm.invoiceTitleType': {
            handler(newValue) {
                if (newValue == 2) {
                    this.addForm.form_item[11].disabled = true
                    this.addForm.form_item[12].disabled = true
                    this.addForm.form_item[13].disabled = true
                } else {
                    this.addForm.form_item[11].disabled = false
                    this.addForm.form_item[12].disabled = false
                    this.addForm.form_item[13].disabled = false
                }
            }
        }
    },
    //过滤器 过滤日期
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.substring(0, 10)
        }
    }
}
</script>
