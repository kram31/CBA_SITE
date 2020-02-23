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

    render() {
        const {
            ccms_rca_modal,
            ccms,
            ccms_rca,
            close_ccms_rca,
            activeTab
        } = this.props;
        // const { activeTab } = this.state;

        const style = { cursor: "pointer" };

        return (
            <Fragment>
                <Button onClick={this.getData}>Open RCA</Button>
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
                                <Row>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>
                                                Special Title Treatment
                                            </CardTitle>
                                            <CardText>
                                                With supporting text below as a
                                                natural lead-in to additional
                                                content.
                                            </CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card body>
                                            <CardTitle>
                                                Special Title Treatment
                                            </CardTitle>
                                            <CardText>
                                                With supporting text below as a
                                                natural lead-in to additional
                                                content.
                                            </CardText>
                                            <Button>Go somewhere</Button>
                                        </Card>
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
    activeTab: state.ccms.activeTab
});

export default connect(mapStateToProps, {
    get_ccms_rca,
    close_ccms_rca,
    toggle_active_tab,
    get_fni_list
})(CcmsRcaModal);
