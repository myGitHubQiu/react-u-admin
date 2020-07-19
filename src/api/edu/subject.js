// 所有跟课程的api都在这里定义
import request from "@utils/request"
// 基础路径
const BASE_URL = "/admin/edu/subject"
// mock路径
const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取一级课程分类数据的api方法
export function reqGetSubjectList (page, limit) {
  return request({
    // http://localhost:8888/admin/edu/subject/1/10
    url: `${MOCK_URL}/${page}/${limit}`,
    method: "GET",
  });
}