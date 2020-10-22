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
                     mode="horizontal"
                     @select="handleSelect"
                     router>
              <el-menu-item :index="item.path"
                            :disabled='item.disabled'
                            v-for="item in headMenu"
                            :key="item.path">{{ item.label }}</el-menu-item>
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
             @click="Property">
          <span>物业</span>
        </div>
        <div class='control_box'
             @click="complex">
          <span>综合服务平台</span>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logoImg: require('../../src/assets/images/logo.png'),
      activeIndex: this.$route.path,
      headMenu: [
        {
          path: '/overview',
          label: '概览'
        },
        {
          path: '/basic',
          // Basic file
          label: '基础档案'
        },
        {
          // path: '/Butler service',
          path: '/butler',
          label: '管家服务'
        },
        {
          // path: '/Charge management',
          path: '/charge',
          label: '收费管理'
        },
        {
          // path: '/Operation Management',
          path: '/operation',
          label: '运营管理'
        },
        {
          // path: '/Commodity Center',
          path: '/commodity',
          label: '商品中心'
        },
        {
          path: '/system',
          label: '系统设置',
          disabled: true,
        }
      ]
    }
  },
  mounted () {
    this.getPath()
  },
  methods: {
    Property () {
      window.location.href = 'http://testmanage.kaidalai.cn/admin/'
    },
    complex () {
      window.location.href = ' http://testmanage.kaidalai.cn/manage/#/'
    },
    handleSelect (key, keyPath) { },
    // 路由过滤
    getPath () {
      var str = `${this.$route.path}`
      if (str.lastIndexOf('/') > 0) {
        this.activeIndex = str.substring(str.indexOf('/'), str.lastIndexOf('/'))
      } else {
        this.activeIndex = this.$route.path
      }
    }
  },
  watch: {
    // '$route': 'getPath',
    $route: {
      handler: function (val, oldVal) {
        this.getPath()
        // console.log('-----------watch')
        // this.activeIndex = val.matched[0].path
        // console.log(val.matched[0].path)
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

<style scoped>
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
  height: 60px;
  line-height: 30px;
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
  background-color: rgba(255, 255, 255, 1);
  color: #333;
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
  border-bottom: 3px solid rgba(251, 71, 2, 1);
  color: #303133;
}
</style>
