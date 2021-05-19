<template>
    <div class="main-content">
        <div class="main-titel">
            <span>合同管理</span>
        </div>
        <div class="content">
            <el-button size="mini">新增合同</el-button>
            <template>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    max-height="700"
                >
                    <el-table-column fixed prop="index" label="序号" width="80">
                    </el-table-column>
                    <el-table-column
                        prop="item"
                        label="部门"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" width="100">
                    </el-table-column>
                    <el-table-column prop="tel" label="手机号" width="200">
                    </el-table-column>
                     <el-table-column prop="date" label="入职时间" width="200">
                    </el-table-column>
                    <el-table-column prop="date" label="合同" width="200">
                        <el-button
                                @click="down"
                                type="text"
                                size="small"
                            >
                                下载合同
                            </el-button>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="
                                    deleteRow(scope.$index, tableData)
                                "
                                type="text"
                                size="small"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    index:1,
                    item:'保洁部',
                    name:'陈梅娟',
                    sex:'女',
                    tel:'137327113489',
                    card:'416080100100225186',
                    salary:'4000',
                    baoxian:'960',
                    date:'2020-4-18'
                },
                {
                    index:2,
                    item:'保洁部',
                    name:'马保民',
                    sex:'男',
                    tel:'13754546653',
                    card:'35453553543202251',
                    salary:'4200',
                    baoxian:'960',
                    date:'2019-6-18'
                },
                {
                    index:3,
                    item:'维修部',
                    name:'杨玉洁',
                    sex:'女',
                    tel:'13345357746',
                    card:'41606757349346786',
                    salary:'4500',
                    baoxian:'960',
                    date:'2017-6-6'
                },
                {
                    index:4,
                    item:'维修部',
                    name:'陈汉典',
                    sex:'女',
                    tel:'13770777234',
                    card:'41654645654645654',
                    salary:'4000',
                    baoxian:'960',
                    date:'2020-4-11'
                },
                {
                    index:5,
                    item:'保安部',
                    name:'韩孝清',
                    sex:'男',
                    tel:'177927312311',
                    card:'6217211107001880725',
                    salary:'3000',
                    baoxian:'960',
                    date:'2021-4-1'
                },{
                    index:6,
                    item:'保安部',
                    name:'柏路',
                    sex:'男',
                    tel:'17897897897',
                    card:'622202090400481871',
                    salary:'3000',
                    baoxian:'960',
                    date:'2020-3-11'
                },
                {
                    index:7,
                    item:'事业部',
                    name:'杨金红',
                    sex:'女',
                    tel:'18715687322',
                    card:'6225321135601694188',
                    salary:'6000',
                    baoxian:'960',
                    date:'2021-1-12'
                },
                {
                    index:8,
                    item:'事业部',
                    name:'陈久',
                    sex:'男',
                    tel:'13588947544',
                    card:'6214650166541712121',
                    salary:'6200',
                    baoxian:'960',
                    date:'2020-6-19'
                },
                {
                    index:9,
                    item:'招商部',
                    name:'张亚娟',
                    sex:'女',
                    tel:'13478959485',
                    card:'12005486667741143',
                    salary:'4700',
                    baoxian:'960',
                    date:'2017-11-5'
                },
                {
                    index:10,
                    item:'招商部',
                    name:'何芳芳',
                    sex:'女',
                    tel:'18702752342',
                    card:'622319011018326498',
                    salary:'5000',
                    baoxian:'960',
                    date:'2020-12-11'
                },
            ]
        }
    },
    methods: {
        down(){
            window.open('http://www.gov.cn/xinwen/2019-11/29/5456897/files/0cea2c85cb0742a9afe69b27ac0c7958.doc')
        },
        deleteRow(index, rows) {
            rows.splice(index, 1)
        }
    }
}
</script>
