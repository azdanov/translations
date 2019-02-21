import React from 'react'

export const Footer: React.FC = (): JSX.Element => {
  const year = new Date().getFullYear()
  return (
    <div style={{ position: 'relative', marginTop: '3rem' }}>
      <div className="footer-backdrop" />
      <div className="ui text center aligned container footer">
        <div className="ui basic segment">
          <i aria-hidden="true" className="copyright outline icon" /> {year}
        </div>
      </div>
    </div>
  )
}
