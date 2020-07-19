// 1.引入express
const express = require('express')

// 2.从express中导出app服务器对象
const app = express()

// 引入mock
const Mock = require('mockjs')
// 导出Random方法 获取随机数
const Random = Mock.Random
// 得到中文的随机数
Random.ctitle()

// 解决跨域
// use是express中的一个中间件
app.use((req, res, next) => {
  //设置响应头
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'content-type,token')
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  //调用下一个中间件
  next()
})

// 4.配置后台路由，获取数据
app.get('/admin/edu/subject/:page/:limit', (req, res) => {
  // req 请求对象
  // res 响应对象
  // req请求数据 通过params拿到浏览器上传的路由参数page limit
  let { page, limit } = req.params

  // 定义data数据 这是死数据
  // const data = {
  //   total: 10,
  //   items: []
  // }
  // 上面是死数据 现在我们利用mock模拟动态数据
  const data = Mock.mock({
    // 总条数 可以用mock中的方法得到随机数
    // Random.regeter(min,max) 参数是一个范围 得到的就是这个范围的数据
    total: Random.integer(+limit + 2, limit * 2),
    // 得到一页10条数据
    ['items|' + limit]: [{
      // 自己的id 要从1开始 递增每次加1
      '_id|+1': 1,
      // 标题
      title: '@ctitle(2,5)',
      // 父级id固定的
      parentId: 0
    }]
  })


  // res返回数据 后台返回来的应该是json格式的字符串
  // 把对象转成json格式的字符串，返回给浏览器
  res.json({
    code: 20000,
    success: true,
    // data是真正要返回给浏览器的数据
    data: data,
    //响应信息
    message: ''
  })
})

// 3.调用listen方法开启服务
app.listen(8888, (err) => {
  if (err) {
    console.log('f服务器启动失败')
  }
  console.log('服务已经开启，8888号为你服务~~')
})