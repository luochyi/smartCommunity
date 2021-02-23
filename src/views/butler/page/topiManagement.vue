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
                   @click="addEidt_vrisible=true">新增话题</el-button>
      </div>

      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click="edit(table_row)">编辑</button>
              <button @click="del(table_row)">删除</button>
            </div>
          </template>
        </VueTable>
      </div>
    </div>
    <addEidt :drawerTitle="addEidtDrawerTitle"
             ref="addEdit"
             @submitSuccess='submitSuccess'
             @handleClose="addEidtHandleClose"
             :drawerVrisible='addEidt_vrisible'></addEidt>
  </div>
</template>

<script>
import addEidt from '@/views/butler/components/topiManagement/addEidt'

export default {
  data () {
    return {
      addEidtDrawerTitle: '新增话题',
      addEidt_vrisible: false,
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
  components: {
    addEidt
  },
  methods: {
    tableCheck (arr) {
      this.table_row = arr
    },
    // 添加修改关闭
    addEidtHandleClose () {
      this.addEidt_vrisible = false
    },
    // 添加修改成功
    submitSuccess () {
      this.$refs.table.loadData()
    },
    // 编辑
    edit (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.addEidt_vrisible = true;
      this.$refs.addEdit.edit(data[0].id)
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