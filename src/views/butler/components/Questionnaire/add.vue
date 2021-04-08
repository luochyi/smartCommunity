
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>新增问卷调查</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <div class="m-box">
          <div class="btn active"
               @click="submit">保存</div>
          <div class="btn">预览</div>
          <div class="btn"
               @click="cancel">取消</div>
        </div>
      </div>
      <div class="box">
        <div class="lf">
          <div class="title">
            <span>题型选择</span>
          </div>
          <div class="chek-btn"
               @click="addSubject(1)">
            <span>单选题</span>
          </div>
          <div class="chek-btn"
               @click="addSubject(2)">
            <span>多选题</span>
          </div>
          <div class="chek-btn"
               @click="addSubject(4)">
            <span>判断题</span>
          </div>
          <div class="chek-btn"
               @click="addSubject(5)">
            <span>问答题</span>
          </div>
        </div>
        <div class="ct"
             id="ct">
          <div class="ct-head">
            <div>
              <el-input v-model="title"
                        placeholder="问卷标题（限40字）"></el-input>
            </div>
            <div style='margin-top:12px'>
              <el-input type="textarea"
                        :autosize="{ minRows: 3}"
                        placeholder="问卷说明"
                        v-model="description">
              </el-input>
            </div>
          </div>
          <div class="ct-tips"
               v-if="!subjectList.length && !cardShow">
            <div>
              点击左侧题型进行添加题目
            </div>
          </div>
          <div v-else>
            <div v-for="(item,index) in subjectList"
                 :key="index">
              <div class='subject-card'>
                <div class="subject-head">
                  <div class="title">
                    {{index+1}}.{{item.topic}}
                  </div>
                  <div class="tip">
                    <span v-if="item.type ===1"> 单选题</span>
                    <span v-else-if="item.type ===2"> 多选题</span>
                    <span v-else-if="item.type ===4"> 判断题</span>
                    <span v-else> 开放题</span>
                  </div>
                </div>
                <div class="options-box">
                  <div v-for="(option,i) in item.sysQuestionnaireChoiceList"
                       :key='i'
                       class="options">
                    <div v-if="item.type===1">
                      <el-radio :value='false'>{{option.answer}}</el-radio>
                    </div>
                    <div v-else-if="item.type===2">
                      <el-checkbox :value='false'>{{option.answer}}</el-checkbox>
                    </div>
                  </div>
                  <div v-if="item.type===4"
                       class="options">
                    <div>
                      <div class="options">
                        <el-radio :value='false'>是</el-radio>
                      </div>
                      <div class="options">
                        <el-radio :value='false'>否</el-radio>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="subject-btn">
                  <div class="edit"
                       @click="subjectEdit(item,index)">
                    <span>编辑</span>
                  </div>
                  <div class='del'
                       @click="subjectDel(index)">
                    <span>删除</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-box"
               v-show="cardShow">
            <div class="card-head">
              <div class='card-title'><span>题目</span></div>
              <div class='card-input'>
                <el-input v-model="topic"
                          placeholder="请输入内容"></el-input>
              </div>
              <div class='head-select'>
                <el-select v-model="type"
                           @change="typeChange"
                           placeholder="请选择">
                  <el-option v-for="item in typeOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class='card-del'>
              </div>
            </div>
            <div v-if="type !== 4 && type !==5">
              <div class="card-li"
                   v-for="(item,index) in topicList"
                   :key="index">
                <div class='card-input'>
                  <el-input v-model="item.answer"
                            placeholder="请输入内容"></el-input>
                </div>
                <div class='card-del'
                     @click="topicRemove(index)">
                  <i class="el-icon-close"></i>
                </div>
              </div>
              <div class="card-add"
                   @click="topicAdd">
                <span class="el-icon-circle-plus-outline"></span>
                <span>添加单个选项</span>
              </div>
            </div>
            <div class="card-check">
              <div class='card-confirm'
                   @click="confirmSubject">
                <span>确认</span>
              </div>
              <div class='card-cancel'
                   @click="cancelSubject">
                <span>取消</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rg">
          <div>
            <div class="title">
              <span>封面图片设置</span>
            </div>
            <div style='width:100%'>
              <el-upload :action="`${$baseUrl}upload/uploadQuestionnaireCoverPhoto`"
                         style='width:100%'
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">

                <div v-if="imageUrl">
                  <el-image v-if="editId"
                            :src="`${$ImgUrl}/${imageUrl}`"
                            fit="cover"
                            class="upload-box"></el-image>
                  <el-image v-else
                            :src="`${$ImgUrl}/temp${imageUrl}`"
                            fit="cover"
                            class="upload-box"></el-image>
                </div>
                <!-- imgBool -->
                <div class="upload-box"
                     v-else>
                  <div>
                    <div class='upload-icon'>
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                    <div class='upload-txt'>
                      <span>上传图片</span>
                    </div>
                    <div class='upload-tips'>
                      <span>建议宽高比：16:9，支持扩展名：png、pdf、jpg</span>
                    </div>
                  </div>
                </div>
              </el-upload>
            </div>
            <!-- date-box -->
            <div class='date-box'>
              <div class="title">
                <span>起止日期设置</span>
              </div>
              <div>
                <div class="date-item">
                  <span>开始日期</span>
                  <el-date-picker v-model="startDate"
                                  size="small"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  type="datetime"
                                  placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div class="date-item">
                  <span>截止日期</span>
                  <el-date-picker v-model="endDate"
                                  size="small"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  type="datetime"
                                  placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { questionnaireInsert, questionnaireUpdate, questionnaireFindById } from '@/api/butler.js'
