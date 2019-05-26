// @vendors
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const styles = {
    btn: {
        color: '#fff',
        fontSize: 16,
        backgroundColor: '#22d486',
        '&:hover': {
            backgroundColor: '#00a158'
        },
        width: 240,
        height: 57
    }
};

const CustomBtn = ({ classes, onClickHandler, text }) => (
    <Button
        classes={{ raised: classes.btn }}
        onClick={onClickHandler}
        variant="raised"
    >
        {text}
    </Button>
);

CustomBtn.propTypes = {
    classes: PropTypes.object.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default withStyles(styles)(CustomBtn);
