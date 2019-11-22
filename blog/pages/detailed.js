import React from 'react'
import Head from 'next/head'
import axios from 'axios';
import {Row, Col , Icon ,Breadcrumb, Affix} from 'antd'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'



const Detailed = (props) => {
  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer: renderer,
    gfm: true, // 启动类似github的marked
    pedantic: false, // true 完全不容错， false:不符合marked的时候 会自动改正
    sanitize: false, // 忽略html标签，如果有iframe直接回忽略
    tables: true, // 是否允许可以输出表格，样式是github的样式。如果这个为true，gfm也必须为true
    breaks: false, // 是否支持github的换行符合 为true的时候gfm也必须为true
    smartLists: true, // 让列表样式好看一点
    highlight: (code) => { // 如何让传的代码高亮
      return hljs.highlightAuto(code).value
    }
  })

let html = marked(props.article_content)
  return (
      <>
        <Head>
          <title>博客详细页</title>
        </Head>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
                  <div className="bread-div">
                    <Breadcrumb>
                      <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                      <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                      <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>

                <div>
                    <div className="detailed-title">
                    xxx
                    </div>
                
                    <div className="list-icon center">
                      <span><Icon type="calendar" /> 2019-06-28</span>
                      <span><Icon type="folder" /> 视频教程</span>
                      <span><Icon type="fire" /> 5498人</span>
                    </div>
                  
                    <div className="detailed-content" 
                      dangerouslySetInnerHTML = {{__html:html}}
                    >
                    </div>
                </div>
                </div>
          </Col>

          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert />
            <Affix offsetTop={5}>
              <div className="detailed-nav comm-box">
                  <div className="nav-title">文章目录</div>
                  <MarkNav
                    className="article-menu"
                    source={html}
                    ordered={false}
                  />
              </div>
            </Affix>
          </Col>
        </Row>
        <Footer/>
    </>
  )
}


Detailed.getInitialProps = async context => {
    console.log(context)
    let id = context.query.id
    const promise = new Promise((resolve, reject) => {
      axios('http://127.0.0.1:7001/default/getArticleById/' +id).then(res => {
        console.log(res)
        resolve(res.data.data[0])
      })
    })

    return await promise
}


export default Detailed