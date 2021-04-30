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
          // Charge standard
          path: '/charge/chargeStandard',
          label: '收费标准管理',
          iconurl: require('@/assets/images/charge/icon_charge01_nor.png'),
          iconisactive: require('@/assets/images/charge/icon_charge01_sel.png'),
          isChildren: 0
        },
        {
          //Daily payment
          path: '/charge/dailyMayment',
          label: '日常缴费',
          iconurl: require('@/assets/images/charge/icon_charge02_nor.png'),
          iconisactive: require('@/assets/images/charge/icon_charge02_sel.png'),
          isChildren: 0
        },
        {
          // Deposit management
          path: '/charge/depositManagement',
          label: '押金管理',
          iconurl: require('@/assets/images/charge/icon_charge03_nor.png'),
          iconisactive: require('@/assets/images/charge/icon_charge03_sel.png'),
          isChildren: 0
        },
        // {
        //   // Work order management
        //   path: '/charge/orderManagement',
        //   label: '工单管理',
        //   iconurl: require('@/assets/images/charge/icon_charge04_nor.png'),
        //   iconisactive: require('@/assets/images/charge/icon_charge04_sel.png'),
        //   isChildren: 0
        // },
        {
          // Bill management
          path: '/charge/billManagement',
          label: '账单管理',
          iconurl: require('@/assets/images/charge/icon_charge05_nor.png'),
          iconisactive: require('@/assets/images/charge/icon_charge05_sel.png'),
          isChildren: 1,
          children: [
            {
              //expenseBil
              path: '/charge/expenseBil',
              label: '费用账单'
            }
          ]
        }
      ],
      isCollapse: false
    }
  },
  mounted () {
    console.log(this.activeIndex)
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
    },
    activeIndex () { }
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
