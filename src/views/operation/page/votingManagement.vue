<template>
  <div class="main-content">
    <div class="main-titel">
      <span>公告管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addUnit = true"
                   icon="el-icon-plus">新增投票</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">

        <input-form :formItem="form_item"
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
        <table-pagination></table-pagination>
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
import tablePagination from '@/components/tablePagination'
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
      table_row: {},
      form_item: [
        {
          type: 'Input',
          label: '投票标题',
          placeholder: '请输入',
          prop: 'p1'
        },
        {
          type: 'startEndDate',
          label: '投票时间',
          rangeSeparator: '~',
          startPlaceholder: "请选择开始时间",
          endPlaceholder: '请选择结束时间',
          placeholder: '请输入',
          prop: 'p2'
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
          prop: 'p3'
        }
      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '80' },
          { label: '投票标题', prop: 'table2', width: 'auto' },

          {
            label: '候选人', prop: 'table3', width: 'atuo',
            type: 'slot',
            slotName: 'table3'
          },
          { label: '投票开始时间', prop: 'table4', width: 'atuo' },
          { label: '投票结束时间', prop: 'table5', width: 'atuo' },
          { label: '投票状态', prop: 'table6', width: 'atuo' },
          { label: '投票结果', prop: 'table7', width: 'atuo' },

          {
            label: '是否有效', prop: 'table8', width: 'atuo',
          },
        ],
        table_data: [
          {
            table1: '1',
            table2: '最美保洁员',
            table3: '5',
            table4: '2020-08-01',
            table5: '2020-08-10',
            table6: '未开始',
            table7: '',
            table8: '',
          }
          ,
          {
            table1: '2',
            table2: '最敬业安保员',
            table3: '5',
            table4: '2020-06-01',
            table5: '2020-09-02',
            table6: '进行中',
            table7: '',
            table8: '',
          },
          {
            table1: '3',
            table2: '最佳明星物业服务人员',
            table3: '5',
            table4: '2020-06-06',
            table5: '2020-06-25',
            table6: '已结束',
            table7: '郝搏粲，30票',
            table8: '有效',
          },
        ]
      },
      // 添加
      value1: '',
      // 添加
      addUnit: false,
      reviseUnit: false,
      dialogVisible: false,
      activeName: 'first',
      input: '',
      numberValidateForm: {
        age: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      tableData: [
        {
          id: 1,
          ParkingNumber: 'A128',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 2,
          ParkingNumber: 'A128',
          status: '已售',
          ParkingType: '临时车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 3,
          ParkingNumber: 'A1238',
          status: '已出租',
          ParkingType: '产权车位',
          owner: '吴彦祖',
          userName: '吴彦祖 ',
          phone: '18965334242'
        },
        {
          id: 4,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 5,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 6,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 4,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 4,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 7,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 8,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        },
        {
          id: 9,
          ParkingNumber: 'A1223',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        }
      ]
    }
  },
  components: {
    tablePagination,
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
