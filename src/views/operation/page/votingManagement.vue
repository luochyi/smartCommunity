<template>
  <div class="main-content">
    <div class="main-titel">
      <span>投票管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addUnit = true"
                   icon="el-icon-plus">新增投票</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">

          <template slot="footer">
            <div class="table-footer">
              <button @click="dialogVisible = true">查看</button>
              <button @click="reviseUnit = true">修改</button>
              <button @click="del(table_row)">删除</button>
            </div>
          </template>
        </VueTable>
        <!-- <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'>
            <template v-slot:table3="slotData">
              <div>
                <el-button class="init-text"
                           type="text">{{
                  slotData.data.table3
                }}</el-button>
              </div>
            </template>
          </tableData>
          <div class="table-footer">
            <button @click="dialogVisible = true">查看</button>
            <button @click="reviseUnit = true">修改</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination> -->
        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="addUnit"
                   size="56.26%"
                   :with-header="false">
          <add-unit></add-unit>
        </el-drawer>
        <!-- 修改 -->
        <el-drawer title="我是标题"
                   :visible.sync="reviseUnit"
                   size="56.26%"
                   :with-header="false">
          <revise-unit></revise-unit>
        </el-drawer>

        <!-- 提示弹窗-->
        <Dialog :dialogVisible='dialog_visible'
                :dialog_config='dialog_config'
                @cancel='cancel'
                @confirm='confirm'>
        </Dialog>
      </div>

    </div>
  </div>
</template>
<script>
import addUnit from '@/views/basic/components/unitInfo/addUnit'
import reviseUnit from '@/views/basic/components/unitInfo/reviseUnit'
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '投票标题', prop: 'title', width: 'auto' },
          {
            label: '候选人', prop: 'votePersonnelNum', width: 'atuo',// type: 'slot',slotName: 'table3'
          },
          { label: '投票开始时间', prop: 'beginDate', width: 'atuo' },
          { label: '投票结束时间', prop: 'endDate', width: 'atuo' },
          { label: '投票状态', prop: 'status', width: 'atuo' },
          { label: '投票结果', prop: 'voteResult', width: 'atuo' },
          // {
          //   label: '是否有效', prop: 'table8', width: 'atuo',
          // },
        ],
        table_data: [],
        url: 'voteList',
        search_item: [
          {
            type: 'Input',
            label: '投票标题',
            placeholder: '请输入',
            prop: 'title'
          },
          {
            type: 'startDate',
            label: '投票开始时间',
            placeholder: "请选择开始时间",
            prop: 'beginDate'
          },
          {
            type: 'endDate',
            label: '投票结束时间',
            placeholder: '请选择结束时间',
            prop: 'endDate'
          },
          {
            type: 'select',
            label: '投票状态',
            value: '',
            options: [
              { label: '未开始', value: '1' },
              { label: '进行中', value: '2' },
              { label: '已结束', value: '3' },
            ],
            placeholder: '请选择推送状态',
            prop: 'status'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      // 添加
      addUnit: false,
      reviseUnit: false,
      dialogVisible: false,
    }
  },
  components: {

    addUnit,
    reviseUnit
  },
  computed: {},
  methods: {
    tableCheck () {
      this.table_row = data;
    },
    // 删除
    del (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '是否确认删除？删除无法撤回！'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 发布
    release (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '发布'
        this.dialog_config.content = '确定现在发布？'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false;
    },
    // 监听子组件确认事件
    confirm (data) {
      this.dialog_visible = false;
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    },
    tableRow (data) {
      this.table_row = data;
    },
    submitForm (formName) { },
    resetForm (formName) { },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
