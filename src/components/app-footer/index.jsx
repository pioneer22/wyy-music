import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { musicLinks, footerIcons } from '@/common/page-data'
import './index.scss'

export default memo(function Footer(props) {
  const selectFooterItem = (footerObj, index) => {
    if (index < 4) {
      return (
        <a
          href={footerObj.link}
          key={footerObj.name}
          className="footer-link"
          target="_blank"
          rel="noreferrer"
        >
          {footerObj.name}
        </a>
      )
    } else {
      return (
        <NavLink
          to={footerObj.link}
          key={footerObj.name}
          className="footer-link"
        >
          <span>{footerObj.name}</span>
        </NavLink>
      )
    }
  }

  return (
    <div className="footer-container">
      <div className="w980 footer-content flex-between">
        <div className="footer-left">
          <p>
            {musicLinks.map((item, index) => {
              return selectFooterItem(item, index)
            })}
          </p>
          <p>
            <span className="footer-text">网易公司版权所有©1997-2020</span>
            <span>杭州乐读科技有限公司运营：浙网文[2018]3506-263号</span>
          </p>
          <p>
            <span className="footer-text">
              违法和不良信息举报电话：0571-89853516
            </span>
            <span>举报邮箱：ncm5990@163.com</span>
          </p>
          <p>
            <span className="footer-text">
              粤B2-20090191-18 工业和信息化部备案管理系统网站
            </span>
            <span className="police-logo"></span>
            <span>浙公网安备 33010902002564号</span>
          </p>
        </div>

        <ul className="footer-right flex">
          {footerIcons.map((iconsObj) => {
            return (
              <li className="link flex-column-center" key={iconsObj.name}>
                <a href={iconsObj.link} target="_blank" rel="noreferrer">
                  {' '}
                </a>
                <span>{iconsObj.name}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
})
