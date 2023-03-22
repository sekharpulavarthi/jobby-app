import './index.css'

const SalaryRangeFilter = props => {
  const {salaryRangeItem, onChangeSalaryRange, salaryRangesList} = props
  const {salaryRangeId, label} = salaryRangeItem

  const onChangeSalaryRangeItem = () => {
    onChangeSalaryRange(salaryRangeId)
  }

  return (
    <li className="sarary-range-items-container">
      <input
        id={salaryRangeId}
        value={salaryRangeId}
        type="radio"
        name={salaryRangesList}
        onChange={onChangeSalaryRangeItem}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRangeFilter
