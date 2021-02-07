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
      <div v-if="active===1">
        <div class="step_content">
          <div>
            <el-form :model="ruleForm"
                     style="width:340px;margin-left: -100px;"
                     status-icon
                     size="small"
                     ref="ruleForm"
                     label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="品牌名称 "
                            prop="pass">
                <el-input placeholder="请输入"
                          style="width:240px"
                          v-model="ruleForm.pass"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="品牌描述"
                            style="width:240px"
                            prop="checkPass">
                <el-input placeholder="请输入"
                          style="width:240px"
                          v-model="ruleForm.checkPass"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="品牌网站"
                            prop="age">
                <el-input style="width:240px"
                          placeholder="请输入"
                          v-model.number="ruleForm.age"></el-input>
              </el-form-item>
              <el-form-item label="品牌logo"
                            prop="age">
                <el-upload class="upload-demo"
                           ref="upload"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :file-list="fileList"
                           :auto-upload="false">
                  <el-button slot="trigger"
                             size="small"
                             class="el-icon-upload2">上传文件</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="授权书"
                            prop="age">
                <el-upload class="upload-demo"
                           ref="upload"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :file-list="fileList"
                           :auto-upload="false">
                  <el-button slot="trigger"
                             size="small"
                             class="el-icon-upload2">上传文件</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="涨势图片"
                            prop="age">
                <el-upload class="upload-demo"
                           ref="upload"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :file-list="fileList"
                           :auto-upload="false">
                  <el-button slot="trigger"
                             size="small"
                             class="el-icon-upload2">上传文件</el-button>
                </el-upload>
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
      </div>
      <div v-if="active===2">
        <div class="step_content">
          <div>
            <div class="step_box">
              <div class="step_title">
                <span>您的申请已提交成功，请耐心等待</span>
              </div>
            </div>
            <div class="form_box">
              <el-form :model="ruleForm"
                       status-icon
                       size="small"
                       ref="ruleForm"
                       label-width="80px"
                       class="demo-ruleForm">
                <el-form-item label="品牌名称 ">
                  <span class='item_txt'>左家右厨</span>
                </el-form-item>
                <el-form-item label="品牌描述  ">
                  <span class='item_txt'>厨房用品</span>
                </el-form-item>
                <el-form-item label="品牌网站  ">
                  <span class='item_txt'>- </span>
                </el-form-item>
                <el-form-item label="授权书   ">
                  <el-button class="init-text"
                             type="text">查看</el-button>
                </el-form-item>
                <el-form-item label="品牌logo  ">
                  <el-button class="init-text"
                             type="text">查看</el-button>
                </el-form-item>
                <el-form-item label="展示图片  ">
                  <el-button class="init-text"
                             type="text">查看</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

        </div>
      </div>
      <div v-if="active===3">
        <div class="step_content">
          <div>
            <div class="step_box">
              <div class="step_title">
                <span>您提交的资质信息已通过审核</span>
              </div>
            </div>
            <div class="form_box">
              <el-form :model="ruleForm"
                       status-icon
                       size="small"
                       ref="ruleForm"
                       label-width="80px"
                       class="demo-ruleForm">
                <el-form-item label="资质类型  ">
                  <span class='item_txt'>品牌资质</span>
                </el-form-item>
                <el-form-item label="商标注册号   ">
                  <span class='item_txt'>14897344</span>
                </el-form-item>
                <el-form-item label="有效期   ">
                  <span class='item_txt'> 2020-10-14</span>
                </el-form-item>
                <el-form-item label="品牌资质    ">
                  <span class='item_txt'> 2020-10-14</span>
                </el-form-item>
                <el-form-item label="品牌中文名   ">
                  <el-button class="init-text"
                             type="text">左家右厨 </el-button>
                </el-form-item>
                <el-form-item label="商标注册证  ">
                  <el-button class="init-text"
                             type="text">查看 </el-button>
                </el-form-item>
                <el-form-item label="一级代理授权书  ">
                  <el-button class="init-text"
                             type="text">查看</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
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
            fileList: [],
        }
    },
    mounted() {
        this.$refs['step_item' + this.active].classList.add('isActive')
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.next()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file.url)
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
    margin: 90px auto;
    .form_box {
        display: flex;
        justify-content: center;
        width: auto;
        text-align: center;
    }
    .el-form-item__label {
        color: #333333;
    }
}
.step_content {
    display: flex;
    justify-content: center;
    width: $flex_width;
    margin: 104px auto;
    .el-form {
        .item_txt {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
        }
    }
    // 第二个
    .step_title {
        width: 100%;
        span {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
        }
    }
}

.step_box {
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
        cursor: pointer;
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
