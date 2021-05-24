<template>
    <div>
        <div>
            <div class="main-content">
                <div class="main-titel">
                    <span>产品类型系列</span>
                </div>
                <div class="content">
                    <el-button class="init-button" size="small" @click="edit()"
                        >修改类目</el-button
                    >
                    <!-- <el-button class="init-button" size="small" @click="add()"
                        >新增类目</el-button
                    >
                    <el-button class="init-button" size="small" @click="del()"
                        >删除类目</el-button
                    > -->
                    <div class="creation_box">
                        <el-cascader-panel
                            :options="options"
                            :props="props"
                            ref="cascaderAddr"
                            @change="getChild"
                            size="medium"
                            style="margin: 20px 0"
                        ></el-cascader-panel>
                    </div>
                    <Drawer
                    drawerTitle="修改分类名称"
                    @drawerClose="editClose"
                    :drawerVrisible="edit_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">填写分类名称</template>
                            <template>
                                <VueForm ref="editForm" :formObj="editForm">
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
    </div>
</template>
<script>
import { shopCategoryList ,shopCategoryUpdate} from '@/api/shop.js'
export default {
    data() {
        return {
            edit_vrisible: false,
            options: [],
            props: {
                value: 'id',
                label: 'name',
                children:'children',
            },
            editForm: {
                ruleForm: {
                    name: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '分类名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    }
                ]
            },
        }
    },
    created() {
        this.getDate()
    },
    methods: {
        edit(){
            this.edit_vrisible = true
              this.editForm.ruleForm.name=this.$refs['cascaderAddr'].getCheckedNodes()[0].data.name
        },
        getDate() {
            shopCategoryList({ parentId: 0 }).then((res) => {
                console.log(res);
                this.options = res.data
                // this.options.forEach((item, index) => {
                //     this.options[index].children = []
                // })
            })
        },
        getChild() {
            // console.log(this.$refs['cascaderAddr'].getCheckedNodes()[0].data);
            let that = this.$refs['cascaderAddr'].getCheckedNodes()[0].data
            console.log(that);
            shopCategoryList({parentId:that.id}).then((res)=>{
                this.$set(that,'children',res.data)
                console.log(that);
            })
        },
        editClose() {
            this.$refs.editForm.reset()
            this.edit_vrisible = false
        },
        editSubmit() {
            let resData = {
                ...this.editForm.ruleForm,
                id:this.$refs['cascaderAddr'].getCheckedNodes()[0].data.id
            }
            shopCategoryUpdate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.getDate()
                    this.editClose()
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.creation_box {
    margin: 0;
    height: 100%;
    height: 100% !important;
}
</style>
