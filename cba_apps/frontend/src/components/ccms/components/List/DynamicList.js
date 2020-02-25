import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

class DynamicList extends Component {
    constructor(props) {
        super(props);

        // props
        // list name, list

        this.state = {};
    }

    render() {
        const { list } = this.props;
        return (
            <Table style={{ color: "white" }}>
                <thead>
                    <tr>
                        {Object.keys(list[0]).map((item, index) => (
                            <th key={index}>{item.replace("_", " ")}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <th key={index} scope="row">
                                {item.id}
                            </th>
                            {Object.keys(item)
                                .filter(prop => prop !== "id")
                                .map((prop, index) => {
                                    return <td key={index}>{item[prop]}</td>;
                                })}
                            {/* <td>{item.agent_name}</td>
                            <td>{item.description}</td>
                            <td>{item.submitted_date}</td>
                            <td>{item.ccms_rca}</td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(null, {})(DynamicList);
