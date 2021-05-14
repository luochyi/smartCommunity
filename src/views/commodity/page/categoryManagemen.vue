<template>
    <div>
        <div>
            <div class="main-content">
                <div class="main-titel">
                    <span>产品类型系列</span>
                </div>
                <div class="content">
                    <el-button class="init-button" size="small"
                        >修改类目</el-button
                    >
                    <div class="creation_box">
                        <el-cascader-panel
                            :options="options"
                            :props="props"
                            ref="cascaderAddr"
                            @change="getChild"
                            @expand-change="getChild"
                            size="medium"
                            style="margin: 20px 0"
                        ></el-cascader-panel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { shopCategoryList } from '@/api/shop.js'
export default {
    data() {
        return {
            options: [],
            props: {
                value: 'id',
                label: 'name',
                children: 'children'
            }
        }
    },
    created() {
        this.getDate()
    },
    methods: {
        getDate() {
            shopCategoryList({ parentId: 0 }).then((res) => {
                console.log(res);
                this.options = res.data
                this.options.forEach((item, index) => {
                    this.options[index].children = []
                })
            })
        },
        getChild() {
            console.log(1);
            let childrenId = this.$refs['cascaderAddr'].getCheckedNodes()
            console.log(childrenId);
            // shopCategoryList({parentId:childrenId}).then((res)=>{
            //     this.options.children = res.data
            // })
        }
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
