<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>订单管理</span>
            </div>
            <div class="content">
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="show(table_row)">详情</button>
                                <button @click="add(table_row)">
                                    取消订单
                                </button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="取消订单"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <!-- {{ addForm.ruleForm }} -->
                        <FromCard>
                            <template slot="title">基本信息</template>
                            <template>
                                <VueForm
                                    ref="addForm"
                                    :formObj="addForm"
                                    @ruleSuccess="addRuleSuccess"
                                >
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
                <!-- 详情 -->
                <Drawer
                    drawerTitle="商品详情"
                    @drawerClose="detailClose"
                    :drawerVrisible="detail_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <!-- {{addForm2.ruleForm}} -->
                            <template slot="title">详情</template>
                            <template>
                                <VueForm ref="detailForm" :formObj="detailForm">
                                    <template slot="tradeStatus">
                                        <span
                                            v-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 0
                                            "
                                            >未付款交易超时关闭或支付完成后全额退款</span
                                        >
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 1
                                            "
                                            >交易创建并等待买家付款</span
                                        >
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 2
                                            "
                                        >
                                            交易支付成功（待发货）
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 3
                                            "
                                        >
                                            交易结束并不可退款
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 4
                                            "
                                        >
                                            出库（待收货）
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 5
                                            "
                                        >
                                            订单完成
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 6
                                            "
                                        >
                                            申请取消
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 7
                                            "
                                        >
                                            申请拒收
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 8
                                            "
                                        >
                                            取消订单失败
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 9
                                            "
                                        >
                                            取消订单成功
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 10
                                            "
                                        >
                                            发生拆单
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm
                                                    .tradeStatus === 11
                                            "
                                        >
                                            售后换新
                                        </span>
                                    </template>
                                    <template slot="payType">
                                        <span
                                            v-if="
                                                detailForm.ruleForm.payType ===
                                                1
                                            "
                                            >支付宝</span
                                        >
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm.payType ===
                                                2
                                            "
                                            >微信</span
                                        >
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm.payType ===
                                                3
                                            "
                                        >
                                            现金
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm.payType ===
                                                4
                                            "
                                        >
                                            pos
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm.payType ===
                                                5
                                            "
                                        >
                                            预缴扣除
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm.payType ===
                                                6
                                            "
                                        >
                                            银行卡
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm.payType ===
                                                7
                                            "
                                        >
                                            支票
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm.payType ===
                                                8
                                            "
                                        >
                                            转账
                                        </span>
                                        <span
                                            v-else-if="
                                                detailForm.ruleForm.payType ===
                                                9
                                            "
                                        >
                                            开发商代付
                                        </span>
                                    </template>
                                </VueForm>
                                <div style="padding: 20px">
                                    <!-- 表格 -->
                                    <VueTable ref="table" :config="config2">
                                        <template v-slot:names="slotData">
                                            <!-- <span>{{slotData.data.mainPhoto}}</span> -->
                                            <div
                                                style="
                                                    display: flex;
                                                    justify-content: center;
                                                    align-items: center;
                                                "
                                            >
                                                <div>
                                                    <img
                                                        :src="
                                                            slotData.data
                                                                .mainPhoto
                                                        "
                                                        style="width: 50%"
                                                    />
                                                </div>
                                                <div style="width: 500%">
                                                    {{ slotData.data.skuName }}
                                                    <div
                                                        style="color: lightgrey"
                                                    >
                                                        商品ID
                                                        {{
                                                            slotData.data
                                                                .jcookGoodsId
                                                        }}
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </VueTable>
                                </div>
                            </template>
                        </FromCard>
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
</template>

