import React, { Component } from "react";
import { connect } from "react-redux";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Form,
} from "reactstrap";

import {
    editCbaTeam,
    deleteRequestAccess,
} from "../../../../actions/surveyActions";

import { EDIT_CBA_TEAMS } from "../../../../actions/types";

class AccessRequestTeamChoiceModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            team: "",
        };

        this.processApiReq = this.processApiReq.bind(this);
    }

    toggle = () => this.setState({ modal: !this.state.modal });

    handleChange = (e) => {
        const { cba_teams } = this.props;
        // console.log(cba_teams[e.target.value]);

        this.setState({ team: cba_teams[e.target.value] });
    };

    handleSubmit = (e) => {
        // e.preventDefault();

        const {
            user,
            callback,
            editCbaTeam,
            req,
            deleteRequestAccess,
        } = this.props;

        const { team } = this.state;

        // callback(this.state.team, user);

        // console.log("SUBMIT", {
        //     ...team,
        //     team_leads: [...team.team_leads, { user: user }],
        // });

        // let newPromise = new Promise()

        this.processApiReq();

        this.setState({ team: "" });

        this.toggle();
    };

    async processApiReq() {
        const {
            user,
            callback,
            editCbaTeam,
            req,
            deleteRequestAccess,
        } = this.props;

        const { team } = this.state;

        let newTeam = await editCbaTeam({
            ...team,
            team_leads: [...team.team_leads, { user: user }],
        });

        newTeam && (await deleteRequestAccess(req));
    }

    render() {
        const { buttonLabel, className, cba_teams } = this.props;

        // {...cba_teams}

        const { modal, team } = this.state;

        // const options = [team || {}, ...cba_teams];

        return (
            <div>
                <Button color="success" size="sm" onClick={this.toggle}>
                    {buttonLabel}
                </Button>
                <Form>
                    <Modal
                        isOpen={modal}
                        toggle={this.toggle}
                        className={className}
                    >
                        <ModalHeader toggle={this.toggle}>
                            Team Assignment
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                type="select"
                                bsSize="sm"
                                name="team"
                                id="id_team"
                                value={team ? team.agent_skill.name : ""}
                                onChange={this.handleChange}
                                required
                            >
                                {team ? (
                                    <option value={team.id}>
                                        {team.agent_skill.name}
                                    </option>
                                ) : (
                                    <option value={""}>Select...</option>
                                )}
                                {cba_teams.map((team, index) => (
                                    <option key={index} value={index}>
                                        {team.agent_skill.name}
                                    </option>
                                ))}
                            </Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleSubmit}>
                                Submit
                            </Button>{" "}
                            <Button color="secondary" onClick={this.toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cba_teams: state.surveys.cba_teams,
});

export default connect(mapStateToProps, { editCbaTeam, deleteRequestAccess })(
    AccessRequestTeamChoiceModal
);
