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
          path: '/basic/RealManagement',
          label: '房产管理',
          iconurl: require('@/assets/images/baisc/icon_archives01_nor.png'),
          iconisactive: require('@/assets/images/baisc/icon_archives01_sel.png'),
          isChildren: 1,
          children: [
            {
              path: '/basic/buildingManagement',
              label: '楼栋管理'
            },
            {
              path: '/basic/unitInfo',
              label: '单元信息'
            },
            {
              path: '/basic/houseManagement',
              label: '房产管理'
            }
          ]
        },
        {
          path: '/basic/parkingInfo',
          label: '车位信息',
          iconurl: require('@/assets/images/baisc/icon_archives02_nor.png'),
          iconisactive: require('@/assets/images/baisc/icon_archives02_sel.png'),
          isChildren: 0
        },
        {
          path: '/basic/vehicleFile',
          label: '车辆档案',
          iconurl: require('@/assets/images/baisc/icon_archives03_nor.png'),
          iconisactive: require('@/assets/images/baisc/icon_archives03_sel.png'),
          isChildren: 0
        },
        {
          path: '/basic/ownersFile',
          label: '业主档案',
          iconurl: require('@/assets/images/baisc/icon_archives04_nor.png'),
          iconisactive: require('@/assets/images/baisc/icon_archives04_sel.png'),
          isChildren: 0
        },
        {
          path: '/basic/tenantFile',
          label: '租户档案',
          iconurl: require('@/assets/images/baisc/icon_archives05_nor.png'),
          iconisactive: require('@/assets/images/baisc/icon_archives05_sel.png'),
          isChildren: 0
        },
        // {
        //   path: '/basic/formDate',
        //   label: 'form组件',
        //   iconurl: require('@/assets/images/baisc/icon_archives01_nor.png'),
        //   iconisactive: require('@/assets/images/baisc/icon_archives01_sel.png'),
        //   isChildren: 0
        // }auditManagement
        {
          path: '/basic/auditManagement',
          label: '审核管理',
          iconurl: require('@/assets/images/baisc/icon_archives06_nor.png'),
          iconisactive: require('@/assets/images/baisc/icon_archives06_sel.png'),
          isChildren: 0
        },
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
