import React from 'react'

import { withStyles } from 'material-ui/styles'
import Chip from 'material-ui/Chip'

const styles = {
  chip: {
    'color': '#949EA8',
    'backgroundColor': '#D9DCE1'
  }
}

const AttendeeCircle = props => {
  const { labelText, classes } = props
  return (
    <Chip label={labelText} classes={{root: classes.chip}} />
  )
}

export default withStyles(styles)(AttendeeCircle)
