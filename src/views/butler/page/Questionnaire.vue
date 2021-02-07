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
                   @click="addVrisible=true">新增报修</el-button>
      </div>
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button>详情</button>
              <button>编辑</button>
              <button>派工</button>
              <button>回访</button>
              <button>作废</button>
              <button @click="del(table_row)">删除</button>
            </div>
          </template>
        </VueTable>
      </div>
    </div>
    <!-- 删除提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: '',
      },
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
  methods: {
    tableCheck (arr) {
      this.table_row = arr

    },
    // 删除
    del (data) {
      console.log(data)
      if (data.length) {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '是否确认删除？删除无法撤回！'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据')
      }
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false
    },
    // 监听删除确认确认事件
    confirm (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      // 调用子组件的方法
      this.$refs.table.tableDelete(arr)
      this.dialog_visible = false
    }
  },
}
</script>
