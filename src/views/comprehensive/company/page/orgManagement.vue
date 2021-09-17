<template>
    <div>
        <div class="main-content comprehensive">
            <div class="main-titel" style="border-bottom: none">
                <span>组织架构管理</span>
            </div>

            <div class="content">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="组织架构管理" name="first">
                        <el-input
                            v-model.trim="search"
                            size="small"
                            placeholder="请输入搜索内容"
                            style="width: 240px; margin: 10px 0"
                        ></el-input>
                        <div style="float: right; right: 100px">
                            <el-button
                                size="small"
                                @click="add()"
                                type="primary"
                            >
                                新增部门
                            </el-button>
                        </div>
                        <div>
                            <el-table
                                :data="ftable"
                                style="width: 100%; margin-bottom: 20px"
                                row-key="id"
                                border
                                default-expand-all
                                :tree-props="{
                                    children: 'organizationList',
                                    hasChildren: 'hasChildren'
                                }"
                                :cell-style="{
                                    fontWeight: $store.state.fontWeight
                                }"
                                :header-cell-style="{
                                    background: '#F5F5F6',
                                    color: '#606266'
                                }"
                            >
                                <el-table-column
                                    prop="name"
                                    width="296"
                                    label="组织机构层级"
                                ></el-table-column>
                                <el-table-column label="分类" width="126">
                                    <template slot-scope="scope">
                                        <div>
                                            <div
                                                v-if="
                                                    scope.row.categoryId === 1
                                                "
                                            >
                                                <span>公司</span>
                                            </div>
                                            <div
                                                v-else-if="
                                                    scope.row.categoryId === 2
                                                "
                                            >
                                                <span>部门</span>
                                            </div>
                                            <div
                                                v-else-if="
                                                    scope.row.categoryId === 3
                                                "
                                            >
                                                <span>工作组</span>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="leadingName"
                                    label="主要负责人"
                                    width="136"
                                >
                                </el-table-column>
                                <el-table-column prop="leadingTel" label="电话">
                                </el-table-column>
                                <el-table-column prop="countNum" label="人数">
                                </el-table-column>
                                <el-table-column label="状态">
                                    <template slot-scope="scope">
                                        <div>
                                            <div v-if="scope.row.status === 1">
                                                <div class="status_box">
                                                    <div
                                                        class="status_icon"
                                                    ></div>
                                                    <span>正常</span>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <div class="status_box">
                                                    <div
                                                        class="status_icon danger"
                                                    ></div>
                                                    <!-- #f56c6c -->
                                                    <span>停用</span>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="remake"
                                    label="备注"
                                ></el-table-column>
                                <el-table-column prop="operating" label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                            @click="edit(scope.row)"
                                            type="text"
                                            size="small"
                                            >编辑</el-button
                                        >
                                        <el-button
                                            type="text"
                                            size="small"
                                            @click="stop(scope.row)"
                                            >停用</el-button
                                        >
                                        <el-button
                                            type="text"
                                            size="small"
                                            @click="recovery(scope.row)"
                                            >恢复</el-button
                                        >
                                        <el-button
                                            type="text"
                                            size="small"
                                            @click="del(scope.row)"
                                            >删除</el-button
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>

                    <!-- <el-tab-pane label="组织架构管理"
                       name="third"></el-tab-pane> -->
                </el-tabs>
            </div>
            <!-- 新增抽屉 drwaer -->
            <Drawer
                drawerTitle="新增部门"
                @drawerClose="addClose"
                :drawerVrisible="add_vrisible"
            >
                <div style="padding: 30px">
                    <FromCard>
                        <template slot="title">部门信息</template>
                        <template>
                            <!-- addRuleSuccess函数 -->
                            <VueForm ref="addForm" :formObj="addForm" @ruleSuccess="addRuleSuccess">
                                <template v-slot:leadingId>
                                    <el-select
                                        v-model="addForm.ruleForm.leadingId"
                                        :remote-method="premoteMethod"
                                        @change="pchange"
                                        @focus="psefocus"
                                        :loading="loading"
                                        remote
                                        style="width: 240px"
                                        filterable
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in options"
                                            :key="item.id"
                                            :label="item.actualName"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </template>
                                <template slot="sort">
                                    <div>
                                        <el-input-number
                                            v-model="addForm.ruleForm.sort"
                                            controls-position="right"
                                            :min="1"
                                            :max="10"
                                        ></el-input-number>
                                    </div>
                                </template>
                            </VueForm>
                        </template>
                    </FromCard>
                </div>
                <div slot="footer">
                    <button class="btn-orange" @click="addSubmit()">
                        <span> <i class="el-icon-circle-check"></i>提交</span>
                    </button>
                    <button class="btn-gray" @click="addClose">
                        <span>取消</span>
                    </button>
                </div>
            </Drawer>

            <!-- 修改 -->
            <Drawer
                :drawerTitle="drawerTitle"
                @drawerClose="editClose"
                :drawerVrisible="edit_vrisible"
            >
                <div style="padding: 30px">
                    <FromCard>
                        <template slot="title">基本信息</template>
                        <template>
                            <VueForm ref="editVueForm" :formObj="editForm">
                                <!-- parentList -->
                                <template slot="parentId">
                                    <div v-if="parentList.length">
                                        <el-select
                                            v-model="editForm.ruleForm.parentId"
                                            style="width: 240px"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in parentList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <!-- 没有上级部门 -->
                                    <div v-else>
                                        <el-input
                                            placeholder="请输入内容"
                                            :value="falseParentName"
                                            style="width: 240px"
                                            :disabled="true"
                                        >
                                        </el-input>
                                    </div>
                                </template>
                                <template slot="sort">
                                    <div>
                                        <el-input-number
                                            v-model="editForm.ruleForm.sort"
                                            controls-position="right"
                                            :min="1"
                                            :max="10"
                                        ></el-input-number>
                                    </div>
                                </template>
                                <template v-slot:leadingId>
                                    <el-select
                                        v-model="editForm.ruleForm.leadingId"
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
                                            v-for="item in userOptions"
                                            :key="item.id"
                                            :label="item.actualName"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </template>
                                <!--   -->
                            </VueForm>
                        </template>
                    </FromCard>
                </div>
                <div slot="footer">
                    <button class="btn-orange" @click="editSubmit()">
                        <span> <i class="el-icon-circle-check"></i>提交</span>
                    </button>
                    <button class="btn-gray" @click="editClose">
                        <span>取消</span>
                    </button>
                </div>
            </Drawer>
        </div>
    </div>
