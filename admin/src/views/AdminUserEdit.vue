<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-width="100px">
      <el-form-item label="管理员名称">
        <el-input class="left-margin" v-model="data.model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          class="left-margin"
          type="password"
          v-model="data.model.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="http.defaults.baseURL + '/upload'"
          :headers="data.headers"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="data.model.avatar" :src="data.model.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import http from "../network/http";
import { Plus } from "@element-plus/icons-vue";

const router = useRouter();
const data = reactive({
  model: {
    username: "",
    avatar: "",
    password: "",
  },
  headers: { Authorization: `Bearer ${localStorage.token || ""}` },
});

const props = defineProps({
  id: {},
});

async function save(): Promise<void> {
  if (props.id) {
    await http.put(`/currency/admin_users/${props.id}`, data.model);
  } else {
    await http.post("/currency/admin_users", data.model);
  }
  router.push("/admin_users/list");
  ElMessage("保存成功!");
}

async function getEditName(): Promise<void> {
  const res = await http.get(`/currency/admin_users/${props.id}`);
  data.model = res.data;
}
props.id && getEditName();

// 图片上传后
function afterUpload(res: { url: string }): void {
  data.model.avatar = res.url;
}
</script>

<style scoped>
.category {
  text-align: left;
  padding-left: 20px;
}
.left-margin {
  width: 500px;
}

/* 
  在scoped中渲染子组件的几种方式：
  1. :deep(选择器)
  2. .avatar-uploader >>> .el-upload
*/
.avatar-uploader:deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  height: 178px;
  width: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  height: 178px;
  width: 178px;
  display: block;
}
</style>
