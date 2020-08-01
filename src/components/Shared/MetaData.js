import React from 'react'

import Typography from '@material-ui/core/Typography'

/**
 * This component is used to render meta data for media types.
 * See components Person, TV and Movie inside MediaTypes
 * @param {Object} metaData Map of label and data to display for media type
 */
export default function MetaData({ metaData }) {
  return (
    <div className="MetaData">
      <ul>
        {Object.entries(metaData)
          .map(([label, data]) => {
            if (!data) return null
            return (
              <li key={label}>
                <Typography variant="caption">{label}</Typography>
                <Typography className="MetaData-data">{data}</Typography>
              </li>
            )
          })
          .filter(Boolean)}
      </ul>
    </div>
  )
}
