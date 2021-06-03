<template>
    <div>
        <div class="comprehensive">
            <div class="box flex">
                <div class="lf">
                    <div class="title">
                        <span>全部员工</span>
                        <el-button
                            size="mini"
                            type="primary"
                            style="float: right"
                            @click="add"
                            >新增角色</el-button
                        >
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
                                @click="roleCheck(role.id, index, role.name)"
                                :class="roleId === role.id ? 'active' : ''"
                                v-for="role in item.voRoleList"
                                :key="role.id"
                            >
                                <span>{{ role.name }}</span>
                                <div style="float:right" v-if="roleId===role.id">
                                  <el-button type="success" size="mini" @click="edit(role.id)">编辑</el-button>
                                  <el-button type="danger" size="mini" @click="del(role.id)">删除</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rg content">
                    <div>
                        <div class="title">
                            {{ roleName }}
                        </div>
                        <div style="font-size: 30px">请选择角色分配权限</div>
                        <div>
                            <div
                                class="item-list"
                                v-for="jurisdiction in jurisdictionList"
                                :key="jurisdiction.id"
                            >
                                <div class="item-title">
                                    <span>{{ jurisdiction.name }}</span>
                                    <!-- <el-checkbox :value="jurisdiction.isCheck === 1">{{jurisdiction.name}}</el-checkbox> -->
                                </div>
                                <div class="flex align-center flex-wrap">
                                    <div
                                        class="item"
                                        v-for="item in jurisdiction.voListJurisdictionList"
                                        :key="item.id"
                                    >
                                        <el-checkbox
                                            :value="item.isCheck === 1"
                                            @change="
                                                (value) =>
                                                    jurisdictionChange(
                                                        value,
                                                        item
                                                    )
                                            "
                                            >{{ item.name }}</el-checkbox
                                        >
                                    </div>
                                    <!--   <el-checkbox-group 
                          v-model="checkedCities"
                          :min="1"
                          :max="2">
                          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            <!-- 新增 -->
            <Drawer
                drawerTitle="新增角色"
                @drawerClose="addClose"
                :drawerVrisible="add_vrisible"
            >
                <div style="padding: 30px">
                    <FromCard>
                        <template slot="title">角色信息</template>
                        <template>
                            <VueForm ref="addForm" :formObj="addForm">
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
        </div>
    </div>
</template>

<script>
import {
    functionAuthorityRoleList,
    functionAuthorityUpdateOneJurisdiction,
    functionAuthorityListJurisdiction,
    sysRoleInsertRole,
    sysRoleUpdateRole,
    sysRoleDeleteRole
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
            add_vrisible: false,
            roleList: [],
            roleId: null,
            checked: false,
            jurisdictionList: [],
            roleName: '',
            addForm: {
                ruleForm: {
                    parentId: null,
                    code: null,
                    name: null
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '上级角色',
                        placeholder: '请选择上级角色',
                        width: '50%',
                        prop: 'parentId',
                        options:[
                          {
                            value:0,
                            label:'无上级角色'
                          }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '角色名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Int',
                        label: '角色编码',
                        width: '100%',
                        prop: 'code',
                        disabled:true
                    }
                ]
            }
        }
    },
    created() {
        this.GetRoleList()
        functionAuthorityRoleList().then(res=>{
          console.log(res);
          res.forEach(element => {
            let obj = {
              value:element.id,
              label:element.name
            }
            this.addForm.form_item[0].options.push(obj)
          });
        })
    },
    methods: {
        add() {
            this.add_vrisible = true
            let random = Math.floor(Math.random() * 100000000)
            this.addForm.ruleForm.code = random
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            sysRoleInsertRole(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.addClose()
                    this.GetRoleList()
                }
            })
        },
        edit(data){
          console.log(data);

        },
        del(data){
          this.$confirm('是否删除角色?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除角色成功'
                    })
                    sysRoleDeleteRole({ id: data }).then((res) => {
                        this.GetRoleList()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        // 角色列表
        GetRoleList() {
            functionAuthorityRoleList().then((res) => {
                this.roleList = res
                // this.roleId = res[0].id
                // this.getData()
            })
        },
        // 功能权限信息
        getData() {
            let resData = {
                roleId: this.roleId
            }
            functionAuthorityListJurisdiction(resData).then((res) => {
                console.log(res)
                this.jurisdictionList = res
            })
        },
        roleCheck(id, index, roleName) {
            this.roleId = id
            this.roleName = roleName
            this.getData()
        },
        jurisdictionChange(e, item) {
            console.log(e, item)
            if (item.isCheck === 0) {
                item.isCheck = 1
            } else {
                item.isCheck = 0
            }
            let resData = {
                roleId: this.roleId,
                jurisdictionId: item.id
            }
            functionAuthorityUpdateOneJurisdiction(resData).then((res) => {
                console.log(res)
            })
        }
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
    max-height: 600px;
    height: auto;
    overflow: auto;
    overflow: auto;
    border: 1px solid #cfd0dd;
    .title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        margin-bottom: 20px;
    }
    .tips {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
    }
    .item-list {
        margin-top: 40px;
        .item-title {
            padding-bottom: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #333333;
        }
        .item {
            width: 150px;
            margin: 10px 0;
        }
    }
}
</style>