<template>
    <div>
        <div class="main-content"  style="marginBottom:30px">
            <div class="main-titel">
                <span>{{basicInfo.months+' '}}抄表账单详情</span>
                <el-button size="small" id="backbtn" @click="back">返回</el-button>
            </div>
            <!-- <div class="content">
                <div class="s_title">基本信息</div>
                <div>
                    <span>房屋信息：{{basicInfo.roomName}}</span>
                    <span>当前关联住户：{{basicInfo.associationResidentsName}}</span>
                    <span>费用合计：{{basicInfo.costPriceSum}}</span>
                    <span>实收费用总计：{{basicInfo.paidPriceSum}}</span>
                    <span>剩余未缴总计：{{basicInfo.paymentPriceSum}}</span>
                </div>
                
            </div> -->
        <div class="main details-box">
            <div class="box">
                    <div class="title">
                        <span>基本信息</span>
                    </div>
                    <!-- detailData -->
                    <div class="box-item">
                        <div class="item">
                            <div class="span">
                                <span>抄表类型：</span>
                            </div>
                            <div>
                                <span>{{basicInfo.type=1?'水费':'电费'}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>总用量：</span>
                            </div>
                            <div>
                                <span>{{
                                    basicInfo.totals
                                }}{{basicInfo.unit}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>总计费用：</span>
                            </div>
                            <div>
                                <span>{{ basicInfo.cost+' 元'}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>用量单价：</span>
                            </div>
                            <div>
                                <span>{{basicInfo.unitPrice+' 元'}}/{{basicInfo.unit}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>住户用量：</span>
                            </div>
                            <div>
                                <span>{{
                                    basicInfo.householdConsumption
                                }}{{basicInfo.unit}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>住户总费用：</span>
                            </div>
                            <div>
                                <span>{{basicInfo.householdCost+' 元'}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>公摊单价：</span>
                            </div>
                            <div>
                                <span>{{basicInfo.shareUnitPrice}}{{basicInfo.chargeUnit}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>公摊总费用：</span>
                            </div>
                            <div>
                                <span>{{basicInfo.householdShareCost+' 元'}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="span">
                                <span>剩余未缴费用：</span>
                            </div>
                            <div>
                                <span>{{basicInfo.unpaidExpenses+' 元'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        <div class="main-content">
            <div class="content">
                <div class="s_title">账单记录</div>
                
                <!-- <div  style="width: 50px"><download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="设施设备检查记录.xls"
                            >
                                上面可以自定义自己的样式，还可以引用其他组件button
                                <el-button
                                    size="mini"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel></div> -->
                <div class="">
                    <div>
                        <!-- <div style="background:#F9F9F9;padding:10px">
                            <div style="marginBottom:10px;"><span style="color:#000000;fontWeight:600">年份</span>
                            <span v-for="(item,index) in yearchoose" :key="index" style="padding:10px;cursor:pointer;"  :class="{choosed: changeRed == index}" @click="chooseYears(item,index)">{{item}}</span></div>
                            <span style="color:#000000;fontWeight:600">月份</span>
                            <span v-for="(item,indexS) in bilchoose" :key="indexS" style="padding:10px;cursor:pointer;" :class="{choosed: changeRedS == indexS}" @click="chooseMon(item,indexS)">{{item+'月'}}</span>
                        </div> -->
                        <div></div>
                    </div>
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                    
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button @click="pay(table_row)">缴费</button> -->
                                <!-- <button @click="refund(table_row)">退款备注</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
            </div>
        </div>
        <el-dialog
                    title="退款备注"
                    width="480px"
                    top="40vh"
                    @close="resetDialog()"
                    :visible.sync="remarkshow"
                >   
                <div>
                    退款金额
                </div>
                    <div class="dialang-box">
                        <!-- 正则规定elinput只能数字。小数两位 -->
                        <el-input
                            placeholder="请输入退款金额"
                            size="mini"
                            v-model="refundPrice"
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                            style="width: 423px; height: 32px"
                        ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="remarkshow = false"
                            >取 消</el-button
                        >
                        <el-button
                            size="mini"
                            type="primary"
                            @click="remarkshowOk()"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
    </div>
</template>

<script>
import {expenseBillRefund,dailyPaymentFindEnableTempleDetail} from '@/api/charge.js'
import { DownloadExcel } from '@/plugins/DownloadExcel'
export default {
    data() {
        return {
            expenseId:null,
            remarkshow: false,
            refundPrice:null,

            changeRed: -1,
            changeRedS:-1,
            thatId: null,
            drawerTitle: '',
            add_vrisible: false,
            addDate: null,
            options: [],
            ids: [],
            // bilchoose:['全部',1,2,3,4,5,6,7,8,9,10,11,12],
            // yearchoose:['全部',2021,2022],
            basicInfo:{
                months:null,
                type:null,//类型
                totals:null,//总用量
                cost:null,//总费用
                unitPrice:null,//danjia
                unit:null,//danwei
                householdConsumption:null,//住户用量
                householdCost:null, //住户总费用
                shareUnitPrice:null,// 公摊单价
                chargeUnit:null,//单位
                householdShareCost:null, //公摊总费用
                unpaidExpenses:null //剩余未缴费用
            },
            sysOptions: [],
            // inspector: [],
            loading: false,
            table_row: [],
            activeName: '0',
            // json_fields: {
            //     设施设备检查计划编号: 'code',
            //     '设施/设备名称': 'facilitiesName',
            //     检查人姓名: 'examinerName',
            //     检查人联系方式: 'examinerTel',
            //     任务状态: {
            //         field: 'status',
            //         callback: (value) => {
            //             switch (value) {
            //                 case 1:
            //                     return '开启'
            //                     break
            //                 case 2:
            //                     return '停用'
            //                     break
            //             }
            //         }
            //     },
            //     计划开始时间: 'planBeginDate',
            //     '单次持续时间（单位分钟）': 'spaceTime',
            //     检查频率: {
            //         field: 'checkRateType',
            //         callback: (value) => {
            //             switch (value) {
            //                 case 1:
            //                     return '每天'
            //                     break
            //                 case 2:
            //                     return '每周'
            //                     break
            //                 case 3:
            //                     return '每月'
            //                     break
            //                 default:
            //                     break
            //             }
            //         }
            //     },
            //     创建人: 'createName'
            // },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '创建时间',
                        prop: 'createDate',
                        width: 'auto'
                    },
                    {
                        label: '房屋名称',
                        prop: 'roomName',
                        width: 'auto'
                    },
                    {
                        label: '房屋住户',
                        prop: 'residents',
                        width: 'auto'
                    },
                    {
                        label: '房屋面积',
                        prop: 'houseArea',
                        width: 'auto'
                    },
                    {
                        label: '应缴金额',
                        prop: 'amountPayable',
                        width: 'auto'
                    },
                    {
                        label: '实缴纳金额',
                        prop: 'paidAmount',
                        width: 'auto'
                    },
                    {
                        label: '剩余未缴金额',
                        prop: 'remainingUnpaidAmount',
                        width: 'auto'
                    },
                    {
                        label: '缴纳状态',
                        prop: 'status',
                        width: 'auto',type:'function',callback:(row,prop)=>{
                            switch(row.status){
                                case 1:
                                    return '未缴纳'
                                    break
                                case 2:
                                    return '部分缴纳'
                                    break
                                case 3:
                                    return '已缴纳'
                                    break
                            }
                        }
                    },
                    {
                        label: '费率',
                        prop: 'rate',
                        width: 'auto'
                    },
                    {
                        label: '滞纳金',
                        prop: 'lateFee',
                        width: 'auto'
                    },
                    {
                        label: '缴费期限',
                        prop: 'paymentPeriod',
                        width: 'auto'
                    },
                    {
                        label: '缴费时间',
                        prop: 'paymentTime',
                        width: 'auto'
                    },
                    {
                        label: '预期天数',
                        prop: 'expectedDays',
                        width: 'auto'
                    },
                    {
                        label: '支付方式',
                        prop: 'type',
                        width: 'auto',type:'function',callback:(row,prop)=>{
                            switch(row.type){
                                case 1:
                                    return '微信'
                                    break
                                case 2:
                                    return '支付宝'
                                    break
                                case 3:
                                    return '现金'
                                    break
                                case 4:
                                    return '预缴支付'
                                    break
                            }
                        }
                    },
                ],
                table_data: [],
                url: 'meterReadingRecordFindShareBillDetailsListByShareId',
                search_item: [
                    // {
                    //     type: 'Input',
                    //     label: '缴纳人名称',
                    //     placeholder: '请输入',
                    //     prop: 'payPeopleName'
                    // },
                    // {
                    //     type: 'select',
                    //     label: '费用类型',
                    //     placeholder: '请输入',
                    //     prop: 'chargesTemplateDetailId',
                    //     options:[]
                    // },
                    // {
                    //     type: 'Input',
                    //     label: '记录编号',
                    //     placeholder: '请输入',
                    //     prop: 'code'
                    // }

                    // Slot
                ],
                data: {
                    pageNum: 1,
                    size: 10,
                    shareBillId:null,
                }
            }
        }
    },
    created () {
        console.log(this.$route.params);
        console.log(this.$route.params.data.id);
        if (this.$route.params.data.id) {
          console.log(this.$route.params.data.id)
          let data = this.$route.params.data
          this.config.data.shareBillId = data.id
          /** associationResidentsName: null  //当前关联住户名称
                costPriceSum: 1220  //费用总计
                id: 77
                paidPriceSum: 0  //实收费用总计
                paymentPriceSum: 1220  //剩余未缴总计
                refundPriceSum: 0  //退款总计
                roomName: "2-1-2004房"  //房屋信息
                totalPriceSum: 1220   //应收金额总计
            */
           this.basicInfo.months = data.months
           this.basicInfo.type = data.type
           this.basicInfo.totals = data.totals
           this.basicInfo.cost = data.cost
           this.basicInfo.unitPrice = data.unitPrice
           this.basicInfo.unit = data.unit
           this.basicInfo.householdConsumption = data.householdConsumption
           this.basicInfo.householdCost = data.householdCost
           this.basicInfo.shareUnitPrice = data.shareUnitPrice
           this.basicInfo.chargeUnit = data.chargeUnit
           this.basicInfo.householdShareCost = data.householdShareCost
           this.basicInfo.unpaidExpenses = data.unpaidExpenses
        }
        dailyPaymentFindEnableTempleDetail().then(res=>{
            console.log(res);
            res.data.forEach(element => {
                let obj ={
                    value:element.id,
                    label:element.name
                }
                this.config.search_item[1].options.push(obj)
            });
        })
  },
    methods: {
        back(){
            this.$router.go(-1)
        },
        chooseYears(years,index){
            this.changeRed=index;
            console.log(years);
            if(years!= '全部'){
                this.config.data.years = years
            }else{
                this.config.data.years = null
            }
        },
        chooseMon(mon,indexS){
            this.changeRedS=indexS;
            console.log(mon);
            if(mon!= '全部'){
                this.config.data.months = mon
            }else{
                this.config.data.months = null
            }
        },
        refund(data){
            // console.log(data[0]);
            if(data.length!=1){
                this.$message({
                    type:'error',
                    message:'请选择一条记录进行备注'
                })
            }else{
                this.expenseId = data[0].id
                this.remarkshow = true
            }
        },
        remarkshowOk(){
            if(this.refundPrice===null){
                this.$message({
                    type:'error',
                    message:'金额不能为空'
                })
            }
            let resData = {
                    id:this.expenseId,
                    refundPrice:this.refundPrice
                }
                expenseBillRefund(resData).then(res=>{
                    if(res.status){
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.requestData()
                        this.remarkshow = false
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
        },
        resetDialog(){
            this.refundPrice = null
        },
        // Excel导出
        // async fetchData() {
        //     let Excel = []
        //     let params = {
        //         url: 'sysOperationsList',
        //         data: {
        //             pageNum: 1,
        //             size: 100
        //         }
        //     }
        //     const data = await DownloadExcel(params, this)
        //     return data
        // },
        // Excel进度
        // ExcelLoading(page, pageCount) {
        //     const Loading = this.$loading({
        //         lock: true,
        //         text: `正在导出Excel${page}`,
        //         spinner: 'el-icon-loading',
        //         background: 'rgba(0, 0, 0, 0.7)'
        //     })
        //     Loading.text = `正在导出Excel  ${page}/${pageCount}`
        //     console.log(Loading.text)
        // },
        // // Excel导出结束
        // finishDownload() {
        //     const Loading = this.$loading()
        //     Loading.close()
        // },

        // 表格选中
        tableCheck(data) {
            this.table_row = data
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
        }
        // open(data){
        //   console.log(data);
        //   data.forEach(ele=>{
        //     // console.log(obj);
        //     this.ids.push(ele.id)
        //     console.log(this.ids);
        //   })
        //   facilitiesPlanOpen({ids:this.ids}).then(res=>{
        //     this.$message({
        //           message: res.message,
        //           type: 'success'
        //         })
        //   })
        //   this.$refs.table.requestData()
        // },
        // stop(data){
        //   console.log(data);
        //   data.forEach(ele=>{
        //     // console.log(obj);
        //     this.ids.push(ele.id)
        //     console.log(this.ids);
        //   })
        //   facilitiesPlanStop({ids:this.ids}).then(res=>{
        //     this.$message({
        //           message: res.message,
        //           type: 'success'
        //         })
        //   })
        //   this.$refs.table.requestData()
        // }
    }
}
</script>
<style lang="scss" scoped>
.details-box {
    .box-item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        .item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            width: 50%;
            .span {
                width: 100px;
                text-align: right;
                margin-right: 20px;
            }
        }
    }
}
    .s_title{
        font-size:16px;
        color:#333333;
        font-weight: 400;
        line-height:19.6px;
    }
    .main {
    margin: 20px;
    .head-box {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #cfd0dd;
        margin-bottom: 20px;
        .titel {
            line-height: 50px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            padding-left: 20px;
            border-bottom: 1px solid #d8d8d8;
        }
    }
    .box {
        background: #fff;
        padding: 5px;
        margin: 10px 0;
        // border-radius: 4px;
        // border: 1px solid #cfd0dd;

        .title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
        }
    }
}
#backbtn{
    padding: 10px 20px 10px 0px;
    margin-left: 30px;
}
.choosed{
    color:  #FB4702;

}
</style>