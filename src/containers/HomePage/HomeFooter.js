import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


//import hand-book from './Section/hand-book';
class HomeFooter extends Component {

    render() {

        return (
            <>
                <div className='home-footer'>
                    <p> &copy; 2023 Booking Care</p>
                    <div className='media-page'>
                        <a target='_blank' href='https://www.facebook.com/bookingcare'>
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a target='_blank' href='https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ'>
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
