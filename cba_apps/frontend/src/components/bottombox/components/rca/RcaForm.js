import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";

import FormInput from "./FormInput";

class RcaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rca: { ...props.cellData }
        };
    }

    handleChange = e => {
        let rca = this.state.rca;
        console.log(e.target.value);

        const { value, name } = e.target;

        rca[name] = value;

        if (this.selectList.includes(name)) {
            rca[name] = this.props[name][value];
        }

        this.setState({ rca }, () => console.log(this.state.rca));
    };

    handleCheckbox = event => {
        let rca = this.state.rca;
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        rca[name] = value;

        this.setState(
            {
                rca
            },
            () => console.log(this.state.rca)
        );
    };

    selectList = [
        "support_silo_issue_based",
        "controllability",
        "accountable_team",
        "q1_answer",
        "contacted_customer"
    ];

    render() {
        const { cellData } = this.props;

        return (
            <Form>
                <h5>RCA Form</h5>

                {Object.keys(cellData.agent.user).map((key, index) => {
                    if (key === "first_name") {
                        return (
                            <FormInput
                                key={index}
                                type="text"
                                objKey="owner_fullname"
                                index={index}
                                inputValue={`${cellData.agent.user[key]} ${cellData.agent.user["last_name"]}`}
                                disabled={true}
                                onChange={this.handleChange}
                            />
                        );
                    }
                    if (["username"].includes(key)) {
                        return (
                            <FormInput
                                key={index}
                                type="text"
                                objKey={key}
                                index={index}
                                inputValue={cellData.agent.user[key]}
                                disabled={true}
                                onChange={this.handleChange}
                            />
                        );
                    }
                })}

                {Object.keys(cellData.agent).map((key, index) => {
                    if (["operator_lan_id", "location", "wave"].includes(key)) {
                        return (
                            <FormInput
                                key={index}
                                type="text"
                                objKey={key}
                                index={index}
                                inputValue={cellData.agent[key]}
                                disabled={true}
                                onChange={this.handleChange}
                            />
                        );
                    }
                })}

                {cellData.agent.teams.length > 1
                    ? cellData.agent.teams.map(team =>
                          Object.keys(team.team).map((key, index) => {
                              if (key === "team_lead") {
                                  return (
                                      <FormInput
                                          key={index}
                                          type="text"
                                          objKey={key}
                                          index={index}
                                          inputValue={
                                              team.team[key]
                                                  ? team.team[key]
                                                  : ""
                                          }
                                          disabled={true}
                                          onChange={this.handleChange}
                                      />
                                  );
                              }

                              if (key === "agent_skill") {
                                  return (
                                      <FormInput
                                          key={index}
                                          type="text"
                                          objKey="agent_skill"
                                          index={index}
                                          inputValue={
                                              team.team.agent_skill.name
                                          }
                                          disabled={true}
                                          onChange={this.handleChange}
                                      />
                                  );
                              }
                          })
                      )
                    : Object.keys(cellData.agent.teams[0].team).map(
                          (key, index) => {
                              if (key === "team_lead") {
                                  return (
                                      <FormInput
                                          key={index}
                                          type="text"
                                          objKey={key}
                                          index={index}
                                          inputValue={
                                              cellData.agent.teams[0].team[key]
                                                  ? cellData.agent.teams[0]
                                                        .team[key]
                                                  : "Not Set"
                                          }
                                          disabled={true}
                                          onChange={this.handleChange}
                                      />
                                  );
                              }

                              if (key === "agent_skill") {
                                  return (
                                      <FormInput
                                          key={index}
                                          type="text"
                                          objKey="agent_skill"
                                          index={index}
                                          inputValue={
                                              cellData.agent.teams[0].team
                                                  .agent_skill.name
                                          }
                                          disabled={true}
                                          onChange={this.handleChange}
                                      />
                                  );
                              }
                          }
                      )}

                {Object.keys(this.state.rca).map((key, index) => {
                    if (
                        ![
                            "surveyed_ticket",
                            "agent",
                            "id",
                            "coaching",
                            "completed_by",
                            "date_completed",
                            ...this.selectList
                        ].includes(key)
                    ) {
                        return (
                            <FormInput
                                key={index}
                                type="text"
                                objKey={key}
                                index={index}
                                inputValue={
                                    this.state.rca[key]
                                        ? this.state.rca[key]
                                        : ""
                                }
                                disabled={false}
                                onChange={this.handleChange}
                            />
                        );
                    }
                })}

                {Object.keys(this.state.rca).map((key, index) => {
                    if (this.selectList.includes(key)) {
                        return (
                            <FormInput
                                key={index}
                                type="select"
                                objKey={key}
                                index={index}
                                inputValue={
                                    this.state.rca[key]
                                        ? this.state.rca[key]
                                        : ""
                                }
                                disabled={false}
                                onChange={this.handleChange}
                                options={this.props[key]}
                            />
                        );
                    }
                })}
                <FormGroup>
                    <Label for={`id_coaching`}></Label>
                    <Col>
                        <Input
                            type="checkbox"
                            name="coaching"
                            id="id_coaching"
                            checked={this.state.rca.coaching}
                            onChange={this.handleCheckbox}
                        />
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    support_silo_issue_based: state.surveys.agent_skills,
    controllability: [
        { id: 1, name: "ITSD Controllable" },
        { id: 2, name: "Non ITSD Controllable" }
    ],
    q1_answer: [
        { id: 1, name: "Yes" },
        { id: 2, name: "No" }
    ],
    contacted_customer: [
        { id: 1, name: "Yes" },
        { id: 2, name: "No" }
    ],
    accountable_team: state.surveys.csat_accountable_team
});

export default connect(mapStateToProps, {})(RcaForm);
