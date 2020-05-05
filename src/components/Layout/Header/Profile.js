/**
 * @function Profile - Dropdown for profile settings and actions
 *
 * @param {object} currentUser - should contains at least FirstName
 * @param {object} [userOrdersSummary] - data regarding the rejected/pending orders of the user in an approval process of the store
 */

import React, { Component } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import SignOut from './SignOut'
import SignIn from './SignIn'
import urlGenerator from '$ustoreinternal/services/urlGenerator'
import './Profile.scss'
import { Link } from '$routes'
import themeContext from '$ustoreinternal/services/themeContext'
import { t } from '$themelocalization'
import Icon from '$core-components/Icon'
import { UStoreProvider } from "@ustore/core";

const createLink = (anonymous, loginURL, pageTitle, additional) => {
  const { languageCode } = themeContext.get()
  const pageURL = urlGenerator.get({ page: pageTitle })

  if (anonymous) {
    return `${loginURL}&returnNGURL=/${pageURL.slice(pageURL.indexOf(languageCode))}`
  }

  return `${pageURL}${additional ? '?' + additional : ''}`
}

class Profile extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isDropdownOpen: false
    }
  }

  toggle() {
    this.setState(prevState => ({
      isDropdownOpen: !prevState.isDropdownOpen
    }))
  }

  render() {
    const { currentUser, userOrdersSummary } = this.props
    const { userID, storeID, classicUrl, securityToken, storeFriendlyID, languageCode } = themeContext.get()

    const userIDFromStore = UStoreProvider.state.get().currentUser.ID
    const tempUserId = (!userID || (userIDFromStore && userIDFromStore !== userID)) ? userIDFromStore : userID

    if (!currentUser) {
      return null
    }

    const rejectedOrderCount = (userOrdersSummary) ? userOrdersSummary.RejectedOrderCount : null
    const pendingApprovalOrderCount = (userOrdersSummary) ? userOrdersSummary.PendingApprovalOrderCount : null
    const loginPage = `${classicUrl}/logout.aspx?tempUserId=${tempUserId}&SecurityToken=${securityToken}&StoreGuid=${storeID}&storeid=${storeFriendlyID}&NgLanguageCode=${languageCode}&forceLogin=true&ShowRibbon=false`
    const IsAnonymous = currentUser.IsAnonymous

    return (
      <Dropdown
        isOpen={this.state.isDropdownOpen}
        toggle={this.toggle}
        className="profile"
      >
        <DropdownToggle
          tag='div'
          data-toggle='dropdown'
        >
          {/*<i className="fas fa-user fa-lg"></i>*/}
          <div className="profile-icon-container">
            <Icon name="user.svg" width="20px" height="20px" className="profile-icon" />
            {
              pendingApprovalOrderCount > 0 &&
              <div className="notification-icon">
                <Icon name="profile-notification.svg" width="20px" height="20px" className="profile-icon" />
              </div>
            }
          </div>
        </DropdownToggle>
        <DropdownMenu right>
          {
            IsAnonymous
              ? <SignIn />
              : <SignOut currentUser={currentUser} />
          }
          <div className="dd-body">
            <Link to={createLink(IsAnonymous, loginPage, 'order-history', 'filter=0')}>
              <DropdownItem tag="a">{t('Profile.My_orders')}</DropdownItem>
            </Link>
            {userOrdersSummary && currentUser.Roles.Shopper &&
              <Link to={createLink(IsAnonymous, loginPage, 'order-history', 'filter=2')}>
                <DropdownItem tag="a">{t('Profile.Rejected_orders', { rejectedOrderCount })}</DropdownItem>
              </Link>
            }
            {userOrdersSummary && currentUser.Roles.Approver &&
              <Link to={createLink(IsAnonymous, loginPage, 'order-approval-list')}>
                <DropdownItem tag="a"
                  className={(pendingApprovalOrderCount > 0) ? 'bold' : ''}>{t('Profile.Orders_to_approve', { pendingApprovalOrderCount })}</DropdownItem>
              </Link>
            }
            <Link to={urlGenerator.get({ page: 'drafts' })}>
              <DropdownItem tag="a" className="drafts">{t('Profile.Draft_orders')}</DropdownItem>
            </Link>
            <Link to={createLink(IsAnonymous, loginPage, 'my-recipient-lists')}>
              <DropdownItem tag="a">{t('Profile.Recipient_lists')}</DropdownItem>
            </Link>
            <Link to={createLink(IsAnonymous, loginPage, 'addresses')}>
              <DropdownItem tag="a">{t('Profile.Addresses')}</DropdownItem>
            </Link>
            <Link to={createLink(IsAnonymous, loginPage, 'personal-information')}>
              <DropdownItem tag="a">{t('Profile.Personal_information')}</DropdownItem>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default Profile
