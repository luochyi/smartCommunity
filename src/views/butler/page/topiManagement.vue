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
      <span>话题管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="addVrisible=true">新增话题</el-button>
      </div>
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button>编辑</button>
              <button>审查</button>
              <!-- <button>删除</button> -->
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
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: '',
      },
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '话题资源ID', prop: 'id', width: '180' },
          { label: '话题标题', prop: 'title', width: '380' },
          { label: '话题摘要', prop: 'summary', width: '180' },
          { label: '话题内容', prop: 'content', width: '380' },
          { label: '开始时间', prop: 'beginDate', width: '180' },
          { label: '结束时间', prop: 'endDate', width: '180' },
          { label: '状态', prop: 'status', width: 'auto' },
          { label: '发布人', prop: 'createName', width: '180' },
          { label: '发布时间', prop: 'createDate', width: '180' },
          { label: '是否可评论', prop: 'isRating', width: '110' },
          { label: '参与人数', prop: 'peopleNum', width: '110' }
        ],
        url: 'gambitList',
        table_data: [],
        search_item: [
          {
            type: 'startDate',
            label: '发布开始时间',
            placeholder: '请输入发布开始时间',
            prop: 'creatBeginDate'
          },
          {
            type: 'endDate',
            label: '发布结束时间',
            placeholder: '请输入发布结束时间',
            prop: 'creatEndDate'
          },
          {
            type: 'Input',
            label: '话题资源标题',
            placeholder: '请输入话题资源标题',
            prop: 'title'
          },

          {
            type: 'Input',
            label: '发布人姓名',
            placeholder: '请输入',
            prop: 'createName'
          },
          {
            type: 'select',
            label: '状态',
            placeholder: '请输入',
            value: null,
            options: [
              { value: 1, label: '启用中' },
              { value: 2, label: '禁用中' },
            ],
            prop: 'status'
          },

          {
            type: 'Input',
            label: '话题摘要',
            placeholder: '请输入',
            prop: 'summary',
            inputWidth: '692px'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      }
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
