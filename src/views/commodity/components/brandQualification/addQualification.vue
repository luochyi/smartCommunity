<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>新增品牌资质</span>
      </div>
      <div class="step_box">
        <div class="step_item"
             ref="step_item1">
          <div class="step_circle">
            <span>1</span>
          </div>
          <div class="step_txt">
            <span>新建资质</span>
          </div>
        </div>
        <div class="step_line"></div>
        <div class="step_item"
             ref="step_item2">
          <div class="step_circle">
            <span>2</span>
          </div>
          <div class="step_txt">
            <span>等待资质审核</span>
          </div>
        </div>
        <div class="step_line"></div>
        <div class="step_item"
             ref="step_item3">
          <div class="step_circle">
            <span>3</span>
          </div>
          <div class="step_txt">
            <span>资质生效</span>
          </div>
        </div>
      </div>
      <div class="step_content">
        <div>
          <el-form :model="ruleForm"
                   status-icon
                   size="small"
                   ref="ruleForm"
                   label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="密码"
                          prop="pass">
              <el-input type="password"
                        style="width:240px"
                        v-model="ruleForm.pass"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"
                          style="width:240px"
                          prop="checkPass">
              <el-input type="password"
                        style="width:240px"
                        v-model="ruleForm.checkPass"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄"
                          prop="age">
              <el-input style="width:240px"
                        v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item>

            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="step_box">
        <div class="btn_submit"
             @click="submitForm('ruleForm')">
          <span>提交</span>
        </div>
      </div>
      <el-button style="margin-top: 12px;"
                 @click="next">下一步</el-button>
      {{active}}
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            active: 1,
            ruleForm: {
                pass: '',
                checkPass: '',
                age: '',
            },
        }
    },
    mounted() {
        this.$refs['step_item' + this.active].classList.add('isActive')
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
        next() {
            if (this.active > 2) return
            this.active++
            this.$refs['step_item' + this.active].classList.add('isActive')
        },
    },
}
</script>

<style lang="scss" >
$flex_width: 70%;
.step_content {
    display: flex;
    width: $flex_width;
    margin: 104px auto;
}

.step_box {
    width: $flex_width;
    margin: 64px auto;
    display: flex;
    color: #cccccc;
    align-items: center;
    justify-content: center;
    .step_line {
        flex: 1;
        background: #cccccc;
        height: 2px;
    }
    .step_item.isActive {
        .step_circle {
            border: 1px solid transparent;
            background: rgba(251, 71, 2, 1);
            span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #ffffff;
            }
        }
        .step_txt span {
            color: #333;
            font-weight: 500;
        }
    }
    .step_item {
        display: flex;
        align-items: center;
        padding: 0 5px;
        .step_circle {
            width: 31px;
            height: 31px;
            line-height: 31px;
            border-radius: 50%;
            text-align: center;
            border: 1px solid rgba(0, 0, 0, 0.25);
            background: #ffffff;
            margin: 0 12px;
            font-size: 14px;
            span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.45);
            }
        }
        .step_txt span {
            font-weight: 400;
            font-family: PingFangSC-Medium, PingFang SC;
            color: rgba(0, 0, 0, 0.45);
        }
    }

    .btn_submit {
        cursor: pointer;
        width: 256px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        background: #fb4702;
        border-radius: 4px;
        span {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
        }
    }
}
.set_box {
    width: 100%;
    .set_header {
        width: 70%;
        margin: 64px auto;
    }
    .el-step.is-horizontal {
        .el-step__head.is-success {
            color: #fb4702 !important;
            border-color: #fb4702 !important;
        }
        .el-step__head {
            .is-process {
            }
            .el-step__icon {
                position: relative;
                z-index: 1;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 32px;
                height: 32px;
                font-size: 14px;
                box-sizing: border-box;
                background: #fff;
                transition: 0.15s ease-out;
            }
            .el-step__line {
                top: 16px !important;
            }
        }
        .el-step__main {
            width: 100px;
            position: relative;
            top: -34px;
            left: 0;
            background: #fff;
            padding-left: 34px;
            .el-step__title {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
            }
            .el-step__title.is-success {
                color: #000;
            }
        }
    }
}
</style>
