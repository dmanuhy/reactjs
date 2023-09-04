import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intanageUserTablel';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageDoctor.scss'
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
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveMarkDown = () => {
        console.log('save: ', this.state);
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
                                options={options}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label>Introduction</label>
                            <textarea className='form-control' rows="4" onChange={(event) => this.handleOnChangeDesc(event)}>
                                {this.state.description}
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
        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (userID) => dispatch(actions.deleteUserStart(userID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
