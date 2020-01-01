import React, {useState}from 'react';
import {Card, Input, Icon, Button, Spin, message} from 'antd'

import 'antd/dist/antd.css'
import '../static/css/Login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios';

function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setpassword] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const checkLogin = () => {
        setisLoading(true)
        if (!userName) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setisLoading(false)
            }, 500)
            return false
        } else if(!password) {
            message.error('密码不能为空')
            setTimeout(() => {
                setisLoading(false)
            }, 500)
            return false
        }
        let dataProps = {
            userName,
            password
        }
        axios({
            method: 'POST',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true  // 共享session
        }).then(res => {
            setisLoading(false)
            if(res.data.data === '登录成功') {
                localStorage.setItem('openId', res.data.openId)
                // 跳转
                props.history.push('/index')
            } else {
                message.error('用户名密码错误')
            }
        }).catch(() => {
            setisLoading(false)
            message.error('登陆失败')
        })
    }
    return(
        <div className="login-div">
            <Spin tip='Loading...'  spinning={isLoading} >
                <Card title='ET blog System' bordered={false} style={{width:400}}>
                    <Input id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0, .25)'}}/>}
                        onChange= {(e)=>setUserName(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <Input.Password id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<Icon type="key" style={{color: 'rgba(0,0,0, .25)'}}/>}
                        onChange= {(e)=>setpassword(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
                </Card>
            </Spin>           
        </div>
    )
}

export default Login