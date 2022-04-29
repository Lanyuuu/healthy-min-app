import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";

const http = axios.create({
  baseURL: "http://localhost:7750/admin/api",
});

http.interceptors.request.use(
  (config) => {
    // ts断言
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    } else if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      ElMessage.warning({
        message: err.response.data.message,
      });
      if (err.response.status == 401) {
        router.push("/login");
      }
    }

    return Promise.reject(err);
  }
);

// 导出默认对象
export default http;
