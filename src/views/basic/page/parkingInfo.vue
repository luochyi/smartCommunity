<template>
  <div class="main-content">
    <div class="main-titel">
      <span>车位信息</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="add()"
                   icon="el-icon-plus">新增车辆</el-button>
        <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain>批量导入</el-button>
        <el-button class="init-text"
                   type="text">模板下载</el-button>
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
  </div>
</template>
<script>
import addEidt from '../components/parkingInfo/add.vue'
import { findParkingSpaceType, findParkingSpaceStatus, cpmParkingSpaceFindById } from '@/api/basic'
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
      table_row: [],
      parkType: [],
      parkStatus: [],
      config: {
        // 搜索
        search_item: [
          {
            type: 'Input',
            label: '车位编号',
            placeholder: '请输入',
            prop: 'code'
          },
          {
            type: 'select',
            label: '状态',
            placeholder: '请选择',
            options: [
            ],
            prop: 'status'
          },
          {
            type: 'Input',
            label: '业主',
            placeholder: '请输入',
            prop: 'residentName'
          }
        ],
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '车位编号', prop: 'code', width: 'auto' },
          {
            label: '状态', prop: 'status', width: 'auto', type: "function",
            callback: (row, prop) => {
              let str = ''
              this.parkStatus.map(item => {
                if (row.status === item.showValue) {
                  str = item.showName
                }
              })
              return str
            }
          },
          {
            label: '车位类型', prop: 'type', width: 'auto', type: "function",
            callback: (row, prop) => {
              let str = ''
              this.parkType.map(item => {
                if (row.type === item.showValue) {
                  str = item.showName
                }
              })
              return str
            }
          },
          { label: '业主', prop: 'residentName', width: 'auto' },
          { label: '使用人', prop: 'userName', width: 'auto' },
          { label: '联系方式', prop: 'tel', width: 'auto' },
        ],
        url: 'parkList',
        data: {
          pageNum: 1,
          size: 10,
        },

      },
    }
  },
  mounted () {
    findParkingSpaceType().then(result => {
      this.parkType = result
    })
    findParkingSpaceStatus().then(result => {
      this.parkStatus = result
      let arr = result.map(item => ({
        label: item.showName,
        value: item.showValue
      }))

      this.config.search_item[1].options = arr
    })
  },
  methods: {
    revises (data) {
      console.log(data)
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
      let resData = {
        id: data[0].id
      }
      cpmParkingSpaceFindById(resData).then(res => {
        console.log(res)
      })
    },
    add () {
      this.drawerTitle = '新增房屋',
        this.drawer_vrisible = true;
    },
    handleClose () {
      this.drawer_vrisible = false;
    },
    tableCheck (arr) {
      this.table_row = arr
    },
    getData () {
      // 调用子组件的方法
      this.$refs.table.loadData()
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
  }
}
</script>
<style scoped lang='scss'>
</style>
