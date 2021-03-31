<template>
  <div>
    <el-drawer title="咨询建议"
               :visible.sync="isVisibleDrawe"
               size="58%"
               :before-close="close">
      <div class="drawer-box"
           v-if="isVisibleDrawe">

        <div class="dra-body">
          <div class="dra-content">
            <div class="content-titel">
              <span>基本信息</span>
            </div>
            <div class="">
              <el-form label-position="right"
                       label-width="100px"
                       size="small">
                <el-form-item label="类型"
                              style="width:100%">
                  <span v-if="detailData.type ===1 ">咨询</span>
                  <span v-if="detailData.type ===2 ">建议</span>
                </el-form-item>
                <el-form-item label="照片"
                              v-if="detailData.imgUrl!==null"
                              style="width:100%">
                  <el-image style="width: 140px; height: 100px"
                            :src="`${$ImgUrl}${detailData.imgUrl[0].url}`"
                            fit="scale-down"></el-image>
                </el-form-item>
                <el-form-item label="反馈内容"
                              v-if="detailData.voUserAdviceDetailList.length!==0"
                              style="width:100%">
                  <template>
                    <div class="table_box"
                         v-for="(item,index) in detailData.voUserAdviceDetailList"
                         :key='index'>
                      <div>
                        <p>{{item.createName}}</p>
                        <p>{{item.createDate}}</p>
                      </div>
                      <div class="content_item">
                        <p>{{item.content}}</p>
                      </div>
                    </div>
                  </template>

                </el-form-item>
                <el-form-item label="星级评分"
                              v-if="rateNum"
                              style="width:100%">
                  <el-rate v-model="rateNum"
                           :colors="colors"
                           disabled></el-rate>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="dra-content">
            <div class="content-titel">
              <span>回复反馈</span>
            </div>
            <div class="">
              <el-form label-position="right"
                       label-width="100px"
                       size="small">
                <el-form-item label="反馈"
                              style="width:100%">
                  <el-input type="textarea"
                            :autosize="{ minRows: 6}"
                            placeholder="请输入内容"
                            v-model="content">
                  </el-input>

                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-submit el-icon-circle-check"
                    @click="submit"><span>提交</span></button>
            <button class="dra-cancel"
                    @click="close"><span>关闭</span></button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { adviceFindById, adviceInsertDetail } from '@/api/butler'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false,
    },
    suggestId: {
      type: Number,
      default: () => 0,
    }
  },
  mounted () {

  },
  data () {
    return {
      detailData: {
        id: 1,
        type: 1,
        score: 6,
        imgUrl: [{ url: '' }],
        voUserAdviceDetailList: [],
      },
      isVisibleDrawe: false,

      content: '',
      colors: ['#FB4702', '#FB4702', '#FB4702'],
      rate: 5,
    }
  },
  computed: {
    rateNum () {
      let rate = 0
      if (this.detailData.score) {
        rate = this.detailData.score / 2
      }
      return rate
    }
  },
  methods: {
    close () {
      this.content = null
      this.$emit('handleClose', "Close")
    },
    submit () {
      let pId = 0
      if (this.detailData.voUserAdviceDetailList.length > 0) {
        pId = this.detailData.voUserAdviceDetailList[0].id
      }
      let resData = {
        adviceId: this.detailData.id,
        content: this.content,
        parentId: pId,
        createUserType: 3,
      }
      console.log(resData)
      adviceInsertDetail(resData).then(result => {
        console.log(result)
        if (result.status) {
          this.$message({
            message: result.message,
            type: 'success'
          })
          this.close()
        } else {
          this.$message({
            message: result.message,
            type: 'error'
          })
        }
      })
    },
    getDetails (id) {
      if (id) {
        let resData = {
          id: id
        }
        adviceFindById(resData).then(res => {
          console.log(res)
          this.detailData = res.voFindByIdAdvice
          this.detailData.voUserAdviceDetailList = res.voFindByIdAdvice.voUserAdviceDetailList ? res.voFindByIdAdvice.voUserAdviceDetailList : []
        })
      }
    }
  },
  // 返回详情弹窗
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.isVisibleDrawe = newValue
        console.log(newValue)
      },
      immediate: true
    },
    suggestId: {
      handler (newValue) {
        this.getDetails(newValue)
      },
      immediate: true
    },
  }
}
</script>
<style scoped>
.content-titel2 {
    margin: 0px 0px 20px 30px;
    padding-top: 30px;
    border-top: 1px solid #e8e8e8;
}
.table_box {
    display: flex;
}
.table_box > div {
    padding: 14px;
    border: 1px solid #f5f5f6;
    width: 25%;
}
.table_box > div.content_item {
    border-left: 0;
    display: flex;
    align-items: center;
    flex: 1;
}
</style>
