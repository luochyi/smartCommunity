<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse ? '58px' : '200px'">
        <el-menu :default-active="activeIndex"
                 class="el-menu-vertical-demo"
                 background-color="#2B2C4B"
                 text-color="#999999"
                 :collapse-transition="false"
                 active-text-color="#ffd04b"
                 :collapse="isCollapse"
                 unique-opened
                 router>
          <div class="asideMenu">
            <i class="el-icon-s-unfold"
               @click="toggleCollapse"> </i>
          </div>
          <div v-for="item in asideMenu"
               :key="item.path">
            <template v-if="item.isChildren === 0">
              <el-menu-item :index="item.path">
                <img v-if="activeIndex === item.path"
                     :src="item.iconisactive"
                     class="icon_img"
                     alt="" />
                <img v-else
                     :src="item.iconurl"
                     class="icon_img"
                     alt="" />
                <span slot="title">{{ item.label }}</span>
              </el-menu-item>
            </template>
            <template v-if="item.isChildren === 1">
              <el-submenu :index="item.path">
                <template slot="title">
                  <img :src="item.iconurl"
                       class="icon_img"
                       alt="" />
                  <span>{{ item.label }} </span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="subItem.path"
                                v-for="subItem in item.children"
                                :key="subItem.path">
                    <span>{{ subItem.label }}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: this.$route.path,
      asideMenu: [
        {
          //
          path: '/commodity/home',
          label: '首页',
          iconurl: require('@/assets/images/commodity/icon_shopping01_nor.png'),
          iconisactive: require('@/assets/images/commodity/icon_shopping01_sel.png'),
          isChildren: 0
        },
        {
          path: '/commodity/commodity',
          label: '商品',
          iconurl: require('@/assets/images/commodity/icon_shopping02_nor.png'),
          iconisactive: require('@/assets/images/commodity/icon_shopping02_sel.png'),
          isChildren: 1,
          children: [
            {
              // Commodity creation
              path: '/commodity/commodityCreation',
              label: '商品创建'
            },
            {
              // Commodity creation
              path: '/commodity/commodityManagement',
              label: '商品管理'
            },
            {
              // Category managemen
              path: '/commodity/categoryManagemen',
              label: '类目管理'
            },
            {
              // Supplier Management
              path: '/commodity/supplierManagement',
              label: '供应商管理'
            },
            // {
            //   // Brand qualification
            //   path: '/commodity/brandQualification',
            //   label: '品牌资质'
            // }
          ]
        },
        {
          // community activity
          path: '/commodity/orderManagement',
          label: '订单管理',
          iconurl: require('@/assets/images/commodity/icon_shopping03_nor.png'),
          iconisactive: require('@/assets/images/commodity/icon_shopping03_sel.png'),
          isChildren: 0,
          // children: [
          //   {
          //     // Order management
          //     path: '/commodity/orderManagement',
          //     label: '订单管理'
          //   },
          //   {
          //     // Bulk shipping
          //     path: '/commodity/bulkShipping',
          //     label: '批量发货'
          //   },
          //   {
          //     //Evaluation Management
          //     path: '/commodity/evaluationManagement',
          //     label: '评价管理'
          //   },
          //   {
          //     // Violation handling
          //     path: '/commodity/violationHandling',
          //     label: '违规处理'
          //   },
          //   {
          //     // Pre-sale and buy warning
          //     path: '/commodity/buyWarning',
          //     label: '预售买预警'
          //   }
          // ]
        },
        {
          // After sale
          path: '/commodity/unshippedRefund',
          label: '退换申请',
          iconurl: require('@/assets/images/commodity/icon_shopping04_nor.png'),
          iconisactive: require('@/assets/images/commodity/icon_shopping04_sel.png'),
          isChildren: 0,
          // children: [
          //   {
          //     //Unshipped refund
          //     path: '/commodity/unshippedRefund',
          //     label: '未发货退款'
          //   },
          //   {
          //     // Shipped after sale
          //     path: '/commodity/Shipped',
          //     label: '已发货售后'
          //   },
          //   {
          //     // Customer phone settings
          //     path: '/commodity/phoneSet',
          //     label: '客户电话设置'
          //   },
          //   {
          //     //Request for service
          //     path: '/commodity/requestService',
          //     label: '服务请求'
          //   },
          //   {
          //     //Fast refund assistant
          //     path: '/commodity/refundAssistant',
          //     label: '极速退款助手'
          //   }
          // ]
        },
        // {
        //   // community activity
        //   path: '/commodity/activity',
        //   label: '活动',
        //   iconurl: require('@/assets/images/commodity/icon_shopping05_nor.png'),
        //   iconisactive: require('@/assets/images/commodity/icon_shopping05_sel.png'),
        //   isChildren: 1,
        //   children: [
        //     {
        //       // Group purchase merchandise management
        //       path: '/commodity/groupMerchandise',
        //       label: '团购商品管理'
        //     },
        //     {
        //       // Group management
        //       path: '/commodity/groupManagement',
        //       label: '拼团管理'
        //     }
        //   ]
        // },
        // {
        //   // community Logistics
        //   path: '/commodity/Logistics',
        //   label: '物流',
        //   iconurl: require('@/assets/images/commodity/icon_shopping06_nor.png'),
        //   iconisactive: require('@/assets/images/commodity/icon_shopping06_sel.png'),
        //   isChildren: 1,
        //   children: [
        //     {
        //       // Freight template
        //       path: '/commodity/freightTemplate',
        //       label: '运费模版'
        //     },
        //     {
        //       //Address library management
        //       path: '/commodity/addressManagement',
        //       label: '地址库管理'
        //     }
        //   ]
        // },
        // {
        //   // community activity
        //   path: '/commodity/data',
        //   label: '数据',
        //   iconurl: require('@/assets/images/commodity/icon_shopping07_nor.png'),
        //   iconisactive: require('@/assets/images/commodity/icon_shopping07_sel.png'),
        //   isChildren: 1,
        //   children: [
        //     {
        //       // Commodity analysis
        //       path: '/commodity/commodityAnalysis',
        //       label: '商品分析'
        //     }
        //   ]
        // },
        // {
        //   // community activity
        //   path: '/commodity/assets',
        //   label: '资产',
        //   iconurl: require('@/assets/images/commodity/icon_shopping08_nor.png'),
        //   iconisactive: require('@/assets/images/commodity/icon_shopping08_sel.png'),
        //   isChildren: 1,
        //   children: [
        //     {
        //       //Account center
        //       path: '/commodity/accountCenter',
        //       label: '账户中心'
        //     },
        //     {
        //       // Pay bills online
        //       path: '/commodity/payBills',
        //       label: '在线支付账单'
        //     },
        //     {
        //       //Order flow details
        //       path: '/commodity/orderDetails',
        //       label: '订单流水明细'
        //     }
        //   ]
        // },
        // {
        //   //Supplier settlement
        //   path: '/commodity/Supplier',
        //   label: '供应商结算',
        //   iconurl: require('@/assets/images/commodity/icon_shopping09_nor.png'),
        //   iconisactive: require('@/assets/images/commodity/icon_shopping09_sel.png'),
        //   isChildren: 1,
        //   children: [
        //     {
        //       //Supplier settlement list
        //       path: '/commodity/settlementList',
        //       label: '供应商结算列表'
        //     },
        //     {
        //       //Supplier bill
        //       path: '/commodity/supplierBills',
        //       label: '供应商账单'
        //     }
        //   ]
        // },
        // {
        //   //family life
        //   path: '/commodity/familyLife',
        //   label: '居家生活',
        //   iconurl: require('@/assets/images/commodity/icon_shopping09_nor.png'),
        //   iconisactive: require('@/assets/images/commodity/icon_shopping09_sel.png'),
        //   isChildren: 1,
        //   children: [
        //     {
        //       //Service Management
        //       path: '/commodity/serviceManagement',
        //       label: '服务管理'
        //     },
        //     {
        //       //Service Item
        //       path: '/commodity/serviceItem',
        //       label: '服务分类'
        //     },
        //     {
        //       //business Management
        //       path: '/commodity/businessManagement',
        //       label: '商家管理'
        //     }
        //   ]
        // },
      ],
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      console.log(12)
    }
  },
  watch: {
    $route (to, from) {
      this.activeIndex = this.$route.path
    }
  }
}
</script>
<style scoped>
.el-container {
    width: 100vw;
    height: 100%;
    overflow: hidden;
}

.el-aside {
    background-color: #2b2c4b;
    color: #333;
    padding-bottom: 150px;
    text-align: left;
    overflow-x: hidden;
}
/*  */
.el-menu-item-group .el-menu-item {
    padding-left: 58px !important;
}
.el-aside .el-menu {
    background-color: #2b2c4b;
}
.el-menu {
    border-right: none;
}
.el-main {
    background-color: #e8ebf2;
    width: 100%;
    color: #333;
}
.el-aside .el-menu-item.is-active {
    color: white !important;
    background: linear-gradient(90deg, #fe822f 0%, #e2495f 100%);
}
.asideMenu {
    width: 100%;
    line-height: 50px;
    height: 50px;
    text-align: right;
    color: #d8d8d8;
}
.asideMenu [class^='el-icon-'] {
    margin-right: 20px;
    text-align: center;
    font-size: 28px;
    vertical-align: middle;
}
.icon_img {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 14px;
    padding-left: 10px;
}
</style>
