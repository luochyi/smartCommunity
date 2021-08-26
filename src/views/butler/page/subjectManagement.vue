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
      <span>动态管理</span>
    </div>
    <div class="content">
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click="detail(table_row)">详情</button>
              <button @click="recovery(table_row)">恢复</button>
              <button @click="del(table_row)">删除</button>
              <button @click="opensubmit(table_row)">开启/停止用户动态发布功能</button>
              <button @click="opencomment(table_row)">开启/停止用户评论功能</button>
              <!-- 开启/停止用户动态发布功能 -->
              <!-- 开启/停止用户评论功能 -->
            </div>
          </template>
        </VueTable>
      </div>
      <Drawer :drawerVrisible='drawer_details' @drawerClose='getClose' drawerTitle="动态详情">
          <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">详情信息</template>
                            <div style="fontSize:16px;lineheight:20px">
                              <el-row style="marginTop:10px">
                                <el-col :span="5" style="color:#999999;">发布人</el-col>
                                <el-col :span="19">{{detailList.gambitName}}</el-col>
                              </el-row>
                              <el-row style="marginTop:10px">
                                <el-col :span="5" style="color:#999999">动态内容</el-col>
                                <el-col :span="19">{{detailList.gambitContent}}</el-col>
                              </el-row>
                              <el-row style="marginTop:10px">
                                <el-col :span="5" style="color:#999999">附带图片</el-col>
                                <el-col :span="19">{{detailList.gambitName}}</el-col>
                              </el-row>
                              <el-row style="marginTop:10px">
                                <el-col :span="5" style="color:#999999">显示状态</el-col>
                                <el-col :span="19">{{detailList.isDelete=1?'正常':'已删除'}}</el-col>
                              </el-row>
                              <el-row style="marginTop:10px">
                                <el-col :span="5" style="color:#999999">点赞人数</el-col>
                                <el-col :span="7">{{detailList.likeNum}}</el-col>
                                <el-col :span="5" style="color:#999999">评论人数</el-col>
                                <el-col :span="7">{{detailList.commentNum}}</el-col>
                              </el-row>
                              <el-row style="marginTop:10px">
                                <el-col :span="5" style="color:#999999">关联话题</el-col>
                                <el-col :span="19">{{detailList.summary}}</el-col>
                              </el-row>
                            </div>
                        </FromCard>
                        <FromCard style="marginTop:20px">
                          <template slot="title">评论列表</template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-gray" @click="getClose">
                            <span>取消</span>
                        </button>
                    </div>
      </Drawer>
    </div>

  </div>
</template>
<script>
import { gambitThemeRecovery,gambitThemeEnableComment, gambitThemeEnableTheme,gambitThemeList} from '@/api/butler'
export default {
  data () {
    return {
      drawer_details: false,
      detailList:{
        gambitName:null,
        gambitContent:null,
        img:[],
        isDelete:null,
        likeNum:null,
        commentNum:null,
        summary:null,
        themeContent:null,
        themeCreateDate:null,
        themeName:null
      },
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '动态内容', prop: 'gambitContent', width: '780' },
        //  { label: '照片', prop: 'gambitContent', width: '780' },
          // { label: '发布人昵称', prop: 'gambitNickName', width: '180' },
          { label: '发布人姓名', prop: 'gambitName', width: '180' },
          { label: '显示状态', prop: 'isDelete', width: 'auto' ,
          type:"function",
          callback:(row,prop)=>{
            switch(row.isDelete){
              case 1:
                return '正常'
                break
              case 0:
                return '已删除'
                break
            }
          }},
           { label: '话题标题', prop: 'title', width: '380' },
           { label: '话题摘要', prop: 'summary', width: '180' },
           { label: '点赞人数', prop: 'likeNum', width: '180', sortable: true },
          { label: '评论人数', prop: 'commentNum', width: '180', sortable: true },
            { label: '发布时间', prop: 'gambitCreateDate', width: '180', sortable: true },
          
          
        ],
        url: 'gambitThemeList',
        table_data: [],
        search_item: [
          {
            type: 'startDate',
            label: '发布开始时间',
            placeholder: '请选择开始日期',
            prop: 'beginDate'
          },
          {
            type: 'startDate',
            label: '发布结束时间',
            placeholder: '请选择结束日期',
            prop: 'endDate'
          },
          {
            type: 'Input',
            label: '话题标题',
            placeholder: '请输入',
            prop: 'title'
          },

          {
            type: 'Input',
            label: '发布人姓名',
            placeholder: '请输入',
            prop: 'gambitName'
          },
          {
            type: 'Input',
            label: '发布人昵称',
            placeholder: '请输入',
            prop: 'nickName'
          }, {
            type: 'select',
            label: '状态',
            value: null,
            options: [
              { value: 0, label: '删除' },
              { value: 1, label: '正常' }
            ],
            placeholder: '请输入',
            prop: 'isDelete'
          },
          // {
          //   type: 'Input',
          //   label: '话题摘要',
          //   placeholder: '请输入',
          //   prop: 'summary',
          //   width: '50%',
          //   inputWidth: '658px'
          // },
          // {
          //   type: 'Input',
          //   label: '发布内容',
          //   placeholder: '请输入',
          //   prop: 'gambitContent',
          //   width: '50%',
          //   inputWidth: '658px'
          // },
          // {
          //   type: 'Input',
          //   label: '评论内容',
          //   placeholder: '请输入',
          //   width: '50%',
          //   prop: 'content',
          //   inputWidth: '658px'
          // }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
    }
  },
  methods: {
    tableCheck (arr) {
      this.table_row = arr

    },
    detail(data){
      if(data.length!=1){
        this.$message({message:'请选择一条数据查看'})
        return
      }
      this.drawer_details = true
      gambitThemeList().then(res=>{
        res.tableList&&res.tableList.forEach(ele => {
          if (data[0].id == ele.id) {
            console.log(ele);
            this.detailList.gambitName = ele.gambitName
            this.detailList.gambitContent = ele.gambitContent
            this.detailList.isDelete = ele.isDelete
            this.detailList.likeNum = ele.likeNum
            this.detailList.commentNum = ele.commentNum
            this.detailList.summary = ele.summary
            this.detailList.themeContent = ele.themeContent
             this.detailList.themeCreateDate = ele.themeCreateDate
             this.detailList.themeName = ele.themeName
            // this.detailList.img = ele.length
          }
        });
      })
      
    },
    opensubmit(){
      gambitThemeEnableTheme().then(res=>{
        if (res.status) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.$refs.table.loadData()
            }
      })
    },
    opencomment(){
      gambitThemeEnableComment().then(res=>{
        if (res.status) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.$refs.table.loadData()
            }
      })
    },
    getClose(data) {
            this.drawer_details = false
        },
    // 恢复
    recovery (data) {
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.table_row.length; i++) {
          arr.push(this.table_row[i].id)
        }
        let resData = {
          ids: arr
        }
        this.$confirm('是否批量恢复主题明细？', '恢复', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
          gambitThemeRecovery(resData).then((res) => {
            if (res.status) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.$refs.table.loadData()
            }
          })
        }).catch(action => { });
      } else {
        this.$message.error('请选择');
      }
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
