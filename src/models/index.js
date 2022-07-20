import AV, { Query, User } from 'leancloud-storage'

AV.init({
    appId: "2hC0vh2ErUIXTrlN8CxBdTXT-gzGzoHsz",
    appKey: "pttpGmBD4cyXEgb2pFJWtGH7",
    serverURL: "https://2hc0vh2e.lc-cn-n1-shared.com"
});

const Auth = {
    // 注册逻辑
    register(username, password) {
        let user = new User()
        user.setUsername(username)
        user.setPassword(password)
        return new Promise((resolve, reject) => {
            user.signUp().then(loginedUser => {
                console.log('注册成功')
                resolve(loginedUser)
            }, error => {
                reject(error)
            })
        })
    },
    // 登录逻辑
    login(username, password) {
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(loginedUser => resolve(loginedUser),
                error => reject(error));
        })
    },
    // 注销逻辑
    logOut() {
        User.logOut()
    },
    // 获取当前用户信息
    getCurrent() {
        return User.current()
    }
}

const Uploader = {
    // 上传图片函数
    add(file,filename){  // 输入图片file和filename
        const item=new AV.Object('Image')  // item为上传的图片
        const avFile=new AV.File(filename, file)
        item.set('filename',filename)
        item.set('owner',AV.User.current())
        item.set('url',avFile)
        return new Promise((resolve,reject)=>{
            item.save().then((serverFile)=>{
                resolve(serverFile)  // 输出对应的文件,让人调用
            },error=>{
                reject(error)
            })
        })
    },
    // 查询历史记录函数
    find(page=0,limit=10){  // 查找第page页,每页limit个
        const query=new AV.Query('Image')
        query.include('owner')
        query.limit(limit)
        query.skip(page*limit)
        query.descending('createdAt')
        query.equalTo('owner',AV.User.current())
        return new Promise((resolve,reject)=>{
            query.find()
                .then((results)=>{
                    resolve(results)
                }).catch((error)=>{
                    reject(error)
                })
        })
    }
}
window.Uploader=Uploader

export { Auth, Uploader }