<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>评价管理</span>
            </div>
            <div class="content">
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template v-slot:score="slotData">
                            <div>
                                <el-rate
                                    :value="slotData.data.score / 2"
                                    :colors="colors"
                                    disabled
                                ></el-rate>
                            </div>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button @click="send(table_row)">发货</button>
                                <button @click="arrival(table_row)">到货</button> -->
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
import { shopOrderDeliverGoods, orderArrivalGoods } from '@/api/shop'
export default {
    components: {
        viewsPhoto
    },
    data() {
        return {
            photos_Visible: false,
            colors: ['#FB4702', '#FB4702', '#FB4702'],
            goodsImgsList: [],
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '订单号', prop: 'code', width: '120' },
                    { label: '商品名称', prop: 'goodsName', width: 'auto' },
                    {
                        label: '一级分类名称',
                        prop: 'categoryLevelOne',
                        width: '120'
                    },
                    {
                        label: '二级分类名称',
                        prop: 'categoryLevelTwo',
                        width: '100'
                    },
                    {
                        label: '评分',
                        prop: 'score',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'score'
                    },
                    {
                        label: '评价时间',
                        prop: 'evaluationDate',
                        width: 'auto'
                    },
                    {
                        label: '评价原因',
                        prop: 'evaluationReason',
                        width: 'auto'
                    },
                    { label: '评价人姓名', prop: 'createName', width: '100' },
                    { label: '评价人手机号', prop: 'createTel', width: 'auto' }
                ],
                table_data: [],
                url: 'shopEvaluationList',
                search_item: [
                    {
                        type: 'select',
                        label: '评价',
                        placeholder: '请选择',
                        options: [
                            { value: 1, label: '差评' },
                            { value: 2, label: '中评' },
                            { value: 3, label: '好评' },
                        ],
                        prop: 'score'
                    },
                    {
                        type: 'Int',
                        label: '客户手机号',
                        placeholder: '请输入手机号',
                        prop: 'tel'
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
                        this.$refs.table.requestData()
                    }
                })
            }
        },
        //到货 只有已发货状态才可以发货
        arrival(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一个订单到货'
                })
            } else if (data[0].status != 2) {
                this.$message({
                    type: 'error',
                    message: '该状态不可到货'
                })
            } else {
                orderArrivalGoods({ id: data[0].id }).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.requestData()
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
