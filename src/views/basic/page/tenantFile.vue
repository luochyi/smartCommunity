<template>
  <div class="main-content">
    <div class="main-titel">
      <span>租户档案</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addTenant = true"
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
            <button @click="revise = true">修改</button>
            <button @click="del(table_row)">删除</button>
            <button @click="linkHouse = true">关联房屋</button>
            <button @click="linkParking = true">关联车位</button>
          </div>
        </div>
        <table-pagination></table-pagination>
        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="addTenant"
                   size="56.26%"
                   :with-header="false">
          <add-tenant></add-tenant>
        </el-drawer>
        <!-- 修改 -->
        <el-drawer title="我是标题"
                   :visible.sync="revise"
                   size="56.26%"
                   :with-header="false">
          <revise-tenant></revise-tenant>
        </el-drawer>
        <!-- 关联房屋 -->
        <el-drawer title="我是标题"
                   :visible.sync="linkHouse"
                   size="56.26%"
                   :with-header="false">
          <link-house></link-house>
        </el-drawer>
        <!-- 关联车位 -->
        <el-drawer title="我是标题"
                   :visible.sync="linkParking"
                   size="56.26%"
                   :with-header="false">
          <link-parking></link-parking>
        </el-drawer>
        <!-- 删除提示弹窗-->
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
import addTenant from '@/views/basic/components/tenantFile/addTenant'
import reviseTenant from '@/views/basic/components/tenantFile/reviseTenant'
import linkParking from '@/views/basic/components/tenantFile/linkParking'
import linkHouse from '@/views/basic/components/tenantFile/linkHouse'
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
          label: '租户姓名',
          placeholder: '请输入内容',
          prop: 'p1'
        },
        {
          type: 'Input',
          label: '租户手机号',
          placeholder: '请输入',
          prop: 'p2'
        }

      ],

      // 添加
      addTenant: false,
      revise: false,
      linkParking: false,
      linkHouse: false,
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '姓名', prop: 'table3', width: 'auto' },
          { label: '手机号', prop: 'table4', width: 'auto' },
          { label: '车牌号', prop: 'table2', width: 'auto' },
          { label: '状态', prop: 'table5', width: 'auto' },
          { label: '剩余时间', prop: 'table6', width: 'auto' },
          { label: '车位号', prop: 'table7', width: 'auto' },
          { label: '房屋信息', prop: 'table8', width: 'auto' },
          { label: '证件类型', prop: 'table9', width: 'auto' },
          { label: '证件号码', prop: 'table10', width: '180' },
        ],
        table_data: [{
          table1: "1",
          table2: "浙B066U2",
          table3: "夏衡龄",
          table4: "18965334842",
          table5: "包年",
          table6: "剩余120天",
          table7: "A128",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "2",
          table2: "浙BPQ377",
          table3: "何佃霁",
          table4: "13457102012",
          table5: "包年",
          table6: "剩余77天",
          table7: "A118",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "3",
          table2: "浙B78V2D",
          table3: "刘淇",
          table4: "13457102019",
          table5: "包年",
          table6: "剩余17天",
          table7: "A3118",
          table8: "1-1-104",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "4",
          table2: "浙A28V3Q",
          table3: "芳菲",
          table4: "13457102069",
          table5: "包年",
          table6: "剩余234天",
          table7: "A023",
          table8: "1-1-1234",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "5",
          table2: "浙B78V3Q",
          table3: "吴磊",
          table4: "13457102123",
          table5: "包年",
          table6: "剩余177天",
          table7: "A118",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "6",
          table2: "浙B78V3Q",
          table3: "古田",
          table4: "13457102069",
          table5: "包年",
          table6: "剩余324天",
          table7: "C318",
          table8: "1-1-213",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "7",
          table2: "浙B732Q",
          table3: "张继科",
          table4: "13237102069",
          table5: "包年",
          table6: "剩余712天",
          table7: "A118",
          table8: "3-1-1301",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "8",
          table2: "浙B7833E",
          table3: "黄晨",
          table4: "13457112069",
          table5: "包年",
          table6: "剩余27天",
          table7: "A111",
          table8: "1-1-1101",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "9",
          table2: "浙B78V3Q",
          table3: "贺龙",
          table4: "18257102069",
          table5: "包年",
          table6: "剩余38天",
          table7: "D201",
          table8: "1-3-012",
          table9: "身份证",
          table10: "330203199010112386"
        },
        {
          table1: "10",
          table2: "浙B78V3Q",
          table3: "张龙",
          table4: "13457102239",
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
    addTenant,
    reviseTenant,
    linkParking,
    linkHouse
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
    submitForm (formName) {
    },
    resetForm (formName) {

    }
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
