<template>
  <div>
      <FromCard style="marginTop:20px">
          <template slot="title">工单详情 <el-button @click="goback">返回</el-button></template>
          <span style="fontSize:18px;color:#333333">{{voRepairEngineeringFBI.status|capitalize}}</span>
            <el-row>
                <el-col :span="2">工单编号</el-col>
                <el-col :span="12">{{voRepairEngineeringFBI.code}}</el-col>
            </el-row>
      </FromCard>
      <FromCard style="marginTop:15px">
          <template slot="title">服务详情</template>
             <el-row>
                <el-col :span="2"><span class="key">报修区域</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.repairArea">{{voRepairEngineeringFBI.repairArea}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">申请来源</span></el-col>
                <el-col :span="5">业主来电</el-col>
            </el-row>
            <el-row style="marginTop:15px">
                <el-col :span="2"><span class="key">报修人</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.createName">{{voRepairEngineeringFBI.createName}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">联系电话</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.createTel">{{voRepairEngineeringFBI.createTel}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
            <el-row style="marginTop:15px">
                <el-col :span="2"><span class="key">报修内容</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.reportDetail">{{voRepairEngineeringFBI.reportDetail}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">报修时间</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.createDate">{{voRepairEngineeringFBI.createDate}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
            <el-row style="marginTop:15px">
                <el-col :span="2"><span class="key">照片</span></el-col>
                <el-col :span="10" v-if="imglist.length==0">
                    <span>无</span>
                </el-col>
                 <el-col :span="10" v-else>
                    <img style="width:200px;height:160px;marginRight:5px" :src="'https://test.kaidalai.cn/static'+item.url" v-for="(item,index) in imglist" :key="index">
                </el-col>
            </el-row>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">派单详情</template>
           <el-card shadow="never">
               <el-row>
                <el-col :span="2"><span class="key">维修单位</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.organizationName">{{voRepairEngineeringFBI.organizationName}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
            <el-row style="marginTop:15px">
                <el-col :span="2"><span class="key">负责人</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.leadingName">{{voRepairEngineeringFBI.leadingName}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">联系电话</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.leadingTel">{{voRepairEngineeringFBI.leadingTel}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
           </el-card>
            <el-card shadow="never" style="marginTop:15px"><el-row >
                <el-col :span="2"><span class="key">维修人</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.maintenanceStaffName">{{voRepairEngineeringFBI.maintenanceStaffName}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">所属部门</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.subordinateDepartmentsName">{{voRepairEngineeringFBI.subordinateDepartmentsName}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
            <el-row style="marginTop:15px">
                <el-col :span="2"><span class="key">联系电话</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.maintenanceStaffTel">{{voRepairEngineeringFBI.maintenanceStaffTel}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">接单时间</span></el-col>
                <el-col :span="5" v-if="voRepairEngineeringFBI.maintenanceStaffPickSingleDate">{{voRepairEngineeringFBI.maintenanceStaffPickSingleDate}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row></el-card>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">维修日志</template>
          <el-table :data="voRepairEngineeringReportList">
              <el-table-column
                prop="createDate"
                label="更新时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="content"
                label="工作描述"
                width="180">
                </el-table-column>
            </el-table>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">处理进程记录</template>
          <el-table :data="voRepairEngineeringProcessRecordList">
               <el-table-column
                prop="operationDate"
                label="操作时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="operationType"
                label="操作类型"
                :formatter="dateFormat"
                width="180">
                </el-table-column>
                <el-table-column
                prop="operator"
                label="操作人"
                width="180">
                </el-table-column>
                <el-table-column
                prop="operatorContent"
                label="操作内容"
                width="180">
                </el-table-column>
          </el-table>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">工单验收情况</template>
          <el-card shadow="never" v-for="(item,index) in voRepairEngineeringMaintenanceResultsList" :key="index">
              <span style="color:#666666;fontSize:14px;">第 {{ index+1 }} 次验收</span>
            <el-row>
                <el-col :span="5" style="borderRight:1px solid #EEEEEE">
                    <div class="key">处理描述：   {{item.content}}</div>
                    <div class="key">材料清单：   {{item.billMaterials}}</div>
                    <div class="key">完成时间：   {{item.createDate}}</div>
                    
                </el-col>
                <el-col :span="10" style="paddingLeft:200px">
                    <div class="key">验收结果：   {{item.results=1?'通过':'驳回'}}</div>
                    <div class="key">审核意见：   {{item.advice}}</div>
                    <div class="key">验收时间：   {{item.acceptanceDate}}</div>
                </el-col>
            </el-row>
          </el-card>
      </FromCard>
  </div>
</template>

<script>
import {repairEngineeringFindById} from '@/api/butler'
export default {
    // 过滤器过滤{{}}
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
                    break ;
                default:
                    break;
            }
        }
    },
    data(){
        return{
            imglist:[],
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
        // 获取路由query传过来的id 再用id去调用findbyid获取数据
        if(this.$route.query){
            console.log(this.$route.query.id);
            repairEngineeringFindById({repairEngineeringId:this.$route.query.id}).then(res=>{
                console.log(res);
                this.voRepairEngineeringFBI = res.data.voRepairEngineeringFBI
                this.voRepairEngineeringReportList = res.data.voRepairEngineeringReportList
                this.voRepairEngineeringProcessRecordList = res.data.voRepairEngineeringProcessRecordList
                this.voRepairEngineeringMaintenanceResultsList = res.data.voRepairEngineeringMaintenanceResultsList
                for(let i =0;i<res.data.voRepairEngineeringFBI.engineeringMaintenanceImgList.length;i++){
                    this.imglist.push(res.data.voRepairEngineeringFBI.engineeringMaintenanceImgList[i])
                }
            })
        }
    },
    methods:{
        // 返回
        goback(){
            history.go(-1)
        },
        // 表单转义
        dateFormat(row,col){
            switch (row.operationType) {
                case 1:
                    return '提交工程维修'
                    break;
                case 2:
                    return '派单'
                    break;
                case 3:
                    return '派单'
                    break;
                case 4:
                    return '接单'
                    break;
                case 5:
                    return '处理完成'
                    break;
                case 6:
                    return '验收驳回'
                    break;
                case 7:
                    return '验收通过'
                    break;
                case 8:
                    return '开始整改'
                    break;
                case 9:
                    return '作废'
                    break;
                case 10:
                    return '取消'
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style>
    .key{
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0px;
    }
</style>