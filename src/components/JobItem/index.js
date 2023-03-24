import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobItem} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-item-container">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            className="company-logo-url"
            alt="company logo"
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
        <h1 className="description-text">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
