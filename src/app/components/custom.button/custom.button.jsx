import React from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = {
  btn: {
    color: '#fff',
    backgroundColor: '#22d486',
    '&:hover': {
      backgroundColor: '#00a158'
    },
    width: 240,
    height: 57
  }
}

const CustomBtn = props => {
  const { classes, text, onClickHandler } = props
  return (
    <Button variant='raised' classes={{raised: classes.btn}} onClick={onClickHandler}>
      {text}
    </Button>
  )
}

export default withStyles(styles)(CustomBtn)
