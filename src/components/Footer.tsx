import React from 'react'

export const Footer: React.FC = (): JSX.Element => {
  const year = new Date().getFullYear()
  return (
    <div className="ui text center aligned container footer">
      <div className="ui basic segment">
        <div style={{ color: 'rgba(0,0,0,.6)' }}>
          <i aria-hidden="true" className="copyright outline icon" /> {year}
        </div>
      </div>
    </div>
  )
}

export default Footer
