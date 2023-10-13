import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from 'react-intl';
import Select from "react-select"
import * as actions from "../../../store/actions";
import { LANGUAGES, MANAGE_ACTION, } from '../../../utils';
import FlatPickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css";
class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            allDoctor: [],
            currentDate: new Date(),
            scheduleTimes: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllcodeRedux("TIME");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux || prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux);
            this.setState({
                allDoctor: dataSelect
            })
        }
        if (prevProps.scheduleTimesRedux !== this.props.scheduleTimesRedux) {
            this.setState({
                scheduleTimes: this.props.scheduleTimesRedux
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

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.forEach((item, index) => {
                let object = {};
                switch (language) {
                    case LANGUAGES.VI: object.label = `${item.lastName} ${item.firstName}`; break;
                    case LANGUAGES.EN: object.label = `${item.firstName} ${item.lastName}`; break;
                    case LANGUAGES.JA: object.label = `${item.firstName} ${item.lastName}`; break;
                    default: object.label = `${item.firstName} ${item.lastName}`; break;
                }
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    handleSelectDoctor = async (selectedDoctor) => {
        this.setState({
            selectedDoctor: selectedDoctor
        })
        await this.props.fetchDoctorDetailsRedux(selectedDoctor.value);
        let { doctorDetailsRedux } = this.props;
        if (doctorDetailsRedux && doctorDetailsRedux.Markdown) {
            let markdown = doctorDetailsRedux.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date,
        })
    }

    render() {
        console.log(this.state)
        let { scheduleTimes } = this.state
        let language = this.props.language
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='manage-schedule-title text-uppercase text-center fw-bold fs-4'>
                        <FormattedMessage id="manage-schedule.manage-doctor-schedule"></FormattedMessage>
                    </div>
                    <div className='manage-schedule-content d-flex justify-content-center'>
                        <div className='row w-75'>
                            <div className='col-8 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor"></FormattedMessage></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleSelectDoctor}
                                    options={this.state.allDoctor}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label><FormattedMessage id="manage-schedule.select-date"></FormattedMessage></label>
                                <FlatPickr
                                    className='form-control'
                                    value={this.state.currentDate}
                                    onChange={this.handleChangeDatePicker}
                                    options={{ minDate: this.state.currentDate, dateFormat: "d-m-Y" }}
                                />
                            </div>
                            <div className='col-12 my-4 gap-4 d-flex flex-wrap justify-content-center pick-time'>
                                {
                                    scheduleTimes && scheduleTimes.length > 0 &&
                                    scheduleTimes.map((item, index) => {
                                        return (
                                            <button className='btn btn-info text-white' key={index}>
                                                {item[this.getValueByLanguage(language)]}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <button className='col-2 btn btn-primary'>
                                <FormattedMessage id="manage-schedule.save-schedule"></FormattedMessage>
                            </button>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        allDoctorRedux: state.admin.allDoctor,
        doctorDetailsRedux: state.admin.doctorDetails,
        scheduleTimesRedux: state.admin.times
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
        fetchDoctorDetailsRedux: (data) => dispatch(actions.fetchDoctorDetailsStart(data)),
        fetchAllcodeRedux: (type) => dispatch(actions.fetchAllcodeStart(type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
