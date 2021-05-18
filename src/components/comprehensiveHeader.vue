<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <div class="header-logo">
          <div class="logo">
            <div>
              <img :src="logoImg"
                   alt="" />
            </div>
            <div class="logo-txt">
              <div class="txt-big">
                <span>智慧社区</span>
              </div>
              <div class="txt-small">
                <span>Beta版本</span>
              </div>
            </div>
          </div>
          <!-- 头部导航 -->
          <div class="header-menu">
            <el-menu class="el-menu-demo"
                     :default-active="activeIndex"
                     background-color="#1f293d"
                     text-color="#999999"
                     active-text-color="#ffffff"
                     mode="horizontal"
                     @select="handleSelect"
                     router>
              <el-menu-item :index="item.path"
                            :disabled='item.disabled'
                            v-for="item in headMenu"
                            :key="item.path">{{ item.label }}</el-menu-item>
                            <el-button type="warning" class="exit" @click="exit">退出登录</el-button>
            </el-menu>
          </div>
          <div></div>
        </div>
      </el-header>
      <el-container style="height:100%">
        <router-view></router-view>
      </el-container>
      <div class='control'>
        <div class='control_box'
             @click="toAdmin">
          <span>信息服务系统</span>
        </div>
      </div>
    </el-container>

  </div>
</template>

<script>
export default {
  data () {
    return {
      logoImg: require('../../src/assets/images/header_logo.png'),
      activeIndex: this.$route.path,
      headMenu: [
        // {
        //   path: '/develop',
        //   label: '开发平台',
        //   disabled: true
        // },
        {
          path: '/company',
          label: '系统管理',
        },
        {
          path: '/daily',
          label: '日常管理',
        },
        {
          path: '/basic',
          label: '基础档案',
        },
        {
          path: '/charge',
          label: '收费管理',
        },
        // {
        //   path: '/property',
        //   label: '物业综合',
        //   disabled: true

        // },
        // {
        //   path: '/Safety',
        //   label: '安全防控',
        //   disabled: true

        // },
        // {
        //   path: '/partyBuilding',
        //   label: '建党服务',
        //   disabled: true
        // },
      ],
    }
  },
  mounted () {
    this.getPath()
  },
  methods: {
    exit(){
      window.sessionStorage.clear(),
      this.$router.push('/login')
    },
    handleSelect (key, keyPath) { },
    // 路由过滤
    getPath () {
      var str = `${this.$route.path}`
      if (str.lastIndexOf('/') > 0) {
        this.activeIndex = str.substring(
          str.indexOf('/'),
          str.lastIndexOf('/')
        )
      } else {
        this.activeIndex = this.$route.path
      }
      console.log(this.$route.path)
    },
    toAdmin () {
      this.$router.push('/overview')
    },
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.getPath()
      },
      // 深度观察监听
      deep: true,
    },
  },
}
</script>

<style scoped>
.exit{
    position: fixed !important;
    right: 200px; 
    top: 10px;
}
.el-container {
    position: relative;
    overflow: hidden;
}
.control_box {
    margin-left: 20px;
    color: #ffffff;
    opacity: 0.6;
}
.control_box:hover {
    opacity: 1;
}
.control {
    cursor: pointer;
    width: 20px;
    height: 40px;
    line-height: 40px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 100px 0px 0px 100px;
    bottom: 20%;
    z-index: 1000;
    position: absolute;
    right: 0;
}
.control span {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
}
.control:hover {
    width: 120px;
}
.home-container {
    height: 100vh;
}
.el-header {
    background: #1f293d;
    color: #ffffff;
    text-align: center;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 4px 0px rgba(224, 224, 224, 0.5);
}

.header-logo {
    display: flex;
}
.header-logo > .logo {
    display: flex;
    align-items: center;
}
/* .logo span{
    font-size: 20px;
    font-weight: 700;
    padding: 0 20px;
  } */
.logo img {
    width: 30px;
    height: 21px;
    margin-right: 20px;
    margin-left: 8px;
}
.el-menu.el-menu--horizontal {
    border-bottom: none;
}
.logo-txt {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
}
.logo-txt .txt-big span {
    font-size: 20px;
    font-family: LiHeiPro;
    line-height: 20px;
}
.logo-txt .txt-small span {
    font-size: 12px;
}
.logo-txt .txt-small {
    margin: 0 9px;
    padding: 2px;
    border: 1px solid #e2e2e9;
    border-radius: 3px;
}
.el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 3px solid #036dfd !important;
    color: #303133;
}
</style>
