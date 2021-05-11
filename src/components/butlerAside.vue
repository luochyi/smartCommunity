<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
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
          // Items out
          path: '/butler/itemsOut',
          label: '物品出门',
          iconurl: require('@/assets/images/butler/icon_service01_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service01_sel.png'),
          isChildren: 0
        },
        // {
        //   // Decoration management
        //   path: '/butler/decorationManagement',
        //   label: '装修管理',
        //   iconurl: require('@/assets/images/butler/icon_service02_nor.png'),
        //   iconisactive: require('@/assets/images/butler/icon_service02_sel.png'),
        //   isChildren: 0
        // },
        {
          // Voting management
          path: '/butler/votingManagement',
          label: '投票管理',
          iconurl: require('@/assets/images/butler/icon_service03_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service03_sel.png'),
          isChildren: 0
        },
        {
          // Convenience phone
          path: '/butler/conveniencePhone',
          label: '便民电话',
          iconurl: require('@/assets/images/butler/icon_service04_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service04_sel.png'),
          isChildren: 0
        },
        {
          // Suggest Consultation
          path: '/butler/suggestConsultation',
          label: '建议咨询',
          iconurl: require('@/assets/images/butler/icon_service05_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service05_sel.png'),
          isChildren: 0
        },
        {
          // Visitor management
          path: '/butler/visitorManagement',
          label: '访客管理',
          iconurl: require('@/assets/images/butler/icon_service06_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service06_sel.png'),
          isChildren: 0
        },
        {
          // Complaint and praise
          path: '/butler/complainPraise',
          label: '投诉表扬',
          iconurl: require('@/assets/images/butler/icon_service07_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service07_sel.png'),
          isChildren: 0
        },
        {
          // Report for repair
          path: '/butler/reportRepair',
          label: '报事报修',
          iconurl: require('@/assets/images/butler/icon_service08_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service08_sel.png'),
          isChildren: 0
        },
        {
          // Facility Booking
          path: '/butler/facilityBooking',
          label: '设施预约',
          iconurl: require('@/assets/images/butler/icon_service08_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service08_sel.png'),
          isChildren: 1,
          children:[{
              path: '/butler/facilitiesManagement',
              label: '设施管理'
            },
            {
              path: '/butler/bookingManagement',
              label: '预约管理'
            },
            // {
            //   path: '/butler/facilityInspection',
            //   label: '设施检查'
            // },
            {
              path: '/butler/facilityItem',
              label: '设施分类'
            }]
        },
        {
          // Questionnaire
          path: '/butler/Questionnaire',
          label: '问卷调查',
          iconurl: require('@/assets/images/butler/icon_service09_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service09_sel.png'),
          isChildren: 0
        },
        {
          // Community topic
          path: '/butler/communityTopic',
          label: '社区话题',
          iconurl: require('@/assets/images/butler/icon_service10_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service10_sel.png'),
          isChildren: 1,
          children: [
            {
              path: '/butler/topiManagement',
              label: '话题管理'
            },
            {
              path: '/butler/subjectManagement',
              label: '主题明细管理'
            }
          ]
        },
        {
          // Work order management
          // Work order management
          path: '/butler/workManagement',
          label: '工单管理',
          iconurl: require('@/assets/images/butler/icon_service11_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service11_sel.png'),
          isChildren: 1,
          children: [
            {
              path: '/butler/orderManagement',
              label: '派工单管理'
            },
            {
              path: '/butler/managementSet',
              label: '工单设置'
            }
          ]
        },
        {
          path: '/butler/loanManagement',
          // Loan management
          label: '借还管理',
          iconurl: require('@/assets/images/butler/icon_service12_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service12_sel.png'),
          isChildren: 1,
          children: [
            {
              path: '/butler/loanManagement',
              label: '借还管理'
            },
            {
              // Item management
              path: '/butler/itemManagemsent',
              label: '物品管理'
            }
          ]
        },
        {
          // Business meeting management
          path: '/butler/businessManagement',
          label: '业委会管理',
          iconurl: require('@/assets/images/butler/icon_service13_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service13_sel.png'),
          isChildren: 0
        },
        // {
        //   // /Voice Butler
        //   path: '/butler/voiceButler',
        //   label: '语音管家',
        //   iconurl: require('@/assets/images/butler/icon_service14_nor.png'),
        //   iconisactive: require('@/assets/images/butler/icon_service14_sel.png'),
        //   isChildren: 0
        // }
        {
          // xunjiandian
          path: '/butler/inspection',
          iconurl: require('@/assets/images/butler/icon_service13_nor.png'),
          iconisactive: require('@/assets/images/butler/icon_service13_sel.png'),
          label: '巡检管理',
          isChildren: 1,
          children: [
            {
              path: '/butler/inspectionPlan',
              label: '巡检计划'
            },
            {
              path: '/butler/inspectionRoute',
              label: '巡检路线'
            },
            {
              path: '/butler/inspectionPoint',
              label: '巡检点'
            },
            
          ]
        },
      ],
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      // console.log(12)
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
