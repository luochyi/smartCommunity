<template>
  <div>
      <FromCard style="marginTop:20px">
          <template slot="title">装修详情 <el-button @click="goback">返回</el-button></template>
          <span style="fontSize:18px;color:#333333" v-if="status">{{status|capitalize}}</span>
            <el-row>
                <el-col :span="2"></el-col>
                <el-col :span="12"></el-col>
            </el-row>
      </FromCard>
      <FromCard style="marginTop:15px">
          <template slot="title">服务详情</template>
             <el-row>
                <el-col :span="2"><span class="key">申请业主</span></el-col>
                <el-col :span="5" v-if="createName">{{createName}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">关联房屋</span></el-col>
                <el-col :span="5"  v-if="roomName">{{roomName}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
             <el-row  style="marginTop:15px">
                <el-col :span="2"><span class="key">创建时间</span></el-col>
                <el-col :span="5"  v-if="createDate">{{createDate}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
      </FromCard>
      <FromCard style="marginTop:15px">
          <template slot="title">装修公司信息</template>
             <el-row>
                <el-col :span="2"><span class="key">装修公司</span></el-col>
                <el-col :span="5" v-if="constructionUnit">{{constructionUnit}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">联系方式</span></el-col>
                <el-col :span="5"  v-if="directorTel">{{directorTel}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
             <el-row  style="marginTop:15px">
                 <el-col :span="2"><span class="key">负责人</span></el-col>
                <el-col :span="5"  v-if="director">{{director}}</el-col>
                <el-col :span="5" v-else>无</el-col>
                <el-col :span="2"><span class="key">申请时间</span></el-col>
                <el-col :span="5"  v-if="createDate">{{createDate}}</el-col>
                <el-col :span="5" v-else>无</el-col>
            </el-row>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">工单检查情况</template>
            <el-card shadow="never">
                <el-row  style="marginTop:15px">
                    <el-col :span="2"><span class="key">工单检查人</span></el-col>
                    <el-col :span="5"  v-if="trackerName">{{trackerName}}</el-col>
                    <el-col :span="5" v-else>无</el-col>
                </el-row>
            </el-card>
            <el-card shadow="never">
                <el-row  style="marginTop:15px">
                    <el-col :span="2"><span class="key">完成情况</span></el-col>
                    <el-col :span="5"  v-if="isQualified">{{isQualified=1?'合格':"不合格"}}</el-col>
                    <el-col :span="5" v-else>无</el-col>
                </el-row>
                <el-row  style="marginTop:15px">
                </el-row>
                <el-row  style="marginTop:15px">
                    <el-col :span="2"><span class="key">检查时间</span></el-col>
                    <el-col :span="5"  v-if="applicationCheckDate">{{applicationCheckDate}}</el-col>
                    <el-col :span="5" v-else>无</el-col>
                </el-row>
            </el-card>
      </FromCard>
      <FromCard style="marginTop:20px">
          <template slot="title">处理进程记录</template>
          <el-table :data="checkVoList">
               <el-table-column
                prop="createDate"
                label="操作时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="createName"
                label="操作人"
                width="180">
                </el-table-column>
                <el-table-column
                prop="detail"
                label="操作内容"
                width="180">
                </el-table-column>
          </el-table>
      </FromCard>
      
  </div>
</template>

<script>
import {userDecorationNewList} from '@/api/daily'
export default {
    // 过滤器过滤{{}}
    filters: {
        capitalize: function (value) {
            switch (value) {
                case 1:
                    return '装修申请中'
                    break;
                case 2:
                    return '装修通过(装修中)'
                    break;
                case 3:
                    return '装修驳回'
                    break;
                case 5:
                    return '申请完工检查'
                    break;
                case 6:
                    return '检查通过'
                    break;
                case 7:
                    return '检查不通过'
                    break;
                default:
                    break;
            }
        }
    },
    data(){
        return{
            status:null,
            createName:null,
            roomName:null,
            createDate:null,
            constructionUnit:null,
            directorTel:null,
            director:null,
            trackerName:null,
            isQualified:null,
            applicationCheckDate:null,
            checkVoList:[]
        }
    },
    created(){
        // 获取路由query传过来的id 再用id去调用findbyid获取数据
        if(this.$route.query){
            console.log(this.$route.query.id);
            userDecorationNewList().then(res=>{
                console.log(res);
                res.tableList&&res.tableList.forEach(ele => {
                    if(ele.id==this.$route.query.id){
                        console.log(ele);
                        this.status = ele.status
                         this.createName = ele.createName
                         this.roomName = ele.roomName
                         this.createDate = ele.createDate
                         this.constructionUnit = ele.constructionUnit
                         this.directorTel = ele.directorTel
                         this.director = ele.director
                        this.trackerName = ele.trackerName
                         this.isQualified = ele.isQualified
                         this.applicationCheckDate = ele.applicationCheckDate
                        this.checkVoList = ele.checkVoList
                         
                    }
                });
            })
        }
    },
    methods:{
        // 返回
        goback(){
            history.go(-1)
        },
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