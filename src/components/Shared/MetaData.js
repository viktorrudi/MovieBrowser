import React from 'react'

import Typography from '@material-ui/core/Typography'

/**
 * This component is used to render meta data for media types.
 * See components Person, TV and Movie inside MediaTypes
 * @param {Object} metaData Map of label and data to display for media type
 */
export default function MetaData({ metaData }) {
  return (
    <div>
      <ul style={{ padding: 0, textAlign: 'center' }}>
        {Object.entries(metaData)
          .map(([label, data]) => {
            if (!data) return null
            return (
              <li
                style={{
                  display: 'inline-flex',
                  listStyleType: 'none',
                  margin: '0 10px',
                }}
                key={label}
              >
                <Typography variant="caption" style={{ marginRight: 5 }}>
                  {label}
                </Typography>
                <Typography style={{ fontSize: '1.5rem' }}>{data}</Typography>
              </li>
            )
          })
          .filter(Boolean)}
      </ul>
    </div>
  )
}
