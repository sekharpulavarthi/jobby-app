import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileApiStatus: profileApiStatusConstants.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileData()
  }

  loadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getProfileData = async () => {
    this.setState({profileApiStatus: profileApiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileApiStatus: profileApiStatusConstants.success,
        profileDetails,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstants.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-details-container">
        <img
          src={profileImageUrl}
          className="profile-image"
          alt="profile url"
        />
        <p className="profile-name">{name}</p>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileDetailsFailureView = () => (
    <div>
      <button type="button">Retry</button>
    </div>
  )

  renderProfilePage = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileApiStatusConstants.inProgress:
        return this.loadingView()
      case profileApiStatusConstants.success:
        return this.renderProfileDetails()
      case profileApiStatusConstants.failure:
        return this.renderProfileDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfilePage()}</div>
  }
}

export default Profile
