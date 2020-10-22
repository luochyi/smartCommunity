<style scoped>
.tips {
  margin: 20px;
  height: 38px;
  line-height: 38px;
  background: #fafafa;
  border-radius: 4px;
  opacity: 0.8;
  border: 1px solid #e8e8e8;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>装修详情</span>
    </div>
    <div class="content">
   
      <!-- 查询重制 -->
      <div class="">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="装修人员情况"
                       name="first">
            <decorator> </decorator>
          </el-tab-pane>
          <el-tab-pane label="资料情况"
                       disabled
                       name="second"></el-tab-pane>
          <el-tab-pane label="门禁卡"
                       name="third">
            <accessCard></accessCard>
          </el-tab-pane>
          <el-tab-pane label="跟踪检查记录"
                       name="fourth">
            <trackRecord></trackRecord>
          </el-tab-pane>
          <el-tab-pane label="完工检查记录"
                       name="five">
            <completionRecord></completionRecord>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import decorator from './decorator.vue'
import accessCard from './accessCard.vue'
import trackRecord from './trackRecord.vue'
import completionRecord from './completionRecord.vue'
export default {
  data () {
    return {
      activeName: 'first',
    }
  },
  components: {
    decorator,
    accessCard,
    trackRecord,
    completionRecord
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log('submit!')
    },
    ckimg () {
      this.showViewer = true
    }, // 关闭查看器
    closeViewer () {
      this.showViewer = false
    }
  }
}
</script>
