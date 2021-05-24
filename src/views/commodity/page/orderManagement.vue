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
                                <button @click="send(table_row)">发货</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
            </div>
        </div>
        <views-photo
            :isVisible="photos_Visible"
            :goodsImgsList="goodsImgsList"
            @closeViews="getclose"
        ></views-photo>
    </div>
</template>

<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'
import { shopOrderDeliverGoods } from '@/api/shop'
export default {
    components: {
        viewsPhoto
    },
    data() {
        return {
            photos_Visible: false,
            goodsImgsList: [],
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '订单号', prop: 'code', width: '100' },
                    { label: '商品名称', prop: 'goodsName', width: 'auto' },
                    {
                        label: '商品照片',
                        prop: 'goodsImgList',
                        width: '150',
                        type: 'slot',
                        slotName: 'goodsImgList'
                    },
                    { label: '售卖价', prop: 'sellingPrice', width: 'auto' },
                    { label: '划线价', prop: 'markingPrice', width: 'auto' },
                    { label: '数量', prop: 'num', width: 'auto' },
                    {
                        label: '客户信息',
                        prop: 'userName',
                        width: '230',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.userTel) {
                                return row.userName + ' ' + row.userTel
                            }
                        }
                    },
                    {
                        label: '订单状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '待发货'
                                    break
                                case 2:
                                    return '已发货'
                                    break
                                case 3:
                                    return '交易中'
                                    break
                                case 4:
                                    return '已收货'
                                    break

                                case 6:
                                    return '已评价'
                                    break
                                case 8:
                                    return '申请退换货'
                                    break
                                case 9:
                                    return '申请通过'
                                    break
                                case 10:
                                    return '申请驳回'
                                    break
                            }
                        }
                    },
                    {
                        label: '到货时间说明',
                        prop: 'arrivalTime',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'shopOrderList',
                search_item: [
                    {
                        type: 'Input',
                        label: '订单编号',
                        placeholder: '请输入订单编号',
                        prop: 'code'
                    },
                    {
                        type: 'select',
                        label: '订单状态',
                        placeholder: '请选择',
                        options: [
                            { value: 1, label: '待发货' },
                            { value: 2, label: '已发货' },
                            { value: 3, label: '交易中' },
                            { value: 4, label: '已收货' },
                            { value: 6, label: '已评价' },
                            { value: 8, label: '申请退换货' },
                            { value: 9, label: '申请通过' },
                            { value: 10, label: '申请驳回' },
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'Int',
                        label: '客户手机号',
                        placeholder: '请输入手机号',
                        prop: 'userTel'
                    }
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    methods: {
        getPhotoView(item) {
            this.photos_Visible = true
            // let resData = {
            //   id: id,
            // }
            // userArticleOutFindGoodsImgById(resData).then(result => {
            //   console.log(result)
            this.goodsImgsList = item
            // })
        },
        getclose() {
            this.photos_Visible = false
        },
        send(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一个订单发货'
                })
            } else {
                shopOrderDeliverGoods({ id: data[0].id }).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
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
