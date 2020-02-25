// ENTRY WILL BE A MODAL, MODAL STATE WILL BE HANDLED BY CCMSTABLE2

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardTitle,
    CardText,
    Row,
    Col
} from "reactstrap";
import {
    get_ccms_rca,
    close_ccms_rca,
    toggle_active_tab,
    get_fni_list
} from "../../../../actions/ccmsActions";
import classnames from "classnames";

import DynamicForm from "../Forms/DynamicForm";
import CcmsRcaForm from "./CcmsRcaForm";
import RcaFindingsAndInvestigation from "./RcaFindingsAndInvestigation/RcaFindingsAndInvestigationForm";

class CcmsRcaModal extends Component {
    constructor(props) {
        super(props);

        this.state = { activeTab: 1 };
    }

    getData = () => {
        this.props.get_ccms_rca(this.props.ccms);
    };

    toggleTab = tab => {
        const {
            activeTab,
            toggle_active_tab,
            get_fni_list,
            ccms_rca
        } = this.props;

        if (activeTab !== tab) {
            // this.setState({ activeTab: tab });

            toggle_active_tab(tab);
        }
    };

    checkStatus = data => {
        if (data.is_rca_completed) {
            return {
                color: "success",
                text: "Completed RCA"
            };
        } else {
            return {
                color: "danger",
                text: "Incomplete RCA"
            };
        }
    };

    render() {
        const {
            ccms_rca_modal,
            ccms,
            ccms_rca,
            close_ccms_rca,
            activeTab,
            fni_list,
            ca_list
        } = this.props;
        // const { activeTab } = this.state;

        const style = { cursor: "pointer" };

        return (
            <Fragment>
                <Button
                    onClick={this.getData}
                    color={this.checkStatus(ccms).color}
                >
                    {this.checkStatus(ccms).text}
                </Button>
                <Modal
                    // className="modal-xl"
                    size="lg"
                    isOpen={ccms_rca_modal && ccms.id == ccms_rca.ccms}
                    toggle={close_ccms_rca}
                >
                    <ModalHeader toggle={close_ccms_rca}>CCMS RCA</ModalHeader>
                    <ModalBody>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    style={style}
                                    className={classnames({
                                        active: activeTab === 1
                                    })}
                                    onClick={() => {
                                        this.toggleTab(1);
                                    }}
                                >
                                    RCA
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={style}
                                    className={classnames({
                                        active: activeTab === 2
                                    })}
                                    onClick={() => {
                                        this.toggleTab(2);
                                    }}
                                >
                                    FINDINGS and INVESTIGATION
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={style}
                                    className={classnames({
                                        active: activeTab === 3
                                    })}
                                    onClick={() => {
                                        this.toggleTab(3);
                                    }}
                                >
                                    CORRECTIVE ACTIONS
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId={1}>
                                <Row className="mt-3">
                                    <Col sm="12">
                                        {ccms_rca ? (
                                            <CcmsRcaForm
                                                ccms_rca={ccms_rca}
                                                ccms={ccms}
                                            />
                                        ) : null}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId={2}>
                                <Row className="mt-3">
                                    <Col sm="12">
                                        {ccms_rca ? (
                                            <RcaFindingsAndInvestigation
                                                ccms_rca={ccms_rca}
                                                ccms={ccms}
                                            />
                                        ) : null}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId={3}>
                                <Row className="mt-3">
                                    <Col sm="12">
                                        {fni_list && fni_list.length ? (
                                            <DynamicForm
                                                form_title="corrective_actions"
                                                form_inputs={{
                                                    select_ticket_number: "",
                                                    text_description: ""
                                                }}
                                                display_list={ca_list}
                                                select_options={fni_list}
                                                labelKey="ticket_number"
                                            />
                                        ) : (
                                            <h4>No data found</h4>
                                        )}
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ccms_rca: state.ccms.ccms_rca,
    ccms_rca_modal: state.ccms.ccms_rca_modal,
    activeTab: state.ccms.activeTab,
    fni_list: state.ccms.fni,
    ca_list: state.ccms.ca
});

export default connect(mapStateToProps, {
    get_ccms_rca,
    close_ccms_rca,
    toggle_active_tab,
    get_fni_list
})(CcmsRcaModal);
