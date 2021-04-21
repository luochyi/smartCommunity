<template>
  <div class="data-content">
    <div class="data-box">
        <div class="data-item">
          <div class="data-list">
            <ul>
              <li>人员管理</li>
              <li>组织架构管理</li>
              <li class="active">运营管理</li>
              <li>管家服务</li>
              <li>收费服务</li>
            </ul>
          </div>
        </div>
        <div class="permission-item">
          <div class="role-box">
            <div class="role-title">
              <span>管理员</span>
              <p>预设所有对象的查看列表及详情权限</p>
            </div>
            <div>
              <!--多选框标题按钮-->
              <div class="role-box-title">
                <span>人员管理</span> <el-button size="small" @click="drawer = true" type="text">设置字段权限</el-button>
              </div>
              <!--多选框-->
              <div class="checked-box">
                <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox  v-model="checked">全选</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">查看列表</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">停用</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                    <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                    <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
              </div>
            </div>
             <div>
              <div class="role-box-title">
                <span>人员管理</span> <el-button size="small" type="text">设置字段权限</el-button>
              </div>
              <!--多选框-->
              <div class="checked-box">
                <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox  v-model="checked">全选</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">查看列表</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">停用</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                    <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                    <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
              </div>
            </div>
             <div>
              <div class="role-box-title">
                <span>人员管理</span> <el-button size="small" type="text">设置字段权限</el-button>
              </div>
              <!--多选框-->
              <div class="checked-box">
                <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                  <div class="checked-item">
                  <el-checkbox  v-model="checked">全选</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">查看列表</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">停用</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                    <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                    <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
                <div class="checked-item">
                  <el-checkbox v-model="checked">新建员工</el-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!--点击启用之后的弹窗-->
          <template>
              <el-drawer
                title="我是标题"
                size="52%"
                :visible.sync="drawer"
                :with-header="false"
               >
                  <set-permissions></set-permissions>
              </el-drawer>
          </template>
  </div>
</template>
<script>
import setPermissions from "./setPermissions.vue";
export default {
   data () {
    return {
      checked: true,
      drawer:false
    }
  },
  components:{
    setPermissions
  }
}
</script>
<style scoped>
  .data-content{
    width: 100%;
    margin-right: 20px;
  }
  .data-box{
    width: calc(100% - 40px);
    margin:  auto;
    min-height: 418px;
    margin: 20px 20px 28px 20px;
    display: flex;
    background: #FFFFFF;
    border-radius: 4px 0px 0px 4px;
  }
  .data-list ul li{
    cursor: pointer;
    padding: 4px 0px 0px 24px;
    height: 32px;
  }
  .data-list ul li.active{
    background: #F6F6F6;
  }
  .data-list ul li:hover{
    background: #F6F6F6;
  }
  .data-item{
    width: 20%;
    border-radius: 4px;
    border: 1px solid #CFD0DD;
    margin-right: 20px;
  }
  .permission-item{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 0px 20px;
    border-radius: 0px 4px 4px 0px;
    border: 1px solid #E7E7E7;
  }
  .role-title span{
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
  }
  .role-title p{
    margin-top: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
  }
  .role-box {
    width: 100%;
  }
   .role-box .role-box-title{
     margin-top: 42px;
   }
  .role-box .role-box-title span{
    margin-right: 88px;
    margin-top: 42px;
  }
  .checked-box{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .checked-box > .checked-item{
    width: 156px;
    padding: 10px 0px;
 
  }
  .checked-box > .checked-item {
   
  }
</style>
