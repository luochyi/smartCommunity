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
      <span>投诉表扬</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日新增建议
        <span style="color:rgba(251, 71, 2, 1)">3</span>
        条，质询 <span style="color:rgba(251, 71, 2, 1)">18</span>条
      </p>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template slot="footer">
          <div class="table-footer">
            <button @click="drawer_details= true">详情</button>
            <button @click="drawer_details= true">回复</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </template>
      </VueTable>
    </div>
    <!-- 详情 -->
    <drawerDetails :drawerVrisible='drawer_details'
                   @handleClose='getClose'></drawerDetails>
  </div>
</template>

<script>

import drawerDetails from '@/views/butler/components/suggestConsultation/details.vue'


export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      // 传入dialog的参数
      dialog_config: {
        title: '',
        content: ''
      },
      table_row: [],
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
          },
          { label: '最后一次回复/提问时间', prop: 'lastFeedBackDate', width: '280' },
        ],
        url: 'complaintPraiseList',
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
            label: '类型',
            placeholder: '请选择',
            prop: 'type',
            options: [
              { value: 3, label: '投诉' },
              { value: 4, label: '表扬' },

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
            label: '状态',
            placeholder: '请选择',
            prop: 'status',
            options: [
              { value: 1, label: '有反馈信息' },
              { value: 2, label: '无反馈信息' },

            ]
          },

          // {
          //   type: 'Input',
          //   label: '评分',
          //   placeholder: '单元/楼栋/房号',
          //   prop: 'score',
          // },
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
    }
  },
  components: {
    drawerDetails,

  },
  methods: {

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

    // 关闭抽屉
    getClose (data) {
      this.drawer_details = false;
    },
  }
}
</script>
