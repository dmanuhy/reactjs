import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageDoctor.scss'
import { LANGUAGES, MANAGE_ACTION } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// import { getDoctorDetailsService } from '../../../services/userService';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            allDoctor: [],
            hasOldData: false,
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux || prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux);
            this.setState({
                allDoctor: dataSelect
            })
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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveMarkDown = () => {
        let { hasOldData } = this.state
        this.props.saveDoctorInfoRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorID: this.state.selectedDoctor.value,
            action: hasOldData === true ? MANAGE_ACTION.UPDATE : MANAGE_ACTION.CREATE
        })
    }
    handleSelectDoctor = async (selectedDoctor) => {
        this.setState({
            selectedDoctor
        })
        await this.props.fetchDoctorDetailsRedux(selectedDoctor.value);
        let { doctorDetailRedux } = this.props;
        if (doctorDetailRedux && doctorDetailRedux.Markdown) {
            let markdown = doctorDetailRedux.Markdown;
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
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Create Doctor Detail</div>
                    <div className='doctor-information'>
                        <div className='content-left form-group'>
                            <label>Choose Doctor</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleSelectDoctor}
                                options={this.state.allDoctor}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label>Introduction</label>
                            <textarea value={this.state.description} className='form-control' rows="4" onChange={(event) => this.handleOnChangeDesc(event)}>
                            </textarea>
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button
                        className='btn-save'
                        onClick={() => this.handleSaveMarkDown()}
                    >
                        {
                            hasOldData === true ?
                                <FormattedMessage id="manage-user.save-change"></FormattedMessage>
                                :
                                <FormattedMessage id="manage-user.create-new"></FormattedMessage>
                        }
                    </button>
                </div >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctorRedux: state.admin.allDoctor,
        doctorDetailRedux: state.admin.doctorDetails,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
        saveDoctorInfoRedux: (data) => dispatch(actions.saveDoctorInfoStart(data)),
        fetchDoctorDetailsRedux: (data) => dispatch(actions.fetchDoctorDetailsStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
