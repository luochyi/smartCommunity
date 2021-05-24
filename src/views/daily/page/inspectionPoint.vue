<style scoped>
.qrcode {
    position: absolute;
    left: 50%;
    top: 40%;
    z-index: 100;
}
</style>
<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>巡检点</span>
            </div>
            <div class="content">
                <div class="qrcode" ref="qrCodeUrl" v-if="isShow"></div>
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增巡检点</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <!-- 二维码
                        <template slot="qrCode">
                            <el-button
                                class="init-text"
                                type="text"
                            >
                                <span @mouseenter="creatQrCode()" @mouseleave="missQr()"> 查看</span>
                            </el-button>
                        </template> -->
                        <template slot="tabs">
                            <el-tabs v-model="activeName">
                                <el-tab-pane
                                    label="全部"
                                    name="0"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>

                        <template slot="footer">
                            <div class="table-footer">
                                <button
                                    @click="creatQrCode()"
                                    @mouseleave="missQr()"
                                >
                                    查看二维码
                                </button>
                                <button @click="edit(table_row)">编辑</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增巡检点"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">巡检点信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <!-- 检查项 -->
                                    <template v-slot:itemsList>
                                        <Button @click="addInt">添加</Button>
                                        <div
                                            v-for="(
                                                item, index
                                            ) in inspectionArr"
                                            :key="index"
                                        >
                                            <el-input
                                                v-model="item.name"
                                                placeholder="请输入内容"
                                                size="small"
                                            ></el-input>
                                        </div>
                                    </template>
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
                <!-- edit -->
                <Drawer
                    drawerTitle="修改巡检点"
                    @drawerClose="editClose"
                    :drawerVrisible="edit_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">巡检点信息</template>
                            <template>
                                <VueForm ref="editForm" :formObj="editForm">
                                    <!-- 检查项 -->
                                    <template v-slot:itemsList>
                                        <Button @click="addInt">添加</Button>
                                        <div
                                            v-for="(
                                                item, index
                                            ) in inspectionArr"
                                            :key="index"
                                        >
                                            <el-input
                                                v-model="item.name"
                                                placeholder="请输入内容"
                                                size="small"
                                            ></el-input>
                                        </div>
                                    </template>
                                </VueForm>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="editSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="editClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
</template>

<script>
import { inspectionPointInsert, inspectionPointUpdate ,inspectionPointFindById} from '@/api/daily'
import QRCode from 'qrcodejs2'
export default {
    data() {
        return {
            inspectionArr: [
                {
                    name: null
                }
            ],
            isShow: false,
            link: '',
            add_vrisible: false,
            edit_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    name: null,
                    code: '',
                    type: '1'
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '编号',
                        width: '100%',
                        prop: 'code',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    // {
                    //     type: 'Input',
                    //     label: '巡检模式',
                    //     disabled: true,
                    //     width: '100%',
                    //     prop: 'type'
                    // },
                    {
                        type: 'Slot',
                        label: '检查项',
                        width: '50%',
                        prop: 'itemsList',
                        slotName: 'itemsList'
                    }
                ]
            },
            editForm: {
                ruleForm: {
                    name: null,
                    code: null,
                    type: '1'
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '编号',
                        width: '100%',
                        prop: 'code',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    // {
                    //     type: 'Input',
                    //     label: '巡检模式',
                    //     disabled: true,
                    //     width: '100%',
                    //     prop: 'type'
                    // },
                    {
                        type: 'Slot',
                        label: '检查项',
                        width: '50%',
                        prop: 'itemsList',
                        slotName: 'itemsList'
                    }
                ]
            },
            table_row: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '编号', prop: 'code', width: 'auto' },
                    { label: '名称', prop: 'name', width: 'auto' },
                    {
                        label: '巡检模式',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.type == 1) {
                                return '扫码'
                            }
                        }
                    },
                    // {
                    //     label: '二维码',
                    //     width: 'auto',
                    //     type: 'slot',
                    //     slotName: 'qrCode'
                    // },
                    { label: '创建时间', prop: 'createDate', width: 'auto' }
                ],
                table_data: [],
                url: 'inspectionPointList',
                search_item: [
                    {
                        type: 'Input',
                        label: '编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '名称',
                        placeholder: '请输入',
                        prop: 'name'
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
        creatQrCode() {
            if (this.table_row.length > 1) {
                this.$message.error('只能查看一条')
                return
            } else {
                // this.missQr()
                this.isShow = !this.isShow
                this.link = ''
                this.link = this.table_row[0].code
                console.log(this.link)
                this.$nextTick(function () {
                    setTimeout(() => {
                        let qrcode = new QRCode(this.$refs.qrCodeUrl, {
                            text: this.link, //this.link, // 需要转换为二维码的内容
                            width: 200,
                            height: 200,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        })
                    }, 100)
                })
            }
        },
        missQr() {
            ;(this.isShow = false), (this.link = null)
        },
        addInt() {
            this.inspectionArr.push({
                name: null
            })
        },
        add() {
            this.add_vrisible = true
            let random = Math.floor(Math.random() * 100000000)
            this.addForm.ruleForm.code = random
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.inspectionArr = [{ name: null }]
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm,
                type: this.addForm.ruleForm.type,
                itemsList: this.inspectionArr
            }
            inspectionPointInsert(resData).then((res) => {
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
        edit(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                this.edit_vrisible = true
                console.log(data[0].id)
                this.editForm.ruleForm.id = data[0].id
                inspectionPointFindById({ id: data[0].id }).then((res) => {
                    console.log(res.data)
                    this.editForm.ruleForm.code = res.data.code
                    this.editForm.ruleForm.name = res.data.name
                    this.inspectionArr = res.data.checkItemsList
                })
            }
        },
        editClose() {
            this.$refs.editForm.reset()
            this.edit_vrisible = false
            this.inspectionArr = [{ name: null }]
        },
        editSubmit() {
            let resData = {
                code:this.editForm.ruleForm.code,
                name:this.editForm.ruleForm.name,
                id: this.editForm.ruleForm.id,
                itemsList: this.inspectionArr
            }
            inspectionPointUpdate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.editClose()
                }
            })
        },
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
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
    }
}
</script>
