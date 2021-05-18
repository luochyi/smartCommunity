<template>
  <div class="over-bg">

    <div class="overContent">
      <div class="over-box">
        <div class="block">
          <el-cascader v-model="value"
                       size="small"
                       style="width:100%"
                       :show-all-levels="false"
                       filterable
                       :options="ulList"
                       @change="handleChange"></el-cascader>
        </div>
      </div>
      <div class="ul-box">
        <div class="ul-list"
             v-for="item in ulList"
             :key="item.value">
          <p class="ul-title"
             @click="fn()">{{item.label}}</p>
          <ul>
            <li v-for="obj in item.children"
                :key="obj.value">
              <router-link :to="obj.value">{{obj.label}} </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: [],
      ulList: [
        {
          label: '管家服务',
          value: 'butler',
          children: [
            {
              // Items out
              value: '/butler/itemsOut',
              label: '物品出门',
            },
            // {
            //   // Decoration management
            //   value: '/butler/decorationManagement',
            //   label: '装修管理',
            // },
            {
              // Voting management
              value: '/butler/votingManagement',
              label: '投票管理',
            },
            {
              // Convenience phone
              value: '/butler/conveniencePhone',
              label: '便民电话',
            },
            {
              // Suggest Consultation
              value: '/butler/suggestConsultation',
              label: '建议咨询',
            },
            {
              // Visitor management
              value: '/butler/visitorManagement',
              label: '访客管理',
            },
            {
              // Complaint and praise
              value: '/butler/complainPraise',
              label: '投诉表扬',
            },
            {
              // Report for repair
              value: '/butler/reportRepair',
              label: '报事报修',
            },
            {
              // Questionnaire
              value: '/butler/Questionnaire',
              label: '问卷调查',
            },
            {
              value: '/butler/topiManagement',
              label: '话题管理'
            },
            {
              value: '/butler/subjectManagement',
              label: '主题明细管理'
            }
            ,
            // {
            //   value: '/butler/orderManagement',
            //   label: '派工单管理'
            // },
            // {
            //   value: '/butler/managementSet',
            //   label: '工单设置'
            // },
            {
              value: '/butler/loanManagement',
              label: '借还管理'
            },
            {
              // Item management
              value: '/butler/itemManagemsent',
              label: '物品管理'
            }
            ,
            // {
            //   // /Voice Butler
            //   value: '/butler/voiceButler',
            //   label: '语音管家',
            // },
          ]
        },
        {
          label: '运营管理',
          children: [
            {
              // Announcement management
              value: '/operation/announcementManagement',
              label: '公告管理'
            },
            // {
            //   // Notification management
            //   value: '/operation/notificationManagement',
            //   label: '通知管理'
            // },
            {
              // Announcement management
              value: '/operation/eventManagement',
              label: '活动管理'
            },
            {
              // Notification management
              value: '/operation/sponsorManagement',
              label: '主办方管理'
            },
            {
              // Voting management
              label: '投票管理',
              value: '/operation/votingManagement',
            },
            {
              value: '/operation/consultationRelease',
              label: '资讯发布'
            },
            {
              value: '/operation/consultationItem',
              label: '资讯分类'
            },
            {
              value: '/operation/shoppingInfo',
              label: '电商信息'
            },
            {
              value: '/operation/shoppingItem',
              label: '电商分类'
            },
          ],
        }
        ,
        {
          label: '商品管理',
          value: 'commodity',
          children: [
            {
              //
              value: '/commodity/home',
              label: '首页',
            },
            {
              // Commodity creation
              value: '/commodity/commodityCreation',
              label: '商品创建'
            },
            {
              // Commodity creation
              value: '/commodity/commodityManagement',
              label: '商品管理'
            },
            {
              // Category managemen
              value: '/commodity/categoryManagemen',
              label: '类目管理'
            },
            {
              // Supplier Management
              value: '/commodity/supplierManagement',
              label: '供应商管理'
            },
            {
              // Order management
              value: '/commodity/orderManagement',
              label: '订单管理'
            },
            {
              // tuihuan
              value: '/commodity/unshippedRefund',
              label: '退换申请'
            },
          ],
        }
      ],
    }
  },
  methods: {


    handleChange (value) {
      console.log(value);
      this.$router.push(value[1])
    }
  },

}

</script>

<style scoped lang="scss">
.over-bg {
    width: calc(100% - 40px);
    padding: 20px;
    background: #e8ebf2;
}
.overContent {
    background: white;
    height: calc(100vh - 100px);
    overflow: auto;
}
.over-box {
    padding: 65px 269px 20px 165px;
}
.over-box > .el-input {
    max-width: 840px;
    margin-bottom: 10px;
}
.ul-title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 25px;
    margin-bottom: 22px;
}
.ul-box {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.ul-list {
    width: 100%;
    padding: 20px 80px;
}
ul {
    li {
        cursor: pointer;
        font-size: 20px;
        display: inline-block;
        width: 150px;
        line-height: 40px;
        a {
            text-decoration: none;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
        }
    }
}
</style>
