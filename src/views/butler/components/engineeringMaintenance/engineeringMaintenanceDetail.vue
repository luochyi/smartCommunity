<template>
  <div>
      <FromCard style="marginTop:20px">
          <template slot="title">工单详情 <el-button @click="goback">返回</el-button></template>
          {{voRepairEngineeringFBI.status}}
            <el-row>
                <el-col :span="12"></el-col>
                <el-col :span="12"></el-col>
            </el-row>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">服务详情</template>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">派单详情</template>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">维修日志</template>
          <el-table>

          </el-table>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">处理进程记录</template>
          <el-table>

          </el-table>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">工单验收情况</template>
      </FromCard>
  </div>
</template>

<script>
import {repairEngineeringFindById} from '@/api/butler'
export default {
    filters: {
        capitalize: function (value) {
            switch (value) {
                case 1:
                    return '待派单'
                    break;
                case 2:
                    return '待派单'
                    break;
                case 3:
                    return '待接单'
                    break;
                case 4:
                    return '处理中'
                    break;
                case 5:
                    return '.已处理'
                    break;
                case 6:
                    return '验收失败'
                    break;
                case 7:
                    return '验收成功'
                    break;
                case 8:
                    return '已作废'
                    break;
                case 9:
                    return '已取消'
                    break;
                default:
                    break;
            }
        }
    },
    data(){
        return{
            voRepairEngineeringFBI:{
                // 报事报修工程维修 vo findById 回显
            },
            voRepairEngineeringReportList:{
                // 报事报修工程维修 维修日志【工作汇报】
            },
            voRepairEngineeringProcessRecordList:{
                //  处理进程记录
            },
            voRepairEngineeringMaintenanceResultsList:{
                // 完成结果及验收结果
            }
        }
    },
    created(){
        if(this.$route.query){
            console.log(this.$route.query.id);
            repairEngineeringFindById({id:this.$route.query.id}).then(res=>{
                console.log(res);
                this.voRepairEngineeringFBI = res.data.voRepairEngineeringFBI
                this.voRepairEngineeringReportList = res.data.voRepairEngineeringReportList
                this.voRepairEngineeringProcessRecordList = res.data.voRepairEngineeringProcessRecordList
                this.voRepairEngineeringMaintenanceResultsList = res.data.voRepairEngineeringMaintenanceResultsList
            })
        }
    },
    methods:{
        goback(){
            history.go(-1)
        }
    }
}
</script>

<style>

</style>