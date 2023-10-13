import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorList: []
        }
    }
    componentDidMount() {
        this.props.fetchTopDoctorRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorListRedux !== this.props.doctorListRedux) {
            this.setState({
                doctorList: this.props.doctorListRedux
            })
        }
    }

    getValueByLanguage = (chosenLanguage) => {
        switch (chosenLanguage) {
            case LANGUAGES.VI:
                return 'valueVI';
            case LANGUAGES.EN:
                return 'valueEN';
            case LANGUAGES.JA:
                return 'valueJA';
            default:
                break;
        }
    }

    handleViewDoctorDetail = (doctor) => {
        let linkToRedirect = `/doctor/${doctor.id}`
        this.props.history.push(`${linkToRedirect}`)
    }

    render() {
        let language = this.props.language;
        let doctorList = this.state.doctorList
        return (
            <>
                <div className='section-general section-outstanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <div className='header-title'>
                                <FontAwesomeIcon icon="fa-solid fa-user-doctor" /> &nbsp;
                                <span><FormattedMessage id="home-section.outstanding-doctor"></FormattedMessage></span>
                            </div>
                            <button className='header-btn'><FormattedMessage id="home-section.see-more"></FormattedMessage></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {doctorList && doctorList.length > 0 && doctorList.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='customize-border' key={index} onClick={() => this.handleViewDoctorDetail(item)}>
                                            <div className='body-content'>
                                                <div className='bg-outer'>
                                                    <div className='bg-image img-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{item.positionData[this.getValueByLanguage(language)]}: {item.firstName}, {item.lastName}</div>
                                                    <div>Tim Mach</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctorListRedux: state.admin.doctorList,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctorStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
