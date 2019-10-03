import React, { Component, Fragment } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import UploadDataModal from "./bottombox/upload-data/UploadDataModal";
import SimpleDataInput from "./bottombox/components/SimpleDataInput";

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
                label_name: "Add DSAT Code 1",
                data_name: "addDsatCode1"
            },
            {
                label_name: "Add BB Driver Code 2",
                data_name: "addBbDriverCode2"
            },
            {
                label_name: "Add BB Driver Code 3",
                data_name: "addBbDriverCode3"
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

export default SideBar;
