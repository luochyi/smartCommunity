<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>物资盘点</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增盘点</el-button
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
                                <!-- <button @click="detail(table_row)">详情</button> -->
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增盘点"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">盘点信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                </VueForm>
                                <template>
                                    <div>
                                        
                                        <div>
                                            <div class="add">
                                                <span @click="addMaterial"
                                                    >添加盘点项</span
                                                >
                                            </div>
                                            <div class="content-table">
                                                <template>
                                                    <el-table
                                                        :data="materialInventoryDetailList"
                                                        highlight-current-row
                                                        :header-cell-style="{
                                                            background:
                                                                '#F5F5F6',
                                                            color: '#999999'
                                                        }"
                                                        style="width: 100%"
                                                    >
                                                        <el-table-column
                                                            label="序号"
                                                            width="80"
                                                            type="index"
                                                        >
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="name"
                                                            label="物资名称"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-select
                                                                    size="small"
                                                                    @change="currStationChange(scope.row)"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .name
                                                                    "
                                                                    placeholder="请输入"
                                                                >
                                                                     <el-option
                                                                        v-for="item in materialOptions"
                                                                        :key="
                                                                            item.value
                                                                        "
                                                                        :label="
                                                                            item.label
                                                                        "
                                                                        :value="
                                                                            item.value
                                                                        "
                                                                    >
                                                                    </el-option>
                                                                </el-select>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="shouldInventory"
                                                            label="应有库存"
                                                        >
                                                           <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-input
                                                                    size="small"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .shouldInventory
                                                                    "
                                                                    placeholder="请输入"
                                                                ></el-input>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="danwei" width="120" label="单位">
                                                           <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-input
                                                                    size="small"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .unit
                                                                    "
                                                                    placeholder="请输入"
                                                                ></el-input>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="actualInventory"
                                                            label="实际库存"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-input
                                                                    size="small"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .actualInventory
                                                                    "
                                                                    placeholder="请输入"
                                                                ></el-input>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="inventorySurplusLosses"
                                                            width="220"
                                                            label="盘盈/盘亏"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <div
                                                                    class="
                                                                        column_flex
                                                                    "
                                                                >
                                                                    <div
                                                                        style="
                                                                            flex: 1;
                                                                        "
                                                                    >
                                                                        <el-input
                                                                            disabled
                                                                            size="small"
                                                                            v-model="
                                                                                scope
                                                                                    .row
                                                                                    .inventorySurplusLosses
                                                                            "
                                                                            placeholder="请输入"
                                                                        ></el-input>
                                                                    </div>
                                                                    <div
                                                                        @click="
                                                                            deleteRow(
                                                                                scope.$index,
                                                                                materialInventoryDetailList
                                                                            )
                                                                        "
                                                                        v-if="
                                                                            scope.$index !==
                                                                            0
                                                                        "
                                                                        style="
                                                                            padding-left: 10px;
                                                                        "
                                                                    >
                                                                        <span
                                                                            ><i
                                                                                class="
                                                                                    el-icon-delete
                                                                                "
                                                                            ></i
                                                                        ></span>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </template>
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
    </div>
</template>

<script>
import {
    materialList
} from '@/api/daily'
export default {
    inject:['reload'],
    data() {
        return {
            materialInventoryDetailList: [],
            add_vrisible: false,
            detail_vrisible: false,
            addDate: null,
            materialOptions: [],
            addForm: {
                ruleForm: {},
                // rules: {
                //     tel: [
                //         // {
                //         //     required: true,
                //         //     message: '请输入手机号',
                //         //     trigger: 'blur'
                //         // },
                //         {
                //             min: 11,
                //             max: 11,
                //             message: '请输入正确的手机号',
                //             trigger: 'blur'
                //         }
                //     ]
                // },
                form_item: [
                    {
                        type: 'Input',
                        label: '盘点期次',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'periodTime'
                    },
                    {
                        type: 'DateTime',
                        label: '盘点时间开始',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'inventoryDateStart'
                    },
                    {
                        type: 'DateTime',
                        label: '盘点时间结束',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'inventoryDateEnd'
                    },
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '盘点期次', prop: 'periodTime', width: 'auto' },
                    {
                        label: '盘点种类数量',
                        prop: 'speciesNum',
                        width: 'auto'
                    },
                    {
                        label: '盘点时间开始',
                        prop: 'inventoryDateStart',
                        width: 'auto'
                    },
                    {
                        label: '盘点时间结束',
                        prop: 'inventoryDateEnd',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'materialInventoryList',
                search_item: [
                    {
                        type: 'Input',
                        label: '盘点期次',
                        placeholder: '请输入',
                        prop: 'periodTime'
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
        addMaterial() {
            this.materialInventoryDetailList.push({
                name: null,
                shouldInventory: null,
                actualInventory: null,
                inventorySurplusLosses: null,
                unit:null,
            })
        },
        add() {
            this.add_vrisible = true
            this.materialOptions = []
            // this.materialOptions
            materialList().then(res=>{
                console.log(res.tableList);
                let material = res.tableList
                material && material.forEach(ele => {
                    let obj = {
                        label:ele.name,
                        value:ele.id
                    }
                    this.materialOptions.push(obj)
                });
            })
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            console.log(this.materialInventoryDetailList,this.addForm.ruleForm);
            let resData = {
                periodTime :this.addForm.ruleForm.periodTime,
                inventoryDateStart :this.addForm.ruleForm.inventoryDateStart,
                inventoryDateEnd :this.addForm.ruleForm.inventoryDateEnd,
                materialInventoryDetailList:this.materialInventoryDetailLists
            }
            console.log(resData);
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

        // 物资种类更换获取现存量，单位
        currStationChange(a){
            console.log(a);
            materialList().then(res=>{
                // console.log(res);
                res.tableList.forEach( ele =>{
                    // console.log(ele); 
                       for(let i=0;i<this.materialInventoryDetailList.length;i++){
                           if(this.materialInventoryDetailList[i].id = ele.id){
                               console.log(i);
                               this.materialInventoryDetailList[i].stock = ele.stock
                               console.log(this.materialInventoryDetailList);
                           }
                       }
                    
                })
            })
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
    watch:{
    }
}
</script>

<style scoped lang='scss'>
.flex {
    margin: 17px 0;
    display: flex;
    align-items: center;
}
.label-span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    width: 80px;
}
.add {
    margin-bottom: 20px;

    span {
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fb4702;
        line-height: 20px;
    }
}
.hr {
    margin: 30px 0;
    height: 1px;
    background: #e8e8e8;
}
.column_flex {
    display: flex;
    align-items: center;
}
</style>
