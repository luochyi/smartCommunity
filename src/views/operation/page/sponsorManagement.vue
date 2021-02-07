<template>
  <div class="main-content">
    <div class="main-titel">
      <span>主办方管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addUnit = true"
                   icon="el-icon-plus">新增主办方</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click="reviseUnit = true">修改</button>
              <button @click="del(table_row)">删除</button>
            </div>
          </template>
        </VueTable>
        <!-- 提示弹窗-->
        <Dialog :dialogVisible='dialog_visible'
                :dialog_config='dialog_config'
                @cancel='cancel'
                @confirm='confirm'>
        </Dialog>
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
      </div>
    </div>
  </div>
</template>
<script>
import addUnit from '@/views/operation/components/sponsorManagement/addSponsor'
import reviseUnit from '@/views/operation/components/sponsorManagement/hostRecord'
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
          { label: '主办方单位', prop: 'sponsorUnit', width: 'atuo' },
          {
            label: '营业执照', prop: 'imgUrls', width: 'atuo',
          },//type: 'slot', slotName: 'table3'

          { label: '负责人', prop: 'director', width: 'atuo' },
          { label: '联系方式', prop: 'tel', width: 'atuo' },
          { label: '证件类型', prop: 'idType', width: 'atuo' },
          { label: '证件号码', prop: 'idNumber', width: 'atuo' },
          {
            label: '主办次数', prop: 'num',
            width: 'atuo', //   typetype: 'slot',  slotName: 'table8'
          },
        ],
        table_data: [],
        url: 'sponsorManagementList',
        search_item: [
          {
            type: 'Input',
            label: '联系人',
            placeholder: '请输入内容',
            prop: 'director'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入内容',
            prop: 'tel'
          },

          {
            type: 'Input',
            label: '证件号码',
            placeholder: '请输入内容',
            prop: 'idNumber'
          },
          {
            type: 'select',
            label: '证件类型',
            value: '',
            options: [
              { label: '身份证', value: '1' },
              { label: '学生证', value: '2' },
            ],
            placeholder: '请选择',
            prop: 'idType'
          },
          {
            type: 'Input',
            label: '主办方单位',
            placeholder: '请输入内容',
            prop: 'sponsorUnit'
          },
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
    tableCheck (data) {
      this.table_row = data;
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
    resetForm (formName) { }
  }
}
</script>
