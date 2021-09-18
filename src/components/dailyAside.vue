<template>
    <div>
        <el-container>
            <el-aside
                :width="isCollapse ? '58px' : '200px'"
                :style="{ backgroundColor: $store.state.bgColor }"
            >
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-vertical-demo"
                    :style="{ backgroundColor: $store.state.bgColor }"
                    text-color="#999999"
                    :collapse-transition="false"
                    active-text-color="#ffd04b"
                    :collapse="isCollapse"
                    unique-opened
                    router
                >
                    <div class="asideMenu">
                        <i class="el-icon-s-unfold" @click="toggleCollapse">
                        </i>
                    </div>
                    <div v-for="item in asideMenu" :key="item.path">
                        <template v-if="item.isChildren === 0">
                            <el-menu-item :index="item.path">
                                <img
                                    v-if="activeIndex === item.path"
                                    :src="item.iconisactive"
                                    class="icon_img"
                                    alt=""
                                />
                                <img
                                    v-else
                                    :src="item.iconurl"
                                    class="icon_img"
                                    alt=""
                                />
                                <span slot="title">{{ item.label }}</span>
                            </el-menu-item>
                        </template>
                        <template v-if="item.isChildren === 1">
                            <el-submenu :index="item.path">
                                <template slot="title">
                                    <img
                                        :src="item.iconurl"
                                        class="icon_img"
                                        alt=""
                                    />
                                    <span>{{ item.label }} </span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item
                                        :index="subItem.path"
                                        v-for="subItem in item.children"
                                        :key="subItem.path"
                                    >
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
    data() {
        return {
            activeIndex: this.path,
            asideMenu: [
                {
                    // Facility Booking facilitiesPlanExecuteList
                    path: '/daily/facilityBooking',
                    label: '公共设施设备',
                    iconurl: require('@/assets/images/daily/ssyy_nor.png'),
                    iconisactive: require('@/assets/images/daily/ssyy_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            path: '/daily/facilitiesManagement',
                            label: '设施设备管理'
                        },
                        {
                            path: '/daily/sysOperations',
                            label: '运维管理'
                        },
                        {
                            path: '/daily/bookingManagement',
                            label: '预约管理'
                        },
                        {
                            path: '/daily/facilitiesExecute',
                            label: '检查记录'
                        },

                        {
                            path: '/daily/facilityInspection',
                            label: '设施设备检查'
                        },
                        {
                            path: '/daily/facilityItem',
                            label: '设施设备分类'
                        }
                    ]
                },
                {
                    // xunjiandian
                    path: '/daily/inspection',
                    iconurl: require('@/assets/images/daily/icon_service15_nor.png'),
                    iconisactive: require('@/assets/images/daily/icon_service15_sel.png'),
                    label: '巡检管理',
                    isChildren: 1,
                    children: [
                        {
                            path: '/daily/inspectionPlanExecuteList',
                            label: '巡检记录'
                        },
                        {
                            path: '/daily/inspectionPlan',
                            label: '巡检计划'
                        },
                        {
                            path: '/daily/inspectionRoute',
                            label: '巡检路线'
                        },
                        {
                            path: '/daily/inspectionPoint',
                            label: '巡检点'
                        }
                    ]
                },
                {
                    // Business meeting management
                    path: '/daily/material',
                    label: '物资管理',
                    iconurl: require('@/assets/images/daily/wzgl_nor.png'),
                    iconisactive: require('@/assets/images/daily/wzgl_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            path: '/daily/materialInventory',
                            label: '物料盘点'
                        },
                        {
                            path: '/daily/materialInOut',
                            label: '物料出入库'
                        },
                        {
                            path: '/daily/materialManagement',
                            label: '物料管理'
                        }
                    ]
                },
                {
                    // Report for repair
                    path: '/daily/reportRepair',
                    label: '报事报修',
                    iconurl: require('@/assets/images/butler/icon_service08_nor.png'),
                    iconisactive: require('@/assets/images/butler/icon_service08_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            path: '/daily/reportRepair',
                            label: '报事报修'
                        },
                        {
                            // Item management
                            path: '/daily/engineeringMaintenance',
                            label: '工程维修'
                        }
                    ]
                },
                {
                    // Business meeting management
                    path: '/daily/key',
                    label: '钥匙管理',
                    iconurl: require('@/assets/images/daily/icon_service16_nor.png'),
                    iconisactive: require('@/assets/images/daily/icon_service16_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            path: '/daily/keyManagement',
                            label: '钥匙记录'
                        },
                        {
                            path: '/daily/keyExamine',
                            label: '钥匙审核'
                        }
                    ]
                },
                {
                    // Business meeting management
                    path: '/daily/packageCollection',
                    label: '包裹代收',
                    iconurl: require('@/assets/images/daily/icon_service17_nor.png'),
                    iconisactive: require('@/assets/images/daily/icon_service17_sel.png'),
                    isChildren: 0
                },
                //decorationManagement
                {
                    // Business meeting management
                    path: '/daily/decorationManagement',
                    label: '装修管理',
                    iconurl: require('@/assets/images/daily/zxgl_nor.png'),
                    iconisactive: require('@/assets/images/daily/zxgl_sel.png'),
                    isChildren: 0
                },
                {
                    // Report for repair
                    path: '/daily/housekeepingServices',
                    label: '家政服务',
                    iconurl: require('@/assets/images/butler/jzfw_nor.png'),
                    iconisactive: require('@/assets/images/butler/jzfw_sel.png'),
                    isChildren: 0
                },
                {
                    path: '/daily/loanManagement',
                    // Loan management
                    label: '借还管理',
                    iconurl: require('@/assets/images/butler/icon_service12_nor.png'),
                    iconisactive: require('@/assets/images/butler/icon_service12_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            path: '/daily/loanManagement',
                            label: '物品借还'
                        },
                        {
                            // Item management
                            path: '/daily/itemManagemsent',
                            label: '物品管理'
                        }
                    ]
                },
                {
                    // Business meeting management
                    path: '/daily/CustomerInterview',
                    label: '客户访谈',
                    iconurl: require('@/assets/images/daily/khft_nor.png'),
                    iconisactive: require('@/assets/images/daily/khft_sel.png'),
                    isChildren: 0
                },
                {
                    // Business meeting management
                    path: '/daily/businessManagement',
                    label: '业委会管理',
                    iconurl: require('@/assets/images/daily/icon_service13_nor.png'),
                    iconisactive: require('@/assets/images/daily/icon_service13_sel.png'),
                    isChildren: 0
                },
                //CommunityIntroduction
                {
                    path: '/daily/CommunityIntroduction',
                    label: '小区介绍',
                    iconurl: require('@/assets/images/daily/sqjs_nor.png'),
                    iconisactive: require('@/assets/images/daily/sqjs_sel.png'),
                    isChildren: 0
                },
                {
                    path: '/daily/RegulationManagement',
                    label: '规程管理',
                    iconurl: require('@/assets/images/daily/gcgl_nor.png'),
                    iconisactive: require('@/assets/images/daily/gcgl_sel.png'),
                    isChildren: 0
                },
                {
                    path: '/daily/ServiceBrowsing',
                    label: '服务浏览',
                    iconurl: require('@/assets/images/daily/fwll_nor.png'),
                    iconisactive: require('@/assets/images/daily/fwll_sel.png'),
                    isChildren: 0
                },
                {
                    path: '/daily/greening',
                    label: '绿化管理',
                    iconurl: require('@/assets/images/daily/lhgl_nor.png'),
                    iconisactive: require('@/assets/images/daily/lhgl_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            path: '/daily/GreeningTask',
                            label: '绿化任务'
                        },
                        {
                            path: '/daily/GreeningArea',
                            label: '绿化区域'
                        }
                    ]
                },
                {
                    path: '/daily/health',
                    label: '卫生计划',
                    iconurl: require('@/assets/images/daily/wsgl_nor.png'),
                    iconisactive: require('@/assets/images/daily/wsgl_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            path: '/daily/HealthManagement',
                            label: '卫生管理'
                        },
                        {
                            path: '/daily/HealthArea',
                            label: '卫生区域'
                        }
                    ]
                },
                {
                    path: '/daily/safeManage',
                    label: '安全管理',
                    iconurl: require('@/assets/images/daily/icon_service13_nor.png'),
                    iconisactive: require('@/assets/images/daily/icon_service13_sel.png'),
                    isChildren: 0
                }
            ],
            isCollapse: false
        }
    },
    mounted() {
        console.log(this.activeIndex)
    },
    methods: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
            // console.log(12)
        }
    },
    watch: {
        $route(to, from) {
            this.activeIndex = this.path
        },
        activeIndex() {}
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
