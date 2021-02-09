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
      <span>建议咨询</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日新增建议
        <span style="color:rgba(251, 71, 2, 1)">{{countConsultNew}}</span>
        条，质询 <span style="color:rgba(251, 71, 2, 1)">{{countAdviceNew}}</span>条
      </p>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template slot="tabs">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="全部"
                         name="0"></el-tab-pane>
            <el-tab-pane label="咨询"
                         name="1"></el-tab-pane>
            <el-tab-pane label="建议"
                         name="2"></el-tab-pane>
          </el-tabs>
        </template>
        <template v-slot:score="slotData">
          <div>
            <el-rate :value="slotData.data.score/2"
                     :colors="colors"
                     disabled></el-rate>
          </div>
        </template>
        <template slot="footer">
          <div class="table-footer">
            <button @click="details(table_row)">详情</button>
            <button @click="details(table_row)">回复</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </template>
      </VueTable>
    </div>
    <!-- 详情 -->
    <drawerDetails :drawerVrisible='drawer_details'
                   :suggestId='suggestId'
                   @handleClose='getClose'></drawerDetails>
  </div>
</template>

<script>
import { adviceCountConsultNew, adviceCountAdviceNew } from '@/api/butler'
import drawerDetails from '@/views/butler/components/suggestConsultation/details.vue'
export default {
  data () {
    return {
      activeName: 0,
      table_row: [],
      colors: ['#FB4702', '#FB4702', '#FB4702'],

      // drawerDetails
      drawer_details: false,
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '内容', prop: 'content', width: '350' },
          { label: '类型', prop: 'type', width: 'auto' },
          { label: '发布人', prop: 'releaseName', width: 'auto' },
          { label: '发布时间', prop: 'releaseDate', width: 'auto' },
          { label: '状态', prop: 'status', width: 'auto' },
          {
            label: '星级',
            prop: 'score',
            width: '180',
            type: 'slot',
            slotName: 'score',
          },
          { label: '最后一次回复/提问时间', prop: 'lastFeedBackDate', width: '280' },
        ],
        url: 'adviceList',
        table_data: [],
        search_item: [
          {
            type: 'startDate',
            label: '发布开始时间',
            placeholder: '请选择开始日期',
            prop: 'releaseDateStart',
          },
          {
            type: 'endDate',
            label: '发布结束时间',
            placeholder: '请选择结束时间',
            prop: 'releaseDateEnd',
          },
          {
            type: 'select',
            label: '状态',
            placeholder: '请选择',
            prop: 'status',
            options: [
              { value: 1, label: '有反馈信息' },
              { value: 2, label: '无反馈信息' },
            ]
          },
          {
            type: 'Input',
            label: '发布人',
            placeholder: '请选择',
            prop: 'releaseName',
          },
          {
            type: 'select',
            label: '评分',
            placeholder: '评分',
            prop: 'score',
            options: [
              { value: 1, label: '差评' },
              { value: 2, label: '中评' },
              { value: 3, label: '好评' },

            ]
          },
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      // 咨询条数
      countConsultNew: null,
      // 建议条数
      countAdviceNew: null,
      suggestId: null,
    }
  },
  components: {
    drawerDetails,
  },
  mounted () {
    this.getTipsData()
  },
  methods: {

    //  查询今日咨询条数
    getTipsData () {
      // 今日发起装修
      adviceCountConsultNew().then(result => {
        this.countConsultNew = result.countConsultNew
      })
      //查询今日建议条数
      adviceCountAdviceNew().then(result => {
        this.countAdviceNew = result.countAdviceNew
      })
    },
    handleClick (tab, event) {
      let type = null
      if (this.activeName != 0) {
        type = this.activeName
      } else {
        type = null
      }
      const requestData = {
        pageNum: 1,
        size: 10,
        type: type
      }
      this.$refs.table.requestData(requestData);
    },
    tableCheck (arr) {
      this.table_row = arr
    },
    // 删除
    del (data) {
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.table_row.length; i++) {
          arr.push(this.table_row[i].id)
        }
        this.$confirm('是否确认删除？删除不可恢复', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
          this.$refs.table.tableDelete(arr)
        }).catch(action => { });
      } else {
        this.$message.error('请选中需要删除的数据');
      }
    },
    details (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message({
            message: '只能操作单个数据',
            type: 'error'
          })
          return
        }
        this.suggestId = data[0].id
        this.drawer_details = true
      } else {
        this.$message({
          message: '请选择需要操作的数据',
          type: 'error'
        })
      }
    },
    // suggestId
    // 关闭抽屉
    getClose (data) {
      this.drawer_details = false;
      this.suggestId = null
    },
  }
}
</script>
