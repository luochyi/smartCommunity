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
                 <template v-slot:esStatus="slotData">
                        <div>
                          {{esStatusData|filterA(slotData.data.status)}}
                        </div>
                    </template>
                    <template v-slot:esType="slotData">
                        <div>
                          {{esTypeData|filterA(slotData.data.type)}}
                        </div>
                    </template>
        <template slot="footer">
          <div class="table-footer">
            <button @click="revises(table_row)">修改</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </template>
      </VueTable>
    </div>
    <addEidt :drawerTitle="drawerTitle"
             ref="addEidt"
             @handleClose="handleClose"
             :drawerVrisible='drawer_vrisible'></addEidt>
  </div>
</template>
<script>
import { dataDictionaryFindEstateType,dataDictionaryFindEstateStatus } from '@/api/basic'
import addEidt from '../components/houseManagement/add.vue'
export default {
  components: {
    addEidt,
  },
  data () {
    return {
      // 抽屉标题
      drawerTitle: '',
      esStatusData:[],
      esTypeData:[],
      // 是否通过校验
      // 抽屉显示隐藏
      drawer_vrisible: false,
      table_row: [],
      config: {
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
          { label: '房屋状态', prop: 'status', width: 'auto' ,type:'slot',slotName:'esStatus'},
          { label: '业主', prop: 'userResidentName', width: 'auto' },
          { label: '手机号', prop: 'userResidentTel', width: 'auto' },
          { label: '房屋类型', prop: 'type', width: 'auto' ,type:'slot',slotName:'esType'},
          { label: '建筑面积', prop: 'constructionArea', width: 'auto' },
          { label: '室内面积', prop: 'indoorArea', width: 'auto' },
          { label: '导入编号', prop: 'id', width: 'auto' },
        ],
        url: 'houseList',
        data: {
          pageNum: 1,
          size: 10,
        },

      },
    }
  },
  created () {
    dataDictionaryFindEstateStatus().then(res=>{
      this.esStatusData = res
      console.log(this.esStatusData);
      res.forEach(element => {
        let obj ={
          label:element.showName,
          value:element.showValue
        }
         this.config.search_item[1].options.push(obj)
      });
    })
    dataDictionaryFindEstateType().then(res=>{
      this.esTypeData = res
      console.log(res);
    })
    
  },
  methods: {
    revises (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('只能单条数据修改')
          return
        }
      } else {
        this.$message.error('请选中需要修改的数据')
        return
      }

      this.$refs.addEidt.edit(data[0].id)
      this.drawerTitle = '修改房屋'
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
