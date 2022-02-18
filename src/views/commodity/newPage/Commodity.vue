<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>商品管理</span>
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
                                <el-tab-pane label="全部"></el-tab-pane>
                            </el-tabs>
                        </template>
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
                                        :src="slotData.data.mainPhoto"
                                        style="width: 50%"
                                    />
                                </div>
                                <div style="width: 500%">
                                    {{ slotData.data.skuName }}
                                </div>
                            </div>
                        </template>
                        <template v-slot:category="slotData">
                            <span
                                >{{ slotData.data.categoryFirstName }}/{{
                                    slotData.data.categorySecondName
                                }}/{{ slotData.data.categoryThirdName }}</span
                            >
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="show(table_row)">预览</button>
                                <button @click="sploading(table_row)">
                                    上架
                                </button>
                                <button @click="unloading(table_row)">
                                    下架
                                </button>
                                <button @click="modify(table_row)">
                                    修改
                                </button>
                            </div>
                        </template>
                    </VueTable>
                </div>
            </div>
            <Drawer
                drawerTitle="商品详情"
                @drawerClose="addClose"
                :drawerVrisible="add_vrisible"
            >
                <div style="padding: 30px">
                    <FromCard>
                        <!-- {{addForm2.ruleForm}} -->
                        <template slot="title">详情</template>
                        <template>
                            <VueForm ref="addForm" :formObj="addForm">
                                <template slot="imgUrls">
                                    <div class="demo-image__preview">
                                        <el-image
                                            style="width: 100px; height: 100px"
                                            :src="addForm.ruleForm.mainPhoto"
                                        >
                                        </el-image>
                                    </div>
                                </template>
                                <template slot="status">
                                    <span v-if="addForm.ruleForm.status===1">上架</span>
                                    <span v-else-if="addForm.ruleForm.status===0">下架</span>
                                </template>
                                <template slot="shopStatus">
                                    <span v-if="addForm.ruleForm.shopStatus===1">上架</span>
                                    <span v-else-if="addForm.ruleForm.shopStatus===0">下架</span>
                                </template>
                                <template slot="img">
                                    <div v-for="item in addForm.ruleForm.Info" :key="item">
                                        <el-image
                                            style="width: 100%; height: 100%"
                                            :src="'https://' + item"
                                        >
                                        </el-image>
                                    </div>
                                </template>
                            </VueForm>
                            <!-- {{ addForm.ruleForm }} -->
                        </template>
                    </FromCard>
                </div>
            </Drawer>
            <Drawer
                drawerTitle="修改价格"
                @drawerClose="modifyClose"
                :drawerVrisible="modify_vrisible"
            >
                <div style="padding: 30px">
                    <FromCard>
                        <!-- {{modifyForm.ruleForm}} -->
                        <template slot="title">商品价格</template>
                        <template>
                            <VueForm ref="modifyForm" :formObj="modifyForm" @ruleSuccess="moRuleSuccess">
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
</template>

