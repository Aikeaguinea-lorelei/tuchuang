import {observable,action, makeObservable} from 'mobx'
import {Auth} from '../models/index.js'
import UserStore from './user'
import { message } from 'antd'
import HistoryStore from './history'
import ImageStore from './history'

class AuthStore{
    // 这句代码为了能成功创建监听事件
    constructor(){
        makeObservable(this)
    }
    // 默认状态
    @observable values={
        username:'',
        password:''
    }
    // 行为函数
    @action setUserName(username){
        this.values.username=username
    }
    @action setPassword(password){
        this.values.password=password
    }
    @action login(){
        return new Promise((resolve,reject)=>{
            Auth.login(this.values.username,this.values.password)
                .then(user=>{  // 如果成功
                    UserStore.pullUser()  // 读取用户信息
                    console.log('登录成功')
                    resolve(user)
                }).catch(err=>{  // 如果失败
                    UserStore.resetUser()
                    message.error('登陆失败,请检查用户名和密码是否正确')
                    reject(err)
                })
        })
    }
    @action register(){
        return new Promise((resolve,reject)=>{
            Auth.register(this.values.username,this.values.password)
                .then(user=>{  // 如果成功
                    UserStore.pullUser()  // 读取用户信息  (初始值null)
                    console.log('注册成功')
                    resolve(user)
                }).catch(err=>{  // 如果失败
                    UserStore.resetUser()  // 注销信息
                    message.error('注册失败')
                    reject(err)
                })
        })
    }
    @action logOut(){
        Auth.logOut()
        UserStore.resetUser()
        HistoryStore.reset()  // 注销页面的时候也重置数据
        ImageStore.reset()
    }
}

export default new AuthStore()