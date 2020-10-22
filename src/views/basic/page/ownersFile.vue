<template>
  <div class="main-content">
    <div class="main-titel">
      <span>业主档案</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addOwner = true"
                   icon="el-icon-plus">新增业主</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button @click="detailsOwner = true">详情</button>
            <button @click="reviseOwner = true">修改</button>
            <button @click="del(table_row)">删除</button>
            <button @click="linkHouse = true">关联房屋</button>
            <button @click="linkParking = true">关联车位</button>
            <!-- 关联车位 -->
            <el-drawer title="我是标题"
                       :visible.sync="linkParking"
                       size="56.26%"
                       :with-header="false">
              <link-parking></link-parking>
            </el-drawer>
            <!-- 关联房屋 -->
            <el-drawer title="我是标题"
                       :visible.sync="linkHouse"
                       size="56.26%"
                       :with-header="false">
              <link-house></link-house>
            </el-drawer>
            <!-- 添加 -->
            <el-drawer title="我是标题"
                       :visible.sync="detailsOwner"
                       size="56.26%"
                       :with-header="false">
              <details-owner></details-owner>
            </el-drawer>
            <!-- 修改 -->
            <el-drawer title="我是标题"
                       :visible.sync="reviseOwner"
                       size="56.26%"
                       :with-header="false">
              <revise-owner></revise-owner>
            </el-drawer>
            <!-- 添加/详情 -->
            <el-drawer title="我是标题"
                       :visible.sync="detailsOwner"
                       size="56.26%"
                       :with-header="false">
              <details-owner></details-owner>
            </el-drawer>
            <!-- 添加/详情 -->
            <el-drawer title="我是标题"
                       :visible.sync="addOwner"
                       size="56.26%"
                       :with-header="false">
              <add-owner></add-owner>
            </el-drawer>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
      <!-- 删除提示弹窗-->
      <Dialog :dialogVisible='dialog_visible'
              :dialog_config='dialog_config'
              @cancel='cancel'
              @confirm='confirm'>
      </Dialog>
    </div>
  </div>
</template>
<script>
import tablePagination from '@/components/tablePagination'
import addOwner from '@/views/basic/components/ownersFile/addOwner'
import detailsOwner from '@/views/basic/components/ownersFile/detailsOwner'
import reviseOwner from '@/views/basic/components/ownersFile/reviseOwner'
import linkParking from '@/views/basic/components/ownersFile/linkParking'
import linkHouse from '@/views/basic/components/ownersFile/linkHouse'
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      // 选中表格数据
      table_row: {},
      form_item: [
        {
          type: 'Input',
          label: '业主姓名',
          placeholder: '请输入内容',
          prop: 'p1'
        },
        {
          type: 'Input',
          label: '业主手机号',
          placeholder: '请输入',
          prop: 'p2'
        },
        {
          type: 'Input',
          label: '证件号码',
          placeholder: '请输入',
          prop: 'p3'
        }
      ],

      // 详情
      detailsOwner: false,
      // 添加
      addOwner: false,
      // 修改
      reviseOwner: false,
      // 关联房屋
      linkHouse: false,
      // 关联车位
      linkParking: false,
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '姓名', prop: 'table3', width: 'auto' },
          { label: '手机号', prop: 'table4', width: 'auto' },
          { label: '证件类型', prop: 'table9', width: 'auto' },
          { label: '证件号码', prop: 'table10', width: 'auto' },
        ],
        table_data: [{
          table1: "1",
          table2: "浙A062U2",
          table3: "夏衡龄",
          table4: "18965334842",
          table5: "包年",
          table6: "剩余120天",
          table7: "A128",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "33020319901011386"
        },
        {
          table1: "2",
          table2: "浙BPQ377",
          table3: "何佃霁",
          table4: "13457102069",
          table5: "包年",
          table6: "剩余77天",
          table7: "A118",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "3",
          table2: "浙B78V3Q",
          table3: "江湘儿",
          table4: "15524680851",
          table5: "包年",
          table6: "剩余77天",
          table7: "A118",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "4",
          table2: "浙B78V3Q",
          table3: "丁珊珊",
          table4: "13457102018",
          table5: "包年",
          table6: "剩余27天",
          table7: "A118",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "5",
          table2: "浙B78VEX",
          table3: "李燕",
          table4: "13457102029",
          table5: "包年",
          table6: "剩余67天",
          table7: "B238",
          table8: "3-1-103",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "6",
          table2: "浙BS32Q",
          table3: "张宇",
          table4: "18965334842",
          table5: "包年",
          table6: "剩余17天",
          table7: "A108",
          table8: "1-2-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "7",
          table2: "浙BEV35",
          table3: "张龙",
          table4: "13421320691",
          table5: "包年",
          table6: "剩余88天",
          table7: "A231",
          table8: "1-1-234",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "8",
          table2: "浙B78V3Q",
          table3: "吴磊",
          table4: "13457102069",
          table5: "包年",
          table6: "剩余67天",
          table7: "A341",
          table8: "2-21-3401",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "9",
          table2: "浙B78V3Q",
          table3: "刘丽",
          table4: "13457100239",
          table5: "包年",
          table6: "剩余77天",
          table7: "A118",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "10",
          table2: "浙B78V3Q",
          table3: "何佃霁",
          table4: "13457102069",
          table5: "包年",
          table6: "剩余77天",
          table7: "A118",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        }
        ]
      }
    }
  },
  components: {
    tablePagination,
    addOwner,
    detailsOwner,
    reviseOwner,
    linkHouse,
    linkParking
  },
  computed: {

  },
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
  }
}
</script>
<style scoped>
.main-titel span {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  padding-left: 21px;
}
.content {
  padding: 20px;
}
.content-btn {
  padding-bottom: 20px;
}
.form-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.form-box > .form-input {
  margin-right: 170px;
}
.form-btn {
  flex: 1;
}
.input-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.input-box > div > span {
  color: #999999;
  font-size: 14px;
  padding-right: 10px;
}
.content-table {
  margin-top: 20px;
  border: 1px solid #f5f5f6;
}
</style>