<script>
import {
    jcookGoodsOnShelf,
    jcookGoodsOffShelf,
    jcookGoodsFindDetailById,
    jcookGoodsFindGoodsDetailBigInfo,
    jcookGoodsUpdatePrice
} from '@/api/shop.js'
import drawer from '../../../components/Drawer/drawer.vue'
export default {
    // components: { drawer },
    data() {
        return {
            add_vrisible: false,
            modify_vrisible: false,
            addDate: null,
            table_row: [],
            loading: false,
            cateOptions: [],
            supplierOptions: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    {
                        label: '商品名称',
                        prop: 'skuName',
                        width: '300',
                        type: 'slot',
                        slotName: 'names'
                    },
                    { label: '京库克SKU编码', prop: 'skuId', width: 'auto' },
                    { label: '折扣价', prop: 'discountPrice', width: 'auto' },
                    { label: '售卖价', prop: 'sellPrice', width: 'auto' },
                    { label: '商铺名称', prop: 'shopName', width: 'auto' },
                    { label: '供应商名称', prop: 'vendorName', width: 'auto' },
                    { label: '品牌名称', prop: 'brandName', width: 'auto' },
                    {
                        label: '商品分类',
                        prop: 'categoryFirstName',
                        width: '200',
                        type: 'slot',
                        slotName: 'category'
                    },
                    {
                        label: '京库克上架状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '上架'
                                    break
                                case 0:
                                    return '下架'
                                    break
                            }
                        }
                    },
                    {
                        label: '商品状态',
                        prop: 'shopStatus',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.shopStatus) {
                                case 1:
                                    return '上架'
                                    break
                                case 0:
                                    return '下架'
                                    break
                            }
                        }
                    },
                    { label: '创建时间', prop: 'updatedAt', width: '220' }
                ],
                table_data: [],
                url: 'jcookGoodsList',
                search_item: [
                    {
                        type: 'Input',
                        label: 'sku编码',
                        placeholder: '请输入',
                        prop: 'skuId'
                    },
                    {
                        type: 'Input',
                        label: '商品名称',
                        placeholder: '请输入',
                        prop: 'skuName'
                    },
                    {
                        type: 'Input',
                        label: '供应商名称',
                        placeholder: '请输入',
                        prop: 'vendorName'
                    },
                    {
                        type: 'select',
                        label: '库客上架状态',
                        placeholder: '请选择',
                        value: null,
                        options: [
                            { value: 1, label: '上架' },
                            { value: 0, label: '下架' }
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'select',
                        label: '商品状态',
                        placeholder: '请选择',
                        value: null,
                        options: [
                            { value: 1, label: '上架' },
                            { value: 0, label: '下架' }
                        ],
                        prop: 'shopStatus'
                    }
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            },
            addForm: {
                ruleForm: {
                    id: null,
                    skuId: null,
                    skuName: null,
                    shopName: null,
                    vendorName: null,
                    brandName: null,
                    categoryFirstName: null,
                    categorySecondName: null,
                    categoryThirdName: null,
                    mainPhoto: null,
                    status: null,
                    shopStatus: null,
                    supplyPrice: null,
                    guidePrice: null,
                    sellPrice: null,
                    discountPrice: null,
                    tax: null,
                    yn: null,
                    unit: null,
                    updatedAt: null,
                    viewsNum: null,
                    Info: null
                },
                form_item: [
                    {
                        type: 'Slot',
                        width: '50%',
                        label: '商品图片',
                        prop: 'mainPhoto',
                        slotName: 'imgUrls',
                        width: '100%'
                    },
                    {
                        type: 'span',
                        label: '商品名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'skuName'
                    },
                    {
                        type: 'span',
                        label: '小蜜蜂SKU编码',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'skuId'
                    },
                    {
                        type: 'span',
                        label: '商铺名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'shopName'
                    },
                    {
                        type: 'span',
                        label: '优惠价',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'discountPrice'
                    },
                    {
                        type: 'span',
                        label: '原价',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'sellPrice'
                    },
                    {
                        type: 'span',
                        label: '供应商名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'vendorName'
                    },
                    {
                        type: 'Slot',
                        label: '京库克商品状态',
                        placeholder: '请输入',
                        width: '50%',
                        slotName: 'status',
                        prop: 'status'
                    },
                    {
                        type: 'span',
                        label: '商品分类',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'categoryFirstName'
                    },
                    {
                        type: 'Slot',
                        label: '小蜜蜂商品状态',
                        placeholder: '请输入',
                        width: '50%',
                        slotName: 'shopStatus',
                        prop: 'shopStatus'
                    },
                    {
                        type: 'span',
                        label: '品牌名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'brandName'
                    },
                    {
                        type: 'span',
                        label: '创建时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'updatedAt'
                    },
                    {
                        type: 'Slot',
                        width: '50%',
                        label: '商品详情',
                        prop: 'Info',
                        slotName: 'img',
                        width: '100%'
                    },
                ]
            },
            modifyForm: {
                ruleForm: {
                    id: null,
                    sellPrice: null,
                    discountPrice: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '优惠价',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'discountPrice'
                    },
                    {
                        type: 'Input',
                        label: '售卖价',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'sellPrice'
                    }
                ]
            }
        }
    },
    methods: {
        addClose() {
            this.add_vrisible = false
        },
        modifyClose() {
            this.$refs.modifyForm.reset()
            this.modify_vrisible = false
        },
        //shangija
        sploading(data) {
            // if (data.length > 1) {
            //     this.$message.error('只能操作一条数据')
            //     return
            // }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                if (data[0].status == 1) {
                    this.$message({
                        message: '上架失败',
                        type: 'error'
                    })
                } else {
                    var arr = []
                    data.forEach((element) => {
                        arr.push(element.id)
                    })
                    jcookGoodsOnShelf({ ids: arr }).then((res) => {
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
            }
        },
        unloading(data) {
            // if (data.length > 1) {
            //     this.$message.error('只能操作一条数据')
            //     return
            // }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                if (data[0].status == 1) {
                    this.$message({
                        message: '上架失败',
                        type: 'error'
                    })
                } else {
                    var arr = []
                    data.forEach((element) => {
                        arr.push(element.id)
                    })
                    jcookGoodsOffShelf({ ids: arr }).then((res) => {
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
            }
        },
        moRuleSuccess() {
                let resData = {
                ...this.modifyForm.ruleForm
                }
                jcookGoodsUpdatePrice(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    console.log(resData)
                    this.$refs.table.loadData()
                    this.modifyClose()
                }
            })
        },
        modify(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                this.modify_vrisible = true
                this.modifyForm.ruleForm.id = data[0].id
                this.modifyForm.ruleForm.sellPrice = data[0].sellPrice
                this.modifyForm.ruleForm.discountPrice = data[0].discountPrice
            }
        },
        addSubmit() {
            this.$refs.modifyForm.submitForm()
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
                jcookGoodsFindDetailById({ jcookGoodsId: data[0].id }).then(
                    (res) => {
                        this.addForm.ruleForm = res.data
                        jcookGoodsFindGoodsDetailBigInfo({jcookGoodsId: data[0].id}).then((resl)=> {
                            this.addForm.ruleForm.Info = []
                            resl.data.forEach(dat => {
                                this.addForm.ruleForm.Info.push(dat.split('//')[1])
                            })
                            this.add_vrisible = true
                        })
                    }
                )
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
        }
    }
}
</script>
