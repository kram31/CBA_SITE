import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Form,
    InputGroup,
    InputGroupAddon,
    Button,
} from "reactstrap";

import { editCbaTeam } from "../../../../actions/surveyActions";

import FormInput from "../rca/FormInput";

class TeamLeadDataForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...props.cba_team };

        this.editCbaTeam = this.editCbaTeam.bind(this);
    }

    handleChange = (e) => {
        const { name, selectedOptions } = e.target;

        const values = this.props.teamleads.filter((lead) =>
            [...selectedOptions]
                .map((opt) => opt.value)
                .includes(lead.user.username)
        );

        // const values = [...e.target.selectedOptions].map(
        //     opt => this.props.teamleads[opt.value]
        // );
        console.log(values);
        this.setState(
            {
                [name]: values,
            },
            () => console.log(this.state)
        );
    };

    handleKeyDown = (e) => {
        if (e.keyCode == 27) {
            this.props.cancelEdit();
        }
    };

    getInputValue = (inputValue, options) =>
        inputValue ? (
            options
                .filter(
                    (item) => inputValue.user.username === item.user.username
                )
                .map((item, index) => (
                    <option key={index} value={index}>
                        {item.user.username}
                    </option>
                ))[0]
        ) : (
            <option key={options.length + 1} value={null}>
                {"Select..."}
            </option>
        );

    handleSubmit = (e) => {
        e.preventDefault();

        // console.log("Submit", this.state);

        const { team_leads, id } = this.state;
        console.log("Submit", { id, team_leads });

        this.editCbaTeam({ id, team_leads });

        this.props.toggle();

        // let newTeam = this.props.editCbaTeam(this.state);

        // this.props.callbackTeamLead({
        //     team_id: this.props.team_id,
        //     team: newTeam,
        // });

        // Open Modal

        // this.setState({ isOpen: !isOpen });
    };

    async editCbaTeam(data) {
        let newTeam = await this.props.editCbaTeam(data).then((data) => data);
        this.props.callbackTeamLead({
            team_id: this.props.team_id,
            team: newTeam,
        });
    }

    render() {
        const { team_leads } = this.state;

        // console.log(team_leads.length ? "TRUE" : "FALSE");
        return (
            <Form autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <Label for={`id_team_leads`}>Team Leads</Label>

                    <Input
                        type="select"
                        bsSize="sm"
                        name="team_leads"
                        id="id_team_leads"
                        value={
                            team_leads.length
                                ? team_leads.map(({ user }) => user.username)
                                : []
                        }
                        onChange={this.handleChange}
                        required
                        multiple
                        size="10"
                    >
                        {/* {this.getInputValue(
                                team_lead,
                                this.props.teamleads
                            )} */}
                        {this.props.teamleads &&
                            this.props.teamleads.map((item, index) => (
                                <option key={index} value={item.user.username}>
                                    {item.user.username}
                                </option>
                            ))}
                    </Input>
                </FormGroup>
                <Button
                    size="sm"
                    type="submit"
                    id="PopoverLegacy"
                    color="primary"
                >
                    Submit
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    teamleads: state.surveys.teamleads,
});

export default connect(mapStateToProps, { editCbaTeam })(TeamLeadDataForm);