</template>
<script>
import {
    sysOrganizationList,
    sysOrganizationFindById,
    sysUserList,
    sysOrganizationUpdate,
    sysOrganizationStop,
    sysOrganizationRecovery,
    sysOrganizationInsert,
    sysOrganizationDelete
} from '@/api/company'
import { userResident } from '@/api/basic'
export default {
    data() {
        return {
            edit_vrisible: false,
            drawerTitle: '',
            activeName: 'first',
            search: null, //搜索
            eidtId: null, //修改id
            loading: false, //加载动画
            tableData: [], //表格数据
            parentList: [], //上级部门列表
            add_vrisible: false,
            options: [],
            addForm: {
                // 添加表单
                ruleForm: {
                    name: null,
                    parentId: null,
                    leadingId: null,
                    tel: null,
                    remake: null,
                    categoryId: null,
                    sort:null
                },
                rules: {
                    // 表单必填
                    name: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    leadingId: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    categoryId: [
                      { required: true, message: '请选择', trigger: 'change' }
                    ],
                    parentId: [
                      { required: true, message: '请选择', trigger: 'change' }
                    ],
                    sort: [
                      { required: true, message: '请选择', trigger: 'change' }
                    ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '组织名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },

                    {
                        type: 'Slot',
                        label: '负责人',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'leadingId',
                        slotName: 'leadingId'
                    },
                    {
                        type: 'Input',
                        label: '手机号',
                        placeholder: '请输入',
                        width: '50%',
                        disabled: true,
                        prop: 'tel'
                    },
                    {
                        type: 'Select',
                        label: '分类',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'categoryId',
                        options: [
                            { value: 2, label: '部门' },
                            { value: 3, label: '工作组' }
                        ]
                    },
                    {
                        type: 'Select',
                        label: '上级',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'parentId',
                        options: []
                    },
                    {
                        type: 'Slot',
                        label: '排序',
                        placeholder: '请输入',
                        width: '50%',
                        rows: 5,
                        prop: 'sort',
                        slotName: 'sort'
                    },
                    {
                        type: 'textarea',
                        label: '备注',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'remake'
                    }
                ]
            },
            editForm: {
                ruleForm: {
                    name: null,
                    parentId: null,
                    leadingId: null,
                    sort: null,
                    remake: null,
                    categoryId: null,
                    leadingTel: null
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '上级部门',
                        width: '50%',
                        placeholder: '请选择',
                        prop: 'parentId',
                        slotName: 'parentId'
                    },
                    {
                        type: 'Input',
                        label: '部门名称',
                        placeholder: '请输入',
                        prop: 'name',
                        width: '50%'
                    },
                    {
                        type: 'Slot',
                        label: '负责人',
                        width: '50%',
                        placeholder: '请选择',

                        prop: 'leadingId',
                        slotName: 'leadingId'
                    },
                    {
                        type: 'Select',
                        label: '分类',
                        width: '50%',
                        placeholder: '请选择',
                        prop: 'categoryId',
                        options: [
                            { value: 1, label: '公司' },
                            { value: 2, label: '部门' },
                            { value: 3, label: '工作组' }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '手机号',
                        placeholder: '请输入',
                        prop: 'leadingTel',
                        disabled: true,
                        width: '50%'
                    },
                    {
                        type: 'Slot',
                        label: '排序',
                        placeholder: '请输入',
                        width: '50%',
                        rows: 5,
                        prop: 'sort',
                        slotName: 'sort'
                    },
                    {
                        type: 'textarea',
                        label: '备注',
                        placeholder: '请输入',
                        width: '100%',
                        rows: 5,
                        prop: 'remake'
                    }
                ]
            },
            userOptions: [], //负责人列表
            falseParentName: null, //无上级部门 时显示内容
            ftable: null
        }
    },
    created() {
        this.getData()
    },
    methods: {
        //停用回复
        recovery(data) {
            this.$confirm('是否恢复?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '恢复成功'
                    })
                    sysOrganizationRecovery({ id: data.id }).then((res) => {
                        this.getData()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消恢复'
                    })
                })
        },
        stop(data) {
            this.$confirm('是否停用?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '停用成功'
                    })
                    sysOrganizationStop({ id: data.id }).then((res) => {
                        this.getData()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消停用'
                    })
                })
        },
        del(data) {
            this.$confirm('是否删除部门?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    sysOrganizationDelete({ id: data.id }).then((res) => {
                        this.getData()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.add_vrisible = false
            this.$refs.addForm.reset()
        },
        // 校验成功后调用接口
        addRuleSuccess() {
            let resData = {
                ...this.addForm.ruleForm
            }
            sysOrganizationInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })

                    this.addClose()
                   this.getData()
                }
            })
        },
        // 提交
        addSubmit() {
            this.$refs.addForm.submitForm()
        },
        premoteMethod(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val
            }
            this.loading = true
            sysUserList(reeData).then((res) => {
                this.options = res.tableList
                this.loading = false

                console.log(res)
            })
        },
        psefocus() {
            let reeData = {
                pageNum: 1,
                size: 20
            }
            this.loading = true
            sysUserList(reeData).then((res) => {
                this.options = res.tableList
                // let obj = {
                //     id: 0,
                //     tel: ''
                // }
                // this.options.unshift(obj)
                this.loading = false
                console.log(this.options)
            })
        },
        pchange(value) {
            console.log(value)
            this.options.map((item) => {
                if (item.id === value) {
                    this.addForm.ruleForm.tel = item.tel
                }
            })
        },
        // 负责人赛选
        remoteMethod(val) {
            this.getUserList(val)
        },
        // 负责人赛选
        sefocus() {
            this.getUserList('')
        },
        change(value) {
            this.options.map((item) => {
                if (item.id === value) {
                    this.editForm.ruleForm.leadingTel = item.tel
                }
            })
        },
        // 关闭
        editClose() {
            this.edit_vrisible = false
        },
        // 提交
        editSubmit() {
            console.log(this.editForm.ruleForm)
            // 修改
            let resData = {
                id: this.eidtId,
                ...this.editForm.ruleForm
            }
            sysOrganizationUpdate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.editClose()
                    this.getData()
                }
            })
        },
        // 编辑
        edit(row) {
            this.drawerTitle = '编辑部门'
            this.falseParentName = row.name
            sysOrganizationFindById({ id: row.id }).then((res) => {
                this.eidtId = res.id
                this.editForm.ruleForm.name = res.name
                this.editForm.ruleForm.parentId = res.parentId
                this.editForm.ruleForm.leadingId = res.leadingId
                this.editForm.ruleForm.sort = res.sort
                this.editForm.ruleForm.remake = res.remake
                this.editForm.ruleForm.categoryId = res.categoryId
                this.editForm.ruleForm.leadingTel = res.leadingTel
                this.parentList = res.parentList ? res.parentList : []
                this.getUserList(res.actualName)
                this.edit_vrisible = true
            })
        },
        // 表格数据
        getData() {
            sysOrganizationList().then((res) => {
                this.tableData = res
                this.ftable = res
                console.log('-')
            })
        },
        // 负责人查询
        getUserList(name) {
            let resData = {
                pageNum: 1,
                size: 100,
                actualName: name
            }
            sysUserList(resData).then((res) => {
                this.userOptions = res.tableList
            })
        },
        //  树形表格过滤
        handleTreeData(treeData, searchValue) {
            if (!treeData || treeData.length === 0) {
                return []
            }
            const array = []
            for (let i = 0; i < treeData.length; i += 1) {
                let match = false
                for (let pro in treeData[i]) {
                    if (typeof treeData[i][pro] === 'string') {
                        match = treeData[i][pro].includes(searchValue)
                        if (match) break
                    }
                }
                if (
                    this.handleTreeData(
                        treeData[i].organizationList,
                        searchValue
                    ).length > 0 ||
                    match
                ) {
                    array.push({
                        ...treeData[i],
                        organizationList: this.handleTreeData(
                            treeData[i].organizationList,
                            searchValue
                        )
                    })
                }
            }
            return array
        },
        treeTable() {
            var searchValue = this.search
            let treeData = this.tableData
            let handleTreeData = this.handleTreeData(treeData, searchValue)
            return handleTreeData
        }
    },
    watch: {
        search: {
            handler(value) {
                this.ftable = this.treeTable()
            },
            immediate: true
        },
        //新增部门时候判断新增的部门类型去获取不同的上级
        'addForm.ruleForm.categoryId': {
            handler(newVal) {
                console.log(newVal)
                if (newVal == 2) {
                    // this.addForm.ruleForm.parentId == 1
                    let obj = {
                        label: '广西印象物业服务有限责任公司',
                        value: 1
                    }
                    this.addForm.form_item[4].options=[]
                    this.$set(this.addForm.form_item[4].options, 0, obj)
                } else {
                    sysOrganizationList().then((res) => {
                        //  this.addForm.form_item[4].options=[]
                        // console.log(res[0].organizationList);
                        res[0].organizationList.forEach(element => {
                            let obj = {
                                value:element.id,
                                label:element.name
                            }
                            this.addForm.form_item[4].options.push(obj)
                            console.log(this.addForm.form_item[4]);
                        });
                    })
                }
            }
        }
    }
}
</script>
<style scoped lang='scss'>
.status_icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 10px;
    border-radius: 50%;
    background: #52c41a;
    &.danger {
        background: #f56c6c;
    }
}
</style>
