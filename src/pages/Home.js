import React from 'react'
import { observer } from 'mobx-react'  // 监控当前store
import { useStores } from '../stores'

const Home=observer(()=>{
    const {userStore}=useStores()
    return (
        <>
            {
                userStore.currentUser ? <>hello, {userStore.currentUser.attributes.username}</> : <>用户没有登录</>
            }
        </>
    )
})

export default Home