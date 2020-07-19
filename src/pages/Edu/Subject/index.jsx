import React, { Component } from 'react'

// 从antd中引入其他组件
import { Button, Table } from 'antd'

// 从@ant-design/icons引入字体图标库
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'

// 引入获取一级课程分类数据的api方法
import { reqGetSubjectList } from '@api/edu/subject'

// 引入样式文件
import './index.css'

// 表格内容数据
const columns = [
  { title: '分类名称', dataIndex: 'title', key: 'title' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    // 控制整一列的宽
    width: 160,
    // render在这里是展示这一列的数据
    render: () => (
      <>
        {/* 引入字体图标的两种用法 */}
        <Button type="primary" className='subject_update'><FormOutlined /></Button>
        <Button type='danger'><DeleteOutlined /></Button>
      </>
    )
  }
]
// 表格数据（不是动态数据）
const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
]

export default class Subject extends Component {
  // 定义状态数据
  state = {
    subject: {
      total: 0,
      items: []
    }
  }
  // 页面挂载的时候显示数据
  async componentDidMount () {
    // 调用api
    const res = await reqGetSubjectList(1, 10)
    // 修改状态数据
    this.setState({
      subject: res
    })
  }
  render () {
    return (
      <div className='subject'>
        <Button type='primary' className='subject_btn'>
          <PlusOutlined />
          新建
        </Button>
        <Table
          // 控制列
          columns={columns}
          // 控制可展开项
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            // 可展开项是否需要展开
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          // 表格中要显示的数据data
          dataSource={this.state.subject.items}
          // rowkey
          rowKey='_id'
        />
      </div>
    )
  }
}
