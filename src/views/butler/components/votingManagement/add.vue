<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="childFroms"
                 :formObj='votingFrom'>

          <template slot='fileUrls'>
            <template>
              <el-upload action="http://test.akuhotel.com:8804/IntelligentCommunity/manage/upload/uploadVoteTitle"
                         :on-success="voteImgeSuccess"
                         :show-file-list="false"
                         :before-upload="beforeAvatarUpload">
                <div class='sys-image'
                     style='width:104px; height:104px'>
                  <div v-if="!fileUrls">
                    <i class="el-icon-plus"></i>
                    <p>上传照片</p>
                  </div>
                  <el-image v-else
                            :src="`http://test.akuhotel.com:8804/static/temp/${fileUrls}`"
                            style="width: 104px; height: 104px"></el-image>
                </div>
              </el-upload>
            </template>
          </template>
          <template slot='sysVoteCandidateList'>
            <el-checkbox v-model="imageShow"
                         label="图片"></el-checkbox>
            <el-checkbox v-model="telShow"
                         label="电话"></el-checkbox>
            <el-checkbox v-model="nameShow"
                         label="名称"></el-checkbox>
            <div class="sysVote-box">
              <div class="sys-box"
                   v-for="(item,index) in VotingUserList"
                   :key="index">
                <div class="sys-title">
                  <span>选项{{index + 1}}</span>
                  <span v-if='VotingUserList.length === index + 1'
                        style="color: #FB4702;"
                        @click="addVotingUser">添加选项</span>
                  <span v-else
                        style="color: #FB4702;"
                        @click='delVotingUser(item)'>删除</span>
                </div>
                <div class="sys-item">
                  <template v-if="imageShow">
                    <template>
                      <el-upload action="http://test.akuhotel.com:8804/IntelligentCommunity/manage/upload/uploadVoteTitle"
                                 :on-success="(res, file) => handleAvatarSuccess(index, res, file)"
                                 :show-file-list="false"
                                 :before-upload="beforeAvatarUpload">
                        <div class='sys-image'>
                          <div v-if="!item.fileUrls[0]">
                            <i class="el-icon-plus"></i>
                            <p>上传照片</p>
                          </div>
                          <el-image v-else
                                    :src="`http://test.akuhotel.com:8804/static/temp/${item.fileUrls[0]}`"
                                    style="width: 80px; height: 80px"></el-image>
                        </div>
                      </el-upload>
                    </template>
                  </template>
                  <div class='sys-input'>
                    <el-input v-model="item.name"
                              v-if="nameShow"
                              placeholder="名称"></el-input>
                    <el-input v-model="item.tel"
                              v-if="telShow"
                              placeholder="电话"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </VueForm>
      </FromCard>
      <div slot="footer">
        <button class="btn-orange"
                @click="onSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="drawerClose"><span>取消</span></button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { voteInsert } from '@/api/butler'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: () => false
    },
    drawerTitle: {
      type: String,
      default: () => ""
    }
  },
  data () {
    return {
      drawer_vrisible: false,
      bool: false,
      // 投票上传图片路径
      fileUrls: '',
      votingFrom: {
        ruleForm: {
          title: null,
          beginDate: null,
          endDate: null,
          type: null,
          content: null,
          fileUrls: [],
          sysVoteCandidateList: [],
        },
        form_item: [
          {
            type: 'Input',
            label: '投票标题',
            placeholder: '请输入',
            width: '50%',
            prop: 'title'
          },
          {
            type: 'DateTime',
            label: '投票起始时间',
            placeholder: '请输入',
            width: '50%',
            prop: 'beginDate'
          },
          {
            type: 'DateTime',
            label: '投票结束时间',
            placeholder: '请输入',
            width: '50%',
            prop: 'endDate'
          }, {
            type: 'Select',
            label: '公开人群',
            placeholder: '请输入',
            options: [
              { value: 1, label: '业主' },
              { value: 2, label: '租户' },
              { value: 3, label: '全部' },
            ],
            width: '50%',
            prop: 'type'
          }, {
            type: 'textarea',
            label: '投票内容',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'content'
          },
          {
            type: 'Slot',
            label: '图片上传',
            placeholder: '请输入',
            width: '100%',
            prop: 'fileUrls',
            slotName: 'fileUrls'
          }, {
            type: 'Slot',
            label: '投票选项',
            placeholder: '请输入',
            width: '100%',
            prop: 'sysVoteCandidateList',
            slotName: 'sysVoteCandidateList'
          },
        ],
        rules: { title: [{ required: true, message: '请填写投票标题', trigger: 'blur' }] }
      },
      VotingUserList: [
        {
          fileUrls: [''],
          name: '',
          tel: '',
        }
      ],
      // checkboox 控制显示 默认全显示
      imageShow: true,
      nameShow: true,
      telShow: true,
      importHeaders: {
        'X-Admin-Token': sessionStorage.getItem(
          'X-Admin-Token'
        )
      },
      fileList: [
      ],
      imageUrl: null
    }
  },
  methods: {
    // 提交
    onSubmit () {
      this.votingFrom.ruleForm.sysVoteCandidateList = this.VotingUserList
      this.votingFrom.ruleForm.fileUrls[0] = this.fileUrls
      console.log(this.votingFrom.ruleForm)
      // return
      // let resData = {
      //   title: null,
      //   fileUrls: null,
      //   content: null,
      //   beginDate: null,
      //   endDate: null,
      //   type: null,
      //   sysVoteCandidateList: null,
      //   isRelease: null,
      // }
      voteInsert(this.votingFrom.ruleForm).then(res => {
        console.log(res)
      })
    },
    // 添加候选人
    addVotingUser () {
      this.VotingUserList.push({
        fileUrls: [''],
        name: '',
        tel: '',
      })
    },
    // 删除候选人
    delVotingUser (item) {
      let index = this.VotingUserList.indexOf(item)
      if (index !== -1) {
        this.VotingUserList.splice(index, 1)
      }
    },
    // 候选人文件上传之前
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG = file.type === 'image/png'
      const isPNG = file.type === 'image/jpeg'
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    // 候选人文件上传成功
    handleAvatarSuccess (index, res, file) {
      console.log('handleAvatarSuccess')
      // this.VotingUserList[index].fileUrls[0] = res.url
      this.VotingUserList[index].fileUrls.splice(0, 1, res.url)
      // this.VotingUserList[index].fileUrls.unshift(res.url)
      console.log(this.VotingUserList)

    },
    voteImgeSuccess (res, file) {
      this.fileUrls = res.url
      console.log(res)
    },
    drawerClose () {
      this.drawer_vrisible = false;
      this.$refs.childFroms.reset()
      this.$emit('handleClose', 'Close')
    },
    ruleSubmit (val) {
      this.bool = val;
    },

  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.drawer_vrisible = newValue
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.sysVote-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .sys-box {
        width: 340px;
        height: 130px;
        margin-right: 50px;
        margin-bottom: 30px;
        background: #f9f9f9;
        border-radius: 4px;
        padding: 12px;
        .sys-title {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            margin-bottom: 12px;
            span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
            }
        }
        .sys-item {
            display: flex;
            align-content: space-between;
            height: 80px;
            .sys-input {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
            }
        }
    }
}
.sys-image {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-right: 12px;
}
</style>

