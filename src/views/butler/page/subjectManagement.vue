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
      <span>主题明细管理</span>
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

  </div>
</template>
<script>
export default {
  data () {
    return {

      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '话题标题', prop: 'title', width: '380' },
          { label: '话题摘要', prop: 'summary', width: '180' },
          { label: '发布人昵称', prop: 'gambitNickName', width: '180' },
          { label: '发布人姓名', prop: 'gambitName', width: '180' },
          { label: '发布内容', prop: 'gambitContent', width: '380' },
          { label: '是否公开', prop: 'isPublic', width: '110' },
          { label: '是否可评论', prop: 'isRating', width: '110' },
          { label: '发布时间', prop: 'gambitCreateDate', width: '180', sortable: true },
          { label: '评论人昵称', prop: 'themeNickName', width: '180' },
          { label: '评论人姓名', prop: 'themeName', width: '110' },
          { label: '评论时间', prop: 'themeCreateDate', width: '180', sortable: true },
          { label: '评论内容', prop: 'themeContent', width: '280' },
          { label: '点赞人数', prop: 'likeNum', width: '180', sortable: true },
          { label: '评论人数', prop: 'commentNum', width: '180', sortable: true },
          { label: '状态', prop: 'isDelete', width: 'auto' }
        ],
        url: 'gambitThemeList',
        table_data: [],
        search_item: [
          {
            type: 'startDate',
            label: '发布开始时间',
            placeholder: '请选择开始日期',
            prop: 'beginDate'
          },
          {
            type: 'startDate',
            label: '发布结束时间',
            placeholder: '请选择结束日期',
            prop: 'endDate'
          },
          {
            type: 'Input',
            label: '话题标题',
            placeholder: '请输入',
            prop: 'title'
          },

          {
            type: 'Input',
            label: '发布人姓名',
            placeholder: '请输入',
            prop: 'gambitName'
          },
          {
            type: 'Input',
            label: '发布人昵称',
            placeholder: '请输入',
            prop: 'nickName'
          }, {
            type: 'select',
            label: '状态',
            value: null,
            options: [
              { value: 0, label: '删除' },
              { value: 1, label: '正常' }
            ],
            placeholder: '请输入',
            prop: 'isDelete'
          },
          {
            type: 'Input',
            label: '话题摘要',
            placeholder: '请输入',
            prop: 'summary',
            width: '50%',
            inputWidth: '658px'
          },
          {
            type: 'Input',
            label: '发布内容',
            placeholder: '请输入',
            prop: 'gambitContent',
            width: '50%',
            inputWidth: '658px'
          },
          {
            type: 'Input',
            label: '评论内容',
            placeholder: '请输入',
            width: '50%',
            prop: 'content',
            inputWidth: '658px'
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

  },
}
</script>
