import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
    Table,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody
} from "reactstrap";

import { capsFirstWord } from "../Helpers/Helpers";

class DynamicList extends Component {
    constructor(props) {
        super(props);

        // props
        // list name, list

        this.state = {};
    }

    render() {
        const { list, form_title } = this.props;

        let excludeList = ["id", "fni", "description"];

        const filterList = (list, excludeList) =>
            Object.keys(list).filter(item => !excludeList.includes(item));

        return (
            <Table style={{ color: "white", fontSize: "14px" }}>
                <thead>
                    <tr>
                        {filterList(list[0], excludeList).map((item, index) => (
                            <th key={index}>{item.replace("_", " ")}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <Fragment key={index}>
                            <tr
                                key={index}
                                id={`id_table_${form_title}_item_${item.id}`}
                                style={{ cursor: "pointer" }}
                                className="dynamic_list_row"
                            >
                                {filterList(item, excludeList).map(
                                    (prop, index) => {
                                        return (
                                            <td key={index}>{item[prop]}</td>
                                        );
                                    }
                                )}

                                <UncontrolledPopover
                                    trigger="legacy"
                                    placement="top"
                                    target={`id_table_${form_title}_item_${item.id}`}
                                    key={index}
                                    className="popover-container"
                                >
                                    <PopoverHeader>
                                        <p>
                                            <span>
                                                {capsFirstWord(
                                                    form_title.replace("_", " ")
                                                )}
                                                :{" "}
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
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(null, {})(DynamicList);
