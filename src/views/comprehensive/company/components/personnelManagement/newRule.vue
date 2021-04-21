<template>
  <div>
    <div class="dra-title">
      <span>新建用户</span>
    </div>
    <div class="dra-content-box">
      <div class="dra-content">
        <div class="dra-content-title">
          <span>账号信息account</span>
        </div>
        <div class="dra-from">
          <el-form :model="accountRuleForm"
                   size="small"
                   :rules="accountRules"
                   ref="accountRuleForm"
                   label-width="100px">
            <div class="input-row">
              <div>
                <el-form-item label="昵称"
                              prop="nickname">
                  <el-input v-model="accountRuleForm.nickname"
                            placeholder="昵称是员工在企业中的唯一标识，请勿重复"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="真实姓名"
                              prop="actualName">
                  <el-input v-model="accountRuleForm.actualName"
                            placeholder="真实姓名非必填，允许重名"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="input-row">
              <div>
                <el-form-item label="手机号"
                              prop="nickname">
                  <el-input v-model="accountRuleForm.nickname"
                            placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="性别">
                  <el-radio-group v-model="accountRuleForm.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="input-row">
              <div>
                <el-form-item label="初始密码"
                              prop="nickname">
                  <el-input v-model="accountRuleForm.nickname"
                            placeholder="请输入初始密码"></el-input>
                </el-form-item>
              </div>
              <div>

              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="dra-content">
        <div class="dra-content-title">
          <span>组织关系</span>
        </div>
        <div class="dra-from">
          <el-form :model="OrganizationalRuleForm"
                   size="small"
                   :rules="OrganizationalRules"
                   ref="OrganizationalRuleForm"
                   label-width="100px">
            <div class="input-row">
              <div>
                <el-form-item label="部门"
                              prop="nickname">
                  <el-input v-model="OrganizationalRuleForm.nickname"
                            placeholder="昵称是员工在企业中的唯一标识，请勿重复"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="职位"
                              prop="actualName">
                  <el-input v-model="OrganizationalRuleForm.actualName"
                            placeholder="请输入员工编号"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="input-row">
              <div>
                <el-form-item label="汇报对象"
                              prop="nickname">
                  <el-input v-model="OrganizationalRuleForm.nickname"
                            placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="性别">
                  <el-radio-group v-model="OrganizationalRuleForm.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="input-row">
              <div>
                <el-form-item label="员工编号"
                              prop="nickname">
                  <el-input v-model="OrganizationalRuleForm.nickname"
                            placeholder="请输入初始密码"></el-input>
                </el-form-item>
              </div>
              <div>

              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="dra-content">
        <div class="dra-content-title">
          <span>个人信息Personal</span>
        </div>
        <div class="dra-from">
          <el-form :model="personalRuleForm"
                   size="small"
                   :rules="personalRules"
                   ref="personalRuleForm"
                   label-width="100px">
            <div class="input-row">
              <div>
                <el-form-item label="入职日期"
                              prop="entryDate">
                  <el-input type="date"
                            v-model="personalRuleForm.entryDate"
                            placeholder="昵称是员工在企业中的唯一标识，请勿重复"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="邮箱"
                              prop="emaill">
                  <el-input v-model="personalRuleForm.emaill"
                            placeholder="真实姓名非必填，允许重名"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="input-row">
              <div>
                <el-form-item label="身份证号"
                              prop="IDCard">
                  <el-input v-model="personalRuleForm.IDCard"
                            placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </div>
              <div>
              </div>
            </div>
          </el-form>
        </div>
      </div>

    </div>
    <div class="dra-btn">
      <el-button size="small"
                 type="danger"
                 icon="el-icon-search"
                 @click="submitForm('accountRuleForm')">确定</el-button>
      <el-button size="small"
                 type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accountRuleForm: {
        nickname: '',
        actualName: '',
        sex: [],
      },
      personalRuleForm: {
        entryDate: '',
        emaill: '',
        IDCard: '',
      },
      OrganizationalRuleForm: {},
      OrganizationaRules: {},
      personalRules: {},
      accountRules: {
        nickname: [{ required: true, message: '请填写昵称', trigger: 'blur' }],
        OfficeName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style scoped>
.dra-title {
  height: 81px;
  display: flex;
  align-items: center;
  background: white;
}
.dra-title span {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
  padding-left: 20px;
}
.dra-content {
  background: white;
  border-radius: 4px;
  margin: 32px 30px 0px 30px;
}
.dra-content-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e8e8e8;
}
.dra-content-box {
  width: 100%;
  height: calc(100vh - 200px);
  overflow: auto;
}
.dra-content-title span {
  padding-left: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.dra-from {
  width: 80%;
  margin: 50px auto;
}
.input-row {
  display: flex;
  justify-content: space-between;
}
.input-row > div {
  width: 50%;
}
</style>
