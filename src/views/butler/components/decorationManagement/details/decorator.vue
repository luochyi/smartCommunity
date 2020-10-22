
<template>
  <!-- 装修人员-->
  <div>
    <div class="content-table">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="addVrisible = true">新增装修人员</el-button>
      </div>
      <tableData :config="table_config"></tableData>
      <div class="table-footer">
        <button>编辑</button>
        <button>删除</button>
      </div>
    </div>
    <!-- <table-pagination></table-pagination> -->
    <table-pagination :pageSize='10'
                      :totalNumber='150'></table-pagination>
    <!-- 添加 -->
    <addVrisible :drawerVrisible='addVrisible'
                 @handleClose='getClose'> </addVrisible>

  </div>
</template>
<script>
import addVrisible from './decorator/add.vue'

export default {
  data () {
    return {
      addVrisible: false,
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '姓名', prop: 'table2', width: '280' },
          { label: '身份', prop: 'table3', width: '180' },
          { label: '证件类型', prop: 'table4', width: '180' },
          { label: '证件号码', prop: 'table5', width: '200' },
          { label: '联系方式', prop: 'table6', width: '180' },
          { label: '联系地址', prop: 'table7', width: '180' },
        ],
        table_data: [
          {
            table1: 1,
            table2: '王珂佳',
            table3: '施工队负责人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '浙江省宁波市海曙区孝闻街118号',
          },
          {
            table1: 2,
            table2: '马小明',
            table3: '施工队负责人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '联想3C服务中心(灵桥路店)',
          },
          {
            table1: 3,
            table2: '周丽',
            table3: '施工队负责人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '浙江省宁波市海曙区孝闻街118号',
          },
          {
            table1: 4,
            table2: '周晓晓',
            table3: '工人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '浙江省宁波市海曙区孝闻街118号',
          },
          {
            table1: 5,
            table2: '王珂佳',
            table3: '工人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '联想3C服务中心(灵桥路店)',
          },
          {
            table1: 6,
            table2: '王珂佳',
            table3: '施工队负责人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '深圳市南山区西丽同发路8号家具研发基地',
          },
          {
            table1: 7,
            table2: '王珂佳',
            table3: '施工队负责人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '浙江省宁波市海曙区孝闻街118号',
          },
          {
            table1: 8,
            table2: '王珂佳',
            table3: '施工队负责人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '浙江省宁波市海曙区孝闻街118号',
          },
          {
            table1: 9,
            table2: '王珂佳',
            table3: '施工队负责人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '宁波市慈溪市芦苇路与贵安路交叉路口往西北约100米(博文苑东南侧)',
          },
          {
            table1: 10,
            table2: '刘佳佳',
            table3: '施工队负责人',
            table4: '身份证',
            table5: '330227199012129009 ',
            table6: '18845355790',
            table7: '深圳市南山区西丽同发路8号家具研发基地',
          }
        ]
      },
    }
  },
  components: {
    addVrisible
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log('submit!')
    },
    getClose () {
      this.addVrisible = false
    }
  }
}
</script>
