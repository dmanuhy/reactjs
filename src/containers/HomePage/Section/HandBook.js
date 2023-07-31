import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';


//import hand-book from './Section/hand-book';
class HandBook extends Component {

    render() {

        return (
            <>
                <div className='section-general section-hand-book'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='header-title'>Cam Nang</span>
                            <button className='header-btn'>XEM THEM</button>
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
