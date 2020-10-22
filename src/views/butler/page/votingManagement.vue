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
      <span>投票管理</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：有
        <span style="color:rgba(251, 71, 2, 1)">3</span>
        个通票即将开始
      </p>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addDrawer"
                   icon="el-icon-plus">新增投票</el-button>
      </div>
      <div class="">
        <!-- 头部输入框 -->
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button @click="editor(table_row)">编辑</button>
            <button @click="del(table_row)">删除</button>
            <button @click='details_vrisible=true'>详情</button>
            <button>发布</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
    <!-- 添加 -->
    <drawer :drawerVrisible='drawer_vrisible'
            @handleClose='getClose'
            :drawer_config="drawer_config"></drawer>
    <!-- 详情 -->
    <detailsVrisible :drawerVrisible='details_vrisible'
                     @handleClose='getClose'
                     @details_obj="details_obj"></detailsVrisible>
    <!-- 详情详情 -->
    <detailsDetails :drawerVrisible='details_details'
                    @handleClose='getClose'
                    @goBack='goBack'></detailsDetails>
    <!-- 编辑/删除 提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>
<script>
import drawer from '@/components/Drawer/drawer.vue'
import detailsVrisible from '@/views/butler/components/votingManagement/details.vue'
import detailsDetails from '@/views/butler/components/votingManagement/details/index.vue'
import Dialog from '@/components/dialog/Dialog.vue'
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      // 添加
      drawer_vrisible: false,
      // 详情
      details_vrisible: false,
      // 详情——详情
      details_details: false,
      // 选中表格数据
      table_row: {},
      // 传入dialog的参数
      dialog_config: {
        title: '删除提示',
        content: '该活动已经开始投票，不可删除！'
      },
      // 添加抽屉数据
      drawer_config: {
        drawer_vrisible: false,
        head_title: '投票管理',
        content_title: '活动信息',
        ruleForm: {
          name: '',
          region: '',
          editor_bar: '',
          upload_img: '',
          enddate: '',
          dates: ''
        },
        form_item: [
          {
            type: "Input",
            label: "投票标题",
            placeholder: "请选择停车场",
            width: "50%",
            prop: "region",
          },
          {
            type: "Select",
            label: "投票起始时间",
            placeholder: "亲选择时间",
            prop: "dates",
            width: "50%",
            options: [
              { label: "ansa", value: "1" }
            ],
          },
          {
            type: "Select",
            label: "投票结束时间",
            placeholder: "亲选择时间",
            prop: "enddate",
            width: "50%",
            options: [
              { label: "ansa", value: "1" }
            ]
          },

          {
            type: "Select",
            label: "公开人群",
            placeholder: "请选择人群",
            prop: "date",
            width: "50%",
            options: [
              { label: "全部", value: "1" },
              { label: "租客", value: "2" },
              { label: "业主", value: "3" }

            ],
          },
          {
            type: "editor",
            label: "车辆型号",
            width: '100%',
            placeholder: "请输入车辆型号",
            prop: "editor_bar",
          },
          {
          },
          {
            type: "upload",
            label: "车辆型号",
            width: '100%',
            placeholder: "请输入车辆型号",
            prop: "upload_img",
          },

        ],
        // upload
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],

          dates: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          enddate: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          upload_img: [
            { required: true, message: '请输入', trigger: 'change' }
          ],
          editor_bar: [{ required: true, message: '请输入', trigger: 'blur' }],
        },
      },
      //  表格数据
      table_config: {
        thead: [
          { label: '投票标题', prop: 'table1', width: 'auto' },
          { label: '投票开始时间', prop: 'table2', width: 'auto' },
          { label: '投票结束时间', prop: 'table3', width: 'auto' },
          { label: '活动状态', prop: 'table4', width: 'auto' },
          { label: '备注', prop: 'table5', width: 'auto' }
        ],
        table_data: [
          {
            table1: '最佳明星保洁员',
            table2: '2019年10月12日 12点',
            table3: '2019年10月12日 18点',
            table4: '未开始',
            table5: ''
          },
          {
            table1: '华城园最佳维修员',
            table2: '2019年10月12日 12点',
            table3: '2019年10月12日 18点',
            table4: '已结束',
            table5: ''
          },
          {
            table1: '周六组织全小区联谊会地址选择',
            table2: '2019年10月12日 12点',
            table3: '2019年10月12日 18点',
            table4: '未开始',
            table5: ''
          },
          {
            table1: '2019年华城园最美绿化带评选',
            table2: '2019年10月12日 12点',
            table3: '2019年10月12日 18点',
            table4: '进行中',
            table5: ''
          },
          {
            table1: '元旦联欢会最佳表演组',
            table2: '2019年10月12日 12点',
            table3: '2019年10月12日 18点',
            table4: '未开始',
            table5: '冰箱2台，需要更换'
          },
          {
            table1: '植树节地区选举',
            table2: '2019年10月12日 12点',
            table3: '2019年10月12日 18点',
            table4: '未开始',
            table5: ''
          },
          {
            table1: '五一欢动会',
            table2: '2019年10月12日 12点',
            table3: '2019年10月12日 18点',
            table4: '未开始',
            table5: ''
          }
        ]
      }
    }
  },
  components: {
    drawer,
    detailsVrisible,
    detailsDetails,
    Dialog
  },
  methods: {
    // table选中行
    tableRow (data) {
      this.table_row = data;
    },
    // 添加
    addDrawer () {
      this.drawer_vrisible = true;
    },
    // 编辑
    editor (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '编辑提示'
        this.dialog_config.content = '该活动已经开始投票，不可编辑！'
        this.dialog_visible = true
      }
      else {
        this.$message.error('请选中需要编辑的表格数据');
      }
    },
    // 删除
    del (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '该活动已经开始投票，不可删除！'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },

    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false;
      // console.log(data)
    },
    // 监听子组件确认事件
    confirm (data) {
      this.dialog_visible = false;
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false;
      this.details_vrisible = false;
      this.details_details = false;
      console.log(data + "投票管理父组件");
    },
    // 详情抽屉 详情
    details_obj (data) {
      this.details_vrisible = false;
      this.details_details = true;
      console.log(data + '222')
    },
    //  详情抽屉 详情 返回
    goBack () {
      this.details_vrisible = true;
      this.details_details = false;
    },

  }
}
</script>