<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'
import {
    shopOrderDeliverGoods,
    orderArrivalGoods,
    jcookOrderCancel,
    jcookOrderFindDetail
} from '@/api/shop'
export default {
    data() {
        return {
            photos_Visible: false,
            add_vrisible: false,
            detail_vrisible: false,
            goodsImgsList: [],
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '小蜜蜂订单号', prop: 'code', width: '100' },
                    { label: '付款金额', prop: 'payPrice', width: 'auto' },
                    { label: '运费', prop: 'freightFee', width: 'auto' },
                    { label: '支付人名称', prop: 'payName', width: 'auto' },
                    { label: '支付人联系方式', prop: 'payTel', width: 'auto' },
                    {
                        label: '交易状态',
                        prop: 'tradeStatus',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.tradeStatus) {
                                case 0:
                                    return '待付款'
                                    break
                                case 1:
                                    return '支付超时'
                                    break
                                case 2:
                                    return '待发货'
                                    break
                                case 3:
                                    return '交易结束并不可退款'
                                    break
                                case 4:
                                    return '待收货'
                                    break
                                case 5:
                                    return '订单完成'
                                    break
                                case 6:
                                    return '申请取消'
                                    break
                                case 7:
                                    return '申请拒收'
                                    break
                                case 8:
                                    return '取消订单失败'
                                    break
                                case 9:
                                    return '取消订单成功'
                                    break
                                case 10:
                                    return '发生拆单'
                                    break
                                case 11:
                                    return '售后换新'
                                    break
                            }
                        }
                    },
                    { label: '订单付款时间', prop: 'createDate', width: 'auto' }
                ],
                table_data: [],
                url: 'jcookOrderList',
                search_item: [
                    {
                        type: 'Input',
                        label: '小蜜蜂订单编号',
                        placeholder: '请输入订单编号',
                        prop: 'code'
                    },
                    {
                        type: 'select',
                        label: '订单状态',
                        placeholder: '请选择',
                        options: [
                            {
                                value: 0,
                                label: '未付款交易超时关闭或支付完成后全额退款'
                            },
                            { value: 1, label: '交易创建并等待买家付款' },
                            { value: 2, label: '交易支付成功（待发货）' },
                            { value: 3, label: '交易结束并不可退款' },
                            { value: 4, label: '出库（待收货）' },
                            { value: 5, label: '订单完成' },
                            { value: 6, label: '申请取消' },
                            { value: 7, label: '申请拒收' },
                            { value: 8, label: '取消订单失败' },
                            { value: 9, label: '取消订单成功' },
                            { value: 10, label: '发生拆单' },
                            { value: 11, label: '售后换新' }
                        ],
                        prop: 'tradeStatus'
                    }
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            },
            addForm: {
                ruleForm: {
                    orderId: null,
                    cancelReasonCode: null
                },
                rules: {
                    cancelReasonCode: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ]
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '取消原因',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'cancelReasonCode',
                        options: [
                            {
                                label: '订单不能按预计时间送达',
                                value: 1
                            },
                            {
                                label: '其他渠道价格更',
                                value: 2
                            },
                            {
                                label: '该商品降价了',
                                value: 3
                            },
                            {
                                label: '不想买了',
                                value: 4
                            },
                            {
                                label: '其他原因',
                                value: 5
                            },
                            {
                                label: '操作有误(商 品、地址等选错)',
                                value: 6
                            },
                            {
                                label: '商品无货',
                                value: 7
                            },
                            {
                                label: '其他',
                                value: 100
                            }
                        ]
                    }
                ]
            },
            detailForm: {
                ruleForm: {
                    id: 16,
                    code: '4290a213aeaa4a029863da95f395d072',
                    jcookCode: '50132099386138624',
                    tradeNo: null,
                    tradeStatus: 9,
                    payName: '许笨笨',
                    payTel: '13738611465',
                    payType: 1,
                    payPrice: 8,
                    freightFee: 5,
                    receiverName: '旺仔3',
                    receiverTel: '13738611465',
                    locationName: '北京 市辖区 西城区 60号',
                    addressDetail: '60号',
                    remake: null,
                    createName: '许笨笨',
                    createDate: '2021-11-23 16:44:48',
                    skuList: [
                        {
                            jcookGoodsId: 176097,
                            skuId: 7766048,
                            skuName: '凤凰 OT1.5-3 圆形冷压端子 /个 定制',
                            mainPhoto:
                                'http://oss.jcook.com.cn/file5/7766048/7766048_0.jpg',
                            sellPrice: 1,
                            kind: 1,
                            weight: 1,
                            unit: '个',
                            num: 3,
                            payPrice: 3
                        }
                    ]
                },
                form_item: [
                    {
                        type: 'span',
                        label: '小蜜蜂的订单号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'code'
                    },
                    {
                        type: 'span',
                        label: 'jcook的订单号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'jcookCode'
                    },
                    {
                        type: 'span',
                        label: '支付宝交易号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'tradeNo'
                    },
                    {
                        type: 'Slot',
                        label: '交易状态',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'tradeStatus',
                        slotName: 'tradeStatus'
                    },
                    {
                        type: 'span',
                        label: '支付人名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'payName'
                    },
                    {
                        type: 'span',
                        label: '支付人联系方式',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'payTel'
                    },
                    {
                        type: 'Slot',
                        label: '付款方式',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'payType',
                        slotName: 'payType'
                    },
                    {
                        type: 'span',
                        label: '付款金额',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'payPrice'
                    },
                    {
                        type: 'span',
                        label: '运费',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'freightFee'
                    },
                    {
                        type: 'span',
                        label: '收货人',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'receiverName'
                    },
                    {
                        type: 'span',
                        label: '收货人手机',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'receiverTel'
                    },
                    {
                        type: 'span',
                        label: '所在地区名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'locationName'
                    },
                    {
                        type: 'span',
                        label: '详细地址',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'addressDetail'
                    },
                    {
                        type: 'span',
                        label: '备注',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'remake'
                    },
                    {
                        type: 'span',
                        label: '创建人',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'createName'
                    },
                    {
                        type: 'span',
                        label: '创建订单时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'createDate'
                    }
                ]
            },
            config2: {
                checkbox: false,
                thead: [
                    {
                        label: '商品名称',
                        prop: 'skuName',
                        width: '300',
                        type: 'slot',
                        slotName: 'names'
                    },
                    { label: '商品单位', prop: 'unit', width: 'auto' },
                    { label: '单价', prop: 'sellPrice', width: 'auto' },
                    { label: '购买数量', prop: 'num', width: 'auto' },
                    { label: '重量(kg)', prop: 'weight', width: 'auto' },
                    { label: '付款金额(元)', prop: 'payPrice', width: 'auto' }
                ],
                // url: 'voteListDetailList',
                table_data: [
                    {
                        jcookGoodsId: 176097,
                        skuId: 7766048,
                        skuName: '凤凰 OT1.5-3 圆形冷压端子 /个 定制',
                        mainPhoto:
                            'http://oss.jcook.com.cn/file5/7766048/7766048_0.jpg',
                        sellPrice: 1,
                        kind: 1,
                        weight: 1,
                        unit: '个',
                        num: 3,
                        payPrice: 3
                    }
                ],
                search_item: [],
                data: {
                    pageNum: 1,
                    size: 5,
                    id: 1
                }
            }
        }
    },
    methods: {
        addSubmit() {
            this.$refs.addForm.submitForm()
        },
        add(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                this.add_vrisible = true
                this.addForm.ruleForm.orderId = data[0].id
            }
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.$refs.table.loadData()
        },
        detailClose() {
            this.$refs.detailForm.reset()
            this.detail_vrisible = false
        },
        addRuleSuccess() {
            let resData = {
                ...this.addForm.ruleForm
            }
            jcookOrderCancel(resData).then((res) => {
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
        show(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                this.detailForm.ruleForm = data[0]
                jcookOrderFindDetail({
                    orderId: this.detailForm.ruleForm.id
                }).then((res) => {
                    if (res.status) {
                        // this.$message({
                        //     message: res.message,
                        //     type: 'success'
                        // })
                        this.detailForm.ruleForm = res.data
                        this.config2.table_data = res.data.skuList
                        this.detail_vrisible = true
                    }
                })
            }
        },
        tableCheck(data) {
            this.table_row = data
        }
    }
}
</script>
