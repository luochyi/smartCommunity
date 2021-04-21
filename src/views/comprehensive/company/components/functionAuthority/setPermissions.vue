<template>
  <div>
    <div class="dra-title">
      <span>设置人员管理字段权限</span>
    </div>
    <div class="dra-content">
      <div class="dra-content-title">
        <span>基本配置</span>
      </div>
      <div class="dra-from">
          <div class="setP-box" v-for="item in radioTitles" :key="item.radioId">
            <div class="setP-item setP-txt">
              <span>{{item.radioTitle}}</span>
            </div>
            <div class="setP-item">
              <el-radio v-model="item.radioChecked" size="small" label="1">读写</el-radio>
            </div>
            <div class="setP-item">
              <el-radio v-model="item.radioChecked" size="small" label="2">只读</el-radio>
            </div>
             <div class="setP-item">
              <el-radio v-model="item.radioChecked" size="small" label="3">不可见</el-radio>
            </div>
          </div>
          <div class="dra-btn">
            <el-button size="small" type="danger" icon="el-icon-search"  @click="submitForm('ruleForm')">确定</el-button>
            <el-button size="small" type="info" >取消</el-button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radioTitles:[
      {
        radioId:1,
        radioTitle:'全选',
        radioChecked:'1',
      },
      {
        radioId:2,
        radioTitle:'昵称(系统名)',
        radioChecked:'1',
      },
       {
        radioId:3,
        radioTitle:'真实姓名',
        radioChecked:'3',
      },
       {
        radioId:4,
        radioTitle:'手机号',
        radioChecked:'1',
      },
       {
        radioId:5,
        radioTitle:'初始密码',
        radioChecked:'2',
      },
       {
        radioId:6,
        radioTitle:'性别',
        radioChecked:'1',
      },
       {
        radioId:7,
        radioTitle:'部门',
        radioChecked:'1',
      },
       {
        radioId:8,
        radioTitle:'职位',
        radioChecked:'1',
      },
      {
        radioId:9,
        radioTitle:'汇报对象',
        radioChecked:'1',
      },
      ]
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .dra-title{
    height: 81px;
    display: flex;
    align-items: center;
    background: white;
  }
  .dra-title span{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
    padding-left: 20px;
  }
  .dra-content{
    background: white;
    border-radius: 4px;
    padding-bottom: 25px;
    margin: 32px 30px 0px 19px;
  }
  .dra-content-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
      border-bottom: 1px solid #E8E8E8;
  }
  .dra-content-title span{
    padding-left: 22px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
  }
  .dra-from{
    width: 80%;
    margin: auto;
  }
  .setP-box{
    display: flex;
    
  }
  .setP-item{
    width: 25%;
    padding: 11px 0px;
  }
</style>
