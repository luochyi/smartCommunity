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
import { Login } from '@/api/basic'

export default {
  data () {
    return {
      value: [],
      ulList: [
        {
          label: "基础档案",
          value: 'basic',
          children: [
            {
              value: '/basic/buildingManagement',
              label: '楼栋管理'
            },
            {
              value: '/basic/unitInfo',
              label: '单元信息'
            },
            {
              value: '/basic/houseManagement',
              label: '房屋管理'
            },
            {
              value: '/basic/parkingInfo',
              label: '车位信息',
            },
            {
              value: '/basic/vehicleFile',
              label: '车辆档案',
            },
            {
              value: '/basic/ownersFile',
              label: '业主档案',
            },
            {
              value: '/basic/tenantFile',
              label: '租户档案',
            }
          ],
        },
        {
          label: '管家服务',
          value: 'butler',
          children: [
            {
              // Items out
              value: '/butler/itemsOut',
              label: '物品出门',
            },
            {
              // Decoration management
              value: '/butler/decorationManagement',
              label: '装修管理',
            },
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
            {
              value: '/butler/orderManagement',
              label: '派工单管理'
            },
            {
              value: '/butler/managementSet',
              label: '工单设置'
            },
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
            {
              // Business meeting management
              value: '/butler/businessManagement',
              label: '业委会管理',
            },
            {
              // /Voice Butler
              value: '/butler/voiceButler',
              label: '语音管家',
            },
          ]
        },
        {
          label: '收费管理',
          value: 'charge',
          children: [
            {
              // Charge standard
              value: '/charge/chargeStandard',
              label: '收费标准管理',
            },
            {
              //Daily payment
              value: '/charge/dailyMayment',
              label: '日常缴费',
            },
            {
              // Deposit management
              value: '/charge/depositManagement',
              label: '押金管理',
            },
            {
              // Work order management
              value: '/charge/orderManagement',
              label: '工单管理',
            },
            {
              //expenseBil
              value: '/charge/expenseBil',
              label: '费用账单'
            }
          ],
        },
        {
          label: '运营管理',
          children: [
            {
              // Announcement management
              value: '/operation/announcementManagement',
              label: '公告管理'
            },
            {
              // Notification management
              value: '/operation/notificationManagement',
              label: '通知管理'
            },
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
              value: '/operation/votingManagement',
            }
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
              // Brand qualification
              value: '/commodity/brandQualification',
              label: '品牌资质'
            },
            {
              // Order management
              value: '/commodity/orderManagement',
              label: '订单管理'
            },
            {
              // Bulk shipping
              value: '/commodity/bulkShipping',
              label: '批量发货'
            },
            {
              //Evaluation Management
              value: '/commodity/evaluationManagement',
              label: '评价管理'
            },
            {
              // Violation handling
              value: '/commodity/violationHandling',
              label: '违规处理'
            },
            {
              // Pre-sale and buy warning
              value: '/commodity/buyWarning',
              label: '预售买预警'
            },
            {
              //Unshipped refund
              value: '/commodity/unshippedRefund',
              label: '未发货退款'
            },
            {
              // Shipped after sale
              value: '/commodity/Shipped',
              label: '已发货售后'
            },
            {
              // Customer phone settings
              value: '/commodity/phoneSet',
              label: '客户电话设置'
            },
            {
              //Request for service
              value: '/commodity/requestService',
              label: '服务请求'
            },
            {
              //Fast refund assistant
              value: '/commodity/refundAssistant',
              label: '极速退款助手'
            },
            {
              // Group purchase merchandise management
              value: '/commodity/groupMerchandise',
              label: '团购商品管理'
            },
            {
              // Group management
              value: '/commodity/groupManagement',
              label: '拼团管理'
            },
            {
              // Freight template
              value: '/commodity/freightTemplate',
              label: '运费模版'
            },
            {
              //Address library management
              value: '/commodity/addressManagement',
              label: '地址库管理'
            },
            {
              // Commodity analysis
              value: '/commodity/commodityAnalysis',
              label: '商品分析'
            },
            {
              //Account center
              value: '/commodity/accountCenter',
              label: '账户中心'
            },
            {
              // Pay bills online
              value: '/commodity/payBills',
              label: '在线支付账单'
            },
            {
              //Order flow details
              value: '/commodity/orderDetails',
              label: '订单流水明细'
            },
            {
              //Supplier settlement list
              value: '/commodity/settlementList',
              label: '供应商结算列表'
            },
            {
              //Supplier bill
              value: '/commodity/supplierBills',
              label: '供应商账单'

            }
          ],
        }
      ],
      json_fields: {
        "序号": "table1",    //常规字段
        "供应商ID": "table2",    //常规字段
        "供应商名称": "table3",    //常规字段
        "联系方式": "table4",    //常规字段
        "创建时间": "table5",    //常规字段
        "审核状态": "table6",    //常规字段
        Telephone: "phone.mobile", //支持嵌套属性
        "文件夹": {
          field: "phone.landline",
          //自定义回调函数
          callback: value => {
            return `Landline Phone - ${value}`;
          }
        }
      },
      json_data: [
        {
          table1: '1',
          table2: '1110',
          table3: '阿里巴巴集团股份有限公司',
          table4: '0574-76998577',
          table5: '查看',
          table6: '2020-08-20 09:00',
          table7: '',
          table8: '待审核',
          table9: '使用中',
        },
        {
          table1: '2',
          table2: '1111',
          table3: '蚂蚁金服集团',
          table4: '0574-76998587',
          table5: '查看 ',
          table6: '2020-08-20 09:00',
          table7: '',
          table8: '审核通过',
          table9: '待使用',
        },
        {
          table1: '3',
          table2: '1112',
          table3: '宁波盛世经贸有限公司',
          table4: '0574-76998577',
          table5: '查看 ',
          table6: '2020-08-20 09:00',
          table7: '',
          table8: '审核通过',
          table9: '待使用',
        },
        {
          table1: '4',
          table2: '1113',
          table3: '宁波电信分公司',
          table4: '0574-76998587',
          table5: '查看 ',
          table6: '2020-08-20 09:00',
          table7: '',
          table8: '待审核',
          table9: '使用中',
        },
        {
          table1: '5',
          table2: '1114',
          table3: '宁波移动公司分公司',
          table4: '0574-76998577',
          table5: '查看 ',
          table6: '2020-08-20 09:00',
          table7: '',
          table8: '待审核',
          table9: '使用中',
        },
        {
          table1: '6',
          table2: '1115',
          table3: '宁波外汇通外贸有限公司',
          table4: '0574-76998577',
          table5: '查看 ',
          table6: '2020-08-20 09:00',
          table7: '',
          table8: '待审核',
          table9: '使用中',
        },
      ],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    }
  },
  mounted () {
    Login().then((res) => {
      console.log(res)
      sessionStorage.setItem('X-Admin-Token', res.token)
    })
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
