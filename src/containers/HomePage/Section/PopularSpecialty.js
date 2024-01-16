import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllSpecialtyService } from '../../../services/specialtyService';
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

    render() {
        let { allSpecialty } = this.state
        return (
            <>
                {
                    console.log(this.state)
                }
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
                                            <div className='body-content' key={index}>
                                                <div style={{ backgroundImage: `url(${item.image})` }} className='bg-image' />
                                                <span className='specialty-name'>{item.name}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(PopularSpecialty);
