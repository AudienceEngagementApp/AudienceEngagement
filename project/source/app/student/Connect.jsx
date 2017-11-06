// @flow

import React from 'react'
import {Http} from 'app/http/Http'
import styles from 'styles/connect.scss'

export class Connect extends React.Component<*>{

    render = (): React$Element<*> => (
      <div className="container">
        <div className="banner-blue">
          Go to InvolveMe.com and enter Session PIN: 432 AZr
        </div>
        <div className="content">
          <span className="total-joined">
            Members joined: 16
          </span>
          <button className="join-session-btn btn">START</button>
        </div>
        <div className="image-row">
          <img src={require('assets/iphoneHand.png')} className="outter" />
          <img src={require('assets/tabletHand.png')} className="inner" />
          <img src={require('assets/samsungHand.png')} className="outter" />
        </div>
        <div className="bottom-content curved-bottom">
          <span>Get your <b>phone</b>, <b>laptop</b>, or <b>tablet</b> out now!</span>
        </div>
      </div>
    )
  }
