<template>
    <div class="main-content">
        <div class="main-titel">
            <span>提醒通知记录</span>
        </div>
        <div class="content">
            <el-button size="mini">新增提醒</el-button>
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
                    <el-table-column prop="content" label="通知内容" width="320">
                    </el-table-column>
                    <el-table-column prop="date" label="通知时间" width="200">
                    </el-table-column>
                    <el-table-column prop="name" label="添加人" width="120">
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
                    date:'2020-4-18',
                    content:'业委会及物业公司对以下情况零容忍处理，移送公安机关追究其相关的民事、刑事责任，并承担相应的经济赔偿'
                },
                {
                    index:2,
                    item:'保洁部',
                    name:'陈梅娟',
                    sex:'男',
                    tel:'13754546653',
                    card:'35453553543202251',
                    salary:'4200',
                    baoxian:'960',
                    date:'2020-5-18',
                    content:'业委会与物业公司根据业主大会决议定于20xx年5月6日进行小区封闭管理。小区大门道闸系统全面启用（地库有车位业主将另行发放感应卡进入，地库无车位车辆禁止出入）'
                },
                {
                    index:3,
                    item:'维修部',
                    name:'陈梅娟',
                    sex:'女',
                    tel:'13345357746',
                    card:'41606757349346786',
                    salary:'4500',
                    baoxian:'960',
                    date:'2020-6-6',
                    content:'搬家车辆请业主或租户提前一天与物业公司预约，安排车辆停放位置，及电梯的使用。地库无车位的业主，请自行安排车辆停放位置'
                },
                {
                    index:4,
                    item:'维修部',
                    name:'陈梅娟',
                    sex:'女',
                    tel:'13770777234',
                    card:'41654645654645654',
                    salary:'4000',
                    baoxian:'960',
                    date:'2020-7-18',
                    content:'小区路面已经全部实施录像监控，请广大业主及租户约束自身行为。配合并支持封闭小区的整顿工作，共同维护及营造良好的小区路面秩序'
                },
                {
                    index:5,
                    item:'保安部',
                    name:'陈梅娟',
                    sex:'男',
                    tel:'177927312311',
                    card:'6217211107001880725',
                    salary:'3000',
                    baoxian:'960',
                    date:'2020-8-18',
                    content:'感谢广大业主对业委会及物业公司工作的大力支持，给您带来的不便敬请谅解。'
                },{
                    index:6,
                    item:'保安部',
                    name:'柏路',
                    sex:'男',
                    tel:'17897897897',
                    card:'622202090400481871',
                    salary:'3000',
                    baoxian:'960',
                    date:'2020-9-18',
                    content:'根据全国《物业管理条例》第四十七条、《上海市住宅物业管理规定》第二十二条"物业管理企业应当协助做好物业管理区域的安全防范工作"'
                },
                {
                    index:7,
                    item:'事业部',
                    name:'柏路',
                    sex:'女',
                    tel:'18715687322',
                    card:'6225321135601694188',
                    salary:'6000',
                    baoxian:'960',
                    date:'2020-9-10',content:'目前是各类案件多发时期,务请妥善"择选"、"教育"和"监督"好您的"保姆"、"家政人员"、"司机"、"装修人员"等您单元所有雇佣人员及其的素质与行为'
                },
                {
                    index:8,
                    item:'事业部',
                    name:'柏路',
                    sex:'男',
                    tel:'13588947544',
                    card:'6214650166541712121',
                    salary:'6200',
                    baoxian:'960',
                    date:'2020-10-28',content:"您外出或休息时,务请规范有效地进行家庭安全系统的设防和撤防及关妥您单元所有的门窗, 勿忘关闭水喉和煤气;"
                },
                {
                    index:9,
                    item:'招商部',
                    name:'柏路',
                    sex:'女',
                    tel:'13478959485',
                    card:'12005486667741143',
                    salary:'4700',
                    baoxian:'960',
                    date:'2020-11-5',content:'家中务请不要存放过多的现金、贵重物品,现金和贵重物品务请格外关注、妥善存放与严加保管;'
                },
                {
                    index:10,
                    item:'招商部',
                    name:'柏路',
                    sex:'女',
                    tel:'18702752342',
                    card:'622319011018326498',
                    salary:'5000',
                    baoxian:'960',
                    date:'2020-12-11',content:'如若您户外出时间较长,需我处配合关注,则请与我客户服务部事先取得联系,以便指派我物业保安加强对您单元周围作重点防范巡查;'
                },
            ]
        }
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1)
        }
    }
}
</script>