export default {
  data () {
    return {

      // 问卷标题
      title: null,
      input: null,
      startDate: null,
      endDate: null,
      // 问卷说明
      description: null,
      topicList: [
        {
          answer: null,
        }
      ],//题目选项列表
      editBool: false,
      editIndex: 0,
      editId: 0,
      topic: null, //题目
      // 答题类型（1.单选，2.多选，3.下拉单选，4.判断题，5.开放题
      type: 0,
      subjectList: [],
      imageUrl: '',
      typeOptions: [{
        value: 1,
        label: '单选题'
      }, {
        value: 2,
        label: '多选题'
      }, {
        value: 4,
        label: '判断题'
      }, {
        value: 5,
        label: '问答题'
      }],
      cardShow: false,
      value: 0
    }
  },
  methods: {
    submit () {
      if (!this.title) {
        this.$message.error('请填写问卷标题');
        return
      }
      if (!this.description) {
        this.$message.error('请填写问卷说明');
        return
      }
      if (!this.startDate) {
        this.$message.error('请填写问卷答题开始时间');
        return
      }
      if (!this.endDate) {
        this.$message.error('请填写问卷答题结束时间');
        return
      }
      let resData = {
        title: this.title,
        description: this.description,
        answerType: 1,
        beginDate: this.startDate,
        endDate: this.endDate,
        sysQuestionnaireTopicList: this.subjectList,
        files: [this.imageUrl],
        isRelease: 1
      }
      console.log(resData)
      if (!this.editId) {
        questionnaireInsert(resData).then(res => {
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$emit('submitSuccess')
            this.cancel()
          }
        })
      } else {
        resData.id = this.editId
        questionnaireUpdate(resData).then(res => {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$emit('submitSuccess')
          this.cancel()
        })
      }
    },
    edit (id) {
      questionnaireFindById({ id: id }).then(res => {
        console.log(res)
        this.title = res.sysQuestionnaire.title
        this.description = res.sysQuestionnaire.description
        this.startDate = res.sysQuestionnaire.beginDate
        this.endDate = res.sysQuestionnaire.endDate
        res.sysQuestionnaire.voFindByIdTopicList.map((item, index) => {
          this.subjectList.push({
            type: item.type,
            topic: item.topic,
            sysQuestionnaireChoiceList: item.voFindByIdChoiceList
          })
        })
        if (res.sysQuestionnaire.voResourcesImgList.length) {
          this.imageUrl = res.sysQuestionnaire.voResourcesImgList[0].url
        } else {
          this.imageUrl = ''

        }

        this.editId = id
      })
    },
    cancel () {
      this.title = null
      this.description = null
      this.startDate = null
      this.endDate = null
      this.subjectList = []
      this.cardShow = false
      this.imageUrl = ''
      this.editId = 0
      // 取消
      this.$emit('cancel')
    },
    // 添加题目对应选项
    topicAdd () {
      this.topicList.push({
        answer: null,
      })
    },
    // 删除题目对应选项
    topicRemove (index) {
      this.topicList.splice(index, 1);
    },
    // 题型type值变化
    typeChange () {
      this.clearSubject()
    },
    // 添加题型
    addSubject (type) {
      if (this.cardShow) {
        this.$message.error('请完成该问题创建');
        return
      }
      this.cardShow = true
      this.type = type
      this.goScrollTop()
    },
    //  删除题型
    subjectDel (index) {
      this.subjectList.splice(index, 1);
    },
    //  修改题型
    subjectEdit (subject, index) {
      if (this.cardShow) {
        this.$message.error('请完成该问题创建');
        return
      }
      this.type = subject.type
      this.topic = subject.topic
      this.cardShow = true
      this.editBool = true
      this.editIndex = index
      let arr = subject.sysQuestionnaireChoiceList
      let newArr = []
      for (let i = 0; i < arr.length; i++) {
        if (!arr[0].answer) {
          this.$message.error('请完成该问题创建');
          return
        }
        newArr.push({
          answer: arr[i].answer,
        })
      }
      this.topicList = newArr
      this.goScrollTop()

    },
    // 取消添加题型
    cancelSubject () {
      this.cardShow = false
      this.clearSubject()
    },
    // 清空题型
    clearSubject () {
      this.topic = null;
      this.topicList.map(item => {
        item.answer = null
      })
      this.editBool = false
    },
    // 确认题型添加修改
    confirmSubject () {
      let arr = this.topicList
      let newArr = []
      if (!this.topic) {
        this.$message.error('请完成该问题创建');
        return
      }
      if (this.type === 1 || this.type === 2) {
        for (let i = 0; i < arr.length; i++) {
          if (!arr[0].answer) {
            this.$message.error('请完成该问题创建');
            return
          }
          newArr.push({
            answer: arr[i].answer,
            options: String.fromCharCode(65 + i)
          })
        }
      }
      // 是否是修改
      if (!this.editBool) {
        this.subjectList.push({
          type: this.type,
          topic: this.topic,
          sysQuestionnaireChoiceList: newArr
        })
      } else {
        console.log(this.subjectList[this.editIndex], newArr)
        this.$set(this.subjectList[this.editIndex], 'sysQuestionnaireChoiceList', newArr)
        this.$set(this.subjectList[this.editIndex], 'type', this.type)
        this.$set(this.subjectList[this.editIndex], 'topic', this.topic)
      }
      console.log(this.subjectList)
      this.cardShow = false
      this.type = 0
      this.clearSubject()
    },
    goScrollTop () {
      // 滚动条到底部
      this.$nextTick(function () {
        var div = document.getElementById('ct');
        div.scrollTop = div.scrollHeight;
      })
    },

    handleAvatarSuccess (res, file) {
      this.imageUrl = res.url
      console.log(this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  // watch: {
  //   type: {
  //     handler (newValue) {
  //       this.topic = null;
  //       this.topicList.map(item => {
  //         item.answer = null
  //       })
  //     },
  //     immediate: true,
  //   },
  // }
}
</script>
<style lang="scss" scoped>
.main-content {
    height: calc(100vh - 100px);
    background: #ffffff;
    display: flex;
    flex-direction: column;
    margin: 20px;
}
.m-box {
    display: flex;
    align-items: center;
    .btn {
        display: inline-block;
        cursor: pointer;
        background: #ffffff;
        margin-right: 10px;
        width: 68px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #b7b7b7;
        &.active {
            background: #fb4702;
            color: #fff;
            border: 1px solid #fb4702;
        }
    }
    .box {
        background: #cccccc;
    }
}
.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .content-btn {
        height: 54px;
    }
}

.box {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 54px);
    .lf {
        height: auto;
        width: 220px;
        margin-right: 20px;
        border-radius: 4px 0px 0px 4px;
        border: 1px solid #e7e7e7;
        padding: 20px;
        box-sizing: border-box;
        .title {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #333333;
        }
        .chek-btn {
            cursor: pointer;
            padding: 13px 20px;
            margin: 20px 0px;
            background: #ffffff;
            border-radius: 2px;
            border: 1px solid #cccccc;
            &:hover {
                background: #cccccc;
            }
        }
    }
    .ct {
        flex: 1;
        height: 100%;
        overflow-x: hidden;
        overflow-y: overlay;
        .ct-head {
            border-radius: 4px;
            border: 1px solid #e7e7e7;
            padding: 20px;
        }
        .ct-tips {
            margin-bottom: 20px;
            text-align: center;
            height: 220px;
            line-height: 220px;
            border-radius: 4px;
            border: 1px solid #e7e7e7;
        }
        .subject-card {
            margin: 20px 0;
            padding: 20px;
            border-radius: 4px;
            border: 1px solid #e7e7e7;
            .subject-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title {
                    font-size: 14px;
                    font-family: PingFang-SC-Bold, PingFang-SC;
                    font-weight: bold;
                    color: #333333;
                }
                .tip {
                    width: 66px;
                    height: 27px;
                    line-height: 27px;
                    text-align: center;
                    background: #ffe7de;
                    color: #fb4702;
                    border-radius: 2px;
                }
            }

            .options-box {
                margin: 20px 0;
                .options {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    margin: 12px 0;
                }
            }

            .subject-btn {
                display: flex;
                align-items: center;

                div {
                    width: 68px;
                    height: 32px;
                    line-height: 32px;
                    cursor: pointer;
                    text-align: center;
                    border-radius: 4px;
                    border: 1px solid #fb4702;
                    margin-right: 20px;
                    &.edit {
                        color: #fb4702;
                    }
                    &.del {
                        border: 1px solid #b7b7b7;
                    }
                }
            }
        }
        .card-box {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 4px;
            .card-head {
                display: flex;
                align-items: center;
                .card-title {
                    width: 38px;
                }
                .card-input {
                    flex: 1;
                    margin-right: 10px;
                }
            }
            .card-add {
                background: #ffffff;
                border-radius: 2px;
                cursor: pointer;
                height: 38px;
                line-height: 38px;
                margin: 10px 38px;
                font-size: 14px;
                border: 1px solid #d9d9d9;
                color: #fb4702;
                span {
                    padding-left: 10px;
                }
            }
            .card-del {
                width: 38px;
                text-align: center;
                font-size: 16px;
            }
            .card-li {
                display: flex;
                align-items: center;
                padding-left: 38px;
                margin: 10px 0;
                border-radius: 2px;

                .card-input {
                    flex: 1;
                }
            }
            .card-check {
                margin: 20px 38px 0;
                display: flex;
                align-items: center;
                div {
                    width: 68px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    margin-right: 20px;
                    cursor: pointer;
                    border-radius: 4px;
                    border: 1px solid #b7b7b7;
                }
                .card-cancel {
                }
                .card-confirm {
                    background: #fb4702;
                    border: 1px solid #fb4702;
                    color: #ffffff;
                }
            }
        }
    }
    .rg {
        height: auto;
        width: 360px;
        padding: 20px;
        margin-left: 20px;
        border-radius: 4px 0px 0px 4px;
        border: 1px solid #e7e7e7;
        box-sizing: border-box;
        .title {
            font-size: 14px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #333333;
        }
        .upload-box {
            height: 180px;
            width: 320px;
            margin: 10px 0;
            background: #f5f5f5;
            border-radius: 2px;
            border: 1px solid #cccccc;
            display: flex;
            align-items: center;
            justify-content: center;
            .upload-icon {
                font-size: 44px;
            }
            .upload-txt {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.65);
            }
            .upload-tips {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
            }
        }
        .date-box {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            .date-item {
                margin: 10px 0;
                span {
                    padding-right: 10px;
                }
            }
        }
    }
}
</style>