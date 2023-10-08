import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intanageUserTablel';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageDoctor.scss'
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

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
            allDoctor: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                switch (language) {
                    case LANGUAGES.VI: object.label = `${item.lastName} ${item.firstName}`; break;
                    case LANGUAGES.EN: object.label = `${item.firstName} ${item.lastName}`; break;
                    case LANGUAGES.JA: object.label = `${item.firstName} ${item.lastName}`; break;
                    default: object.label = `${item.firstName} ${item.lastName}`; break;
                }
                object.value = item.id
                return result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux || prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorRedux);
            this.setState({
                allDoctor: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveMarkDown = () => {
        this.props.saveDoctorInfoRedux({
            contentHTML: this.state.contentHTML,
            contenMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
    }
    handleChange = (selectedDoctor) => {
        this.setState({
            selectedDoctor: selectedDoctor
        });
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Create Doctor Detail</div>
                    <div className='doctor-information'>
                        <div className='content-left form-group'>
                            <label>Choose Doctor</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
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
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                    </div>
                    <button className='btn-save' onClick={() => this.handleSaveMarkDown()}>
                        Save
                    </button>
                </div >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctorRedux: state.admin.allDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
        saveDoctorInfoRedux: (data) => dispatch(actions.saveDoctorInfoStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
