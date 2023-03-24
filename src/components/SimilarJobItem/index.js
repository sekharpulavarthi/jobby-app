import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {similarJobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobItemDetails
  return (
    <li>
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          className="company-logo-url"
          alt="similar job company logo"
        />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="rating-logo" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobItem
