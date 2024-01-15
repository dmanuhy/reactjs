import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSpecialty.scss"
import { CommonUtils } from '../../../utils';
import LightBox from 'react-image-lightbox';
import { Editor } from 'primereact/editor';
import { createSpecialtyService } from '../../../services/specialtyService';
import { toast } from 'react-toastify';

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            previewImageUrl: '',
            isOpenImage: false,
            description: ''
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }
    openPreviewImage = () => {
        if (!this.state.previewImageUrl) {
            return
        }
        this.setState({
            isOpenImage: true
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let selectedFile = data[0];
        if (selectedFile) {
            let base64 = await CommonUtils.getBase64(selectedFile);
            let objectUrl = URL.createObjectURL(selectedFile);
            this.setState({
                previewImageUrl: objectUrl,
                image: base64
            })
        }
    }

    handleCreateSpecialty = async () => {
        let res = await createSpecialtyService(this.state);
        if (res && res.errorCode === 0) {
            toast.success(res.message);
        } else {
            toast.error(res.message)
            console.log(res)
        }
    }

    render() {

        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='title'>Quan li chuyen khoa</div>
                    <div className='section-add-new row'>
                        <div class="specialty-name col-6">
                            <label for="name" class="form-label">Specialty Name</label>
                            <input onChange={(event) => this.setState({ name: event.target.value })} type="text" class="form-control" id="name" />
                        </div>
                        <div class="specialty-image col-6 d-flex gap-3">
                            <label className='upload-image' htmlFor='previewImage'>
                                Tai Anh <i className="fas fa-upload"></i>
                            </label>
                            <input id='previewImage' type='file' hidden
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>
                        <div className='manage-doctor-editor'>
                            <div>Description</div>
                            <Editor value={this.state.description} onTextChange={(e) => this.setState({ description: e.htmlValue })} style={{ height: '400px' }} />
                        </div>
                        <div className='btn-add-new my-2'>
                            <button className='btn btn-lg btn-success'
                                onClick={() => this.handleCreateSpecialty()}
                            >
                                Add new
                            </button>
                        </div>
                    </div>

                    <div className='section-specialty-list'>

                    </div>
                </div>
                {this.state.isOpenImage === true &&
                    <LightBox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({
                            isOpenImage: false
                        })}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
