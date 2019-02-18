import React from 'react'

export const Footer: React.FC = (): JSX.Element => {
  const year = new Date().getFullYear()
  return (
    <div style={{ position: 'relative', marginTop: '3rem' }}>
      <div
        style={{
          width: '100%',
          height: '65px',
          position: 'absolute',
          zIndex: 0,
          bottom: 0,
          background: 'white',
        }}
      />
      <div className="ui text center aligned container footer">
        <div className="ui basic segment">
          <div style={{ color: 'hsl(211, 12%, 43%)', marginBottom: '0.5rem' }}>
            <i aria-hidden="true" className="copyright outline icon" /> {year}
          </div>
        </div>
      </div>
    </div>
  )
}
