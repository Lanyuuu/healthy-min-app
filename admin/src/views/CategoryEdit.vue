<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="100px">
      <el-form-item label="上级分类">
        <el-select v-model="data.model.parent" filterable placeholder="选择">
          <el-option
            v-for="item in data.parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="data.model.name"></el-input>
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

const router = useRouter();
const data = reactive({
  model: {
    name: "",
    parent: "",
  },
  parents: [
    {
      _id: "",
      name: "",
    },
  ],
});
const props = defineProps({
  id: {},
});

async function fetchParents() {
  const res = await http.get("/rest/categories");
  data.parents = res.data;
}
fetchParents();



async function save(): Promise<void> {
  if (props.id) {
    await http.put(`/rest/categories/${props.id}`, data.model);
  } else {
    console.log(data.model);
    await http.post("/rest/categories", data.model);
  }
  router.push("/categories/list");
  ElMessage("保存成功！");
}

async function getEditName(): Promise<void> {
  const res = await http.get(`/rest/categories/${props.id}`);
  data.model.name = res.data.name;
  data.model.parent = res.data.parent;
}
props.id && getEditName();
</script>

<style scoped>
.category {
  text-align: left;
  padding-left: 20px;
}

.el-input {
  width: 500px;
}
</style>
