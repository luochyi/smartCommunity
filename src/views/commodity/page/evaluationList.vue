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
                                <!-- <button @click="send(table_row)">发货</button> -->
                                <button @click="reply(table_row)">回复</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <el-dialog
                    title="评价回复"
                    width="480px"
                    top="40vh"
                    @close="dialogclose()"
                    :visible.sync="replyDialog"
                >
                    <div class="dialang-box">
                        <el-input
                            placeholder="客服回复内容"
                            size="mini"
                            type="textarea"
                            v-model="replyContent"
                            style="width: 423px; height: 32px"
                        ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="replyDialog = false"
                            >取 消</el-button
                        >
                        <el-button size="mini" type="primary" @click="replyOk()"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'
import { shopOrderDeliverGoods, orderArrivalGoods ,shopEvaluationReply} from '@/api/shop'
export default {
    data() {
        return {
            thatId:null,
            photos_Visible: false,
            replyContent: null,
            replyDialog: false,
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
                    { label: '评价人手机号', prop: 'createTel', width: 'auto' },
                    { label: '客户回复内容', prop: 'replyContent', width: 'auto' },
                    { label: '客户回复时间', prop: 'replyDate', width: 'auto' }
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
                            { value: 3, label: '好评' }
                        ],
                        prop: 'score'
                    },
                    {
                        type: 'Int',
                        label: '客户手机号',
                        placeholder: '请输入手机号',
                        prop: 'tel'
                    },
                    {
                        type: 'select',
                        label: '回复状态',
                        placeholder: '请选择',
                        options: [
                            { value: 1, label: '已回复' },
                            { value: 2, label: '未回复' },
                        ],
                        prop: 'replyStatus'
                    },
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    methods: {
        //回复
        reply(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条评价回复'
                })
            } else {
                console.log(data)
                this.replyDialog = true
                console.log(data)
                this.thatId = data[0].id
            }
        },
         // 回复提交
        replyOk() {
            if(this.replyContent==null){
                this.$message({
                    type: 'error',
                    message: '回复不能为空'
                })
                return
            }
            let resData = {
                goodsAppointmentId: this.thatId,
                replyContent: this.replyContent
            }
            console.log(resData)
            shopEvaluationReply(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
            })
            this.dialogclose()
            this.$refs.table.loadData()
        },
        dialogclose() {
            this.replyDialog = false
            this.thatId = null
            this.replyContent = null
        },
        tableCheck(data) {
            this.table_row = data
        }
    }
}
</script>
