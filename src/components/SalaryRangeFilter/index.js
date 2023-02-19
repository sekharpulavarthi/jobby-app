import './index.css'

const SalaryRangeFilter = props => {
  const {salaryRangeItem} = props
  const {salaryRangeId, label} = salaryRangeItem

  return (
    <div className="sarary-range-items-container">
      <p>{label}</p>
    </div>
  )
}

export default SalaryRangeFilter
