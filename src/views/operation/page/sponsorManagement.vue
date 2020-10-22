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
        <input-form :formItem="form_item"
                    :btnWidth="'10%'"> </input-form>
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

            <template v-slot:table8="slotData">
              <div>
                <el-button class="init-text"
                           type="text">{{
                  slotData.data.table8
                }}</el-button>
              </div>
            </template>
          </tableData>
          <div class="table-footer">
            <button @click="reviseUnit = true">修改</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
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
import tablePagination from '@/components/tablePagination'
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
      table_row: {},
      form_item: [
        {
          type: 'Input',
          label: '联系人',
          placeholder: '请输入内容',
          prop: 'p1'
        },
        {
          type: 'Input',
          label: '联系方式',
          placeholder: '请输入内容',
          prop: 'p2'
        },

        {
          type: 'Input',
          label: '证件号码',
          placeholder: '请输入内容',
          prop: 'p3'
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
          prop: 'p4'
        },
        {
          type: 'Input',
          label: '主办方单位',
          placeholder: '请输入内容',
          prop: 'p5'
        },
      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '80' },
          { label: '主办方单位', prop: 'table2', width: 'atuo' },
          {
            label: '营业执照', prop: 'table3', width: 'atuo', type: 'slot',
            slotName: 'table3'
          },
          { label: '负责人', prop: 'table4', width: 'atuo' },
          { label: '联系方式', prop: 'table5', width: 'atuo' },
          { label: '证件类型', prop: 'table6', width: 'atuo' },
          { label: '证件号码', prop: 'table7', width: 'atuo' },
          {
            label: '主办次数', prop: 'table8',
            width: 'atuo',
            typetype: 'slot',
            slotName: 'table8'
          },
        ],
        table_data: [
          {
            table1: '1',
            table2: '物业',
            table3: '',
            table4: '任岚岚',
            table5: '13676609031',
            table6: '身份证',
            table7: '330226199312376877',
            table8: '3',
          }
          ,
          {
            table1: '2',
            table2: '宏远装修公司',
            table3: '查看',
            table4: '邹悦',
            table5: '15648925502',
            table6: '身份证',
            table7: '330226198708294351',
            table8: '1',
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
