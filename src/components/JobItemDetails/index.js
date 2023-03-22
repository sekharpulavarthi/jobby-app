import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const skills = data.job_details.skills.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      }))

      const similarJobs = data.similar_jobs.map(similarJob => ({
        companyLogoUrl: similarJob.company_logo_url,
        employmentType: similarJob.employment_type,
        id: similarJob.id,
        jobDescription: similarJob.job_description,
        location: similarJob.location,
        rating: similarJob.rating,
        title: similarJob.title,
      }))

      const formattedJobDetailsData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills,
      }

      this.setState({
        jobDetails: formattedJobDetailsData,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetailsView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      title,
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetails
    const {imageUrl, description} = lifeAtCompany
    return (
      <div className="job-item-container">
        <div>
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              className="company-logo-url"
              alt={title}
            />
            <div className="title-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-logo" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment-package-container">
            <div className="location-employment-container">
              <div className="location-container">
                <MdLocationOn className="location-logo" />
                <p className="location">{location}</p>
              </div>
              <div className="employment-type-container">
                <BsBriefcaseFill className="employment-logo" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="des-url-container">
            <h1 className="description-text">Description</h1>
            <a href={companyWebsiteUrl} target="__blank">
              Visit
            </a>
          </div>
          <h1 className="description">{jobDescription}</h1>
        </div>
        <div className="skills-container-v1">
          <h2 className="skills-heading">Skills</h2>
          <ul className="skills-container-v2">
            {skills.map(skill => (
              <li key={skill.name} className="skill-logo-container">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="tech-logo"
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="life-at-company-container">
          <h1>Life at Company</h1>
          <div>
            <p>{description}</p>
            <img
              src={imageUrl}
              alt="life-at-company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <ul>
          <h1>Similar Jobs</h1>
          {similarJobs.map(eachJob => (
            <SimilarJobItem similarJobItemDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobItemDetails}>
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderJobItemDetails()}</div>
  }
}

export default JobItemDetails
