import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import UploadDataModal from "./bottombox/upload-data/UploadDataModal";
import SimpleDataInput from "./bottombox/components/SimpleDataInput"

// Add TeamLead, DSAT_Code1, BB_Driver_Code2, BB_Driver_Code3, Team

class SideBar extends Component {
    state ={
        modal: false,
        table: {}
    }

    handleClick = table => {
        this.setState((state,props) => ({modal: !state.modal, table}))
  
    }

    handleModalState = x => {
        this.setState({modal: x});
    }


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
                label_name: "Add BB Driver Code 2",
                data_name: "addBbDriverCode3"
            },
            {
                label_name: "Add Team",
                data_name: "addTeam"
            }
        ]

        return (
            
            <Nav
                vertical
            >
                <NavItem className="sidebar-navitem">
                    <UploadDataModal />
                </NavItem>
                {tables.map(table => (
                    <NavItem className="sidebar-navitem" key={table.data_name}>
                        <NavLink href="#" onClick={() => this.handleClick(table)}>{table.label_name}</NavLink>
                        <SimpleDataInput data_name={this.state.table.data_name} label_name={this.state.table.label_name} modal={this.state.modal} onModalChange={this.handleModalState}/>
                        {/* add data_name="addSkill" and label_name="Agent Skill" */}
                    </NavItem>
                ))}

            </Nav>
        );
    }
}

export default SideBar;
