<style lang="scss" scoped>
.main {
    margin: 20px;
    .head-box {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #cfd0dd;
        margin-bottom: 20px;
        .titel {
            line-height: 50px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            padding-left: 20px;
            border-bottom: 1px solid #d8d8d8;
        }
    }
    .box {
        background: #fff;
        padding: 20px;
        margin: 20px 0;
        border-radius: 4px;
        border: 1px solid #cfd0dd;

        .title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
        }
    }
}
</style>
<template>
    <div>
        <div class="main-content" v-show="handleChangeShow">
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
                                <button @click="detail(table_row)">详情</button>
                                <button @click="del(table_row)">删除</button>
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
                                    <template v-slot:discountRate>
                                        <el-input
                                            v-model="
                                                addForm.ruleForm.discountRate
                                            "
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
                        <FromCard
                            v-show="this.addForm.ruleForm.isInvoice == 1"
                            style="margintop: 20px"
                        >
                            <template slot="title">发票信息</template>
                            <template>
                                <VueForm ref="fpForm" :formObj="fpForm">
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
        <div v-show="!handleChangeShow">
            <div class="main details-box" v-if="!handleChangeShow">
                <div class="head-box">
                    <div class="titel">
                        <span>物资出入库详情</span>
                    </div>
                    <div class="content">
                        <span>记录单号：{{ detailData.code }}</span>
                        <div class="flex justify-between align-center">
                            <div>
                            </div>
                            <div>
                                <button
                                    class="btn-orange"
                                    @click="handleChangeShow = true"
                                >
                                    <span> 返回</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="title">
                        <span>出入库信息</span>
                    </div>
                    <!-- detailData -->
                    <div class="box-item">
                        <div class="item">
                            <div class="span">
                                <span>物料名称</span>
                            </div>
                            <div>
                                <span>{{detailData.name}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>类型</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.type===1?'出库':'入库'
                                }}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>数量</span>
                            </div>
                            <div>
                                <span>{{ detailData.num}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>单价</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.unitPrice+' 元'
                                }}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>单位</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.unit
                                }}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>折扣率</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.discountRate+'%'
                                }}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>折扣额</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.discountFrontal+' 元'
                                }}</span>
                            </div>
                        </div>
                         <div class="item">
                            <div class="span">
                                <span>总金额</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.totalPrice+' 元'
                                }}</span>
                            </div>
                        </div>
                         <div class="item">
                            <div class="span">
                                <span>有无发票</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.isInvoice===1?'有':'无'
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box" v-if="this.detailData.isInvoice ===1">
                    <div class="title">
                        <span>发票信息</span>
                    </div>
                    <!-- detailData -->
                    <div class="box-item">
                        <div class="item">
                            <div class="span">
                                <span>抬头类型</span>
                            </div>
                            <div>
                                <span>{{detailData.invoiceTitleType===1?'企业单位':'个人'}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>抬头名称</span>
                            </div>
                            <div>
                                <span>{{ detailData.invoiceTitleName}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>购方税号</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.acquiringEin
                                }}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>联系电话</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.tel
                                }}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>开票时间</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.invoiceDate
                                }}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>发票备注</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.remakes
                                }}</span>
                            </div>
                        </div>
                         <div class="item">
                            <div class="span">
                                <span>创建人名称</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.createName
                                }}</span>
                            </div>
                        </div>
                         <div class="item">
                            <div class="span">
                                <span>创建时间</span>
                            </div>
                            <div>
                                <span>{{
                                    detailData.createDate
                                }}</span>
                            </div>
                        </div>
                        <!-- <div class="item">
                            <div class="span">
                                <span>发票照片</span>
                            </div>
                            <div v-if="detailData.imgList.length">
                                <el-image
                                    style="width: 100px; height: 100px"
                                    :src="
                                        $ImgUrl +
                                        detailData.imgList[0].url
                                    "
                                    fit="fit"
                                ></el-image>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    materialRecordInsert,
    materialList,
    materialRecordFindById
} from '@/api/daily'
export default {
    data() {
        return {
            handleChangeShow: true,
            add_vrisible: false,
            // detail_vrisible: false,
            addDate: null,
            options: [],
            detailData: {
                code: null,

                name: null,
                type: null,
                num: null,
                unitPrice: null,
                unit: null,
                discountRate:null,
                discountFrontal: null,
                totalPrice: null,
                isInvoice: null,

                invoiceTitleType: null,
                invoiceTitleName: null,
                acquiringEin: null,
                tel: null,
                invoiceDate: null,
                remakes: null,
                createName: null,
                createDate: null
            },
            addForm: {
                ruleForm: {
                    code: null,
                    materialId: null,
                    type: null,
                    num: null,
                    unitPrice: null,

                    discountRate: null,
                    isInvoice: null,

                    totalPrice: null
                },
                rules: {},
                form_item: [
                    {
                        type: 'Input',
                        label: '记录单号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'code'
                    },
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
                    },
                    {
                        type: 'Input',
                        label: '单价',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'unitPrice'
                    },
                    {
                        type: 'Slot',
                        label: '折扣率',
                        width: '50%',
                        prop: 'discountRate',
                        slotName: 'discountRate'
                    },
                    {
                        // 单价*数量*折扣率
                        type: 'Input',
                        label: '折扣额',
                        // placeholder: '请输入',
                        disabled: true,
                        width: '50%',
                        prop: 'discountFrontal'
                    },
                    {
                        // 实际金额-折扣额
                        type: 'Input',
                        label: '总金额',
                        // placeholder: '请输入',
                        disabled: true,
                        width: '50%',
                        prop: 'totalPrice'
                    },
                    {
                        type: 'Select',
                        label: '有无发票',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'isInvoice',
                        options: [
                            {
                                label: '有',
                                value: 1
                            },
                            {
                                label: '无',
                                value: 0
                            }
                        ]
                    }
                ]
            },
            fpForm: {
                ruleForm: {
                    invoiceTitleType: null,
                    invoiceTitleName: null,
                    acquiringEin: null,
                    tel: null,
                    invoiceDate: null,
                    remakes: null
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '抬头类型',
                        placeholder: '请选择',
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
                        label: '购方税号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'acquiringEin'
                    },
                    {
                        type: 'Input',
                        label: '联系电话',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'tel'
                    },
                    {
                        type: 'DateTime',
                        label: '开票时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'invoiceDate'
                    },
                    {
                        type: 'Input',
                        label: '开票备注',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'remakes'
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
                this.addForm.form_item[1].options.push(obj)
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
            // if (this.addForm.ruleForm.isInvoice != 1) {
            //     let resData = {
            //         ...this.addForm.ruleForm
            //     }
            //     console.log(resData)
            // } else {
            let resData = {
                ...this.addForm.ruleForm,
                ...this.fpForm.ruleForm
            }
            //     console.log(resData)
            // }
            // console.log(resData);
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
        detail(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能查看一条详情',
                    type: 'error'
                })
            } else {
                this.handleChangeShow = false
                console.log(data[0].id)
                materialRecordFindById({ id: data[0].id }).then((res) => {
                    console.log(res)
                    this.detailData.code = res.data.code
                    this.detailData.name = res.data.name

                    this.detailData.type = res.data.type
                    this.detailData.num = res.data.num

                    this.detailData.unitPrice = res.data.unitPrice
                    this.detailData.unit = res.data.unit
                    this.detailData.discountRate = res.data.discountRate
                    this.detailData.discountFrontal = res.data.discountFrontal
                    this.detailData.totalPrice = res.data.totalPrice
                    this.detailData.isInvoice = res.data.isInvoice
                    this.detailData.invoiceTitleType = res.data.invoiceTitleType
                    this.detailData.invoiceTitleName = res.data.invoiceTitleName
                    this.detailData.acquiringEin = res.data.acquiringEin
                    this.detailData.tel = res.data.tel
                    this.detailData.invoiceDate = res.data.invoiceDate
                    this.detailData.remakes = res.data.remakes
                    this.detailData.createName = res.data.createName
                    this.detailData.createDate = res.data.createDate
                })
            }
        },
        // detailClose() {
        //     this.$refs.detailForm.reset()
        //     this.detail_vrisible = false
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
    },
    watch: {
        // 监听折扣率计算折扣额和总金额
        'addForm.ruleForm.discountRate': {
            handler(newVal) {
                console.log(newVal)
                this.addForm.ruleForm.discountFrontal =
                    (this.addForm.ruleForm.unitPrice *
                        newVal *
                        this.addForm.ruleForm.num) /
                    100
                this.addForm.ruleForm.totalPrice =
                    this.addForm.ruleForm.num *
                        this.addForm.ruleForm.unitPrice -
                    this.addForm.ruleForm.discountFrontal
            }
        },
        // 监听数量计算折扣额和总金额
        'addForm.ruleForm.num': {
            handler(newVal) {
                console.log(newVal)
                this.addForm.ruleForm.discountFrontal =
                    (this.addForm.ruleForm.unitPrice *
                        newVal *
                        this.addForm.ruleForm.discountRate) /
                    100
                this.addForm.ruleForm.totalPrice =
                    this.addForm.ruleForm.num *
                        this.addForm.ruleForm.unitPrice -
                    this.addForm.ruleForm.discountFrontal
            }
        },
        // 监听单价计算折扣额和总金额
        'addForm.ruleForm.unitPrice': {
            handler(newVal) {
                console.log(newVal)
                this.addForm.ruleForm.discountFrontal =
                    (this.addForm.ruleForm.discountRate *
                        newVal *
                        this.addForm.ruleForm.num) /
                    100
                this.addForm.ruleForm.totalPrice =
                    this.addForm.ruleForm.num *
                        this.addForm.ruleForm.unitPrice -
                    this.addForm.ruleForm.discountFrontal
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.details-box {
    .box-item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        .item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            width: 50%;
            .span {
                width: 100px;
                text-align: right;
                margin-right: 20px;
            }
        }
    }
}
</style>