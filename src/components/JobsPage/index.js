import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsPage extends Component {
  state = {
    profileApiStatus: profileApiStatusConstants.initial,
    jobsApiStatus: jobsApiStatusConstants.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
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

  getJobsData = async () => {
    this.setState({jobsApiStatus: profileApiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/jobs'
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    console.log(profileDetails)
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-details-container">
        <img
          src={profileImageUrl}
          className="profile-image"
          alt="profile url"
        />
        <p>{name}</p>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderProfileDetailsFailureView = () => (
    <div>
      <button type="button">Retry</button>
    </div>
  )

  renderJobs = () => {}

  renderJobsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="jobs-failure"
      />
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

  renderJobsPage = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case jobsApiStatusConstants.inProgress:
        return this.loadingView()
      case jobsApiStatusConstants.success:
        return this.renderJobs()
      case jobsApiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        {this.renderProfilePage()}
        <div>
          <input type="search" className="search-input" />
          {this.renderJobsPage()}
        </div>
      </div>
    )
  }
}

export default JobsPage
