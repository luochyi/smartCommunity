import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// import {sysUserList} from '@/api/company.js'
export default new Vuex.Store({
  state: {
    title: '智慧社区',
    bgColor:localStorage.getItem("bgColor"),
    fontWeight:localStorage.getItem("fontWeight"),
  },
  mutations: {
    //系统设置更换颜色
    changeColor(state){
      if(state.bgColor == '#5f5d46'){
        localStorage.setItem("bgColor", "#1f293d");
        location.reload();
      }else{
        localStorage.setItem("bgColor", "#5f5d46");
        location.reload();
      }
    },
    changeFont(state){
      if(state.fontWeight == 'bolder'){
        localStorage.setItem("fontWeight", "normal");
        location.reload();
      }else{
        localStorage.setItem("fontWeight", "bolder");
        location.reload();
      }
    }
  },
  actions: {},
  modules: {}
})
