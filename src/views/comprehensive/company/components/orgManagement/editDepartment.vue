<template>
  <div>
    <div class="dra-title">
      <span>新建用户</span>
    </div>
    <div class="dra-content">
      <div class="dra-content-title">
        <span>基础信息</span>
      </div>
      <div class="dra-from">
         <div>
          <el-form :model="addRuleForm" size="small" :rules="addRules" ref="addRuleForm" label-width="100px" class="demo-addRuleForm">
            <div class="input-row">
              <div>
                <el-form-item label="上级部门" prop="higherOffice">
                  <el-select v-model="addRuleForm.higherOffice" placeholder="深圳万科物业服务有限公司">
                    <el-option label="财务部" value="财务部"></el-option>
                    <el-option label="党员部" value="党员部"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="部门名称" prop="OfficeName" >
                  <el-input  v-model="addRuleForm.OfficeName" placeholder="经理室"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="input-row">
              <div>
                <el-form-item label="负责人" prop="principal">
                  <el-select v-model="addRuleForm.principal" placeholder="曹潮华">
                    <el-option label="部门管理者" value="部门管理者"></el-option>
                    <el-option label="吴彦祖" value="吴彦祖"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="分类" prop="classification">
                  <el-select v-model="addRuleForm.classification"  placeholder="部门">
                    <el-option label="部门" value="部门"></el-option>
                    <el-option label="业务部" value="业务部"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="input-row">
              <div>
                 <el-form-item label="手机号" prop="phone" >
                  <el-input  v-model="addRuleForm.phone"  placeholder="请输入手机号"></el-input>
                </el-form-item>
              </div>
              <div>
               <el-form-item label="显示排序" prop="num">
                 <el-input-number v-model="addRuleForm.num" controls-position="right"></el-input-number>
                </el-form-item>
              </div>
              
            </div>
            <el-form-item label="备注" prop="Remarks">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="addRuleForm.Remarks">
              </el-input>
            </el-form-item>
          </el-form>
         </div>
          <div class="dra-btn">
            <el-button size="small" type="danger" icon="el-icon-search"  @click="submitForm('addRuleForm')">确定</el-button>
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
      higherOffice:'',
      userName: '',
      OfficeName:'',
      principal:'',
      classification:'',
      phone:'',
      Remarks:'',
      num:1,
    },
    addRules: {
        higherOffice: [
          { required: true, message: '请选择部门', trigger: 'change'}
        ],
        OfficeName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
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

  .input-row{
    display: flex;
    justify-content: space-between;
  }
   .input-row>div{
     width: 50%;
   }
</style>
