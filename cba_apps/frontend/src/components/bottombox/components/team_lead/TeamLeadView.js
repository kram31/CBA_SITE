import React, { useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import SetTeamForm from "./SetTeamForm";

import TeamLeadModal from "./TeamLeadModal";

import { GeneralRequest } from "../../../../actions/surveyActions";
import { DELETE_TEAMLEAD } from "../../../../actions/types";

import {
    Table,
    Row,
    Col,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "reactstrap";

const TeamLeadView = () => {
    const [teamlead, setTeamLead] = useState("");
    const [task, setTask] = useState("");
    const [popover, setPopover] = useState(false);
    const [modal, setModal] = useState(false);

    const toggle = () => setPopover(!popover);
    const toggleModal = () => setModal(!modal);

    const teamleads = useSelector((state) => state.surveys.teamleads);
    const cba_teams = useSelector((state) => state.surveys.cba_teams);
    const dispatch = useDispatch();

    const modalCallback = (data) => {
        const { answer, task, team_lead } = data;

        if (answer === "Yes") {
            switch (task) {
                case "Delete":
                    let reduxAction = new GeneralRequest(
                        "teamleads",
                        team_lead,
                        DELETE_TEAMLEAD
                    );
                    dispatch(reduxAction.deleteData());

                    break;

                default:
                    break;
            }
        }
    };

    const handleDelete = (data) => {
        console.log(getTeam(cba_teams, data));

        setModal(!modal);
        // const reduxAction = new GeneralRequest(
        //     "agent_skills",
        //     data,
        //     DELETE_AGENT_SKILL
        // );
    };

    const getTeam = (cba_teams, teamlead) =>
        cba_teams
            .filter(({ team_leads }) =>
                team_leads
                    .map(({ user }) => user.username)
                    .includes(teamlead.user.username)
            )
            .map(({ agent_skill }) => agent_skill.name)
            .join(", ");

    const iconStyle = {
        color: "red",
        cursor: "pointer",
    };

    return (
        <div style={{ color: "white" }} className="px-5">
            {teamleads.length ? (
                <Fragment>
                    <Row>
                        <Col>
                            <div style={{ float: "left" }}>
                                <h5>Team Leads</h5>
                            </div>
                            <div style={{ float: "right" }}>
                                <TeamLeadModal
                                    className="modal-xl"
                                    task="Add"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table
                                style={{
                                    color: "white",
                                    fontSize: "14px",
                                }}
                                bordered
                                className="text-center"
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Team</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamleads.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.user.first_name}</td>
                                            <td>{item.user.last_name}</td>
                                            <td>{item.user.username}</td>
                                            <td>
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                        textDecoration:
                                                            "underline",
                                                    }}
                                                    id={
                                                        "PopoverLegacy-" +
                                                        item.id
                                                    }
                                                    onClick={() =>
                                                        setTeamLead(item)
                                                    }
                                                >
                                                    {getTeam(cba_teams, item) ||
                                                        "Set Team"}
                                                </span>
                                                <TeamAssignmentPopover
                                                    isOpen={popover}
                                                    toggle={toggle}
                                                    item={item}
                                                    selected={teamlead}
                                                />
                                            </td>
                                            <td>
                                                <span className="d-inline-block mr-2">
                                                    <i
                                                        style={iconStyle}
                                                        onClick={() => {
                                                            // handleDelete(item);
                                                            setTask("Delete");
                                                            setTeamLead(item);
                                                            setModal(!modal);
                                                        }}
                                                        className="far fa-times-circle"
                                                    ></i>
                                                </span>
                                                <span className="d-inline-block">
                                                    <TeamLeadModal
                                                        className="modal-xl"
                                                        task="Edit"
                                                        userProp={item}
                                                    />
                                                </span>
                                            </td>

                                            <ConfirmModal
                                                isOpen={modal}
                                                toggle={toggleModal}
                                                item={item}
                                                selected={teamlead}
                                                task={task}
                                                modalCallback={modalCallback}
                                            />
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Fragment>
            ) : null}
        </div>
    );
};

const ConfirmModal = ({
    selected,
    item,
    isOpen,
    toggle,
    className,
    task,
    modalCallback,
}) => (
    <Modal
        isOpen={isOpen && selected.id === item.id}
        toggle={toggle}
        className={className}
    >
        <ModalHeader
            toggle={toggle}
            style={task === "Delete" && { backgroundColor: "red" }}
        >
            {task} Team Lead
        </ModalHeader>
        <ModalBody>
            {task === "Delete" ? (
                <p>
                    Are you sure you want to delete{" "}
                    <strong>
                        {item.user.first_name} {item.user.last_name}
                    </strong>
                </p>
            ) : null}
        </ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                onClick={() => {
                    modalCallback({ answer: "Yes", team_lead: item, task });
                    toggle();
                }}
            >
                Yes
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
);

const TeamAssignmentPopover = ({ selected, item, isOpen, toggle }) => (
    <UncontrolledPopover
        className="popover-container"
        trigger="legacy"
        placement="left"
        target={"PopoverLegacy-" + item.id}
        isOpen={isOpen && selected.id === item.id}
        toggle={toggle}
        // style={{ maxWidth: "700px" }}
    >
        <PopoverHeader>Set Team Assignment</PopoverHeader>
        <PopoverBody>
            <SetTeamForm teamlead={selected} toggle={toggle} />
            {/* <TeamLeadDataForm
                cba_team={team}
                callbackTeamLead={callbackTeamLead}
                agent={agent}
                team_id={team.id}
                toggle={toggle}
            /> */}
        </PopoverBody>
    </UncontrolledPopover>
);

export default TeamLeadView;
