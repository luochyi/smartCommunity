<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <div class="flex">
          <div class="from_item">
            <div class="from_lable"><span>姓名</span></div>
            <div class="from_content"><span>{{userResident.name}}</span></div>
          </div>
          <div class="from_item">
            <div class="from_lable"><span>手机号</span></div>
            <div class="from_content"><span>{{userResident.tel}}</span></div>
          </div>
          <template v-if="cpmBuildingUnitEstateIdList.length > 0">
            <div class="from_item"
                 v-for="(item,index) in cpmBuildingUnitEstateIdList"
                 :key="'house'+index">
              <div class="from_lable"><span>房屋产权{{index + 1}}</span></div>
              <div class="from_content"><span>{{item}}</span></div>
            </div>
          </template>

          <template v-if="cpmParkingSpaceIdList.length > 0">
            <div class="from_item"
                 v-for="(item,index) in cpmParkingSpaceIdList"
                 :key="'park' + index">
              <div class="from_lable"><span>车位产权{{index + 1}}</span></div>
              <div class="from_content"><span>{{item}}</span></div>
            </div>
          </template>

        </div>
      </FromCard>
      <FromCard style="margin:30px">
        <span slot="title">家庭成员</span>
        <div class="content-table">
          <template>
            <el-table :data="tableData"
                      highlight-current-row
                      :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
                      style="width: 100%">
              <el-table-column label="序号"
                               width="80"
                               type="index">
              </el-table-column>
              <el-table-column prop="name"
                               label="姓名">
              </el-table-column>
              <el-table-column prop="tel"
                               label="手机号">
              </el-table-column>
              <el-table-column prop="identity"
                               label="身份">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </FromCard>
      <div slot="footer">
        <button class="btn-orange"
                @click="onSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="drawerClose"><span>取消</span></button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { userResidentFindById } from '@/api/basic'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: () => false
    },
    drawerTitle: {
      type: String,
      default: () => "业主详情"
    },
    owerId: {
      type: Number,
      default: () => null
    }
  },
  data () {
    return {
      drawer_vrisible: false,
      tableData: [],
      userResident: {},
      cpmBuildingUnitEstateIdList: [],
      cpmParkingSpaceIdList: []
    }
  },
  methods: {
    onSubmit () {

    },
    getData (id) {
      let resData = {
        id: id
      }
      userResidentFindById(resData).then(res => {
        console.log(res)
        this.tableData = res.voRelativesList
        this.cpmParkingSpaceIdList = res.cpmParkingSpaceIdList
        this.userResident = res.userResident
        this.cpmBuildingUnitEstateIdList = res.cpmBuildingUnitEstateIdList
      })
    },
    drawerClose () {
      this.drawer_vrisible = false;
      this.$emit('handleClose', 'Close')
    },
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.drawer_vrisible = newValue
      }
    },
    owerId: {
      handler (newValue) {
        this.getData(newValue)
      }
    },
  }
}
</script>

<style scoped lang='scss'>
.flex {
    margin: 17px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .from_item {
        display: flex;
        align-items: center;
        width: 50%;
        margin-bottom: 30px;
        .from_lable {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            text-align: right;
            width: 80px;
        }
        .from_content {
            width: 80px;
            margin-left: 24px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
        }
    }
}
</style>

