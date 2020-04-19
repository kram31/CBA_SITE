import moment from "moment";

export const download_cols = [
    {
        label: "Surveyed Ticket #",
        value: (col) => col.surveyed_ticket.reference_number,
    },
    {
        label: "Agent's Name",
        value: (col) =>
            `${col.agent.user.first_name} ${col.agent.user.last_name}`,
    },
    {
        label: "Agent's Primary Skill",
        value: (col) =>
            col.agent.teams
                .map(({ agent_skill }) => agent_skill.name)
                .join(", "),
    },
    {
        label: "Transferred BB (Valid to Silo)",
        value: (col) => col.transferred_bb || "No entry",
    },
    { label: "Service", value: (col) => col.surveyed_ticket.service },
    {
        label: "Service Component",
        value: (col) => col.surveyed_ticket.service_component,
    },
    { label: "Brief description", value: (col) => col.brief_description },
    { label: "User's Verbatim", value: (col) => col.brief_description },
    {
        label: "What Caused the DSAT? Code 1",
        value: ({ dsat_code1 }) => (dsat_code1 || {}).name,
    },
    {
        label: "BB Driver Code 2",
        value: ({ bb_driver_code2 }) => (bb_driver_code2 || {}).name,
    },
    {
        label: "BB Driver Code 3",
        value: ({ bb_driver_code3 }) => (bb_driver_code3 || {}).name,
    },
    {
        label: "Actual Issue of the Surveyed ticket",
        value: (col) => col.actual_issue,
    },
    {
        label: "Service of the BB ticket",
        value: (col) => col.service_bb_ticket,
    },
    {
        label: "Service Component of the BB ticket",
        value: (col) => col.service_component_bb_ticket,
    },
    {
        label: "RCA Date",
        value: ({ date_completed }) =>
            moment(date_completed).format("DD-MM-YYYY"),
    },
    { label: "Controllability", value: (col) => col.controllability },
    {
        label: "Accountable team",
        value: ({ accountable_team }) => (accountable_team || {}).name,
    },
    {
        label: "Related ticket number",
        value: (col) => col.related_ticket_number,
    },
    { label: "RCA Owner", value: (col) => col.completed_by },
    { label: "Q1 Answer?", value: (col) => col.q1_answer },
    {
        label: "Have you contacted the customer?",
        value: (col) => col.contacted_customer,
    },
    {
        label: "Ticket Number",
        value: (col) => col.surveyed_ticket.reference_number,
    },
    { label: "Event Description", value: (col) => col.summary },
    { label: "Coached?", value: (col) => col.coaching },
    { label: "Log", value: "" },
    { label: "Action Plan", value: (col) => col.corrective_actions },
    { label: "Accountable Entity", value: (col) => col.accountable_entity },
    { label: "Findings 2", value: (col) => col.overall_reason_dsat },
    { label: "Week Starting", value: "" },
    { label: "Action Taken", value: "" },
    {
        label: "Owner (Team Lead Name)",
        value: (col) =>
            col.agent.teams
                .map(({ team_leads }) =>
                    team_leads
                        .map(
                            ({ user }) => `${user.first_name} ${user.last_name}`
                        )
                        .join(", ")
                )
                .join(", "),
    },
    {
        label: "Output Expected ( Remarks - Provide Status Update) by TL/Sup",
        value: "",
    },
    {
        label: "Start Date (Day1)(Format DD/MM)",
        value: "",
    },
    {
        label: "Last Update by TL/Supervisor (Format - DD/MM)",
        value: "",
    },
    { label: "Due Date", value: "" },
    { label: "Days Breached", value: "" },
    { label: "BUDI BU", value: (col) => col.surveyed_ticket.budi_bu },
    { label: "BUDI LV7", value: (col) => col.surveyed_ticket.budi_lv7 },
    { label: "O365", value: "" },
];
