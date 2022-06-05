<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        router
        :default-openeds="['1']"
        unique-opened
        default-active="router.path"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><message /></el-icon>用户管理
          </template>
          <el-menu-item-group>
            <template #title>分类</template>
            <el-menu-item index="/users/create">新建用户</el-menu-item>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><message /></el-icon>推荐饮食管理
          </template>
          <el-menu-item-group>
            <template #title>推荐饮食</template>
            <el-menu-item index="/ranks/create">新建推荐饮食</el-menu-item>
            <el-menu-item index="/ranks/list">推荐饮食列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><message /></el-icon>食物管理
          </template>
          <el-menu-item-group>
            <template #title>英雄</template>
            <el-menu-item index="/foods/create">新建食物</el-menu-item>
            <el-menu-item index="/foods/list">食物列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><message /></el-icon>运动管理
          </template>
          <el-menu-item-group>
            <template #title>运动</template>
            <el-menu-item index="/sports/create">新建运动</el-menu-item>
            <el-menu-item index="/sports/list">运动列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><message /></el-icon>管理员账户
          </template>
          <el-menu-item-group>
            <template #title>管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <el-icon style="margin-right: 15px"><setting /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>Tom</span>
      </el-header>

      <!-- 区分组件, -->
      <router-view :key="$route.path"></router-view>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Message, Setting } from "@element-plus/icons";

import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Message,
    Setting,
    // 'icon-menu': Menu,
  },
  setup() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    };

    const tableData = ref(Array(20).fill(item));
    const router = useRouter();
    return {
      tableData,
      router,
    };
  },
});
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}
</style>
