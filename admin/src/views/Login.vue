<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.prevent="login">
        <el-form-item label="名称">
          <el-input type="text" v-model="data.model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="data.model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import http from "@/network/http";
import { ElMessage } from "element-plus";

const data = reactive({
  model: {
    username: "",
    password: "",
  },
});

const router = useRouter();
async function login() {
  const res = await http.post("/login", data.model);
  localStorage.token = res.data.token;

  router.push("/");
  ElMessage.success({
    message: "登录成功!",
  });
}
</script>

<style scope>
.login-container {
  width: 25rem;
  margin: 5rem auto;
}
</style>
