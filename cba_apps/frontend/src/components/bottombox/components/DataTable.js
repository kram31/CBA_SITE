import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = { table: props.table };
    }

    table = table => (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {table.map(item => (
                    <tr key={item.name}>
                        <td>{item.name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    render() {
        return <Fragment>{this.table(this.props.table)}</Fragment>;
    }
}

const mapStateToProps = state => ({
    teamleads: state.surveys.teamleads,
    skills: state.surveys.skills
});

export default connect(mapStateToProps, {})(DataTable);
