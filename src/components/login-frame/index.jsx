/* eslint-disable no-useless-constructor */
import React, { memo, useState } from 'react'
import './index.scss'
import { useDispatch } from 'react-redux'
import {
  changeShowLoginFrame,
  changeUserMsg,
  changeLoginStatus,
} from '@/redux/actions/header'
import { loginPosition, usualReg } from '@/common/page-data'
import { debounce } from 'lodash'

import {
  toSendCode,
  proofCaptcha,
  toRegister,
  proofPhone,
  toLogin,
} from '@/api/global'

import { Card, Button, message, Form, Input, Checkbox } from 'antd'
import {
  CloseOutlined,
  PhoneOutlined,
  UserAddOutlined,
} from '@ant-design/icons'

export default memo(function LoginFrame(props) {
  const [title, setTitle] = useState('登录')
  const [type, setType] = useState('login')
  const [isSendState, setIsSendState] = useState(false) // 发送验证码状态
  const [seconds, setSeconds] = useState(60) // 倒计时
  const [phone, setPhone] = useState(null) // 手机号
  const [nickName, setNickName] = useState('') // 昵称
  const [captcha, setCaptcha] = useState('') // 验证码
  const [password, setPassword] = useState('') // 密码
  const [loginCheck, setLoginCheck] = useState(true) // 选中自动登录
  const dispatch = useDispatch()

  // 切换页面
  const switchPanel = (type) => {
    setType(type)
    switch (type) {
      case 'register':
        setTitle('注册')
        break
      default:
        setTitle('登录')
        break
    }
  }

  const toLoginPage = (index) => {
    message.warn('未做~')
  }

  // 发送验证码
  const sendCode = () => {
    // 发送验证码
    if (!isSendState) {
      setIsSendState(true)
      let i = 0
      const timer = setInterval(() => {
        i++
        setSeconds(60 - i)
        if (i > 60) {
          clearInterval(timer)
          setIsSendState(false)
          setSeconds(60)
        }
      }, 1000)

      if (usualReg.phoneReg.test(phone)) {
        toSendCode({ phone }).then((res) => {
          if (res.code === 200) message.success('发送成功')
        })
      } else {
        message.warn('发送失败, 请输入正确手机号~')
      }
    }
  }

  // 提交成功
  const onFinish = debounce((values) => {
    switch (type) {
      case 'register':
        let { phone, captcha, nickname, password } = values
        // 验证验证码和手机号
        Promise.all([
          proofCaptcha({ phone, captcha }),
          proofPhone({ phone }),
        ]).then((res) => {
          if (res[0].data && res[1].exist === -1) {
            // 验证成功，提交注册
            toRegister({ phone, captcha, nickname, password }).then((res) => {
              if (res.code === 200) {
                message.success('注册成功~')
              }
            })
          }
        })
        break
      case 'phone':
        toLogin({ password: values.password, phone: values.phone }).then(
          (res) => {
            if (res.code === 200) {
              message.success('登录成功~')
              // 保存登录
              localStorage.setItem('m_uid', res.profile.userId)
              dispatch(changeShowLoginFrame(false))
              dispatch(changeUserMsg(res))
              dispatch(changeLoginStatus(true))
            } else {
              message.error(`${res.message}`)
            }
          }
        )
        break
      default:
        break
    }
  }, 400)

  // 提交失败
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.error('请正确输入信息再提交~')
  }
  return (
    <div className="login-frame-container">
      <div className="login-frame-box">
        <Card
          title={title}
          extra={
            <CloseOutlined
              onClick={() => {
                setType('login')
                setTitle('登录')
                dispatch(changeShowLoginFrame(false))
              }}
            />
          }
          style={{ width: 500 }}
        >
          <div
            className="card-box"
            style={{ display: type === 'login' ? 'block' : 'none' }}
          >
            <div className="flex">
              <div className="card-box-left">
                <div className="card-img"></div>
                <div className="flex-between">
                  <Button
                    type="ghost"
                    onClick={() => {
                      switchPanel('register')
                    }}
                    shape="round"
                    icon={<UserAddOutlined />}
                    className="gap"
                  >
                    注册
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<PhoneOutlined />}
                    onClick={() => {
                      switchPanel('phone')
                    }}
                  >
                    手机号登录
                  </Button>
                </div>
              </div>
              <div className="card-box-right">
                {loginPosition.map((posObj, index) => {
                  return (
                    <div
                      className="login-icon-box flex-column"
                      key={index}
                      onClick={() => {
                        toLoginPage(index)
                      }}
                    >
                      <i className="theme-logo" style={posObj.style}></i>
                      <span className="text-line">{posObj.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <Form
            style={{ display: type === 'register' ? 'block' : 'none' }}
            name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{ span: 12 }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                {
                  pattern: usualReg.phoneReg,
                  required: true,
                  message: '请输入正确手机号码~',
                },
              ]}
            >
              <Input
                value={phone}
                onChange={({ target }) => {
                  setPhone(target.value)
                }}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  pattern: usualReg.pwdReg,
                  required: true,
                  message: '请输入6-18位字母,数字,_,- 密码~',
                },
              ]}
            >
              <Input.Password
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value)
                }}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 19 }}
              style={{ marginBottom: '0px' }}
            >
              <div className="send-code">
                {isSendState ? (
                  <span className="text-line">{seconds}s</span>
                ) : (
                  <span className="text-line" onClick={sendCode}>
                    发送验证码
                  </span>
                )}
              </div>
            </Form.Item>

            <Form.Item
              label="验证码"
              name="captcha"
              rules={[
                {
                  pattern: /(\d){4}/,
                  required: true,
                  message: '验证码为四位~',
                },
              ]}
            >
              <Input
                value={captcha}
                onChange={({ target }) => {
                  setCaptcha(target.value)
                }}
              />
            </Form.Item>

            <Form.Item
              label="昵称"
              name="nickName"
              rules={[
                {
                  required: true,
                  message: '昵称不能为空~',
                },
              ]}
            >
              <Input
                value={nickName}
                onChange={({ target }) => {
                  setNickName(target.value)
                }}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 15,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                style={{ width: '100%' }}
              >
                注册
              </Button>
            </Form.Item>
          </Form>

          <Form
            style={{ display: type === 'phone' ? 'block' : 'none' }}
            name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{ span: 12 }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                {
                  pattern: usualReg.phoneReg,
                  required: true,
                  message: '请输入正确手机号码~',
                },
              ]}
            >
              <Input
                value={phone}
                onChange={({ target }) => {
                  setPhone(target.value)
                }}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  pattern: usualReg.pwdReg,
                  required: true,
                  message: '请输入6-18位字母,数字,_,- 密码~',
                },
              ]}
            >
              <Input.Password
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value)
                }}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 4, span: 15 }}
            >
              <div className="flex-between-center">
                <Checkbox
                  checked={loginCheck}
                  onChange={() => {
                    setLoginCheck(!loginCheck)
                  }}
                >
                  自动登录
                </Checkbox>
                <span
                  className="text-line"
                  onClick={() => {
                    message.warn('未做~')
                  }}
                >
                  忘记密码
                </span>
              </div>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 15,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                style={{ width: '100%' }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
})
