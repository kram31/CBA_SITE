import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Row, Col, Table, ListGroupItemHeading } from "reactstrap";

class RcaFniList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { fni_list } = this.props;

        return (
            <Fragment>
                <Table style={{ color: "white" }}>
                    <thead>
                        <tr>
                            {Object.keys(fni_list[0]).map((item, index) => (
                                <th key={index}>{item.replace("_", " ")}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {fni_list.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.ticket_number}</td>
                                <td>{item.agent_name}</td>
                                <td>{item.description}</td>
                                <td>{item.submitted_date}</td>
                                <td>{item.ccms_rca}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    fni_list: state.ccms.fni
});

export default connect(mapStateToProps, {})(RcaFniList);
