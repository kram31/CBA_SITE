import React from "react";

import { Table, Card, Button, CardHeader, CardBody } from "reactstrap";

import AccessRequestTeamChoiceModal from "./AccessRequestTeamChoiceModal";

import { useDispatch, useSelector } from "react-redux";

const AccessRequest = () => {
    const csat_access_request = useSelector(
        (state) => state.surveys.csat_access_request
    );
    const dispatch = useDispatch();

    const callback = (data) => {
        console.log(data);
    };

    return (
        <div>
            {csat_access_request.length ? (
                <Table style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {csat_access_request.map((req, i) => (
                            <tr key={req.id}>
                                <th scope="row">{i + 1}</th>
                                <td>{req.user.first_name}</td>
                                <td>{req.user.last_name}</td>
                                <td>{req.user.email}</td>
                                <td>
                                    <AccessRequestTeamChoiceModal
                                        buttonLabel="Approve"
                                        className="modal-xl"
                                        user={req.user}
                                        callback={callback}
                                        req={req}
                                    />
                                    {/* <Button size="sm" color="success">
                                    Approve
                                </Button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div style={{ textAlign: "center", color: "white" }}>
                    <p>No Data</p>
                </div>
            )}
        </div>
    );
};

export default AccessRequest;
