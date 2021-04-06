
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>新增问卷调查</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <div class="m-box">
          <div class="btn active">保存</div>
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
        <div class="ct">
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
              <div class='answer-card'>
                <div class="title">
                  {{index+1}}.{{item.topic}}
                </div>
                <div v-for="(option,i) in item.sysQuestionnaireChoiceList"
                     :key='i'>
                  {{option.answer}}
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
              <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                         style='width:100%'
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl"
                     :src="imageUrl"
                     class="avatar">
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
              <!-- <el-upload class="avatar-uploader"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl"
                     :src="imageUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
            </div>
            <div class="title">
              <span>起止日期设置</span>
            </div>
            <div>
              <span>开始日期</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 问卷标题
      title: null,
      input: null,
      // 问卷说明
      description: null,
      topicList: [
        {
          answer: null,
        }
      ],//题目选项列表
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
    cancel () {
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
    // 添加题型
    addSubject (type) {
      if (this.cardShow) {
        this.$message.error('请完成该问题创建');
        return
      }
      this.cardShow = true
      this.type = type
    },
    // 取消添加题型
    cancelSubject () {
      this.cardShow = false
    },
    // 确认题型添加
    confirmSubject () {
      let arr = this.topicList
      let newArr = []
      if (!this.topic) {
        this.$message.error('请完成该问题创建');
        return
      }
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
      this.subjectList.push({
        type: this.type,
        topic: this.topic,
        sysQuestionnaireChoiceList: newArr
      })
      console.log(this.subjectList)
      this.cardShow = false
      this.type = 0
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
  watch: {
    type: {
      handler (newValue) {
        this.topic = null;
        this.topicList.map(item => {
          item.answer = null
        })
      },
      immediate: true,
    },
  }
}
</script>
<style lang="scss" scoped>
.answer-card {
    margin: 20px 0;
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #e7e7e7;
    .title {
        font-size: 14px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
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
    }
}
</style>