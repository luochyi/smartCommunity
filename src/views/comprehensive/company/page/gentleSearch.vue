<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>通用查询</span>
            </div>
            <div class="content">
                <div class="">
                    <el-select v-model="value1" @change="changeOption">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                            </el-option
                        >
                    </el-select>
                    <el-select style="marginLeft: 20px" v-model="value2">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                            </el-option
                        >
                    </el-select>
                    <span style="marginLeft: 20px">
                        手机号：<el-input v-model="searchword" style="width:200px;"></el-input>
                    </span>
                    <el-button style="marginLeft: 20px" @click="search">查询</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { sysOrganizationFindAllDepartment, sysUserList } from '@/api/daily'
import { dataDictionaryList, dataDictionaryUpdate } from '@/api/company'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            searchword:null,
            value1: null,
            value2: null,
            options1: [
                {
                    label: '系统设置',
                    value:1,
                    children: [
                        {
                            label: '数据库管理',
                            value:1,
                            path: 'databaseManagement'
                        },
                        {
                            label: '屏蔽管理',value:2,
                            path: 'prohibitedKeywords'
                        }
                    ]
                },
                {
                    label: '日常管理',value:2,
                    children: [
                        {
                            label: '预约管理',value:1,
                            path: 'bookingManagement'
                        },
                        {
                            label: '包裹代收',value:2,
                            path: 'packageCollection'
                        }
                    ]
                },
                {
                    label: '收费管理',value:3,
                    children: [
                        {
                            label: '票据管理',value:1,
                            path: 'invoiceManagement'
                        },
                    ]
                },
                {
                    label: '管家服务',value:4,
                    children: [
                        {
                            label: '报事报修',value:1,
                            path: 'reportRepair'
                        },
                        {
                            label: '访客管理',value:2,
                            path: 'visitorManagement'
                        }
                    ]
                },
            ],
            options2: []
        }
    },
    methods: {
        changeOption(val){
            this.options2 =[]
            console.log(val);
            for(let i = 0;i<this.options1.length;i++){
                if(this.options1[i].value == val){
                    console.log(this.options1[i].children);
                    let child = this.options1[i].children
                    child.forEach(ele=>{
                        let obj = {
                            value:ele.value,
                            label:ele.label,
                            path:ele.path,
                        }
                        this.options2.push(obj)
                    })
                }
            }
        },
        search(){
            console.log(this.value2);
            for(let i = 0;i<this.options2.length;i++){
                 if(this.options2[i].value == this.value2){
                     console.log(this.options2[i].path);
                     this.$router.push({name:this.options2[i].path})
                 }
            }
        }
    }
}
</script>