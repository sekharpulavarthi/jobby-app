import './index.css'

const EmploymentTypeFilter = props => {
  const {employmentItem} = props
  const {label, employmentTypeId, employmentTypesList} = employmentItem
  return (
    <div className="employment-item-container">
      <input
        type="checkbox"
        value={employmentTypeId}
        id={employmentTypeId}
        name={employmentTypesList}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </div>
  )
}

export default EmploymentTypeFilter
