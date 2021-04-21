<template>
  <el-container style="height:100%">
    <!-- 头部 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '54px' : '200px'">
        <div class="toggle-menu"
             @click="toggleCollapse">
          <img :src="menuImg"
               alt="">
        </div>
        <el-menu background-color="#1F293D"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :default-active="activeIndex"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 router>
          <el-menu-item :index="item.path"
                        v-for="item in asideMenu"
                        :key="item.path">
            <img v-if="activeIndex === item.path"
                 class="asideImg"
                 :src="item.iconisactive"
                 alt=""
                 width="100%" />
            <img v-else
                 class="asideImg"
                 :src="item.iconurl"
                 alt=""
                 width="100%">
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <div class="box">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path,
      menuImg: require('@/assets/images/menu.png'),
      asideMenu: [
        {
          path: '/company/companyInfo',
          label: '企业资料',
          iconurl: require('@/assets/images/company/icon_comprehensive01_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive01_sel.png'),
        },
        {
          path: '/company/orgManagement',
          label: '组织架构管理',
          iconurl: require('@/assets/images/company/icon_comprehensive02_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive02_sel.png'),
        },
        {
          path: '/company/personnelManagement',
          label: '人员管理',
          iconurl: require('@/assets/images/company/icon_comprehensive03_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive03_sel.png'),
        },
        {
          path: '/company/functionAuthority',
          label: '功能权限管理',
          iconurl: require('@/assets/images/company/icon_comprehensive03_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive03_sel.png'),
        },
        {
          path: '/company/dataAuthority',
          label: '数据权限管理',
          iconurl: require('@/assets/images/company/icon_comprehensive04_nor.png'),
          iconisactive: require('@/assets/images/company/icon_comprehensive04_sel.png'),
        },
      ],
      isCollapse: false,
    }
  },
  methods: {
    //点击按钮，切换侧边栏
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    fn() {
      this.$router.replace('/Login')
    },
  },
  watch: {
    $route(to, from) {
      this.activeIndex = this.$route.path
    },
  },
}
</script>
<style scoped>
.el-main {
  position: relative;
}

.el-container {
  height: 100%;
}
.el-aside {
  background: #1f293d;
}
.el-menu-item,
.el-submenu__title {
  height: 50px;
}
.asideImg {
  width: 14px;
  height: 14px;
  padding-right: 10px;
}
.el-menu {
  border-right: none;
}
.toggle-menu {
  background-color: rgb(31, 41, 61);
  height: 50px;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.toggle-menu img {
  width: 20px;
  height: 20px;
}
.el-main {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>