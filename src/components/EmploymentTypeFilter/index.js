import './index.css'

const EmploymentTypeFilter = props => {
  const {employmentItem, onChangeTypeFilter} = props
  const {label, employmentTypeId} = employmentItem
  const onChangeTypeFilterItem = () => {
    onChangeTypeFilter(employmentTypeId)
  }

  return (
    <li className="employment-item-container">
      <input
        type="checkbox"
        value={employmentTypeId}
        id={employmentTypeId}
        onChange={onChangeTypeFilterItem}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentTypeFilter
