import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import hand-book from './Section/hand-book';
class HandBook extends Component {

    render() {

        return (
            <>
                <div className='section-general section-hand-book'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <div className='header-title'>
                                <FontAwesomeIcon icon="fa-solid fa-book-medical" /> &nbsp;
                                <span><FormattedMessage id="home-section.handbook"></FormattedMessage></span>
                            </div>
                            <button className='header-btn'><FormattedMessage id="home-section.see-more"></FormattedMessage></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='body-content'>
                                    <div className='bg-image img-hand-book' />
                                    <span>Cơ Xương Khớp</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-hand-book' />
                                    <span>Cơ Xương Khớp</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-hand-book' />
                                    <span>Cơ Xương Khớp</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-hand-book' />
                                    <span>Cơ Xương Khớp</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-hand-book' />
                                    <span>Cơ Xương Khớp</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-hand-book' />
                                    <span>Cơ Xương Khớp</span>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
