import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Row, Col, Input, Label } from "reactstrap";
import AgentForm from "./AgentForm";

class AgentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agent: null,
        };
    }

    handleChange = (e) => {
        const { agents } = this.props;
        const { value } = e.target;

        this.setState(
            {
                agent: agents[value],
            },
            () => console.log(this.state.agent)
        );
    };

    render() {
        const { agents } = this.props;
        return (
            <Fragment>
                <Row style={{ color: "white" }}>
                    <Col md={this.state.agent && 4}>
                        <Label for={`id_agent`}>Agent List</Label>

                        <Input
                            type="select"
                            name="agent"
                            id="id_agent"
                            size="8"
                            onChange={this.handleChange}
                        >
                            {agents && agents.length
                                ? agents.map((agent, index) => (
                                      <option key={index} value={index}>
                                          {`${agent.operator_lan_id} - ${agent.user.first_name} ${agent.user.last_name} - ${agent.user.email}`}
                                      </option>
                                  ))
                                : null}
                        </Input>
                    </Col>

                    {this.state.agent ? (
                        <Col>
                            <AgentForm agent={this.state.agent} />
                        </Col>
                    ) : null}
                </Row>
            </Fragment>
        );
    }
    getSelectedAgentFromRedux = (agent) =>
        this.props.agents.filter(
            (a) => a.operator_lan_id === agent.operator_lan_id
        );
}

const mapStateToProps = (state) => ({
    agents: state.surveys.agents,
});

export default connect(mapStateToProps, {})(AgentView);
{
    /* <Input
    type="select"
    name="ccms_owner"
    id="id_ccms_owner"
    size="7"
    onChange={this.handleChange}
    // value={this.state.users_list}
>
    {(ccms || {}).ccms_owner
        .filter(item => !((item.user || {}).groups || {}).includes(1))
        .map((item, index) => {
            const { first_name, last_name, username } = item.user;
            return (
                <option
                    key={item.id}
                    value={index}
                >{`${first_name} ${last_name}`}</option>
            );
        })}
</Input>; */
}
