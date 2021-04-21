<template>
  <div>
    <div class="dra-title">
      <span>详情</span>
    </div>
    <div class="dra-content">
      <div class="dra-content-title">
        <span>基础信息</span>
      </div>
      <div class="dra-from">
         <div>
            <el-form :model="addRuleForm" size="small" :rules="addRules" ref="addRuleForm" label-width="100px" class="demo-addRuleForm">
              <div class="user-input-box">
                <div>
                  <el-form-item label="用户名" prop="userName">
                      <span>CHEAULE</span>
                    </el-form-item>
                </div>
                <div>
                  <el-form-item label="密码" prop="password">
                      <span>123456</span>
                    </el-form-item>
                </div>
              </div>
              <el-form-item label="开发者密钥" prop="developerKey">
                <span>HSAJSKJANSKJ</span>
              </el-form-item>
              <el-form-item label="权限设置" prop="setPermission">
                <el-checkbox-group v-model="addRuleForm.setPermission">
                  <el-checkbox label="业主数据" name="setPermission"></el-checkbox>
                  <el-checkbox label="租户数据" name="setPermission"></el-checkbox>
                  <el-checkbox label="门禁数据" name="setPermission"></el-checkbox>
                  <el-checkbox label="安防数据" name="setPermission"></el-checkbox>
                  <el-checkbox label="收入数据" name="setPermission"></el-checkbox>
                  <el-checkbox label="支出数据" name="setPermission"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
          </el-form>
         </div>
          <div class="dra-btn">
            <el-button size="small" type="danger" icon="el-icon-search"  @click="submitForm(addRuleForm)">确定</el-button>
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
    addRuleForm:{
      userName: '',
      password:'',
      developerKey:'',
      setPermission:[],
    },
    addRules: {
          setPermission: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          developerKey: [
            { required: true, message: '请输入密钥', trigger: 'change' }
          ],
        }
      
    }
  },
  methods: {
    submitForm(from){
    console.log(from)
    }
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
  .user-input-box{
    display: flex;
    justify-content: space-between;
  }
  .user-input-box>div{
    width: 40%;
  }

</style>
