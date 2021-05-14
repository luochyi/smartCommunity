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
                            v-model="value"
                            ref="cascaderAddr"
                            @change="checkRow()"
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
            value: [],
            children: [],
            props:{
                children:'children'
            },
            options: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let resData = {
                parentId: 0
            }
            shopCategoryList(resData).then((res) => {
                res.data.forEach((element) => {
                    let obj = {
                        value: element.id,
                        label: element.name
                    }
                    this.options.push(obj)
                    this.value.push(obj.value)
                    console.log(res)
                })
                console.log(this.options)
            })
        },
        checkRow() {
            this.children=[]//清空
            let childrenId = this.$refs.cascaderAddr.getCheckedNodes()[0].data.value
            this.props.value
            // console.log(index);
            shopCategoryList({parentId:childrenId}).then((res)=>{
                res.data.forEach((element) => {
                    let obj = {
                        value: element.id,
                        label: element.name
                    }
                    this.children.push(obj)
                    
                })
                console.log(this.children)//chilren
            }

            )
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
