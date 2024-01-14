import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { verifyBookAppointment } from '../../services/bookingService';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyBookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: "waiting"
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let response = await verifyBookAppointment({
                token: this.props.match.params.token
            })
            if (response && response.errorCode === 0) {
                this.setState({
                    isVerified: true
                })
            } else {
                this.setState({
                    isVerified: false
                })
            }
        }
    }

    render() {
        let { isVerified } = this.state
        return (
            <>
                <HomeHeader />
                <div className='border p-5 mt-5 text-center fs-3 fw-bold'>
                    {
                        isVerified && isVerified === true ?
                            <div className='text-success'>Verified your booking. Thank for chose Booking Care !</div>
                            :
                            <div className='text-danger'>Failed to verify. This request is verified or doesn't exist</div>
                    }
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBookAppointment);


