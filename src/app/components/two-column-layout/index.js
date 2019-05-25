// @vendors
import React from 'react';
import PropTypes from 'prop-types';

// start wars img
import startWars from 'images/starWars.png'

import './style.scss';

const TwoColumnLayout = ({ rightColumnContent, topLinkTitle, wrapperPageClassName }) => (
    <div className={wrapperPageClassName}>
        <div className="two-layout-column">
            <div className="two-layout-column__left-column">
                <div className="two-layout-column__left-column-text">
                    <div>"Great, kid Don"t get cocky."</div>
                    <div className="two-layout-column__left-column-text--green">-</div>
                    <div>Han solo</div>
                </div>
            </div>
            <div className="two-layout-column__right-column">
                <div className="signup-text">{topLinkTitle}</div>
                <div className="form-fields-container">
                    <div className="form-fields">{rightColumnContent}</div>
                </div>
            </div>
        </div>
    </div>
);

TwoColumnLayout.propTypes = {
    rightColumnContent: PropTypes.node.isRequired,
    topLinkTitle: PropTypes.node.isRequired,
    wrapperPageClassName: PropTypes.string.isRequired
};

export default TwoColumnLayout;
