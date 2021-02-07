<template>
  <div class="main-content">
    <div class="main-titel">
      <span>房产管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="add()"
                   icon="el-icon-plus">新增房屋</el-button>
      </div>
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template slot="footer">
          <div class="table-footer">
            <button @click="revises(table_row)">修改</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </template>
      </VueTable>
    </div>
    <addEidt :drawerTitle="drawerTitle"
             @handleClose="handleClose"
             :drawerVrisible='drawer_vrisible'></addEidt>
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>
<script>
import { Login, cpmBuildingUnitEstateFindById } from '@/api/basic'
import addEidt from '../components/houseManagement/add.vue'
export default {
  components: {
    addEidt,
  },
  data () {
    return {
      // 抽屉标题
      drawerTitle: '',
      // 是否通过校验
      // 抽屉显示隐藏
      drawer_vrisible: false,
      // 控制dialog显示隐藏
      dialog_visible: false,
      table_row: [],
      // 弹窗提示
      dialog_config: {
        title: '删除提示',
        content: '是否确认删除？删除无法撤回！'
      },
      config: {
        /*
        1	pageNum	当前页	是	[int]		
2	size	每页记录数	是	[int]		
3	roomName	房屋信息		[string]		
4	status	房屋状态		[int]		
5	userResidentName	业主		[string]		
6	userResidentTel	手机号		[string]	
        */
        // 搜索
        search_item: [
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '楼栋-单元-室号',
            prop: 'roomName'
          },
          {
            type: 'select',
            label: '房屋状态',
            placeholder: '请输入内容',
            options: [
              { value: 1, label: '入住' },
              { value: 2, label: '装修' },
              { value: 3, label: '空置' },
              { value: 4, label: '为售' },
              { value: 5, label: '已租' }
            ],
            prop: 'status'
          },
          {
            type: 'Input',
            label: '业主',
            placeholder: '请输入',
            prop: 'residentName'
          },
          {
            type: 'Input',
            label: '手机号',
            placeholder: '请输入',
            prop: 'residentTel'
          }
        ],
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '楼栋', prop: 'buildingName', width: 'auto' },
          { label: '单元（号）', prop: 'buildingUnitNo', width: 'auto' },
          { label: '房屋名称', prop: 'roomNumber', width: 'auto' },
          { label: '房屋状态', prop: 'status', width: 'auto' },
          { label: '业主', prop: 'userResidentName', width: 'auto' },
          { label: '手机号', prop: 'userResidentTel', width: 'auto' },
          { label: '房屋类型', prop: 'type', width: 'auto' },
          { label: '建筑面积', prop: 'constructionArea', width: 'auto' },
          { label: '室内面积', prop: 'indoorArea', width: 'auto' },
        ],
        url: 'houseList',
        data: {
          pageNum: 1,
          size: 10,
        },

      },
    }
  },
  mounted () {
    Login().then((res) => {
      console.log(res)
      sessionStorage.setItem('X-Admin-Token', res.token)
    })
  },
  methods: {
    revises (data) {
      let findData = {
        id: data[0].id
      }
      cpmBuildingUnitEstateFindById(findData).then(res => {
        console.log(res)
      })
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('只能单条数据修改')
          return
        }
      } else {
        this.$message.error('请选中需要修改的数据')
        return
      }
      this.drawerTitle = '修改房屋',
        this.drawer_vrisible = true;
    },
    add () {
      this.drawerTitle = '新增房屋',
        this.drawer_vrisible = true;
    },
    handleClose () {
      this.drawer_vrisible = false;
    },
    tableCheck (arr) {
      console.log(arr)
      this.table_row = arr
    },
    getData () {
      // 调用子组件的方法
      this.$refs.table.loadData()
    },
    // 删除
    del (data) {
      if (data.length) {
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据')
      }
    },
    // 监听删除取消事件
    cancel (data) {
      this.dialog_visible = false
    },
    // 监听删除确认确认事件
    confirm (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      // 调用子组件的方法
      this.$refs.table.tableDelete(arr)
      this.dialog_visible = false
    }
  }
}
</script>
<style scoped lang='scss'>
</style>
