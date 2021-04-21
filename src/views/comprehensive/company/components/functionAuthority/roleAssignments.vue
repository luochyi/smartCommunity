<template>
  <div class="data-content">
    <div class="data-box">
        <div class="data-item">
          <div class="data-item_title">
            <span>{{item_title}}</span>
          </div>
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
          <div class="permission-input">
            <template>
              <span>请选择部门：</span>
              <el-select v-model="value" size="mini" placeholder="请选择" style="width:240px">
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </template>
          </div>
          <div class="permission-btn">
              <el-button size="small"  type="primary">查询</el-button>
              <el-button size="small">重置</el-button>
          </div> 
          <div>
            <el-button size="small"  @click="drawer = true"   type="primary">添加员工</el-button>
          </div>
          <div class="per-box">
             <div>
           <el-table
            :data="tableData"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            style="width: 100%">
            <el-table-column
              prop="dataName"
              label="昵称（系统名）"
              width="180">
            </el-table-column>
            <el-table-column
              prop="allData"
              label="主要部门"
              width="180">
            </el-table-column>
            <el-table-column
              prop="allFw"
              label="职位"
              width="180">
            </el-table-column>
            <el-table-column
              prop="status"
              label="角色"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
                  <template>
                      <el-button type="text" size="small">启用</el-button>
                      <el-button type="text" size="small">删除 </el-button>       
                    </template>
            </el-table-column>
           </el-table>
           <template>
           <div class="pagination-box">
           <div class="pagination-item">
              <p>当前1-3，共3条 <span>每页显示10条</span></p>
           </div>
            <div class="pagination-item">
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    
                    :page-size="100"
                    background
                    :pager-count="9"
                    layout="prev, pager, next,jumper"
                    :total="900"
                    >
                  </el-pagination>
                </div>
           </div>
           </div>
           </template>
          <!--点击启用之后的弹窗-->
          <template>
              <el-drawer
                title="我是标题"
                size="52%"
                :visible.sync="drawer"
                :with-header="false"
               >
                  <add-role></add-role>
              </el-drawer>
          </template>
        </div>
          </div>
        </div>
    </div>
    

  </div>
</template>

<script>
import addRole from './addRole.vue'

export default {
  data () {
    return {
      cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value: '',
      drawer:false,
      item_title:'全部人员',
       tableData: [{
          dataName: '汤飞刚',
          allData: '房屋管理维修部',
          allFw:"电工",
          status:"-",
        },
        {
          dataName: '李玉刚',
          allData: '房屋管理维修部',
          allFw:"水泥工",
          status:"-",
        },
        {
          dataName: '李曾',
          allData: '房屋管理维修部',
          allFw:"水电工",
          status:"-",
        },
        {
          dataName: '张磊',
          allData: '房屋管理维修部',
          allFw:"保安",
          status:"-",
        }]
   }
  },
  components:{
    addRole
  },
  methods: {
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
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
    height: 418px;
    margin: 20px 20px 28px 20px;
    display: flex;
    background: #FFFFFF;
    border-radius: 4px 0px 0px 4px;

  }
  .data-item_title{
    padding: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
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
  .permission-item .per-box{
    width: 100%;
  }
  .permission-input{
    margin-right: 88px;
  }
  .permission-btn{
    flex: 1;
  }
  .pagination-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pagination-item{
    height: 68px;
    display: flex;
    align-items: center;
  }
</style>
