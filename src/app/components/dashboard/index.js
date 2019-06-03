// @vendors
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { Person } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

// @components
import ProfileIcon from 'components/profile-icon';

// @styles
import './style.scss';

const DashboardEvent = () => (
    <div className="dashboard-event">
        <div className="dashboard-event__header">
            <div className="time">{'April 4, 2017 - 2:17 PM'}</div>
            <div className="title">{'How to get angry'}</div>
            <div className="sub-title">{'Tom Watts'}</div>
        </div>
        <div className="dashboard-event__description">
            {'I will show you how to get angry in a second'}
        </div>
        <div className="dashboard-event__footer">
            <div className="people-counter">
                <Person />
                <span>9 of 31</span>
            </div>
            <div className="button-container">
                <Button variant="raised">EDIT</Button>
            </div>
        </div>
    </div>
);

class Dashboard extends PureComponent {
    state = {
        events: [],
        goToCreateEventPage: false
    }

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = () => {
        // @Todo implement
    }

    onClickAddEventIcon = () => {
        this.setState({ goToCreateEventPage: true })
    }

    buildEvents = () => {
        const { events: eventList } = this.state;
        if (!eventList.length) {
            return [];
        }

        return eventList.map((event, index) => (
            <DashboardEvent
                eventInfo={event}
                key={index}
                redirect
            />
        ));
    }

    render() {
        const { goToCreateEventPage } = this.state;

        if (goToCreateEventPage) {
            return <Redirect to={{ pathname: '/event-new' }} />;
        }

        const fakeEvents = [
            <DashboardEvent />,
            <DashboardEvent />,
            <DashboardEvent />
        ];

        return (
            <div className="dashboard-page">
                <div className="navigation-bar">
                    <ProfileIcon shortName="TM" />
                </div>
                <div className="menu-bar">menu</div>
                <div className="dashboard-event-container">
                    {fakeEvents}
                </div>
            </div>
        );
    }
}
// bind component to the store
export default Dashboard;
