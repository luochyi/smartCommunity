<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>退换申请</span>
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
                                <button @click="add(table_row)">审核</button>
                                <button @click="change(table_row)">已换货</button>
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="审核"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">退换审核</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
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
        <views-photo :isVisible="photos_Visible"
                 :goodsImgsList="goodsImgsList"
                 @closeViews="getclose"></views-photo>
    </div>
</template>

<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'
import { shopRefundExamine,refundExchangeGoods } from '@/api/shop'
export default {
    components: {
        viewsPhoto
    },
    data() {
        return {
            photos_Visible: false,
            goodsImgsList: [],
            add_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    //   code: 'hdede',
                    //   facilitiesCategoryId:null,
                    //   address:null
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '审核状态',
                        placeholder: '请选择',
                        width: '100%',
                        options: [
                            { value: 9, label: '申请通过' },
                            { value: 10, label: '申请驳回' }
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'textarea',
                        label: '审核通过/驳回原因',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'reason'
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
                    { label: '订单编号', prop: 'code', width: '100' },
                    { label: '商品名称', prop: 'goodsName', width: 'auto' },
                    {
                        label: '商品照片',
                        prop: 'goodsImgList',
                        width: '150',
                        type: 'slot',
                        slotName: 'goodsImgList'
                    },
                    { label: '用户信息', prop: 'userName', width: '230' ,type:'function',
                      callback:(row,prop)=>{
                        if(row.userTel){
                          return row.userName +' '+row.userTel
                        }
                      }
                    },
                    { label: '客户期望', prop: 'backType', width: 'auto' ,
                      type:'function',
                      callback:(row,prop)=>{
                        switch (row.backType) {
                          case 1:
                            return '退货'
                            break;
                         case 2:
                            return '换货'
                            break;
                          default:
                            break;
                        }
                      }
                    },
                    {
                        label: '退货原因',
                        prop: 'backReason',
                        width: 'auto'
                    },
                    {
                        label: '退换货状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case -3:
                                    return '支付完成后全额退款'
                                    break
                                case -2:
                                    return '交易创建并等待买家付款'
                                    break
                                case -1:
                                    return '未付款交易超时关闭'
                                    break
                                case 1:
                                    return '待发货'
                                    break
                                case 2:
                                    return '已发货'
                                    break
                                case 3:
                                    return '已到货'
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
                                    return '申请退换货驳回'
                                    break
                                case 11:
                                    return '换货中'
                                    break
                                case 12:
                                    return '已换货'
                                    break
                                case 15:
                                    return '交易结束并不可退款'
                                    break
                            }
                        }
                    },
                    { label: '退货申请时间', prop: 'backDate', width: 'auto' }
                ],
                table_data: [],
                url: 'shopRefundList',
                search_item: [
                    {
                        type: 'Input',
                        label: '订单编号',
                        placeholder: '请输入订单号',
                        prop: 'code'
                    },
                    {
                        type: 'select',
                        label: '审核状态',
                        placeholder: '请选择',
                        options: [
                            { value: 1, label: '退货' },
                            { value: 2, label: '换货' },
                        ],
                        prop: 'backType'
                    },
                    {
                        type: 'Int',
                        label: '用户手机号',
                        placeholder: '请输入手机号',
                        prop: 'userTel'
                    },
                    {
                        type: 'select',
                        label: '退换货状态',
                        placeholder: '请选择',
                        options: [
                            { value: -3, label: '支付完成后全额退款' },
                            { value: -2, label: '交易创建并等待买家付款' },
                            { value: -1, label: '未付款交易超时关闭' },
                            { value: 1, label: '待发货' },
                            { value: 2, label: '已发货' },
                            { value: 3, label: '已到货' },
                            { value: 4, label: '已收货' },
                            { value: 6, label: '已评价' },
                            { value: 8, label: '申请退换货' },
                            { value: 9, label: '申请退换货通过' },
                            { value: 10, label: '申请退换货驳回' },
                            { value: 11, label: '换货中' },
                            { value: 12, label: '已换货' },
                            { value: 15, label: '交易结束' },
                        ],
                        prop: 'status'
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
        change(data){
             if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                if (data[0].status !== 11) {
                    this.$message({
                        message: '该状态不可操作',
                        type: 'error'
                    })
                } else {
                    refundExchangeGoods({id:data[0].id}).then(res=>{
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
        add(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                if (data[0].status !== 8) {
                    this.$message({
                        message: '该审核已结束',
                        type: 'error'
                    })
                } else {
                    this.add_vrisible = true
                }
            }
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm,
                id: this.table_row[0].id
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            shopRefundExamine(resData).then((res) => {
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
        },
    }
}
</script>
