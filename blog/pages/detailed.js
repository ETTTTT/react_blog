import React from 'react'
import Head from 'next/head'
import axios from 'axios';
import {Row, Col , Icon ,Breadcrumb, Affix} from 'antd'
import 'markdown-navbar/dist/navbar.css';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'

import servicePath from '../config/apiUrl'



const Detailed = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  // renderer.heading = (text, level, raw) => {
  //   const anchor = tocify.add(text, level)
  //   return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  // }
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  // renderer: 这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
  // gfm：启动类似Github样式的Markdown,填写true或者false
  // pedatic：只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
  // sanitize: 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
  // tables： 支持Github形式的表格，必须打开gfm选项
  // breaks: 支持Github换行符，必须打开gfm选项，填写true或者false
  // smartLists：优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
  // highlight: 高亮显示规则 ，这里我们将使用highlight.js来完成
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
                      <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                      <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>

                <div>
                    <div className="detailed-title">
                    {props.title}
                    </div>
                
                    <div className="list-icon center">
                      <span><Icon type="calendar" /> {props.addTime}</span>
                      <span><Icon type="folder" /> {props.typeName}</span>
                      <span><Icon type="fire" /> {props.view_count}人</span>
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
                  <div className="toc-list">
                    {tocify && tocify.render()}
                  </div>
              </div>
            </Affix>
          </Col>
        </Row>
        <Footer/>
    </>
  )
}


Detailed.getInitialProps = async context => {
    let id = context.query.id
    const promise = new Promise((resolve, reject) => {
      axios(servicePath.getArticleById +id).then(res => {
        resolve(res.data.data[0])
      })
    })

    return await promise
}


export default Detailed