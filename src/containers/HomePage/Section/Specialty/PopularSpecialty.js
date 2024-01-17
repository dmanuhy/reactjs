import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllSpecialtyService } from '../../../../services/specialtyService';
import { withRouter } from 'react-router';

//import Specialty from './Section/Specialty';
class PopularSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSpecialty: []
        };
    }
    async componentDidMount() {
        let res = await getAllSpecialtyService();
        if (res && res.errorCode === 0) {
            this.setState({
                allSpecialty: res.data
            })
        }

    }

    handleViewSpecialtyDetail = (data) => {
        if (this.props.history) {
            this.props.history.push(`/specialty/${data.id}`)
        }
    }

    render() {
        let { allSpecialty } = this.state
        return (
            <>
                <div className='section-general section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <div className='header-title'>
                                <FontAwesomeIcon icon="fa-solid fa-suitcase-medical" /> &nbsp;
                                <span><FormattedMessage id="home-section.popular-specialties"></FormattedMessage></span>
                            </div>
                            <button className='header-btn'><FormattedMessage id="home-section.see-more"></FormattedMessage></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {allSpecialty && allSpecialty.length > 0 &&
                                    allSpecialty.map((item, index) => {
                                        return (
                                            <div className='body-content' key={index} >
                                                <div style={{ backgroundImage: `url(${item.image})` }} className='bg-image' onClick={() => this.handleViewSpecialtyDetail(item)} />
                                                <span className='specialty-name' onClick={() => this.handleViewSpecialtyDetail(item)}>{item.name}</span>
                                            </div>
                                        )
                                    })
                                }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PopularSpecialty));
