import React, { Component } from 'react'
import { Legacy } from './Legacy'

export default class extends Component {
  static getInitialProps = async (ctx) => {
    return {
      searchValue: ctx.query.id
    }
  }

  render() {
    return <Legacy {...this.props} />
  }
}
