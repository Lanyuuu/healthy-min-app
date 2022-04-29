<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="100px">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="英雄">
            <el-input v-model="data.model.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img
                v-if="data.model.avatar"
                :src="data.model.avatar"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="data.model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="data.model.categories" multiple>
              <el-option
                v-for="item of data.categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="data.model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="data.model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="data.model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="data.model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="data.model.items1" multiple>
              <el-option
                v-for="item of data.items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="data.model.items2" multiple>
              <el-option
                v-for="item of data.items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="data.model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input
              type="textarea"
              v-model="data.model.battleTips"
            ></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="data.model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-form-item>
            <el-button
              size="small"
              @click="
                data.model.skills.push({
                  icon: '',
                  name: '',
                  description: '',
                  tips: '',
                })
              "
            >
              <el-icon class="addr-icon"><plus /></el-icon>添加技能
            </el-button>
          </el-form-item>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in data.model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="http.defaults.baseURL + '/upload'"
                  :headers="data.headers"
                  :show-file-list="false"
                  :on-success="( res: any) => item.icon = res.url"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><plus
                  /></el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="data.model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button style="margin-top: 1rem" @click="save">保存</el-button>
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
  headers: { Authorization: `Bearer ${localStorage.token || ""}` },
  model: {
    name: "",
    avatar: "",
    title: "",
    categories: "",
    scores: {
      difficult: 0,
      skills: 0,
      attack: 0,
      survive: 0,
    },
    items1: "",
    items2: "",
    usageTips: "",
    battleTips: "",
    teamTips: "",
    skills: [{ icon: "", name: "", description: "", tips: "" }],
  },
  categories: [
    {
      name: "",
      _id: "",
    },
  ],
  items: [
    {
      name: "",
      _id: "",
    },
  ],
});

const props = defineProps({
  id: {},
});

async function save(): Promise<void> {
  if (props.id) {
    await http.put(`/rest/heroes/${props.id}`, data.model);
  } else {
    await http.post("/rest/heroes", data.model);
  }
  router.push("/heroes/list");
  ElMessage("保存成功！");
}

async function getEditName(): Promise<void> {
  const res = await http.get(`/rest/heroes/${props.id}`);
  data.model = Object.assign({}, data.model, res.data);
}
props.id && getEditName();

async function getCategories(): Promise<void> {
  const res = await http.get(`/rest/categories`);
  data.categories = res.data;
}
getCategories();

async function getItems(): Promise<void> {
  const res = await http.get(`/rest/items`);
  data.items = res.data;
}
getItems();

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
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 4rem;
  height: 4rem;
  display: block;
}
.el-input {
  width: 500px;
}

.addr-icon {
  width: 6px;
  margin-right: 15px;
}
</style>
