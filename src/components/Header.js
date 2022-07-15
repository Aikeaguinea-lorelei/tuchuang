import React from 'react'
import LogoUrl from './logo.svg'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import Login from '../pages/Login'

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
function Component(){
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
                <button>登录</button>
                <button>注册</button>
            </Login>
        </Header>
    )
}

export default Component