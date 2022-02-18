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
                                <button @click="sploading(table_row)">
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
                <Drawer
                    drawerTitle="商品创建"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">填写商品信息</template>
                            <template>
                                <!-- {{addForm}} -->
                                <VueForm ref="addForm" :formObj="addForm" @ruleSuccess="addRuleSuccess">
                                    <!-- Slot -->
                                    <template slot="imgUrls">
                                        <template>
                                            <el-upload
                                                :action="`${$baseUrl}upload/uploadShoppingGoods`"
                                                :on-success="ImgeSuccess"
                                                ref="myUpload1"
                                                :file-list="imglist"
                                                :on-exceed="handleExceed"
                                                :limit="5"
                                                accept=".jpg,.png,.JPG,.PNG"
                                                :before-upload="
                                                    beforeAvatarUpload
                                                "
                                            >
                                                <el-button
                                                    icon="el-icon-edit"
                                                    size="small"
                                                    >上传图片</el-button
                                                >
                                                <span
                                                    style="
                                                        margin-left: 10px;
                                                        font-size: 12px;
                                                        color: #444444;
                                                    "
                                                    >建议比例：3:2</span
                                                >
                                                <div
                                                    slot="tip"
                                                    class="el-upload__tip"
                                                >
                                                    <span
                                                        >支持扩展名：png,jpg</span
                                                    >
                                                </div>
                                            </el-upload>
                                        </template>
                                    </template>
                                    <template v-slot:supplierId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm.supplierId
                                            "
                                            :remote-method="remoteMethod"
                                            @change="change"
                                            @focus="sefocus"
                                            :loading="loading"
                                            remote
                                            style="width: 240px"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in supplierOptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <!-- 商品分类 -->
                                    <template v-slot:category>
                                        <el-select
                                            v-model="addForm.ruleForm.category"
                                            :remote-method="remoteMethod"
                                            @change="change"
                                            @focus="sefocus"
                                            :loading="loading"
                                            remote
                                            style="width: 240px"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in cateOptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
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
            </div>
        </div>
    </div>
</template>

<script>
import {
    shopGoodsLoading,
    shopGoodsUnloading,
    shopSupplierList,
    shopCategoryList,
    shopGoodsInsert
} from '@/api/shop.js'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            table_row: [],
            loading: false,
            cateOptions: [],
            supplierOptions: [],
            addForm: {
                ruleForm: {
                    imgUrls: []
                },
                rules: {
                  // 表单必填
                  category: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  categoryId: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  title: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  recommend: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  supplierId: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  detail: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  sellingPrice: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  markingPrice: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  stock: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  status: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  arrivalTime: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ]
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '所属大类',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'category',
                        slotName: 'category'
                    },
                    {
                        type: 'Select',
                        label: '所属小类',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'categoryId',
                        options: []
                    },
                    {
                        type: 'Input',
                        label: '商品标题',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'title'
                    },
                    {
                        type: 'Input',
                        label: '推荐语',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'recommend'
                    },
                    {
                        type: 'Slot',
                        label: '供应商',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'supplierId',
                        slotName: 'supplierId'
                    },
                    {
                        type: 'textarea',
                        label: '商品详情',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'detail'
                    },
                    {
                        type: 'Input',
                        label: '原价',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'sellingPrice'
                    },
                    {
                        type: 'Input',
                        label: '优惠价',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'markingPrice'
                    },
                    {
                        type: 'Int',
                        label: '库存',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'stock'
                    },
                    {
                        type: 'Select',
                        label: '状态',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'status',
                        options: [
                            {
                                value: '1',
                                label: '立即上架'
                            },
                            {
                                value: '2',
                                label: '手动上架'
                            }
                        ]
                    },
                    {
                        type: 'Date',
                        label: '取货时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'arrivalTime'
                    },
                    {
                        type: 'Slot',
                        label: '图片上传',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'imgUrls',
                        slotName: 'imgUrls'
                    }
                ]
            },
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
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20
            }
            this.loading = true
            shopSupplierList(reeData).then((res) => {
                console.log(res)
                this.supplierOptions = res.tableList
                this.loading = false
            })
            shopCategoryList({ parentId: 0 }).then((res) => {
                // console.log(res)
                this.cateOptions = res.data
                // console.log(this.sysOptions);
                this.loading = false
            })
        },
        remoteMethod(val) {
            this.getUserList(val)
        },
        sefocus() {
            this.getUserList()
        },
        change(value) {
            console.log(value) //sysUserList
            this.addForm.form_item[1].options = []
            let sData = {
                parentId: value
            }
            shopCategoryList(sData).then((res) => {
                console.log(res)
                res.data.forEach((ele)=>{
                    let obj = {
                        value: ele.id,
                        label: ele.name
                    }
                    this.addForm.form_item[1].options.push(obj)
                })
                console.log(this.addForm.form_item[1].options)
                this.loading = false
            })
        },
        //根据部门获取人员
        sChange(value) {
            console.log(value)
            this.addForm.form_item[1].options = []
            let sData = {
                parentId: value
            }
            shopCategoryList(sData).then((res) => {
                console.log(res)

                res.tableList.forEach((element) => {
                    let obj = {
                        value: element.id,
                        label: element.actualName
                    }
                    this.addForm.form_item[1].options.push(obj)
                })
                console.log(this.addForm.form_item[1].options)
                this.loading = false
            })
        },
        add() {
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.$refs.myUpload1.clearFiles()
        },
        addRuleSuccess() {
          let resData = {
            ...this.addForm.ruleForm
          }
          shopGoodsInsert(resData).then((res) => {
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
        addSubmit() {
          this.$refs.addForm.submitForm()
        },
        //shangija
        sploading(data) {
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
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
        },
        // 图片上传成功
        ImgeSuccess(res, file) {
            this.addForm.ruleForm.imgUrls[0] = file.response.url
        },
        // 图片文件上传之前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2
            const isJPG = file.type === 'image/png'
            const isPNG = file.type === 'image/jpeg'
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return (isJPG || isPNG) && isLt2M
        },
        //  上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 5 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        }
    }
}
</script>
