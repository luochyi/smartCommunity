<template>
  <div>
    <div class="comprehensive">
      <div class="box flex">
        <div class="lf">
          <div class="title">
            <span>全部员工</span>
          </div>
          <div class="lf-list">
            <div class='list-item'
                 v-for="(item ,index) in roleList"
                 :key='item.id'>
              <div class="list-title">
                <span>{{item.name}}</span>
              </div>
              <div class='item'
                   @click="roleCheck(role.id,index,role.name)"
                   :class="roleId===role.id?'active':''"
                   v-for="role in item.voRoleList"
                   :key="role.id">
                <span>{{role.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rg content">
          <div>
            <div class='title'>
              {{roleName}}
            </div>
            <div>
              预设所有对象的查看列表及详情权限
            </div>
            <div>
              <div class='item-list'
                   v-for="jurisdiction in jurisdictionList"
                   :key="jurisdiction.id">
                <div class='item-title'>
                  <span>{{jurisdiction.name}}</span>
                  <!-- <el-checkbox :value="jurisdiction.isCheck === 1">{{jurisdiction.name}}</el-checkbox> -->
                </div>
                <div class='flex align-center flex-wrap'>
                  <div class='item'
                       v-for="item in jurisdiction.voListJurisdictionList"
                       :key="item.id">
                    <el-checkbox :value="item.isCheck === 1"
                                 @change='(value)=>jurisdictionChange(value,item)'>{{item.name}}</el-checkbox>
                  </div>
                  <!--   <el-checkbox-group 
                          v-model="checkedCities"
                          :min="1"
                          :max="2">
                          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group> -->
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { functionAuthorityRoleList, functionAuthorityUpdateOneJurisdiction, functionAuthorityListJurisdiction } from '@/api/company'
export default {
  props: {
    show: {
      type: Boolean,
      default: () => false,
    }
  },
  data () {
    return {
      roleList: [],
      roleId: null,
      checked: false,
      jurisdictionList: [],
      roleName: ''
    }
  },
  created () {
    this.GetRoleList()
  },
  methods: {
    // 角色列表
    GetRoleList () {
      functionAuthorityRoleList().then(res => {
        this.roleList = res
        // this.roleId = res[0].id
        // this.getData()
      })
    },
    // 功能权限信息
    getData () {
      let resData = {
        roleId: this.roleId
      }
      functionAuthorityListJurisdiction(resData).then(res => {
        console.log(res)
        this.jurisdictionList = res
      })
    },
    roleCheck (id, index, roleName) {
      this.roleId = id
      this.roleName = roleName
      this.getData()
    },
    jurisdictionChange (e, item) {
      console.log(e, item)
      if (item.isCheck === 0) {
        item.isCheck = 1
      } else {
        item.isCheck = 0
      }
      let resData = {
        roleId: this.roleId,
        jurisdictionId: item.id,
      }
      functionAuthorityUpdateOneJurisdiction(resData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.status_icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 10px;
    border-radius: 50%;
    background: #52c41a;
}
.box {
    margin: 20px;
}
.lf {
    width: 20%;
    height: auto;
    max-height: 600px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #cfd0dd;
    padding: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    .title {
        font-weight: 500;
        color: #333333;
        cursor: pointer;
    }
    .list-item {
        margin-top: 20px;

        .list-title {
            font-weight: 400;
            color: #999999;
        }
        font-weight: 400;
        color: #333333;
        .item {
            padding: 15px;
            &:hover {
                background: #f6f6f6;
                border-radius: 2px;
            }
            &.active {
                background: #f6f6f6;
                border-radius: 2px;
            }
        }
    }
}
.rg {
    margin: 0 20px;
    flex: 1;
    border-radius: 4px;
    max-height: 600px;
    height: auto;
    overflow: auto;
    overflow: auto;
    border: 1px solid #cfd0dd;
    .title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        margin-bottom: 20px;
    }
    .tips {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
    }
    .item-list {
        margin-top: 40px;
        .item-title {
            padding-bottom: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #333333;
        }
        .item {
            width: 150px;
            margin: 10px 0;
        }
    }
}
</style>