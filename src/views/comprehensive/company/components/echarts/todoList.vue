<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="待处理" name="first"
                ><el-card
                    shadow="hover"
                    v-for="(item, index) in arr"
                    :key="index"
                    :style="{
                        width: '493px',
                        height: '119px',
                        marginTop: '10px',
                        backgroundColor: '#F9F9F9'
                    }"
                >
                    {{ item }}</el-card
                ></el-tab-pane
            >
            <!-- <el-tab-pane label="处理中" name="second">处理中</el-tab-pane>
            <el-tab-pane label="已处理" name="third">已处理</el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr: [1, 2, 3, 4, 5],
            activeName:'first'
        }
    }
}
</script>

<style>
</style>