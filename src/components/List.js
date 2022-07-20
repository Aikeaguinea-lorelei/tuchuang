import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import InfiniteScroll from 'react-infinite-scroll-component';
import { List, Spin } from 'antd'
import styled from 'styled-components'

const Img=styled.img`
    width:100px;
    height:120px;
    object-fit:contain;
    border:1px solid #eee;
`

const Component=observer(()=>{
    const { HistoryStore }=useStores()
    const data=HistoryStore.limit
    // 请求: 获取历史数据(只执行一次)
    useEffect(() => {
        // 进入页面时: 加载
        HistoryStore.find()
        // 离开页面时: 重置
        return()=>{
            HistoryStore.reset()
        }
    }, [])
    const loadMore=()=>{
        HistoryStore.find()
    }
    return (
        <div>
            <InfiniteScroll
                dataLength={data}
                initialLoad={true}
                pageStart={0}
                loadMore={loadMore}
                hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
                useWindow={false}
            >
                <List
                    dataSource={HistoryStore.list}
                    renderItem={
                        // 遍历item
                        item=>{
                            return <List.Item key={item.id}>
                                <div>
                                    <Img src={item.attributes.url.attributes.url}/>
                                </div>
                                <div>
                                    <h5>{item.attributes.filename}</h5>
                                </div>
                                <div>
                                    <a target="_blank" herf={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
                                </div>
                            </List.Item>
                        }
                    }
                >
                    {HistoryStore.isLoading && HistoryStore.hasMore && (
                        <div>
                            <Spin tip="加载中"/>
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    )
})

export default Component