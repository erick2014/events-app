import React from 'react';
import PropTypes from 'prop-types';

const ProfileIcon = (props) => {
    const {
        fullName,
        shortName
    } = props;

    return (
        <div className="profile-icon">
            <div className="profile-icon__circle">{shortName}</div>
            <div className="profile-icon__name">{fullName}</div>
        </div>
    );
};

ProfileIcon.defaultProps = {
    fullName: '',
    shortName: ''
};

ProfileIcon.propTypes = {
    fullName: PropTypes.string,
    shortName: PropTypes.string
};

export default ProfileIcon;
