// ENTRY WILL BE A MODAL, MODAL STATE WILL BE HANDLED BY CCMSTABLE2

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { get_ccms_rca, close_ccms_rca } from "../../../../actions/ccmsActions";

import CcmsRcaForm from "./CcmsRcaForm";

class CcmsRcaModal extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getData = () => {
        this.props.get_ccms_rca(this.props.ccms);
    };

    render() {
        const { ccms_rca_modal, ccms, ccms_rca, close_ccms_rca } = this.props;

        return (
            <Fragment>
                <Button onClick={this.getData}>Open RCA</Button>
                <Modal
                    size="lg"
                    isOpen={ccms_rca_modal && ccms.id == ccms_rca.ccms}
                    toggle={close_ccms_rca}
                >
                    <ModalHeader toggle={close_ccms_rca}>CCMS RCA</ModalHeader>
                    <ModalBody>
                        {ccms_rca ? (
                            <CcmsRcaForm ccms_rca={ccms_rca} ccms={ccms} />
                        ) : null}
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ccms_rca: state.ccms.ccms_rca,
    ccms_rca_modal: state.ccms.ccms_rca_modal
});

export default connect(mapStateToProps, { get_ccms_rca, close_ccms_rca })(
    CcmsRcaModal
);
