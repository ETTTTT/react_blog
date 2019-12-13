import React, {useState}from 'react';
import {Card, Input, Icon, Button, Spin} from 'antd'

import 'antd/dist/antd.css'
import '../static/css/Login.css'

function Login() {
    const [userName, setUserName] = useState('')
    const [password, setpassword] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const checkLogin = () => {
        setisLoading(true)
        setTimeout(()=>{
            setisLoading(false)
        }, 1000)
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