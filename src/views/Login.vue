<template>
  <div class="box comprehensive">
    <div class="login-left">
    </div>
    <div class="login-right">
      <div class="login-box">
        <div class="login-titel">
          <p>小蜜蜂智慧社区综合平台</p>
          <span>链接你我 让您品味生活每一天</span>
        </div>
        <div class="login-content">
          <div class="login-input"
               style="width:358px">
            <el-input v-model="UserName"
                      placeholder="请输入用户名"
                      size="mini"
                      style="width:100%"></el-input>
            <el-input v-model="passWrod"
                      placeholder="请输入密码"
                      show-password
                      size="mini"
                      style="width:100%"></el-input>
          </div>
          <div class="login-btn">
            <el-button type="primary"
                       @click="login"
                       style="width:100%">登录</el-button>
            <p>忘记密码</p>
          </div>
        </div>
      </div>
      <div class="right-footer">
        <div class="footer-more">
          <div class="more-box">
            <div class="more-hr">
            </div>
            <div>
              <span>点击了解更多产品</span>
            </div>
            <div class="more-hr">
            </div>
          </div>
          <div class="more-item">
            <div class="item"
                 @click='gotoNetwork'>
              <div class="item-img">
                <img :src="loginIcon1"
                     alt="">
              </div>
              <p>官方网站</p>
            </div>
            <div class="item"
                 @click='gotoKF()'>
              <div class="item-img">
                <img :src="loginIcon2"
                     alt="">
              </div>
              <p>开放平台</p>
            </div>
            <div class="item">
              <div class="item-img">
                <img :src="loginIcon3"
                     alt="">
              </div>
              <p>商家入住</p>
            </div>
            <div class="item">
              <div class="item-img">
                <img :src="loginIcon4"
                     alt="">
              </div>
              <p>业主APP</p>
            </div>
            <div class="item">
              <div class="item-img">
                <img :src="loginIcon5"
                     alt="">
              </div>
              <p>管家APP</p>
            </div>
          </div>
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
      dialogVisible: false,
      loginIcon1: require('@/assets/images/login-icon1.png'),
      loginIcon2: require('@/assets/images/login-icon2.png'),
      loginIcon3: require('@/assets/images/login-icon3.png'),
      loginIcon4: require('@/assets/images/login-icon4.png'),
      loginIcon5: require('@/assets/images/login-icon5.png'),
      UserName: '',
      passWrod: '',
      activeName: 'first',
    }
  },
  methods: {
    //   前往官方网站
    gotoNetwork () {
      this.$confirm('是否立刻前往官方网站', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          window.location.href = 'http://www.kaidalai.cn/'
        })
        .catch(() => { })
    },
    gotoKF () {
      //   this.$router.push('/headKf')
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    login () {
      if (!this.UserName || !this.passWrod) {
        this.$message.error('请输入用户名和密码')
        return
      }
      let resData = {
        userName: this.UserName,
        pwd: this.passWrod
      }
      Login(resData).then((res) => {
        if (res.status) {
          sessionStorage.setItem('X-Admin-Token', res.token)
          this.$router.push('/company')
        }
        // sessionStorage.setItem('X-Admin-Token', res.token)
      })
    },
  },
}
</script>>
<style scoped lang='scss'>
.box {
    width: 100%;
    height: 100vh;
    min-height: 700px;
    display: flex;
    .login-left {
        width: 65%;
        height: 100%;
        background-image: url(../../src/assets/images/login.png);
        background-size: 100% 100%;
        overflow: hidden;
    }
    .login-right {
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .login-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .login-titel {
                text-align: center;
                font-size: 20px;
                font-weight: 600;
                color: #3e3e3e;
                span {
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #b7b7b7;
                }
            }
            .login-content {
                margin-top: 200px;
            }
        }

        .right-footer {
            width: 100%;
            max-width: 358px;
        }
        .more-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .more-box span {
            font-size: 12px;
            font-weight: 400;
            color: #333333;
            line-height: 17px;
        }
        .more-hr {
            height: 1px;
            width: 120px;
            background: #d8d8d8;
        }
        .more-item {
            margin-top: 24px;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .more-item > .item {
            cursor: pointer;
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            color: #999999;
            line-height: 17px;
        }
        .more-item > .item > .item-img {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            width: 40px;
            height: 40px;
            border-radius: 4px;
            margin-bottom: 10px;
            border: 1px solid #999999;
        }
        .item-img img {
            width: 20px;
            height: 20px;
        }
    }
}
</style>