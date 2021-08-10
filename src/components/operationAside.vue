<template>
    <div>
        <el-container>
            <el-aside :width="isCollapse ? '58px' : '200px'">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-vertical-demo"
                    background-color="#2B2C4B"
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
                    path: '/operation/announcementManagement',
                    label: '通知公告',
                    iconurl: require('@/assets/images/operation/icon_operate01_nor.png'),
                    iconisactive: require('@/assets/images/operation/icon_operate01_sel.png'),
                    isChildren: 0,
                    children: [
                        {
                            // Announcement management
                            path: '/operation/announcementManagement',
                            label: '公告管理'
                        },
                        {
                            // Notification management
                            path: '/operation/notificationManagement',
                            label: '通知管理'
                        }
                    ]
                },
                {
                    // community activity
                    path: '/operation/communityActivity',
                    label: '社区活动',
                    iconurl: require('@/assets/images/operation/icon_operate02_nor.png'),
                    iconisactive: require('@/assets/images/operation/icon_operate02_sel.png'),
                    icon: 'el-icon-message',
                    isChildren: 1,
                    children: [
                        {
                            // Announcement management
                            path: '/operation/eventManagement',
                            label: '活动管理'
                        },
                        {
                            // Notification management
                            path: '/operation/sponsorManagement',
                            label: '主办方管理'
                        }
                    ]
                },
                {
                    // Voting management
                    path: '/operation/votingManagement',
                    iconurl: require('@/assets/images/operation/icon_operate03_nor.png'),
                    iconisactive: require('@/assets/images/operation/icon_operate03_sel.png'),
                    label: '投票管理',
                    isChildren: 0
                },
                {
                    // zixun
                    path: '/operation/consultation',
                    label: '资讯管理',
                    iconurl: require('@/assets/images/operation/icon_operate04_nor.png'),
                    iconisactive: require('@/assets/images/operation/icon_operate04_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            // consultation Release
                            path: '/operation/consultationRelease',
                            label: '资讯发布'
                        },
                        {
                            // consultation Item
                            path: '/operation/consultationItem',
                            label: '资讯分类'
                        }
                    ]
                },
                {
                    // zixun
                    path: '/operation/shopping',
                    label: '电子商务',
                    iconurl: require('@/assets/images/operation/icon_operate05_nor.png'),
                    iconisactive: require('@/assets/images/operation/icon_operate05_sel.png'),
                    isChildren: 1,
                    children: [
                        {
                            path: '/operation/shoppingInfo',
                            label: '电商信息'
                        },
                        {
                            // consultation Item
                            path: '/operation/shoppingItem',
                            label: '电商分类'
                        }
                    ]
                }
            ],
            isCollapse: false
        }
    },
    methods: {
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
            console.log(12)
        }
    },
    watch: {
        $route(to, from) {
            this.activeIndex = this.path
        }
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
