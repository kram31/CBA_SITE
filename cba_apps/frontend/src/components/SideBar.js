import React, { Component, Fragment } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import UploadDataModal from "./bottombox/upload-data/UploadDataModal";
import SimpleDataInput from "./bottombox/components/SimpleDataInput";
import {
    agentViewCollapse,
    bottomboxDriverViewCollapse,
    surveyViewCollapse
} from "../actions/surveyActions";
import { connect } from "react-redux";

// Add TeamLead, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3, Team

class SideBar extends Component {
    state = {
        modal: false,
        table: {}
    };

    handleClick = table => {
        this.setState((state, props) => ({ modal: !state.modal, table }));
    };

    handleModalState = x => {
        this.setState({ modal: x });
    };

    handleCollapse = data => {
        if (data === "agent_view") {
            this.props.agentViewCollapse();
        } else if (data === "bottombox_driver_view") {
            this.props.bottomboxDriverViewCollapse();
        } else if (data === "survey_view") {
            this.props.surveyViewCollapse();
        }
    };

    checkActive = () => {
        const {
            agent_view_collapse,
            bottombox_view_collapse,
            survey_view_collapse
        } = this.props;

        if (agent_view_collapse === true) {
            return {
                fontWeight: "bold",
                color: "white"
            };
        } else if (bottombox_view_collapse === true) {
            return {
                fontWeight: "bold",
                color: "white"
            };
        } else if (survey_view_collapse === true) {
            return {
                fontWeight: "bold",
                color: "white"
            };
        }
    };

    render() {
        const tables = [
            {
                label_name: "Add Agent Skill",
                data_name: "addSkill"
            },
            {
                label_name: "Add Team Lead",
                data_name: "addTeamLead"
            },

            {
                label_name: "Add Team",
                data_name: "addTeam"
            }
        ];

        return (
            <Nav vertical>
                <NavItem
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        paddingTop: "10px",
                        paddingLeft: "14px"
                    }}
                >
                    <h5>
                        <i className="fa fa-gears" /> BottomBox
                    </h5>
                </NavItem>

                <NavItem className="sidebar-navitem">
                    <NavLink
                        className="sidebar-navlink"
                        onClick={() => this.handleCollapse("survey_view")}
                        style={
                            this.props.survey_view_collapse
                                ? {
                                      fontWeight: "bold",
                                      fontSize: "18px"
                                  }
                                : {
                                      fontWeight: "normal",
                                      color: "black"
                                  }
                        }
                    >
                        <i className="fa fa-th-list" /> Survey View
                    </NavLink>
                    <NavLink
                        className="sidebar-navlink"
                        onClick={() => this.handleCollapse("agent_view")}
                        style={
                            this.props.agent_view_collapse
                                ? {
                                      fontWeight: "bold",
                                      fontSize: "18px"
                                  }
                                : {
                                      fontWeight: "normal",
                                      color: "black"
                                  }
                        }
                    >
                        <i className="fa fa-th-list" /> Agent View
                    </NavLink>
                    <NavLink
                        className="sidebar-navlink"
                        onClick={() =>
                            this.handleCollapse("bottombox_driver_view")
                        }
                        style={
                            this.props.bottombox_view_collapse
                                ? {
                                      fontWeight: "bold",
                                      fontSize: "18px"
                                  }
                                : {
                                      fontWeight: "normal",
                                      color: "black"
                                  }
                        }
                    >
                        <i className="fa fa-th-list" /> Bottombox Driver View
                    </NavLink>
                    <UploadDataModal />
                    {tables.map(table => (
                        <Fragment key={table.data_name}>
                            <NavLink
                                className="sidebar-navlink"
                                onClick={() => this.handleClick(table)}
                            >
                                <i className="fa fa-plus-circle" />{" "}
                                {table.label_name}
                            </NavLink>
                            <SimpleDataInput
                                data_name={this.state.table.data_name}
                                label_name={this.state.table.label_name}
                                modal={this.state.modal}
                                onModalChange={this.handleModalState}
                            />
                            {/* add data_name="addSkill" and label_name="Agent Skill" */}
                        </Fragment>
                    ))}
                </NavItem>
            </Nav>
        );
    }
}
const mapStateToProps = state => ({
    agent_view_collapse: state.surveys.agent_view_collapse,
    bottombox_view_collapse: state.surveys.bottombox_view_collapse,
    survey_view_collapse: state.surveys.survey_view_collapse
});

export default connect(mapStateToProps, {
    agentViewCollapse,
    bottomboxDriverViewCollapse,
    surveyViewCollapse
})(SideBar);
