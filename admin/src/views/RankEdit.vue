<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新建" }}推荐饮食</h1>
    <el-form label-width="100px">
      <el-form-item label="食物名称">
        <el-input class="left-margin" v-model="data.model.name"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select
          v-model="data.model.kind"
          filterable
          placeholder="选择"
        >
          <el-option
            v-for="(item, index) in data.categories"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps, computed } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import http from "../network/http";

const router = useRouter();
const data = reactive({
  model: {
    name: "",
    kind: "",
  },
  categories: [
    "谷薯芋、杂豆、主食",
    "蛋类、肉类及制品",
    "奶类及制品",
    "蔬果和菌藻",
    "坚果、大豆及制品",
    "饮料",
    "零食、点心、冷饮"
  ],
  headers: { Authorization: `Bearer ${localStorage.token || ""}` },
});

const props = defineProps({
  id: {},
});

async function save(): Promise<void> {
  if (props.id) {
    await http.put(`/currency/ranks/${props.id}`, data.model);
  } else {
    await http.post("/currency/ranks", data.model);
  }
  router.push("/ranks/list");
  ElMessage("保存成功!");
}

async function getEditName(): Promise<void> {
  const res = await http.get(`/currency/ranks/${props.id}`);
  data.model = res.data;
}
props.id && getEditName();

// 图片上传后
// function afterUpload(res: { url: string }): void {
//   data.model.avatar = res.url;
// }
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
