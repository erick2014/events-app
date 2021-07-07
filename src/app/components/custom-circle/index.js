import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Add, Done } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    greenCircle: {
        color: '#fff',
        backgroundColor: '#00C766',
        width: 56,
        height: 56,
        cursor: 'pointer'
    },
    blackCircle: {
        color: '#fff',
        backgroundColor: '#323C46',
        width: 56,
        height: 56,
        cursor: 'pointer'
    }
};

const CustomCircle = (props) => {
    const {
        classes,
        color,
        onClickIcon
    } = props;

    let style = null;
    let icon = null;

    if (color && color === 'greenCircle') {
        style = classes.greenCircle;
        icon = <Done />;
    } else {
        icon = <Add />;
        style = classes.blackCircle;
    }

    return (
        <Avatar className={style} onClick={onClickIcon}>
            {icon}
        </Avatar>
    );
};

export default withStyles(styles)(CustomCircle);
