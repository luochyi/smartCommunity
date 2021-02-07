<template>
  <div class="over-bg">
    <div class="overContent">
      <div class="over-box">
        <el-autocomplete class="inline-input"
                         v-model="state1"
                         :fetch-suggestions="querySearch"
                         placeholder="请输入内容"
                         @select="handleSelect"></el-autocomplete>
      </div>
      <!-- <div class="ul-box">
        <div class="ul-list"
             v-for="item in ulList"
             :key="item.name">
          <p class="ul-title"
             @click="fn()">{{item.name}}</p>
          <ul>
            <li v-for="obj in item.children"
                :key="obj.path">
              <router-link :to="obj.path">{{obj.label}} </router-link>
            </li>
          </ul>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      restaurants: [],
      newobj: [],
      state1: '',
      state2: '',
      ulList: [
        {
         value:  "基础档案",
          children: [
            {
              address: '/basic/buildingManagement',
             value:  '楼栋管理'
            },
            {
              address: '/basic/unitInfo',
             value:  '单元信息'
            },
            {
              address: '/basic/houseManagement',
             value:  '房屋管理'
            },
            {
              address: '/basic/parkingInfo',
             value:  '车位信息',
            },
            {
              address: '/basic/vehicleFile',
             value:  '车辆档案',
            },
            {
              address: '/basic/ownersFile',
             value:  '业主档案',
            },
            {
              address: '/basic/tenantFile',
             value:  '租户档案',
            }
          ],
        },
        {
         value:  '管家服务',
          children: [
            {
              // Items out
              address: '/butler/itemsOut',
             value:  '物品出门',
            },
            {
              // Decoration management
              address: '/butler/decorationManagement',
             value:  '装修管理',
            },
            {
              // Voting management
              address: '/butler/votingManagement',
             value:  '投票管理',
            },
            {
              // Convenience phone
              address: '/butler/conveniencePhone',
             value:  '便民电话',
            },
            {
              // Suggest Consultation
              address: '/butler/suggestConsultation',
             value:  '建议咨询',
            },
            {
              // Visitor management
              address: '/butler/visitorManagement',
             value:  '访客管理',
            },
            {
              // Complaint and praise
              address: '/butler/complainPraise',
             value:  '投诉表扬',
            },
            {
              // Report for repair
              address: '/butler/reportRepair',
             value:  '报事报修',
            },
            {
              // Questionnaire
              address: '/butler/Questionnaire',
             value:  '问卷调查',
            },
            {
              address: '/butler/topiManagement',
             value:  '话题管理'
            },
            {
              address: '/butler/subjectManagement',
             value:  '主题明细管理'
            }
            ,
            {
              address: '/butler/orderManagement',
             value:  '派工单管理'
            },
            {
              address: '/butler/managementSet',
             value:  '工单设置'
            },
            {
              address: '/butler/loanManagement',
             value:  '借还管理'
            },
            {
              // Item management
              address: '/butler/itemManagemsent',
             value:  '物品管理'
            }
            ,
            {
              // Business meeting management
              address: '/butler/businessManagement',
             value:  '业委会管理',
            },
            {
              // /Voice Butler
              address: '/butler/voiceButler',
             value:  '语音管家',
            },
          ]
        },
        {
         value:  '收费管理',
          children: [
            {
              // Charge standard
              address: '/charge/chargeStandard',
             value:  '收费标准管理',
            },
            {
              //Daily payment
              address: '/charge/dailyMayment',
             value:  '日常缴费',
            },
            {
              // Deposit management
              address: '/charge/depositManagement',
             value:  '押金管理',
            },
            {
              // Work order management
              address: '/charge/orderManagement',
             value:  '工单管理',
            },
            {
              //expenseBil
              address: '/charge/expenseBil',
             value:  '费用账单'
            }
          ],
        },
        {
         value:  '运营管理',
          children: [
            {
              // Announcement management
              address: '/operation/announcementManagement',
             value:  '公告管理'
            },
            {
              // Notification management
              address: '/operation/notificationManagement',
             value:  '通知管理'
            },
            {
              // Announcement management
              address: '/operation/eventManagement',
             value:  '活动管理'
            },
            {
              // Notification management
              address: '/operation/sponsorManagement',
             value:  '主办方管理'
            },
            {
              // Voting management
              address: '/operation/votingManagement',
              iconurl: require('@/assets/images/operation/icon_operate03_nor.png'),
              iconisactive: require('@/assets/images/operation/icon_operate03_sel.png'),
             value:  '投票管理',
              isChildren: 0
            }
          ],
        }
        ,
        {
         value:  '商品管理',
          children: [
            {
              //
              address: '/commodity/home',
             value:  '首页',
            },
            {
              // Commodity creation
              address: '/commodity/commodityCreation',
             value:  '商品创建'
            },
            {
              // Commodity creation
              address: '/commodity/commodityManagement',
             value:  '商品管理'
            },
            {
              // Category managemen
              address: '/commodity/categoryManagemen',
             value:  '类目管理'
            },
            {
              // Supplier Management
              address: '/commodity/supplierManagement',
             value:  '供应商管理'
            },
            {
              // Brand qualification
              address: '/commodity/brandQualification',
             value:  '品牌资质'
            },
            {
              // Order management
              address: '/commodity/orderManagement',
             value:  '订单管理'
            },
            {
              // Bulk shipping
              address: '/commodity/bulkShipping',
             value:  '批量发货'
            },
            {
              //Evaluation Management
              address: '/commodity/evaluationManagement',
             value:  '评价管理'
            },
            {
              // Violation handling
              address: '/commodity/violationHandling',
             value:  '违规处理'
            },
            {
              // Pre-sale and buy warning
              address: '/commodity/buyWarning',
             value:  '预售买预警'
            },
            {
              //Unshipped refund
              address: '/commodity/unshippedRefund',
             value:  '未发货退款'
            },
            {
              // Shipped after sale
              address: '/commodity/Shipped',
             value:  '已发货售后'
            },
            {
              // Customer phone settings
              address: '/commodity/phoneSet',
             value:  '客户电话设置'
            },
            {
              //Request for service
              address: '/commodity/requestService',
             value:  '服务请求'
            },
            {
              //Fast refund assistant
              address: '/commodity/refundAssistant',
             value:  '极速退款助手'
            },
            {
              // Group purchase merchandise management
              address: '/commodity/groupMerchandise',
             value:  '团购商品管理'
            },
            {
              // Group management
              address: '/commodity/groupManagement',
             value:  '拼团管理'
            },
            {
              // Freight template
              address: '/commodity/freightTemplate',
             value:  '运费模版'
            },
            {
              //Address library management
              address: '/commodity/addressManagement',
             value:  '地址库管理'
            },
            {
              // Commodity analysis
              address: '/commodity/commodityAnalysis',
             value:  '商品分析'
            },
            {
              //Account center
              address: '/commodity/accountCenter',
             value:  '账户中心'
            },
            {
              // Pay bills online
              address: '/commodity/payBills',
             value:  '在线支付账单'
            },
            {
              //Order flow details
              address: '/commodity/orderDetails',
             value:  '订单流水明细'
            },
            {
              //Supplier settlement list
              address: '/commodity/settlementList',
             value:  '供应商结算列表'
            },
            {
              //Supplier bill
              address: '/commodity/supplierBills',
             value:  '供应商账单'

            }
          ],
        }
      ],
    }
  },
  methods: {
    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect (item) {
      console.log(item);
    },
    handleIconClick (ev) {
      console.log(ev);
    },
    loadAll () {
      let obj = [];
      obj = this.ulList
      for (let i = 0; i < obj.length; i++) {
        for (let j = 0; j < obj[i].children.length; j++) {
          // console.log(obj[i].children[j].label)
          this.newobj.push(obj[i].children[j])
        }
      }
      return this.newobj;
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
    console.log(this.restaurants)

  }
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
        font-size: 14px;
        display: inline-block;
        width: 150px;
        line-height: 30px;
        a {
            text-decoration: none;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
        }
    }
}
</style>
