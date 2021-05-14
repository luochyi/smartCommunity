<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>商品管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >商品创建</el-button
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
                                <el-tab-pane
                                    label="已上架"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已下架"
                                    name="2"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="loading(table_row)">
                                    上架
                                </button>
                                <button @click="unloading(table_row)">
                                    下架
                                </button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
            </div>
        </div>
    </div>
</template>

<script>
import { shopGoodsLoading, shopGoodsUnloading } from '@/api/shop.js'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '商品编号', prop: 'code', width: 'auto' },
                    {
                        label: '商品标题',
                        prop: 'title',
                        width: 'auto'
                    },
                    { label: '售价', prop: 'sellingPrice', width: 'auto' },
                    { label: '划线价', prop: 'markingPrice', width: 'auto' },
                    { label: '库存', prop: 'stock', width: 'auto' },
                    { label: '预约量', prop: 'subscribeNum', width: 'auto' },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '上架'
                                    break
                                case 2:
                                    return '下架'
                                    break
                            }
                        }
                    },
                    { label: '创建时间', prop: 'createDate', width: '220' }
                ],
                table_data: [],
                url: 'shopGoodsList',
                search_item: [
                    {
                        type: 'Input',
                        label: '商品编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '商品标题',
                        placeholder: '请输入',
                        prop: 'title'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请选择',
                        value: null,
                        options: [
                            { value: 1, label: '上架' },
                            { value: 2, label: '下架' }
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'picker',
                        label: '创建时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'createDateStart',
                        endDate: 'createDateEnd',
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
        add(){
          this.$router.push('/commodity/commodityCreation')
        },
        //shangija
        loading(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                if(data[0].status==1){
                    this.$message({
                        message: '上架失败',
                        type: 'error',
                    })
                }else{
                    shopGoodsLoading({ id: data[0].id }).then((res) => {
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
            console.log(data[0].id)
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            } else {
                shopGoodsUnloading({ id: data[0].id }).then((res) => {
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
        // 表格选中
        tableCheck(data) {
            this.table_row = data
        }
    }
}
</script>
