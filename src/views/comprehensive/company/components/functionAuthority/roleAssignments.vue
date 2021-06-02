<template>
    <div>
        <div>
            <div class="box flex">
                <div class="lf">
                    <div class="title" @click="roleCheck(null, null)">
                        <span>全部员工</span>
                    </div>
                    <div class="lf-list">
                        <div
                            class="list-item"
                            v-for="(item, index) in roleList"
                            :key="item.id"
                        >
                            <div class="list-title">
                                <span>{{ item.name }}</span>
                            </div>
                            <div
                                class="item"
                                @click="roleCheck(role.id, index)"
                                :class="roleId === role.id ? 'active' : ''"
                                v-for="role in item.voRoleList"
                                :key="role.id"
                            >
                                <span>{{ role.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rg content">
                    <div
                        class="flex justify-between"
                        style="padding-bottom: 20px"
                    >
                        <div
                            class="flex align-center justify-between"
                            style="flex: 5"
                        >
                            <div>
                                <span>选择部门：</span>
                                <el-select
                                    size="mini"
                                    placeholder="请选择"
                                    v-model="organizationId"
                                    style="width: 240px"
                                >
                                    <el-option
                                        v-for="item in organizationList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div
                            class="flex align-center justify-center"
                            style="flex: 2"
                        >
                            <el-button
                                size="small"
                                @click="search(organizationId)"
                                type="primary"
                                >查询</el-button
                            >
                            <el-button size="small" @click="search(null)"
                                >重置</el-button
                            >
                        </div>
                        <!-- <div>
              <el-button size="small"
                         @click="addEidtVrisible = true"
                         type="primary">添加 员工</el-button>
            </div> -->
                    </div>
                    <div>
                        <el-table
                            :data="tableData"
                            style="width: 100%; margin-bottom: 20px"
                            row-key="id"
                            border
                            size="small"
                            default-expand-all
                            :tree-props="{
                                children: 'children',
                                hasChildren: 'hasChildren'
                            }"
                            :cell-style="{
                                fontWeight: $store.state.fontWeight
                            }"
                            :header-cell-style="{
                                background: '#eef1f6',
                                color: '#606266'
                            }"
                        >
                            <el-table-column
                                prop="nickName"
                                label="昵称（系统名）"
                                width="140"
                            ></el-table-column>
                            <!-- <el-table-column prop="tel"
                               width="140"
                               label="电话">
              </el-table-column> -->
                            <el-table-column
                                prop="organizationName"
                                width="120"
                                label="主属部门"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="positionName"
                                width="100"
                                label="职位名称"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="roleName"
                                width="100"
                                label="角色名称"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="remake"
                                label="备注"
                            ></el-table-column>
                            <el-table-column width="120" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="edit(scope.row)"
                                        type="text"
                                        size="small"
                                        >分配角色</el-button
                                    >

                                    <!-- <el-button @click="Deactivate = true"
                             type="text"
                             size="small">停用</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                        <template>
                            <div class="pagination-box">
                                <div class="pagination-item">
                                    <p>
                                        当前1-3，共3条 <span>每页显示10条</span>
                                    </p>
                                </div>
                                <div class="pagination-item">
                                    <div class="block">
                                        <el-pagination
                                            @current-change="
                                                handleCurrentChange
                                            "
                                            :page-size="10"
                                            :current-page="currentPage"
                                            background
                                            :pager-count="9"
                                            layout="prev, pager, next,jumper"
                                            :total="rowCount"
                                        >
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <!-- 添加员工 -->
                <Drawer
                    drawerTitle="添加员工"
                    @drawerClose="addEidtClose"
                    :drawerVrisible="addEidtVrisible"
                >
                    <div style="padding: 30px" class="role-box">
                        <FromCard>
                            <template slot="title">角色配置</template>
                            <template>
                                <div style="padding: 7%">
                                    <div>
                                        <div class="tips">
                                            <span
                                                >说明：新添加的角色会与员工的原有角色进行合并</span
                                            >
                                        </div>
                                        <div class="li"></div>
                                    </div>
                                    <div class="check-box">
                                        <div
                                            v-for="item in roleList"
                                            :key="item.id"
                                        >
                                            <div class="flex list">
                                                <div class="list-title">
                                                    <span>{{ item.name }}</span>
                                                </div>
                                                <el-checkbox-group
                                                    v-model="checkArr"
                                                >
                                                    <el-checkbox
                                                        v-for="check in item.voRoleList"
                                                        :label="check.id"
                                                        :key="check.id"
                                                        >{{
                                                            check.name
                                                        }}</el-checkbox
                                                    >
                                                </el-checkbox-group>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="onSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="addEidtClose">
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
    functionAuthorityRoleList,
    functionAuthorityList,
    sysOrganizationList,
    functionAuthorityUpdateRole
} from '@/api/company'
export default {
    props: {
        show: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            tableData: [],
            roleList: [],
            editID: null,
            organizationId: null, //部门Id
            organizationList: [], //部门列表
            currentPage: 1,
            limit: 10,
            pageCount: null,
            rowCount: null,
            roleId: null,
            addEidtVrisible: false,
            // 分配权限选中的id列表
            checkArr: []
        }
    },
    created() {
        this.GetRoleList()
        this.GetTableData()
        this.getOrganizationData()
    },
    methods: {
        edit(data) {
            console.log(data)
            this.editID = data.id
            this.addEidtVrisible = true
        },
        addEidtClose() {
            this.addEidtVrisible = false
        },
        onSubmit() {
            console.log(this.checkArr)
            let newArr = this.checkArr.toString()
            if (newArr == '') {
                newArr = null
            }
            let resData = {
                id: this.editID,
                roleId: newArr
            }
            console.log(resData)
            functionAuthorityUpdateRole(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '分配失败'
                    })
                }
                this.addEidtClose()
                this.GetTableData()
            })
        },
        // 角色列表
        GetRoleList() {
            functionAuthorityRoleList().then((res) => {
                this.roleList = res
                console.log(res)
            })
        },
        // 角色-》员工表格数据
        GetTableData() {
            let resData = {
                pageNum: this.currentPage,
                size: this.limit,
                organizationId: this.organizationId,
                roleId: this.roleId
            }
            functionAuthorityList(resData).then((res) => {
                this.tableData = res.tableList
                this.rowCount = res.rowCount
            })
        },
        roleCheck(id, index) {
            this.currentPage = 1
            this.roleId = id
            this.GetTableData()
        },
        search(id) {
            this.organizationId = id
            this.GetTableData()
        },
        getOrganizationData() {
            sysOrganizationList().then((res) => {
                let tree = res
                // 广度优先
                function treeForeach(tree, func) {
                    let node,
                        list = [...tree]
                    while ((node = list.shift())) {
                        func(node)
                        node.organizationList &&
                            list.push(...node.organizationList)
                    }
                }
                let newList = []
                treeForeach(tree, (node) => {
                    newList.push(node)
                })
                // console.log(newList)
                this.organizationList = newList
                console.log(this.organizationList)
            })
        },
        // 表格分页
        handleCurrentChange(val) {
            this.currentPage = val
            this.GetTableData()
            console.log(`当前页: ${val}`)
        }
    },
    watch: {
        show: {
            handler(newValue) {
                console.log(newValue)
                // this.GetTableData()
            }
        }
        // this.GetTableData ()
    }
}
</script>
<style lang="scss" scoped>
.status_icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 10px;
    border-radius: 50%;
    background: #52c41a;
}
.box {
    margin: 20px;
}
.lf {
    width: 20%;
    height: auto;
    max-height: 600px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #cfd0dd;
    padding: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    .title {
        font-weight: 500;
        color: #333333;
        cursor: pointer;
    }
    .list-item {
        margin-top: 20px;

        .list-title {
            font-weight: 400;
            color: #999999;
        }
        font-weight: 400;
        color: #333333;
        .item {
            padding: 15px;
            &:hover {
                background: #f6f6f6;
                border-radius: 2px;
            }
            &.active {
                background: #f6f6f6;
                border-radius: 2px;
            }
        }
    }
}
.rg {
    margin: 0 20px;
    flex: 1;
    border-radius: 4px;

    height: auto;
    overflow: auto;
    overflow: auto;
    border: 1px solid #cfd0dd;
}
.role-box {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    .tips {
        padding-left: 12px;
        height: 40px;
        line-height: 40px;
        background: #edf5ff;
        border: 1px solid #97c3ff;
        border-radius: 4px;
        margin-bottom: 20px;
    }
}
.check-box {
    .list {
        margin: 20px 0;
        .list-title {
            width: 90px;
            text-align: right;
            margin-right: 50px;
        }
        // .check {
        //     width: 90px;
        //     text-align: right;
        //     display: flex;
        // }
    }
}
</style>
