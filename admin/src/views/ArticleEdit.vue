<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="100px">
      <el-form-item label="所属分类">
        <el-select
          v-model="data.model.categories"
          filterable
          placeholder="选择"
          multiple
        >
          <el-option
            v-for="item in data.categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="data.model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章" style="width: 70%">
        <editor
          api-key="0t0077c39qp9nj5rfej4tuykt14r789zqqszow1kmws3u2p1"
          :init="{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
          }"
          v-model="data.model.body"
        />
      </el-form-item>
      <el-form-item style="margin-top: 7rem">
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

import Editor from "@tinymce/tinymce-vue";

const router = useRouter();
const data = reactive({
  model: {
    title: "",
    categories: "",
    body: "",
  },
  categories: [
    {
      _id: "",
      name: "",
    },
  ],
});

const props = defineProps({
  id: {},
});

async function fetchCategories() {
  const res = await http.get("/rest/categories");
  data.categories = res.data;
}
props.id && fetchCategories();

async function save(): Promise<void> {
  if (props.id) {
    await http.put(`/rest/articles/${props.id}`, data.model);
  } else {
    await http.post("/rest/articles", data.model);
  }
  console.log(data.model.body);

  router.push("/articles/list");
  ElMessage("保存成功!");
}

async function getEditName(): Promise<void> {
  const res = await http.get(`/rest/articles/${props.id}`);
  console.log(res.data);
  
  data.model.title = res.data.title;
  data.model.categories = res.data.categories;
  data.model.body = res.data.body;
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
