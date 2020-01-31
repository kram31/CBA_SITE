import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    Badge
} from "reactstrap";

import {
    updateAgentComponentState,
    getAgent,
    updateAgent
} from "../../../actions/surveyActions";

import { Bar } from "react-chartjs-2";

import StackedBarChart from "../dashboard/Charts/StackedBarChart";
import SimpleDataInput from "./SimpleDataInput";
import SurveyList from "./SurveyList";

class AgentsComponent extends Component {
    state = {
        table: {},
        modal: false,
        email: "",
        location: "",
        name: "",
        operator_lan_id: "",
        skill: "",
        surveys: [],
        team_lead: "",
        wave: ""
    };

    componentDidMount() {
        this.setState({
            ...this.state,
            ...this.props.agent
        });
    }

    agent_list = this.props.agents.map(agent => (
        <option key={agent.operator_lan_id} value={agent.name}>
            {agent.name}
        </option>
    ));

    team_lead_list = this.props.teamleads.map(team_lead => (
        <option key={team_lead.name} value={team_lead.name}>
            {team_lead.name}
        </option>
    ));

    skills_list = this.props.skills.map(skill => (
        <option key={skill.name} value={skill.name}>
            {skill.name}
        </option>
    ));

    agent_survey_list = list => {
        if (list) {
            let x = list.map(y => {
                let z = {};
                this.props.surveys.forEach(item => {
                    if (item.reference_number === y) {
                        return (z = item);
                    }
                });

                return z;
            });
            return x;
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        // need to include operator_lan_id and name to make PUT requests
        let agentData = this.state;
        delete agentData.modal;
        agentData.operator_lan_id = this.props.agent.operator_lan_id;
        agentData.name = this.props.agent.name;

        this.props.updateAgent(agentData);
    };

    handleModalState = x => {
        this.setState({ modal: x });
    };

    handleAgentSelect = e => {
        const { selectedIndex } = e.target.options;

        // console.log(selectedIndex);

        if (selectedIndex !== 0) {
            const { agents } = this.props;

            const agent = agents[selectedIndex - 1];

            // need to convert null to "" to make input controllable

            if (agent.skill === null) {
                agent.skill = "";
            }

            if (agent.team_lead === null) {
                agent.team_lead = "";
            }

            this.props.getAgent(agent);
            this.setState({
                ...agent
            });
        } else {
            let agent = {};
            this.props.getAgent(agent);
            this.setState({
                table: {},

                email: "",
                location: "",
                name: "",
                operator_lan_id: "",
                skill: "",
                surveys: [],
                team_lead: "",
                wave: ""
            });
        }
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    getListIncompleteAgentForm = () => {
        return this.props.agents.filter(agent =>
            Object.values(agent).includes(null || undefined || "")
        ).length;
    };

    handleModal = table => {
        this.setState((state, props) => ({ modal: !state.modal, table }));
    };

    render() {
        let skill_table = {
            label_name: "Add Agent Skill",
            data_name: "addSkill"
        };
        let team_lead_table = {
            label_name: "Add Team Lead",
            data_name: "addTeamLead"
        };
        return (
            <Fragment>
                <Card>
                    <CardHeader>
                        <h4>
                            <strong>Agents View</strong>{" "}
                            <span style={{ fontSize: "14px" }}>
                                <Badge color="danger" pill>
                                    {this.getListIncompleteAgentForm()}
                                </Badge>
                            </span>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Label for="name">
                                                Select Agent
                                            </Label>
                                            <Input
                                                type="select"
                                                name="name"
                                                id="name"
                                                value={this.state.name}
                                                onChange={
                                                    this.handleAgentSelect
                                                }
                                            >
                                                <option>-----</option>
                                                {this.agent_list}
                                            </Input>
                                        </Col>
                                        <Col>
                                            <Label for="operator_lan_id">
                                                Operator Lan ID
                                            </Label>
                                            <Input
                                                type="input"
                                                name="operator_lan_id"
                                                id="operator_lan_id"
                                                value={
                                                    this.state.operator_lan_id
                                                }
                                                onChange={this.handleChange}
                                                readOnly
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <Label for="email">Email</Label>
                                            <Input
                                                type="input"
                                                name="email"
                                                id="email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Label for="location">
                                                Location
                                            </Label>
                                            <Input
                                                type="input"
                                                name="location"
                                                id="location"
                                                value={this.state.location}
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Label for="wave">Wave</Label>
                                            <Input
                                                type="input"
                                                name="wave"
                                                id="emawaveil"
                                                value={this.state.wave}
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <Label for="skill">
                                                Skills{" "}
                                                <i
                                                    onClick={() =>
                                                        this.handleModal(
                                                            skill_table
                                                        )
                                                    }
                                                    style={{
                                                        color: "green",
                                                        cursor: "pointer"
                                                    }}
                                                    className="fa fa-plus icon"
                                                    aria-hidden="true"
                                                />
                                                <SimpleDataInput
                                                    data_name={
                                                        this.state.table
                                                            .data_name
                                                    }
                                                    label_name={
                                                        this.state.table
                                                            .label_name
                                                    }
                                                    modal={this.state.modal}
                                                    onModalChange={
                                                        this.handleModalState
                                                    }
                                                    table_data=""
                                                />
                                            </Label>
                                            <Input
                                                type="select"
                                                name="skill"
                                                id="skill"
                                                value={this.state.skill}
                                                onChange={this.handleChange}
                                            >
                                                <option>-----</option>
                                                {this.skills_list}
                                            </Input>
                                        </Col>
                                        <Col>
                                            <Label for="team_lead">
                                                Team Lead{" "}
                                                <i
                                                    onClick={() =>
                                                        this.handleModal(
                                                            team_lead_table
                                                        )
                                                    }
                                                    style={{
                                                        color: "green",
                                                        cursor: "pointer"
                                                    }}
                                                    className="fa fa-plus icon"
                                                    aria-hidden="true"
                                                />
                                                <SimpleDataInput
                                                    data_name={
                                                        this.state.table
                                                            .data_name
                                                    }
                                                    label_name={
                                                        this.state.table
                                                            .label_name
                                                    }
                                                    modal={this.state.modal}
                                                    onModalChange={
                                                        this.handleModalState
                                                    }
                                                    table_data=""
                                                />
                                            </Label>
                                            <Input
                                                type="select"
                                                name="team_lead"
                                                id="team_lead"
                                                value={this.state.team_lead}
                                                onChange={this.handleChange}
                                            >
                                                <option>-----</option>
                                                {this.team_lead_list}
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <Button
                                                color="primary"
                                                onClick={this.handleSubmit}
                                            >
                                                Update
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                            {this.props.agent.surveys && (
                                <Col md={6}>
                                    <Row>
                                        <Col>Survey Chart / List</Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <StackedBarChart
                                                filtered_list={
                                                    this.props
                                                        .filtered_agent_data
                                                }
                                                chart_parent={
                                                    <Row>
                                                        <Col>
                                                            <Bar
                                                                data={{
                                                                    datasets: [
                                                                        {
                                                                            label:
                                                                                "Topbox",
                                                                            data: this.props.agent_chart_data.map(
                                                                                item =>
                                                                                    Object.values(
                                                                                        item
                                                                                    )[0].filter(
                                                                                        survey =>
                                                                                            survey.bottombox !=
                                                                                            1
                                                                                    )
                                                                                        .length
                                                                            ),
                                                                            backgroundColor:
                                                                                "#ffed00"
                                                                        },
                                                                        {
                                                                            label:
                                                                                "Bottombox",
                                                                            data: this.props.agent_chart_data.map(
                                                                                item =>
                                                                                    Object.values(
                                                                                        item
                                                                                    )[0].filter(
                                                                                        survey =>
                                                                                            survey.bottombox ===
                                                                                            1
                                                                                    )
                                                                                        .length
                                                                            ),
                                                                            backgroundColor:
                                                                                "#64ff00"
                                                                        }
                                                                    ],
                                                                    labels: this.props.agent_chart_data.map(
                                                                        item =>
                                                                            Object.keys(
                                                                                item
                                                                            )[0]
                                                                    )
                                                                }}
                                                                options={{
                                                                    responsive: true,
                                                                    maintainAspectRatio: false,

                                                                    scales: {
                                                                        xAxes: [
                                                                            {
                                                                                stacked: true
                                                                            }
                                                                        ],
                                                                        yAxes: [
                                                                            {
                                                                                stacked: true
                                                                            }
                                                                        ]
                                                                    }
                                                                }}
                                                                height={300}
                                                            />
                                                        </Col>
                                                    </Row>
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <SurveyList
                                                survey_list={this.props.agent_chart_data
                                                    .map(
                                                        item =>
                                                            Object.values(
                                                                item
                                                            )[0]
                                                    )
                                                    .flat(Infinity)}
                                                // survey_list={this.agent_survey_list(
                                                //     this.props.agent.surveys
                                                // )}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    agents: state.surveys.agents,
    agent: state.surveys.agent,
    agentCompState: state.surveys.agentCompState,
    teamleads: state.surveys.teamleads,
    skills: state.surveys.skills,
    surveys: state.surveys.surveys,
    filtered_agent_data: state.surveys.filtered_agent_data,
    chart_data: state.surveys.chart_data,
    agent_chart_data: state.surveys.agent_chart_data
});

export default connect(mapStateToProps, {
    updateAgentComponentState,
    getAgent,
    updateAgent
})(AgentsComponent);
