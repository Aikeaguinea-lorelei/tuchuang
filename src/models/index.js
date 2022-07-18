import AV,{Query,User} from 'leancloud-storage'

AV.init({
    appId: "2hC0vh2ErUIXTrlN8CxBdTXT-gzGzoHsz",
    appKey: "pttpGmBD4cyXEgb2pFJWtGH7",
    serverURL: "https://2hc0vh2e.lc-cn-n1-shared.com"
  });

const Auth={
    // 注册逻辑
    register(username,password){
        let user=new User()
        user.setUsername(username)
        user.setPassword(password)
        return new Promise((resolve,reject)=>{
            user.signUp().then(loginedUser=>{
                console.log('注册成功')
                resolve(loginedUser)
            },error=>{
                reject(error)
            })    
        })
    },
    // 登录逻辑
    login(username,password){
        return new Promise((resolve,reject)=>{
            User.logIn(username, password).then(loginedUser=>resolve(loginedUser), 
            error=>reject(error));    
        })
    },
    // 注销逻辑
    logOut(){
        User.logOut()
    },
    // 获取当前用户信息
    getCurrent(){
        return User.current()
    }
}

export {Auth}