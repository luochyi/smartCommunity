<template>
  <div class="main-content">
    <div class="main-titel">
      <span>公告管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addAnnouncement = true"
                   icon="el-icon-plus">新增公告</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click="dialogPreview = true">预览</button>
              <button>修改</button>
              <button>打印</button>
              <button @click="release(table_row)">发布</button>
              <button @click='del(table_row)'>删除</button>
            </div>
          </template>
        </VueTable>
        <!-- 提示弹窗-->
        <Dialog :dialogVisible='dialog_visible'
                :dialog_config='dialog_config'
                @cancel='cancel'
                @confirm='confirm'>
        </Dialog>
        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="addAnnouncement"
                   size="56.26%"
                   :with-header="false">
          <add-announcement @submit="getFormSon"></add-announcement>
        </el-drawer>
        <!-- 预览 -->
        <el-dialog class="dialogPreview"
                   title="预览"
                   :visible.sync="dialogPreview"
                   width="100%%"
                   height="100%"
                   top="0"
                   Dialog>
          <div class="preview-header">
            <div class="esc-preview"
                 @click="dialogPreview = false">
              <i class="el-icon-s-marketing"
                 style="font-size:24px;margin-left:33px;margin-right:9px"></i>
              <span>退出预览</span>
            </div>
          </div>
          <div class="preview-body">
            <div class="body-content">
              <div class="preview-img">
                <div class="preview-content">
                  <div class="preview-title">
                    <span>新政！宁波市“无房家庭”可优先购买一套商品房</span>
                  </div>
                  <div class="preview-content-img"></div>
                  <div class="preview-content-text">
                    <p>
                      今天，宁波市住房和城乡建设局、宁波市自然资源和规
                      划局联合发布《关于进一步完善商品住房销售行为切实保障居民自住需求的通知》（以下简称《通知》）。
                      该《通知》意在保障居民自住需求，抑制投机投资行为，
                      《通知》明确符合条件的“无房家庭”可在市六区优先认购1套商品
                      住房，该套房要求在取得不动产权属证书满5年后方可转让，该新政从发布之日起实施。
                    </p>
                  </div>
                  <div class="preview-content-footer">
                    <span>宁波永成物业 发布于 2020-08-12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import addAnnouncement from '@/views/operation/components/announcementManagement/addAnnouncement'
import previewImg from '@/assets/images/dialogPreviewbg.png'
// /Users/apple/Desktop/smartCommunity/basic-admin/src/assets/images/dialogPreviewbg.png
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      // 添加
      previewImg: previewImg,
      addAnnouncement: false,
      dialogPreview: false,
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '公告标题', prop: 'title', width: 'auto' },
          { label: '推送对象', prop: 'pushObject', width: 'auto' },
          { label: '阅读量', prop: 'readingVolume', width: 'auto' },
          { label: '状态', prop: 'status', width: 'auto' },
          { label: '创建人', prop: 'createName', width: 'auto' },
          { label: '更新时间', prop: 'updateDate', width: 'auto' },
        ],
        table_data: [],
        url: 'announcementManagementList',
        search_item: [
          {
            type: 'Input',
            label: '公告标题',
            placeholder: '请输入内容',
            prop: 'title'
          },
          {
            type: 'select',
            label: '公告状态',
            value: '',
            options: [
              { label: '未发布', value: '1' },
              { label: '已发布', value: '2' },
            ],
            placeholder: '请选择',
            prop: 'status'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      }
    }
  },
  components: {
    addAnnouncement
  },
  computed: {},
  methods: {
    tableCheck (data) {
      this.table_row = data;
    },
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
    getFormSon (a) {
      console.log('我是副组件')
      console.log(a)
      this.addAnnouncement = false
    }
  }
}
</script>
<style scoped>
.preview-header {
    width: 100%;
    height: 62px;
    display: flex;
    align-items: center;
    /* background: #e6e7e9; */
}
.esc-preview {
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
}
.body-content {
    width: 100%;
    height: calc(100vh - 62px);
    display: flex;
    align-items: center;
    justify-content: center;
}
/* previewImg */
.preview-img {
    width: 344px;
    height: 689px;
    background-image: url(../../../assets/images/dialogPreviewbg.png);
    background-size: 100% 100%;
}
.preview-titel {
    font-size: 20px;
}
.preview-content {
    margin: 120px 30px 90px 30px;
    height: calc(100% - 210px);
    overflow-y: auto;
}
.preview-title {
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: 12px;
    font-weight: 600;
    color: #000000;
    line-height: 17px;
}
.preview-content-img {
    width: 276px;
    height: 94px;
    margin: 22px auto;
    background: gray;
}
.preview-content-text {
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    line-height: 23px;
    transform: scale(0.91);
}
.preview-content-footer {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    margin-left: -20px;
    transform: scale(0.75);
}
</style>
