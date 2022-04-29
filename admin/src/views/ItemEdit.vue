<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="100px">
      <el-form-item label="物品">
        <el-input class="left-margin" v-model="data.model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="http.defaults.baseURL + '/upload'"
          :headers="data.headers"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="data.model.icon" :src="data.model.icon" class="avatar" />
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
    name: "",
    icon: "",
  },
  headers: { Authorization: `Bearer ${localStorage.token || ""}` },
});

const props = defineProps({
  id: {},
});

async function save(): Promise<void> {
  if (props.id) {
    await http.put(`/rest/item/${props.id}`, data.model);
  } else {
    await http.post("/rest/item", data.model);
  }
  router.push("/item/list");
  ElMessage("保存成功！");
}

async function getEditName(): Promise<void> {
  const res = await http.get(`/rest/item/${props.id}`);
  data.model = res.data;
}
props.id && getEditName();

// 图片上传后
function afterUpload(res: { url: string }): void {
  data.model.icon = res.url;
}
console.log(data.model.icon);
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
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
