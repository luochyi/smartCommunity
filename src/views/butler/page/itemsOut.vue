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
      <span>物品出门</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日预计有
        <span style="color:rgba(251, 71, 2, 1)">{{countNow}}</span>
        户家庭发起装修，共计{{countPerformed}}户家庭未执行
      </p>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="待出门"
                           name="1"></el-tab-pane>
              <el-tab-pane label="已出门"
                           name="2"></el-tab-pane>
              <el-tab-pane label="驳回申请"
                           name="3"></el-tab-pane>
            </el-tabs>
          </template>
          <template v-slot:goodsImgUrls="slotData">
            <div v-if="slotData.data.goodsImgUrls.length">
              <el-button class="init-text"
                         type="text"
                         @click="getPhotoView(slotData.data.goodsImgUrls)">
                <span>查看</span>
              </el-button>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template slot="footer">
            <div class="table-footer">
              <!-- <button>编辑</button> -->
              <button @click="del(table_row)">删除</button>
              <!-- <button>详情</button>
              <button>驳回申请</button> -->
            </div>
          </template>
        </VueTable>
      </div>
    </div>
    <views-photo :isVisible="photos_Visible"
                 @closeViews="getclose"></views-photo>
  </div>
</template>
<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'
import { userArticleOutCountArticleOutNow, userArticleOutCountPerformed, userArticleOuFindGoOutImgById, userArticleOutFindGoodsImgById } from '@/api/butler'
export default {
  data () {
    return {
      photos_Visible: false,
      goodsImgsList: [],
      // 选中表格数据
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '房屋状态', prop: 'estateStatus', width: '180' },
          { label: '业主', prop: 'residentName', width: '180' },
          { label: '联系方式', prop: 'residentTel', width: '180' },
          { label: '物品名称', prop: 'name', width: '180' },
          {
            label: '物品照片',
            prop: 'goodsImgUrls',
            width: '180',
            type: 'slot',
            slotName: 'goodsImgUrls',
          },
          { label: '申请人', prop: 'applicantName', width: '180' },
          { label: '联系方式', prop: 'applicantTel', width: '180' },
          { label: '搬运方式', prop: 'approach', width: '180' },
          {
            label: '预计出门时间',
            prop: 'expectedTime',
            width: '180',
          },
          {
            label: '实际出门时间',
            prop: 'actualTime',
            width: '180'
          },
          { label: '出户出门', prop: 'export', width: '180' },
          // {
          //   label: '出门照片',
          //   prop: 'table14',
          //   width: '180',
          //   type: 'imagebtn',
          // },
          {
            label: '状态',
            prop: 'status',
            width: '180'
          },
          { label: '备注', prop: 'remarks', width: '180' },
        ],
        url: 'itemsOutList',
        table_data: [],
        search_item: [
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '单元/楼栋/房号',
            prop: 'roomName',
          },
          {
            type: 'select',
            label: '出户出口',
            placeholder: '请选择',
            prop: 'export',
            options: [
              {
                value: '1',
                label: '东门',
              },
              {
                value: '2',
                label: '南门',
              },
              {
                value: '3',
                label: '西门',
              },
              {
                value: '4',
                label: '北门',
              },
            ],
          },
          {
            type: 'Input',
            label: '申请人',
            placeholder: '请输入',
            prop: 'applicantName',
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'applicantTel',
          },
          {
            type: 'startDate',
            label: '实际出门时间',
            placeholder: '请选择开始日期',
            prop: 'actualTimeStart',
          },
          {
            type: 'endDate',
            label: '实际结束时间',
            placeholder: '请选择结束时间',
            prop: 'actualTimeEnd',
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      // tab默认绑定
      activeName: 0,
      // 今日发起装修数量
      countNow: null,
      // 未发起装修数量
      countPerformed: null,
    }
  },
  components: {
    viewsPhoto
  },
  mounted () {
    this.getTipsData()
  },
  methods: {
    getPhotoView (item) {
      this.photos_Visible = true
      // let resData = {
      //   id: id,
      // }
      // userArticleOutFindGoodsImgById(resData).then(result => {
      //   console.log(result)
      this.goodsImgsList = item
      // })
    },
    getclose () {
      this.photos_Visible = false
    },
    handleClick (tab, event) {
      let status = null
      if (this.activeName != 0) {
        status = this.activeName
      } else {
        status = null
      }
      const requestData = {
        pageNum: 1,
        size: 10,
        status: status
      }
      this.$refs.table.requestData(requestData);
    },
    tableCheck (arr) {
      this.table_row = arr
    },
    // 发起装修数量
    getTipsData () {
      // 今日发起装修
      userArticleOutCountArticleOutNow().then(result => {
        this.countNow = result.countNow
      })
      // 共计未装修
      userArticleOutCountPerformed().then(result => {
        this.countPerformed = result.countPerformed
      })
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

  },
}
</script>
