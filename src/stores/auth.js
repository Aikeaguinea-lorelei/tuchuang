import {observable,action} from 'mobx'

class AuthStore{
    // 默认状态
    @observable isLogin=false
    @observable isLoading=false
    @observable values={
        username:'',
        password:''
    }
    // 行为函数
    @action setIsLogin(isLogin){
        this.isLogin=isLogin
    }
    @action setUserName(username){
        this.values.username=username
    }
    @action setPassword(password){
        this.values.password=password
    }
    @action login(){
        console.log('登陆中...')
        this.isLoading=true
        setTimeout(()=>{
            console.log('登陆成功')
            this.isLogin=true
            this.isLoading=false
        },1000)
    }
    @action register(){
        console.log('注册中...')
        this.isLoading=true
        setTimeout(()=>{
            console.log('注册成功')
            this.isLogin=true
            this.isLoading=false
        },1000)      
    }
    @action logout(){
        console.log('已注销')
    }
}

export {AuthStore}