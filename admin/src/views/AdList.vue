<template>
  <h1>物品列表</h1>
  <el-table :data="data.items" style="width: 100%">
    <el-table-column prop="_id" label="ID" />
    <el-table-column prop="img" label="图片">
      <template #default="scope">
        <img :src="scope.row.img" style="height: 3rem" />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button size="mini" @click="editCategory(scope.row._id)">
          编辑
        </el-button>
        <el-button size="mini" type="danger" @click="removeCategory(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<!-- 
  1.使用TypeScript语言，
  2.使用setup
  -Vue3.2 setup的语法糖写法
-->
<script lang="ts" setup>
// 从vue按需导入reaction，
// -reaction：vue3中动态绑定对象和数组，是proxy的封装
import { reactive } from "vue";
// 导入http封装的axios请求服务器
import http from "../network/http";
// 使用router.push功能，
// -useRouter：由于vue3使用了setup组合式API，在生命周期中是在beforCreate之前，故不能使用this获取$router
import { useRouter } from "vue-router";
// 使用element-Ui中的两个消息弹出框
import { ElMessageBox, ElMessage } from "element-plus";

// 定义响应式数据data，
// -reactive定义的数据不能直接赋值，例：data = req.data，数据只能更新内部的，故items只能定义在data内部
const data = reactive({
  items: [],
});
// 异步获取列表数据
async function getItem() {
  // 从服务端获取列表数据
  const req = await http.get("/rest/ads");
  // 把列表数据保存到items，方便后续使用
  data.items = req.data;
}
// 页面进入时更新列表
getItem();

// 使用router，-不能直接使用useRouter()
const router = useRouter();
// 能跳转到需要编辑行，编辑页面方法
function editCategory(id: string) {
  // 使用router跳转到行id所在的页面
  router.push(`/ads/edit/${id}`);
}

// 删除点击时所在行的方法
async function removeCategory(row: { title: string; _id: string }) {
  // 弹出一个警告框
  ElMessageBox.confirm(`你是否要删除 ${row.title} 广告?`, "警告", {
    // 把警告框确认文本为 确认
    confirmButtonText: "确认",
    // 警告框取消文本为 取消
    cancelButtonText: "取消",
    // 弹出框类型为 警告
    type: "warning",
  })
    // 若确认，则删除 -异步等待，不阻塞其他函数运行
    .then(async () => {
      // 等待服务器删除行
      await http.delete(`/rest/ads/${row._id}`);
      // 更新列表
      getItem();
      // 弹出消息提示
      ElMessage({
        // 弹出框为 成功
        type: "success",
        // 弹出框内容为 删除成功
        message: "删除成功",
      });
    })
    // 若取消，则弹出取消提示框
    .catch(() => {
      // 弹出消息提示
      ElMessage({
        // 弹出框为 消息
        type: "info",
        // 弹出框内容为 取消删除
        message: "取消删除",
      });
    });
}
</script>

<style scope></style>
