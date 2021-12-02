/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import './index.scss'
import { connect } from 'react-redux'
import { changeShowLoginFrame, changeUserMsg } from '@/redux/actions/header'
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

class LoginFrame extends Component {
  constructor(props) {
    super(props)
    this.onFinish = debounce(this.onFinish, 400)
    this.onFinish.bind(this)
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  state = {
    title: '登录',
    type: 'login',
    isSendState: false, // 发送验证码状态
    seconds: 60, // 倒计时
    phone: null, // 手机号
    nickName: '', // 昵称
    captcha: '', // 验证码
    password: '', // 密码
    loginCheck: true, // 选中自动登录
  }

  // 切换页面
  switchPanel(type) {
    this.setState({ type })
    switch (type) {
      case 'register':
        this.setState({ title: '注册' })
        break
      default:
        this.setState({ title: '登录' })
        break
    }
  }

  toLogin(index) {
    message.warn('未做~')
  }

  // 发送验证码
  sendCode() {
    // 发送验证码
    if (!this.state.isSendState) {
      this.setState({ isSendState: true })
      let i = 0
      const timer = setInterval(() => {
        i++
        this.setState({ seconds: 60 - i })
        if (i > 60) {
          clearInterval(timer)
          this.setState({ isSendState: false, seconds: 60 })
        }
      }, 1000)

      const { phone } = this.state
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
  onFinish(values) {
    const { type } = this.state
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
              this.props.changeShowLoginFrame(false)
              this.props.changeUserMsg(res)
            } else {
              message.error(`${res.message}`)
            }
          }
        )
        break
      default:
        break
    }
  }

  // 提交失败
  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo)
    message.error('请正确输入信息再提交~')
  }

  render() {
    const {
      title,
      type,
      isSendState,
      seconds,
      phone,
      captcha,
      nickname,
      password,
      loginCheck,
    } = this.state
    return (
      <div className="login-frame-container">
        <div className="login-frame-box">
          <Card
            title={title}
            extra={
              <CloseOutlined
                onClick={() => {
                  this.setState({ type: 'login', title: '登录' })
                  this.props.changeShowLoginFrame(false)
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
                        this.switchPanel('register')
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
                        this.switchPanel('phone')
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
                          this.toLogin(index)
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
              onFinish={(values) => {
                this.onFinish(values)
              }}
              onFinishFailed={(values) => {
                this.onFinishFailed(values)
              }}
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
                    this.setState({ phone: target.value })
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
                    this.setState({ password: target.value })
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
                    <span
                      className="text-line"
                      onClick={() => {
                        this.sendCode()
                      }}
                    >
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
                    this.setState({ captcha: target.value })
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
                  value={nickname}
                  onChange={({ target }) => {
                    this.setState({ nickname: target.value })
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
              onFinish={(values) => {
                this.onFinish(values)
              }}
              onFinishFailed={(values) => {
                this.onFinishFailed(values)
              }}
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
                    this.setState({ phone: target.value })
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
                    this.setState({ password: target.value })
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
                      this.setState({ loginCheck: !loginCheck })
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
  }
}

export default connect(
  (store) => ({
    header: store.header,
  }),
  { changeShowLoginFrame, changeUserMsg }
)(LoginFrame)
