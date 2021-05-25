<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse ? '58px' : '200px'">
        <el-menu :default-active="activeIndex"
                 class="el-menu-vertical-demo"
                 background-color="#1f293d"
                 text-color="#999999"
                 :collapse-transition="false"
                 active-text-color="#ffffff"
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
          path: '/company/companyInfo',
          label: '企业资料',
          iconurl: require('@/assets/images/company/icon_comprehensive01_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive01_sel.png'),
          isChildren: 0
        },
        {
          path: '/company/orgManagement',
          label: '组织架构管理',
          iconurl: require('@/assets/images/company/icon_comprehensive02_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive02_sel.png'),
          isChildren: 0

        },
        {
          path: '/company/personnelManagement',
          label: '人员管理',
          iconurl: require('@/assets/images/company/icon_comprehensive03_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive03_sel.png'),
          isChildren: 1,
          children:[
            {
              path: '/company/personnelManagement',
              label: '员工管理'
            },
            
            {
              path: '/company/salaryManagement',
              label: '薪资管理'
            },
            {
              path: '/company/contractManage',
              label: '合同管理'
            }
          ]

        },
        /**
         * {
              path: '/company/attendanceRecord',
              label: '考勤记录管理'
            },
         */
        {
          path: '/company/attendance',
          label: '考勤管理',
          iconurl: require('@/assets/images/company/icon_comprehensive08_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive08_sel.png'),
          isChildren: 1,
           children:[
             {
              path: '/company/attendanceRecord',
              label: '考勤记录'
            },
            {
              path: '/company/attendanceApplication',
              label: '申请记录'
            },
           ]
        },
        {
          path: '/company/trainManage',
          label: '培训管理',
          iconurl: require('@/assets/images/company/icon_comprehensive08_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive08_sel.png'),
          isChildren: 0
        },
        {
          path: '/company/functionAuthority',
          label: '功能权限管理',
          iconurl: require('@/assets/images/company/icon_comprehensive08_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive08_sel.png'),
          isChildren: 0
        },
        {
          path: '/company/systemSettings',
          label: '系统设置',
          iconurl: require('@/assets/images/company/icon_comprehensive07_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive07_sel.png'),
          isChildren: 0

        },
        {
          path: '/company/reportForm',
          label: '报表管理',
          iconurl: require('@/assets/images/company/icon_comprehensive09_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive09_sel.png'),
          isChildren: 0
        },
        {
          path: '/company/dataDictionary',
          label: '数据字典',
          iconurl: require('@/assets/images/company/icon_comprehensive10_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive10_sel.png'),
          isChildren: 0
        },//databaseManagement
        {
          path: '/company/databaseManagement',
          label: '数据库管理',
          iconurl: require('@/assets/images/company/icon_comprehensive10_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive10_sel.png'),
          isChildren: 0
        },
        {
          path: '/company/notice',
          label: '提醒通知',
          iconurl: require('@/assets/images/company/icon_comprehensive10_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive10_sel.png'),
          isChildren: 0
        },
        {
          path: '/company/alarm',
          label: '报警记录',
          iconurl: require('@/assets/images/company/icon_comprehensive11_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive11_sel.png'),
          isChildren: 1,
          children: [
            {
              // Announcement management
              path: '/company/emergencyAlarm',
              label: '紧急报警记录'
            },
            {
              // Notification management
              path: '/company/fireAlarm',
              label: '火灾报警记录'
            }
          ]
        },
        // {
        //   path: '/company/dataAuthority',
        //   label: '数据权限管理',
        //   iconurl: require('@/assets/images/company/icon_comprehensive04_nor.png'),
        //   iconisactive: require('@/assets/images/company/icon_comprehensive04_sel.png'),
        //   isChildren: 0
        // },
      ],
      // asideMenu: [
      //   {
      //     path: '/operation/announcement',
      //     label: '通知公告',
      //     iconurl: require('@/assets/images/operation/icon_operate01_nor.png'),
      //     iconisactive: require('@/assets/images/operation/icon_operate01_sel.png'),
      //     isChildren: 1,
      //     children: [
      //       {
      //         // Announcement management
      //         path: '/operation/announcementManagement',
      //         label: '公告管理'
      //       },
      //       {
      //         // Notification management
      //         path: '/operation/notificationManagement',
      //         label: '通知管理'
      //       }
      //     ]
      //   },
      //   {
      //     // community activity
      //     path: '/operation/communityActivity',
      //     label: '社区活动',
      //     iconurl: require('@/assets/images/operation/icon_operate02_nor.png'),
      //     iconisactive: require('@/assets/images/operation/icon_operate02_sel.png'),
      //     icon: 'el-icon-message',
      //     isChildren: 1,
      //     children: [
      //       {
      //         // Announcement management
      //         path: '/operation/eventManagement',
      //         label: '活动管理'
      //       },
      //       {
      //         // Notification management
      //         path: '/operation/sponsorManagement',
      //         label: '主办方管理'
      //       }
      //     ]
      //   },
      //   {
      //     // Voting management
      //     path: '/operation/votingManagement',
      //     iconurl: require('@/assets/images/operation/icon_operate03_nor.png'),
      //     iconisactive: require('@/assets/images/operation/icon_operate03_sel.png'),
      //     label: '投票管理',
      //     isChildren: 0
      //   }
      // ],
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
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
    background-color: #1f293d;
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
    background: linear-gradient(90deg, #00a4ff 0%, #036dfd 100%);
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
