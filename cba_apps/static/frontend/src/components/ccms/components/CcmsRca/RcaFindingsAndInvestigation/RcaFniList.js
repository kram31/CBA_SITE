import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
    Table,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody
} from "reactstrap";

class RcaFniList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { fni_list } = this.props;

        let excludeList = ["id", "ccms_rca", "description"];

        const filterList = (list, excludeList) =>
            Object.keys(list).filter(item => !excludeList.includes(item));

        return (
            <Fragment>
                <Table style={{ color: "white", fontSize: "14px" }}>
                    <thead>
                        <tr>
                            {filterList(fni_list[0], excludeList).map(
                                (item, index) => (
                                    <th key={index}>
                                        {item.replace("_", " ")}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {fni_list.map((item, index) => (
                            <tr
                                key={index}
                                id="id_table_data_item"
                                style={{ cursor: "pointer" }}
                                className="dynamic_list_row"
                                id={`id_table_fni_item_${item.id}`}
                            >
                                <td>{item.ticket_number}</td>
                                <td>{item.agent_name}</td>
                                <td>{item.submitted_date}</td>
                                <UncontrolledPopover
                                    trigger="legacy"
                                    placement="top"
                                    target={`id_table_fni_item_${item.id}`}
                                    key={index}
                                    className="popover-container"
                                >
                                    <PopoverHeader>
                                        <p>
                                            <span>
                                                Findings and Investigation :{" "}
                                            </span>
                                            {item.ticket_number}
                                        </p>
                                    </PopoverHeader>
                                    <PopoverBody>
                                        <p>
                                            <span>Ticket Number: </span>{" "}
                                            {item.ticket_number}
                                        </p>
                                        <p>
                                            <span>Submitted Date:</span>{" "}
                                            {item.submitted_date}
                                        </p>
                                        <p>
                                            <span>Description:</span>{" "}
                                            {item.description}
                                        </p>
                                    </PopoverBody>
                                </UncontrolledPopover>
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
