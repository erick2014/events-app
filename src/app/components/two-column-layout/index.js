// @vendors
import React from 'react';
import PropTypes from 'prop-types';

// start wars img
import startWars from 'images/starWars.png'

import './style.scss';

const TwoColumnLayout = ({ children }) => {
    const topLinkTitle = children[0];
    const formTitles = children[1];
    const formFields = children[2];
    const submitButton = children[3];

    return (
        <div className="two-layout-column">
            <div className="two-layout-column__left-banner">
                <div className="bottom-text-container">
                    <div>"Great, kid Don"t get cocky."</div>
                    <div className="green-text">-</div>
                    <div>Han solo</div>
                </div>
            </div>
            <div className="two-layout-column__form-container">
                {topLinkTitle}
                {formTitles}
                <div className="form-fields-container">
                    {formFields}
                </div>
                <div className="submit-btn-container">
                    {submitButton}
                </div>
            </div>
        </div>
    );
};

TwoColumnLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default TwoColumnLayout;
