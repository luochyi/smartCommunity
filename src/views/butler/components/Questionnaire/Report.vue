<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <div class="box report-box">
        <div class="content">
          <div>
            <div class="title">
              物业服务满意度调查问卷
            </div>
            <div class="date">
              {{reportData.beginDate}}至 {{reportData.endDate}}
            </div>
            <div class="tips">
              共收集到 <span style="color:#FB4702">{{reportData.answerNum}} </span> 份问卷
            </div>
            <div>
            </div>
          </div>
          <div class="list-box">
            <div class="list"
                 v-for="(item,index) in reportData.reportQuestionnaireTopicList"
                 :key='index'>
              <div class="title">
                <span>{{index+1}}、{{item.topic}}？（{{item.typeText}}）</span>
              </div>
              <div class="result">
                <div class="li"
                     v-for="(answer,i) in item.reportQuestionnaireChoiceList"
                     :key='i'>
                  <div class='lf'>
                    <span>{{answer.answer}}</span>
                  </div>
                  <div class='progress'>
                    <el-progress :percentage="answer.answerNum | percentageNum(item.totalAnswerNum)"
                                 :stroke-width="16"
                                 color='#FE8738'
                                 :format="() => format(answer.answerNum,item.totalAnswerNum,item.type)"></el-progress>
                    <!-- <span> {{ answer.answerNum}}</span> -->

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn-gray"
                @click="drawerClose"><span>返回</span></button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { questionnaireReportAnalysis } from '@/api/butler.js'

export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: () => false
    },
    drawerTitle: {
      type: String,
      default: () => ""
    }
  },
  data () {
    return {
      drawer_vrisible: false,
      reportData: {}

    }
  },
  filters: {
    // 进度条百分比
    percentageNum: function (num, totalNum) {
      let percentage = num / totalNum * 100
      if (totalNum === 0) {
        percentage = 0
      }
      return percentage;
    }
  },
  methods: {
    // 进度条百分比 和投票人数
    format (num, totalNum, type) {
      let percentage = num / totalNum * 100
      if (totalNum === 0) {
        percentage = 0
      }
      if (type === 2) {
        return `${percentage}%`;
      }
      return `${percentage}% ${num}人`;
    },
    // 获取数据
    getData (id) {
      questionnaireReportAnalysis({ id: id }).then(res => {
        this.reportData = res.reportQuestionnaire
        // 数据格式化
        this.reportData.reportQuestionnaireTopicList.map(item => {
          switch (item.type) {
            case 1:
              item.typeText = '单选题'
              break;
            case 2:
              item.typeText = '多选题'
              break;
            case 4:
              item.typeText = '判断题'
              item.reportQuestionnaireChoiceList = [
                {
                  answer: "是",
                  answerNum: item.trueNum
                },
                {
                  answer: "否",
                  answerNum: item.falseNum
                }
              ]
              break;
            case 5:
              item.typeText = '解答题'
              break;
            default:
              break;
          }
          if (item.type !== 5) {
            let totalAnswerNum = 0
            item.reportQuestionnaireChoiceList.map(obj => {
              totalAnswerNum += obj.answerNum
            })
            item.totalAnswerNum = totalAnswerNum
          }
        })
      })
    },
    drawerClose () {
      this.$emit('handleClose', 'Close')
    },
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.drawer_vrisible = newValue
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.box {
    padding: 20px;

    .content {
        background: #ffffff;
        box-sizing: content-box;
        height: 100%;
        padding: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        .title {
            font-size: 18px;
            font-weight: 500;
            color: #333333;
        }
        .date {
            font-size: 12px;
            margin: 8px 0;
            color: #999999;
        }
        .tips {
            font-size: 14px;

            color: #666666;
        }
    }
    .list {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        font-size: 14px;
        .title {
            font-weight: bold;
            color: #333333;
            font-size: 14px;
            margin: 32px 0;
        }
        .result {
            width: 45%;
            .li {
                display: flex;
                align-items: center;
                margin: 8px 0;
                .lf {
                    padding-right: 12px;
                    width: 100px;
                    text-align: right;
                }
                .progress {
                    flex: 1;
                    .el-progress {
                        display: flex;
                    }
                }
            }
        }
    }
}
</style>