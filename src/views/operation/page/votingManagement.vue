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
        <span style="color:rgba(251, 71, 2, 1)">{{count}}</span>
        个投票即将开始
      </p>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <button class="btn-orange"
                style="height:32px"
                @click="addvoting()"><span> <i class="el-icon-plus"></i>新增投票</span></button>
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click="edit(table_row)">编辑</button>
              <button @click="del(table_row)">删除</button>
              <button @click="voteDetails(table_row)">详情</button>
              <button @click="release(table_row)">发布</button>
              <!-- <button @click="del(table_row)">删除</button> -->
            </div>
          </template>
        </VueTable>
      </div>
    </div>
    <addEidt :drawerTitle="addEidtDrawerTitle"
             ref="addEdit"
             @submitSuccess='submitSuccess'
             @handleClose="addEidtHandleClose"
             :drawerVrisible='addEidt_vrisible'></addEidt>
    <!-- 详情 -->
    <detailsVrisible :drawerVrisible='details_vrisible'
                     @handleClose='getClose'
                     :voteId="detailId"
                     @details_obj="details_obj"></detailsVrisible>
    <!-- 详情详情 -->
    <detailsDetails :drawerVrisible='details_details'
                    :voteId="detailsDetailsId"
                    :detailsData='detailsDetailsData'
                    @handleClose='getClose'
                    @goBack='goBack'></detailsDetails>
  </div>
</template>

<script>
import addEidt from '@/views/butler/components/votingManagement/add.vue'
import detailsVrisible from '@/views/butler/components/votingManagement/details.vue'
import detailsDetails from '@/views/butler/components/votingManagement/details/index.vue'
import { voteCountVoteExpectedStart, voteFindById, voteRelease } from '@/api/butler'
export default {
  components: {
    addEidt,
    detailsVrisible,
    detailsDetails,
  },
  data () {
    return {
      detailId: null,
      detailsDetailsId: null,
      detailsDetailsData: null,
      addEidtDrawerTitle: '新增投票',
      // 详情
      details_vrisible: false,
      // 详情——详情
      details_details: false,
      addEidt_vrisible: false,
      // 选中表格数据
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '投票标题', prop: 'title', width: 'auto' },
          { label: '投票开始时间', prop: 'beginDate', width: 'auto' },
          { label: '投票结束时间', prop: 'endDate', width: 'auto' },
          { label: '活动状态', prop: 'status', width: 'auto' },
          { label: '投票结果', prop: 'voteResult', width: 'auto' },
        ],
        url: 'voteList',
        table_data: [],
        search_item: [],
        data: {
          pageNum: 1,
          size: 10,
        },
      },
      // tab默认绑定
      activeName: 0,
      // 投票数量
      count: null
    }
  },
  mounted () {
    this.getTipsData()
  },
  methods: {
    // 即将开始投票活动
    getTipsData () {
      voteCountVoteExpectedStart().then(result => {
        // 投票数量
        this.count = result.count
      })
    },
    // 添加修改成功
    submitSuccess () {
      this.$refs.table.loadData()
      this.getTipsData()
    },
    // 添加
    addvoting () {
      this.addEidt_vrisible = true;
    },
    // 添加修改关闭
    addEidtHandleClose () {
      this.addEidt_vrisible = false;
    },
    // 表格选中
    tableCheck (arr) {
      this.table_row = arr
    },
    voteDetails (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.detailId = this.table_row[0].id
      this.details_vrisible = true
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
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false;
      this.details_vrisible = false;
      this.details_details = false;
    },
    // 详情抽屉 详情
    details_obj (data) {
      this.details_vrisible = false;
      this.details_details = true;
      this.detailsDetailsId = data.id;
      this.detailsDetailsData = data
      console.log(data)
    },
    //  详情抽屉 详情 返回
    goBack () {
      this.details_vrisible = true;
      this.details_details = false;
    },
    // 编辑
    edit (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.$refs.addEdit.edit(data[0].id)
      this.addEidt_vrisible = true;
    },
    // 发布
    release (data) {
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.table_row.length; i++) {
          arr.push(this.table_row[i].id)
        }
        this.$confirm('是否确认发布', '批量发布', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
          let resData = {
            ids: arr
          }
          voteRelease(resData).then(result => {
            if (result.status) {
              this.$message({
                message: result.message,
                type: 'success'
              })
              this.$refs.table.loadData()
            }
          })
        }).catch(action => { });
      } else {
        this.$message.error('请选中需要发布的数据');
      }

    },
  },
}
</script>
