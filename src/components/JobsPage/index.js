import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Profile from '../Profile'
import Header from '../Header'
import EmploymentTypeFilter from '../EmploymentTypeFilter'
import SalaryRangeFilter from '../SalaryRangeFilter'

import JobItem from '../JobItem'
import './index.css'

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    jobsApiStatus: jobsApiStatusConstants.initial,
    jobsData: [],
    salaryRange: '',
    employmentTypes: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  loadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getEmploymentTypes = () => {
    const {employmentTypes} = this.state
    let concatenatedString = ''
    concatenatedString = employmentTypes.map(item => item).join(',')

    return concatenatedString
  }

  getJobsData = async () => {
    const {salaryRange, searchInput} = this.state
    this.setState({jobsApiStatus: jobsApiStatusConstants.inProgress})
    const employmentsTypes = this.getEmploymentTypes()
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentsTypes}&minimum_package=${salaryRange}&search=${searchInput}`
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
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsData: updatedData,
        jobsApiStatus: jobsApiStatusConstants.success,
      })
    }
  }

  renderJobs = () => {
    const {jobsData} = this.state
    const shouldShowJobs = jobsData.length > 0

    return shouldShowJobs ? (
      <ul className="jobs-container">
        {jobsData.map(eachItem => (
          <JobItem jobItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
    )
  }

  renderJobsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="jobs-failure"
      />
    </div>
  )

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

  onChangeTypeFilter = employmentTypeId => {
    const {employmentTypes} = this.state

    if (employmentTypes.includes(employmentTypeId)) {
      const updatedList = employmentTypes.filter(
        item => item !== employmentTypeId,
      )

      this.setState({employmentTypes: updatedList}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          employmentTypes: [...prevState.employmentTypes, employmentTypeId],
        }),
        this.getJobsData,
      )
    }
  }

  renderEmploymentTypeFilter = () => (
    <ul>
      {employmentTypesList.map(employmentItem => (
        <EmploymentTypeFilter
          employmentItem={employmentItem}
          key={employmentItem.employmentTypeId}
          employmentTypesList={employmentTypesList}
          onChangeTypeFilter={this.onChangeTypeFilter}
        />
      ))}
    </ul>
  )

  onChangeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobsData)
  }

  renderSalaryRangeContainer = () => (
    <ul>
      {salaryRangesList.map(salaryRangeItem => (
        <SalaryRangeFilter
          salaryRangeItem={salaryRangeItem}
          key={salaryRangeItem.salaryRangeId}
          onChangeSalaryRange={this.onChangeSalaryRange}
          salaryRangesList={salaryRangesList}
        />
      ))}
    </ul>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobsData)
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div>
            <Profile />
            <div className="employment-type-filter-container">
              {this.renderEmploymentTypeFilter()}
            </div>
            <div className="salary-range-container">
              {this.renderSalaryRangeContainer()}
            </div>
          </div>
          <div>
            <input
              type="search"
              className="search-input"
              onChange={this.onChangeSearchInput}
              value={searchInput}
            />
            {this.renderJobsPage()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsPage
