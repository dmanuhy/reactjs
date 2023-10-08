import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './DoctorDetail.scss';
import { getDoctorDetailsService } from '../../services/userService'
import { LANGUAGES } from '../../utils'

class DoctorDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorDetail: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDoctorDetailsService(id);
            if (res && res.errorCode === 0) {
                this.setState({
                    doctorDetail: res.data
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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

    render() {
        let { doctorDetail } = this.state;
        let language = this.props.language;
        return (
            <>
                <HomeHeader />
                <div className='doctor-detail-container'>
                    <div className='doctor-introduction row'>
                        <div className='doctor-image col-3' style={{ backgroundImage: `url(${doctorDetail && doctorDetail.image ? doctorDetail.image : 1})` }}></div>
                        <div className='doctor-text col-9 d-flex flex-column'>
                            <div className='doctor-text-name fs-3 fw-bold'>
                                {doctorDetail && doctorDetail.positionData &&
                                    <span>
                                        {doctorDetail.positionData[this.getValueByLanguage(language)]}: {doctorDetail.firstName}, {doctorDetail.lastName}
                                    </span>
                                }
                            </div>
                            <div className='doctor-text-description pt-2'>
                                {doctorDetail && doctorDetail.Markdown && doctorDetail.Markdown.description &&
                                    <span>
                                        {doctorDetail.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div >
                    <div className='doctor-schedule'>

                    </div>
                    <div className='doctor-information'>
                        {doctorDetail && doctorDetail.Markdown && doctorDetail.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: doctorDetail.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='doctor-comment'></div>
                </div >
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
