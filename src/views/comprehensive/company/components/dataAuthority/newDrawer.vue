<template>
  <div>
    <div class="dra-title">
      <span>新建规则</span>
    </div>
    <div class="dra-content">
      <div class="dra-content-title">
        <span>基本信息</span>
      </div>
      <div class="dra-from">
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  size="mini" class="demo-ruleForm">
            <el-form-item label="数据来源于" prop="region">
              <el-select  v-model="ruleForm.region" placeholder="请选择活动区域" style="width:400px">
                <el-option label="区xx一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item width='400' label="共享的数据" prop="region" >
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:400px">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item width='400' label="共享的数据" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:400px">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="共享后的权限" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="只读"></el-radio>
                <el-radio label="读写"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
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
     ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
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
    padding-bottom: 51px;

border-radius: 4px;
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
 
</style>
