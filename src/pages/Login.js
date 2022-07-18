import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components'
import { useStores } from '../stores'
import { useHistory } from 'react-router-dom';

const Wrapper=styled.div`
    max-width:600px;
    margin:30px auto;
    box-shadow:2px 2px 4px rgba(0,0,0,0.2);
    border-radius:4px;
    padding:20px;
`;
const Title=styled.h1`
    text-align:center;
`

const App = () => {
  const { AuthStore }=useStores()
  const history=useHistory()

  const onFinish = (values) => {
    console.log('Success:', values);
    AuthStore.setUserName(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.login()
      .then(()=>{
        console.log('登陆成功,跳转到首页')
        history.push('/')
      }).catch(()=>{
        console.log('登陆失败')
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const ValidateUsername=(rule,value)=>{
    if(/\W/.test(value)) return Promise.reject('只能输入字母/数字/下划线')
    if(value.length<4 || value.length>10) return Promise.reject('输入内容的长度应为4-10个字符')
    // 否则的话:
    return Promise.resolve()
  };

  return (
    <Wrapper>
    <Title>登录</Title>
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            validator: ValidateUsername
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
          {
            min: 4,
            message: '最少输入4个字符',
          },
          {
            max: 16,
            message: '最多输入16个字符',
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 20,
        }}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    </Wrapper>
  )
};

export default App;