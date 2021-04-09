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
  <div>
    <div v-show="!addShow"
         class="main-content">
      <div class="main-titel">
        <span>问卷调查</span>
      </div>
      <div class="tips">
        <p>
          <span class="el-icon-warning-outline"
                style="margin:0 12px"></span>
          温馨提示：今日新增保修
          <span style="color:rgba(251, 71, 2, 1)">13</span>
          条
        </p>
      </div>
      <div class="content">
        <div class="content-btn">
          <el-button class="init-button"
                     icon="el-icon-plus"
                     @click="addShow=true">新增问卷调查</el-button>
        </div>
        <div class="">
          <VueTable ref="table"
                    :config='config'
                    @tableCheck="tableCheck">
            <template slot="footer">
              <div class="table-footer">
                <button>预览</button>
                <button @click='eidt(table_row)'>编辑</button>
                <button @click='reReportAnalysis(table_row)'>分析报表</button>
                <button @click="del(table_row)">删除</button>
                <!-- <button>打印</button> -->
              </div>
            </template>
          </VueTable>
        </div>
      </div>
    </div>
    <Report drawerTitle="分析报表"
            ref="Report"
            @handleClose="ReportHandleClose"
            :drawerVrisible='Report_vrisible'></Report>
    <div v-show="addShow">
      <addEidt @cancel='addEidtCancel'
               @submitSuccess='addEidtSubmitSuccess'
               ref="addEidt"></addEidt>

    </div>
  </div>
</template>

<script>
// import add 
import addEidt from '@/views/butler/components/Questionnaire/add.vue'
import Report from '@/views/butler/components/Questionnaire/Report'

import { questionnaireReportAnalysis } from '@/api/butler.js'
export default {
  data () {
    return {
      addShow: false,
      Report_vrisible: false,
      ReportDrawerTitle: '',
      // 选中表格数据
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '标题', prop: 'title', width: '280' },
          { label: '问卷对象', prop: 'answerType', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          { label: '开始时间', prop: 'beginDate', width: '180' },
          { label: '结束时间', prop: 'endDate', width: '180' },
          { label: '答题数量', prop: 'answerNum', width: 'auto' }
        ],
        url: 'questionnaireList',
        table_data: [],
        search_item: [
          {
            type: 'Input',
            label: '问卷标题',
            placeholder: '请输入',
            prop: 'title'
          },
          {
            type: 'select',
            label: '状态',
            options: [
              { value: 1, label: '未开始' },
              { value: 2, label: '正在进行' },
              { value: 3, label: '已结束' },
            ],
            placeholder: '请输入',
            prop: 'status'
          },
          {
            type: 'select',
            label: '问卷对象',
            options: [
              { value: 1, label: '无限制' },
              { value: 2, label: '业主' },
              { value: 3, label: '租户' },
            ],

            placeholder: '请选择',
            prop: 'answerType'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
    }
  },
  components: {
    addEidt,
    Report
  },
  methods: {
    tableCheck (arr) {
      this.table_row = arr
    },
    eidt (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }

      this.$refs.addEidt.edit(data[0].id)
      this.addShow = true;
    },
    reReportAnalysis (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }

      this.$refs.Report.getData(data[0].id)
      this.Report_vrisible = true
    },
    ReportHandleClose () {
      this.Report_vrisible = false
    },
    addEidtCancel () {
      this.addShow = false;
    },
    addEidtSubmitSuccess () {
      this.getData()
    },
    getData () { 
      // 调用子组件的方法
      this.$refs.table.loadData()
    },
    // 删除
    del (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      if (!arr.length) {
        this.$message.error('请选中需要删除的表格数据')
        return
      }
      this.$confirm('是否删除？删除不可找回', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$refs.table.tableDelete(arr)
      }).catch(action => { });
    }
  },
}
</script>
