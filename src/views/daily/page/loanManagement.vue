
<template>
    <div class="main-content">
        <div class="main-titel">
            <span>物品借还</span>
        </div>
        <div class="content">
            <div class="">
                <VueTable ref="table" :config="config" @tableCheck="tableCheck">
                    <template slot="tabs">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="全部" name="0"></el-tab-pane>
                            <el-tab-pane label="出借中" name="1"></el-tab-pane>
                            <el-tab-pane label="已还" name="2"></el-tab-pane>
                        </el-tabs>
                    </template>
                    <template v-slot:borrowDate='slotData'>
                        <div>{{Number(slotData.data.borrowDate/24).toFixed(1)+'天'}}</div>
                    </template>
                    <template v-slot:borrowStatus = "slotData">
                        <span v-if="slotData.data.borrowStatus === -1" style="color:#FF8200">出借审核中</span>
                        <span v-else-if="slotData.data.borrowStatus === 0" style="color:#E60E0E">出借审核失败</span>
                        <span v-else-if="slotData.data.borrowStatus === 1">出借中</span>
                        <span v-else-if="slotData.data.borrowStatus === 2" style="color:#00000073">已归还</span>
                        <span v-else-if="slotData.data.borrowStatus === 3">待检查</span>
                    </template>
                    <template v-slot:remake="slotData">
                        <div>
                            <el-tooltip
                                v-if="slotData.data.remake"
                                class="item"
                                effect="dark"
                                :content="slotData.data.remake"
                                placement="bottom-end"
                            >
                                <el-button class="init-text" type="text">
                                    <span
                                        class="el-icon-warning-outline"
                                        style="font-size: 24px"
                                    ></span>
                                </el-button>
                            </el-tooltip>
                            <span v-else>-</span>
                        </div>
                    </template>
                    <template v-slot:status = "slotData">
                        <span v-if="slotData.data.status === 1">正常</span>
                        <span v-else-if="slotData.data.status === 2" style="color:#E60E0E">报损</span>
                    </template>
                    <template slot="footer">
                        <div class="table-footer">
                            <button @click="msg(table_row)">提醒</button>
                        </div>
                    </template>
                </VueTable>
            </div>
        </div>
    </div>
</template>

<script>
import { borrowRemind } from '@/api/butler'
export default {
    data() {
        return {
            // 选中表格数据
            table_row: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '物品名称', prop: 'name', width: '120' },
                    { label: '物品编号', prop: 'code', width: 'auto' },
                    { label: '借用人', prop: 'borrowName', width: 'auto' },
                    { label: '联系方式', prop: 'tel', width: '130' },
                    { label: '出借时间', prop: 'beginDate', width: '130' },
                    { label: '归还时间', prop: 'endDate', width: '180' 
                    },
                    { label: '出借时长', prop: 'borrowDate', width: '180' ,type:'slot',slotName:'borrowDate'},
                    {
                        label: '申请状态',
                        prop: 'borrowStatus',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'borrowStatus'
                        // callback: (row, prop) => {
                        //     switch (row.borrowStatus) {
                        //         case 1:
                        //             return '出借中'
                        //             break
                        //         case 2:
                        //             return '已还'
                        //             break
                        //     }
                        // }
                    },
                    { label: '物品状态', prop: 'status', width: 'auto' ,
                      type: 'slot',
                      slotName: 'status'
                        // callback: (row, prop) => {
                        //     switch (row.status) {
                        //         case 1:
                        //             return '正常'
                        //             break
                        //         case 2:
                        //             return '报损'
                        //             break
                        //     }
                        // }
                    },
                    {
                        label: '备注',
                        prop: 'remake',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'remake'
                    }
                ],
                table_data: [],
                url: 'borrowList',
                search_item: [
                    {
                        type: 'Input',
                        label: '物品名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '借用人',
                        placeholder: '请输入',
                        prop: 'borrowName'
                    },
                    {
                        type: 'Input',
                        label: '联系方式',
                        placeholder: '请输入',
                        prop: 'tel'
                    },
                    // {
                    //     type: 'startDate',
                    //     label: '借用时间',
                    //     placeholder: '请选择开始日期',
                    //     prop: 'beginDate'
                    // },
                    // {
                    //     type: 'endDate',
                    //     label: '借用时间',
                    //     placeholder: '请选择结束时间',
                    //     prop: 'endDate'
                    // },
                    {
                        type: 'picker',
                        label: '申请时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'beginDate',
                        endDate: 'endDate',
                        width: '400px'
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
        // tab切换
        handleClick(tab, event) {
            let borrowStatus = null
            if (this.activeName != 0) {
                borrowStatus = this.activeName
            } else {
                borrowStatus = null
            }
            const requestData = {
                pageNum: 1,
                size: 10,
                borrowStatus: borrowStatus
            }
            this.$refs.table.requestData(requestData)
        },
        tableCheck(data) {
            this.table_row = data
        },
        // 提醒
        msg(data) {
            if(data.length!=1){
                this.$message.error('只能对一条记录进行操作')
                return
            }
            borrowRemind({borrowId:data[0].id,sysMessage:{title:'物品归还提醒',content:'您有一件物品借取还未归还'}}).then(res=>{
                if(res.status){
                    this.$message.success(res.message)
                }
            })
        }
    }
}
</script>
