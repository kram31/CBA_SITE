import React, { Component, Fragment } from "react";
import XLSX from "xlsx";
import { SheetJSFT } from "./helpers/types";
import { surveyKeys } from "./helpers/surveyKeys";
import {
    addSurveysBulk,
    addSurvey,
    updateSurvey,
    addAgentSkill,
    addCbaTeam,
    addAgent,
    getAllData2,
    clearUploadDetails,
    loadingToggle,
} from "../../../../actions/surveyActions";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import SurveyTable from "../surveyTable/SurveyTable";
import Loader from "../loaders/Loader";

import { connect } from "react-redux";

import Loading from "../loaders/Loading";

class UploadData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            file: null,
            data: [],
            filtered_data: {
                post: null,
                put: null,
            },
        };

        this.LoadingOn = this.LoadingOn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createNewAgent = this.createNewAgent.bind(this);
        this.createNewAgentSkillAndCbaTeam = this.createNewAgentSkillAndCbaTeam.bind(
            this
        );
    }

    async LoadingOn() {
        return this.setState({ isLoading: true });
    }

    async handleChange(e) {
        this.LoadingOn();

        const files = e.target.files;

        if (files && files[0]) this.setState({ file: files[0] });

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */

            const bstr = e.target.result;

            const wb = XLSX.read(bstr, {
                type: rABS ? "binary" : "array",
                bookVBA: true,
                sheetStubs: true,
            });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */

            const data = XLSX.utils.sheet_to_json(ws, {
                defval: "",
                header: surveyKeys,
                range: 1,
            });

            /* Update state */

            const { surveys } = this.props;

            const { cba_teams, agents } = this.props;

            let changedData = data.map((item) => ({
                ...item,
                uploaded_by: this.props.user.user.email,
            }));

            let existingData = [];
            let newData = [];

            changedData.forEach((item) => {
                if (
                    surveys
                        .map(({ reference_number }) => reference_number)
                        .includes(item.reference_number)
                ) {
                    return existingData.push(item);
                }
                return newData.push(item);
            });

            // get all new scopes > send agentSkill post req > send post team req

            // get all new agents > create user > create agent

            // console.log("Existing Data", existingData);

            // console.log("New Data", newData);

            this.setState(
                {
                    filtered_data: {
                        post: newData.length ? newData : null,
                        put: existingData.length ? existingData : null,
                    },
                },
                () => this.setState({ isLoading: false })
            );

            // this.setState({ data: data, isStaged: !this.state.isStaged });
        };

        if (rABS) {
            reader.readAsBinaryString(files[0]);
        } else {
            reader.readAsArrayBuffer(files[0]);
        }
    }

    processNewAgent = (existingList, data) => {
        if (existingList.length) {
            let newDataRaw = data.filter(
                (item) =>
                    !existingList
                        .map(({ operator_lan_id }) => operator_lan_id)
                        .includes(
                            item.owner_name === "ITSD_AskIT_Ticket_Triage"
                                ? "ITSD_AskIT_Ticket_Triage"
                                : item.operator_lan_id
                        )
            );

            console.log(newDataRaw);

            // remove duplicates

            if (newDataRaw.length) {
                let seen = new Set();

                let newData = newDataRaw.filter((item) => {
                    if (!seen.has(item.operator_lan_id)) {
                        seen.add(item.operator_lan_id);
                        return item;
                    }
                });

                console.log(newData);

                // send post requests for creating agent_skill and cba_team

                if (newData.length) {
                    newData.forEach((survey) => {
                        let newAgentReq = {
                            operator_lan_id:
                                survey.owner_name !== "ITSD_AskIT_Ticket_Triage"
                                    ? survey.operator_lan_id
                                    : "ITSD_AskIT_Ticket_Triage",
                            location: survey.location,
                            wave: survey.wave,
                            owner_name: survey.owner_name,
                            owner_name_email_address:
                                survey.owner_name_email_address,
                            scope: survey.scope,
                            teams: [],
                        };

                        console.log(newAgentReq);

                        this.createNewAgent(newAgentReq);
                    });
                }
            }
        } else {
            let seen = new Set();

            let newData = data.filter((item) => {
                if (!seen.has(item.operator_lan_id)) {
                    seen.add(item.operator_lan_id);
                    return item;
                }
            });

            console.log("NEW DATA", newData);

            if (newData.length) {
                newData.forEach((survey) => {
                    let newAgentReq = {
                        operator_lan_id:
                            survey.owner_name !== "ITSD_AskIT_Ticket_Triage"
                                ? survey.operator_lan_id
                                : "ITSD_AskIT_Ticket_Triage",
                        location: survey.location,
                        wave: survey.wave,
                        owner_name: survey.owner_name,
                        owner_name_email_address:
                            survey.owner_name_email_address,
                        scope: survey.scope,
                        teams: [],
                    };

                    console.log(newAgentReq);

                    this.createNewAgent(newAgentReq);
                });
            }
        }
    };

    processNewAgentSkillandTeam = (existingList, data) => {
        if (existingList.length) {
            let newScopesRaw = data.filter(
                (item) =>
                    !existingList
                        .map(({ agent_skill }) => agent_skill.name)
                        .includes(item.scope)
            );

            // remove duplicates

            if (newScopesRaw.length) {
                let seen = new Set();

                let newScopes = newScopesRaw.filter((item) => {
                    if (!seen.has(item.scope)) {
                        seen.add(item.scope);
                        return item;
                    }
                });

                // send post requests for creating agent_skill and cba_team

                if (newScopes.length) {
                    newScopes.forEach((survey) => {
                        let newSkillReq = {
                            name: survey.scope,
                        };

                        this.createNewAgentSkillAndCbaTeam(newSkillReq, survey);
                    });
                }
            }
        } else {
            let seen = new Set();

            let newScopes = data.filter((item) => {
                if (!seen.has(item.scope)) {
                    seen.add(item.scope);
                    return item;
                }
            });

            // send post requests for creating agent_skill and cba_team

            if (newScopes.length) {
                newScopes.forEach((survey) => {
                    let newSkillReq = {
                        name: survey.scope,
                    };

                    this.createNewAgentSkillAndCbaTeam(newSkillReq, survey);
                });
            }
        }
        return "success";
    };

    async createNewAgent(newAgentReq) {
        let newAgent = await this.props
            .addAgent(newAgentReq)
            .then((data) => data);
        console.log(newAgent);

        return newAgent;
    }

    async createNewAgentSkillAndCbaTeam(newSkillReq, survey) {
        let newSkill = await this.props
            .addAgentSkill(newSkillReq)
            .then((data) => data);

        let newCbaTeam = await this.props
            .addCbaTeam({ agent_skill: newSkill })
            .then((data) => data);

        console.log("CBA TEAM", newCbaTeam);

        return { team: newCbaTeam };
    }

    handleFile = (e) => {
        e.preventDefault();

        // console.log("send Data", this.state.filtered_data);

        // this.props.addSurveysBulk(this.state.filtered_data);

        this.runPostRequest();

        this.setState({
            filtered_data: {
                post: null,
                put: null,
            },
            file: null,
        });
    };

    async runPutRequest(data) {
        await this.props.updateSurvey(data);
    }

    async runPostRequest() {
        const { post, put } = this.state.filtered_data;
        const { cba_teams, agents, addAgent, loadingToggle } = this.props;

        loadingToggle();

        // await
        if (post) {
            for (const data of post) {
                try {
                    !agents
                        .map(({ operator_lan_id }) => operator_lan_id)
                        .includes(data.operator_lan_id) &&
                        (await addAgent({
                            operator_lan_id:
                                data.owner_name !== "ITSD_AskIT_Ticket_Triage"
                                    ? data.operator_lan_id
                                    : "ITSD_AskIT_Ticket_Triage",
                            location: data.location,
                            wave: data.wave,
                            owner_name: data.owner_name,
                            owner_name_email_address:
                                data.owner_name_email_address,
                            scope: data.scope,
                            teams: [],
                        }));
                    !cba_teams
                        .map(({ agent_skill }) => agent_skill.name)
                        .includes(data.scope) &&
                        (await this.props.addCbaTeam({
                            agent_skill: {
                                name: data.scope,
                            },
                            team_leads: [],
                        }));
                    await this.props.addSurvey(data);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        if (put) {
            for (const data of put) {
                try {
                    await this.props.updateSurvey(data);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        loadingToggle();
    }

    getColumns = (list) =>
        Object.keys(list[0]).map((item) => ({
            Header: item,
            accessor: item,
        }));

    render() {
        let processedData = this.state.filtered_data;
        const { success_uploads, req_error, isLoading } = this.props;

        let tableHeaderStyle = { color: "black" };

        let postColumn = [
            {
                Header: "Reference Number",
                id: "reference_number",
                accessor: ({ reference_number }) => reference_number,
            },
            {
                Header: "Escalator Name",
                id: "escalator_name",
                accessor: (row) => `${row.first_name} ${row.last_name}`,
            },
            {
                Header: "Escalator Email Address",
                id: "customer_email_address",
                accessor: ({ customer_email_address }) =>
                    customer_email_address,
            },
            {
                Header: "Date Escalated",
                id: "date_time",
                accessor: ({ date_time }) => date_time,
            },
            {
                Header: "Bottombox",
                id: "bottombox",
                accessor: ({ bottombox }) => bottombox,
            },
        ];

        return (
            <Fragment>
                <Form>
                    {this.state.file === null ? (
                        <FormGroup>
                            <Label
                                onChange={this.handleChange}
                                className={`btn btn-${
                                    isLoading ? "primary" : "success"
                                } py-2 my-auto`}
                                for="id_upload_data"
                                style={{
                                    cursor: isLoading ? "default" : "pointer",
                                }}
                            >
                                <span>
                                    <Loading />
                                </span>
                                {isLoading
                                    ? "Uploading data"
                                    : "Select CSAT Excel template file"}
                                <Input
                                    id="id_upload_data"
                                    name="selectedFile"
                                    accept={SheetJSFT}
                                    type="file"
                                    style={{
                                        display: "none",
                                    }}
                                    disabled={isLoading}

                                    // onChange={this.handleChange}
                                />
                            </Label>

                            <FormText color="danger">
                                IMPORTANT!{" "}
                                {isLoading
                                    ? "Uploading data... Do not refresh or close this window!"
                                    : "Check headers and data before upload..."}
                            </FormText>
                        </FormGroup>
                    ) : processedData.post !== null ||
                      processedData.put !== null ? (
                        <Button onClick={this.handleFile} color="success">
                            {!this.props.isFetching ? null : <Loader />}Send
                            Data
                        </Button>
                    ) : null}
                </Form>
                {processedData.post ? (
                    <Fragment>
                        <div className="mt-2">
                            <h5 style={tableHeaderStyle}>Data to be added</h5>
                            <SurveyTable
                                data={processedData.post}
                                columns={postColumn}
                            />
                        </div>
                    </Fragment>
                ) : null}
                {processedData.put ? (
                    <Fragment>
                        <div className="mt-2">
                            <h5 style={tableHeaderStyle}>
                                Data to be modified
                            </h5>
                            <SurveyTable
                                data={processedData.put}
                                columns={postColumn}
                            />
                        </div>
                    </Fragment>
                ) : null}
                {req_error.length ? (
                    <Fragment>
                        <div className="mt-2">
                            <h5 style={tableHeaderStyle}>
                                Failed uploading the following tickets
                            </h5>
                            <SurveyTable
                                data={req_error}
                                columns={this.getColumns(req_error)}
                            />
                        </div>
                    </Fragment>
                ) : null}
                {success_uploads.length ? (
                    <Fragment>
                        <div className="mt-2">
                            <h5 style={tableHeaderStyle}>
                                Following tickets were uploaded successfully
                            </h5>
                            <SurveyTable
                                data={success_uploads}
                                columns={postColumn}
                            />
                        </div>
                    </Fragment>
                ) : null}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    surveys: state.surveys.surveys,
    cba_teams: state.surveys.cba_teams,
    agents: state.surveys.agents,
    success_uploads: state.surveys.success_uploads,
    req_error: state.surveys.req_error,
    isFetching: state.surveys.isFetching,
    isLoading: state.surveys.isLoading,
});

export default connect(mapStateToProps, {
    addSurveysBulk,
    addSurvey,
    updateSurvey,
    addAgentSkill,
    addCbaTeam,
    addAgent,
    getAllData2,
    clearUploadDetails,
    loadingToggle,
})(UploadData);
