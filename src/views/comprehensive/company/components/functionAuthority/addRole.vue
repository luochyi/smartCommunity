<template>
  <div>
    <div class="dra-title">
      <span>添加员工</span>
    </div>
    <div class="dra-content">
      <div class="dra-content-title">
        <span>角色分配</span>
      </div>
      <div class="dra-from">
         <div>
            <div class="role-input">
               <el-input size="mini" placeholder="请输入内容"></el-input>
            </div>
            <div class="role-select">
               <el-select size="mini" v-model="value" placeholder="请选择" style="width:300px">
                <el-option
                  v-for="item in cities"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
            </el-select>
            </div>
            <div class="role-content">
              <div class="role-title">
                <p>员工角色配置</p>
                <div>
                  <span>管理角色：</span>
                    <el-checkbox>备选项</el-checkbox>
                </div>

                  <div>
                  <span>管理角色：</span>
                    <el-checkbox>备选项</el-checkbox>
                    <el-checkbox>备选项</el-checkbox>
                    <el-checkbox>备选项</el-checkbox>
                </div>
                  <div>
                  <span>管理角色：</span>
                    <el-checkbox>备选项</el-checkbox>
                    <el-checkbox>备选项</el-checkbox>
                    <el-checkbox>备选项</el-checkbox>
                    <el-checkbox>备选项</el-checkbox>
                </div>
                  <div>
                  <span>管理角色：</span>
                    <el-checkbox>备选项</el-checkbox>
                </div>
              </div>
              <div>

              </div>
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
     cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value: '',
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
    margin: 32px 30px 0px 30px;
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
    margin: 50px auto;
  }
  .role-input{
    margin-bottom: 20px;
  }
   .role-select{
    padding-bottom: 30px;
    border-bottom: 1px solid #E8E8E8;
    margin-bottom: 30px;
  }

  .role-title p{
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    line-height: 20px;
  }
  .role-title div{
    margin-top: 25px;
  }
</style>
