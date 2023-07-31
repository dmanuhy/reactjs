import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class OutstandingDoctor extends Component {

    render() {

        return (
            <>
                <div className='section-general section-outstanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='header-title'>Bac si noi bat tuan qua</span>
                            <button className='header-btn'>XEM THEM</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='customize-border'>
                                    <div className='body-content'>
                                        <div className='bg-outer'>
                                            <div className='bg-image img-outstanding-doctor' />
                                        </div>
                                        <div className='position text-center'>
                                            <span>Giao su, Tien si Cu Trong Xoay</span>
                                            <span>Tim Mach</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='customize-border'>
                                    <div className='body-content'>
                                        <div className='bg-outer'>
                                            <div className='bg-image img-outstanding-doctor' />
                                        </div>
                                        <div className='position text-center'>
                                            <span>Giao su, Tien si Cu Trong Xoay</span>
                                            <span>Tim Mach</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='customize-border'>
                                    <div className='body-content'>
                                        <div className='bg-outer'>
                                            <div className='bg-image img-outstanding-doctor' />
                                        </div>
                                        <div className='position text-center'>
                                            <span>Giao su, Tien si Cu Trong Xoay</span>
                                            <span>Tim Mach</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='customize-border'>
                                    <div className='body-content'>
                                        <div className='bg-outer'>
                                            <div className='bg-image img-outstanding-doctor' />
                                        </div>
                                        <div className='position text-center'>
                                            <span>Giao su, Tien si Cu Trong Xoay</span>
                                            <span>Tim Mach</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='customize-border'>
                                    <div className='body-content'>
                                        <div className='bg-outer'>
                                            <div className='bg-image img-outstanding-doctor' />
                                        </div>
                                        <div className='position text-center'>
                                            <span>Giao su, Tien si Cu Trong Xoay</span>
                                            <span>Tim Mach</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='customize-border'>
                                    <div className='body-content'>
                                        <div className='bg-outer'>
                                            <div className='bg-image img-outstanding-doctor' />
                                        </div>
                                        <div className='position text-center'>
                                            <span>Giao su, Tien si Cu Trong Xoay</span>
                                            <span>Tim Mach</span>
                                        </div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
