import React,{ useState,useEffect } from 'react'
import LogoUrl from './logo.svg'
import { NavLink,useHistory } from 'react-router-dom'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import { useStores } from '../stores'
import { observer } from 'mobx-react'  // 监控当前组件

const Header=styled.header`
    padding:10px 100px;
    display:flex;
    align-items:center;
    background-color:#02101f;
    color:#fff;
`;
const Logo=styled.img`
    height:30px;
`;
const StyledLink=styled(NavLink)`
    color:#fff;
    margin-left:30px;

    &.active{
        border-bottom:1px solid #fff;
    }
`;
const Login=styled.div`
    margin-left:auto
`;
const StyledButton=styled(Button)`
    margin-left:10px;
`
const Component=observer(()=>{
    const {UserStore,AuthStore}=useStores()   // 拿到用户信息
    const history=useHistory()  // history.push('/XXX') 跳转到xxx页面

    const handleLogout=()=>{
        AuthStore.logOut()
    }
    const handleLogin=()=>{
        console.log('跳转到登录页面')
        history.push('/login')
    }
    const handleRegister=()=>{
        console.log('跳转到注册页面')
        history.push('/register')
    }
    useEffect(()=>{
        UserStore.pullUser();
    },[])
    
    return (
        <Header>
            <Logo src={LogoUrl}/>
            <nav>
                {/* activeClassName: 选中哪项时,哪项的class里面有active */}
                <StyledLink to="/" activeClassName='active' exact>首页</StyledLink>
                <StyledLink to="/history" activeClassName='active'>上传历史</StyledLink>
                <StyledLink to="/about" activeClassName='active'>关于我</StyledLink>
            </nav>
            <Login>
                {/* isLogin是true的时候显示注销按钮,是false的时候显示登录注册 */}
                {/* 点击登录按钮,setIsLogin状态改为为true => isLogin状态也变成true => 显示注销 */}
                {/* 点击注销按钮,setIsLogin状态改为为false => isLogin状态也变成false => 显示登录注册 */}
                {
                    UserStore.currentUser ? <>
                        {UserStore.currentUser.attributes.username} <StyledButton type="primary" onClick={handleLogout}>注销</StyledButton>
                    </> : <>
                        <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                        <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton> 
                    </>
                }
            </Login>
        </Header>
    )
})

export default Component