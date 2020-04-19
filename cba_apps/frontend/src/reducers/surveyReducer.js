import {
    TOGGLE_FETCHING,
    LOADING_TOGGLE,
    CLEAR_UPLOAD_DETAILS,
    GET_CSAT_ADMIN,
    DELETE_CBA_TEAMS,
    EDIT_TEAMLEAD,
    DELETE_TEAMLEAD,
    DELETE_AGENT_SKILL,
    ADD_AGENT_SKILL,
    REMOVE_CSAT_ADMIN,
    ADD_CSAT_ADMIN,
    GET_USERS,
    DELETE_REQUEST_ACCESS,
    GET_ACCESS_REQUEST,
    REQUEST_ACCESS,
    GET_ADMIN,
    COLLAPSE_COMPONENT,
    REQ_ERROR,
    GET_SURVEYS,
    ADD_SURVEY,
    CREATE_CSAT_RCA,
    DELETE_SURVEY,
    GET_SURVEY,
    REMOVE_SURVEY,
    GET_AGENT,
    GET_SKILLS,
    GET_DSAT_CODE1,
    GET_BB_DRIVER_CODE2,
    GET_BB_DRIVER_CODE3,
    GET_TEAMS,
    ADD_RCA,
    FETCHING,
    ADD_SKILL,
    GET_TEAMLEADS,
    ADD_TEAMLEAD,
    ADD_DSAT_CODE1,
    ADD_BB_DRIVER_CODE2,
    ADD_BB_DRIVER_CODE3,
    ADD_CSAT_ACCOUNTABLE_TEAM,
    EDIT_CSAT_ACCOUNTABLE_TEAM,
    DELETE_CSAT_ACCOUNTABLE_TEAM,
    GET_RCAS,
    GET_BOTTOMBOX,
    GET_AGENTS,
    STOP_FETCHING,
    GET_ALL_DATA,
    UPDATE_RCA,
    DELETE_RCA,
    UPDATE_AGENT,
    ADD_AGENT,
    GET_RCA,
    REMOVE_RCA,
    DELETE_DSAT_CODE1,
    UPDATE_DSAT_CODE1,
    UPDATE_BB_DRIVER_CODE2,
    UPDATE_BOTTOMBOX_DRIVER_STATE,
    DELETE_BB_DRIVER_CODE2,
    DELETE_BB_DRIVER_CODE3,
    UPDATE_BB_DRIVER_CODE3,
    UPDATE_AGENTS_COMPONENT_STATE,
    UPDATE_CHART_DATA,
    UPDATE_AGENT_CHART_DATA,
    UPDATE_SELECTED_MONTH,
    UPDATE_SELECTED_WEEK,
    UPDATE_SELECTED_YEAR,
    COLLAPSE_AGENT_VIEW,
    COLLAPSE_BOTTOMBOX_DRIVER_VIEW,
    COLLAPSE_SURVEY_VIEW,
    COLLAPSE_DASHBOARD_VIEW,
    ADD_FAILED_SURVEY,
    GET_BOTTOMBOX_SURVEY_VIEW,
    GET_TOPBOX_SURVEY_VIEW,
    GET_COMPLETED_SURVEY_VIEW,
    GET_ALL_SURVEY_VIEW,
    UPDATE_SURVEY,
    GET_CBA_TEAMS,
    EDIT_CBA_TEAMS,
    ADD_CBA_TEAMS,
} from "../actions/types";
import { keys } from "../components/bottombox/upload-data/helpers/obj-keys";

let agent_headers = [
    "operator_lan_id",
    "surveys",
    "name",
    "email",
    "location",
    "wave",
    "skill",
    "team_lead",
];

// var now = new Date();
// var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// var lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
// console.log(lastSunday);

let curr = new Date();

let curr_year = curr.getFullYear();

const getMonth = (givenDate) => {
    let date = new Date(givenDate);

    let monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;
    let longName = monthName(date); // "July"

    return longName;
};

let get_data = (filtered_list) => {
    let curr = new Date();

    let curr_year = curr.getFullYear();
    let curr_month = curr.getMonth() + 1;

    let monthRangeInt = Array.from(new Array(curr_month), (x, i) => i + 1);

    // filter data per month
    let surveyCountPerMonth = monthRangeInt.map((month) => {
        let filteredSurveyPerMonth = filtered_list.filter(
            (survey) =>
                new Date(survey.date_issued).getMonth() + 1 == month &&
                new Date(survey.date_issued).getFullYear() == curr_year
        );

        let monthName = new Intl.DateTimeFormat("en-US", { month: "short" })
            .format;
        let name = monthName(new Date(`${curr_year}-${month}-01`));

        return {
            [name]: filteredSurveyPerMonth,
        };
    });

    return surveyCountPerMonth;
};

const initialState = {
    isLoading: false,
    cba_users: [],
    csat_access_request: [],
    csat_admin: [],
    collapse_component: "",
    req_error: [],
    success_uploads: [],
    csat_rcas: null,
    upload_failed_surveys: [],
    colors: ["#ffed00", "#64ff00", "#00c9ff", "white", "#666666", "#d9d9d9"],
    agent_view_collapse: false,
    bottombox_view_collapse: false,
    survey_view_collapse: true,
    dashboard_view_collapse: true,
    surveys: [],
    agents: [],
    headers: keys,
    survey: {},
    agent: {},
    agent_skills: [],
    cba_teams: [],
    dsat_code1: [],
    bb_driver_code2: [],
    bb_driver_code3: [],
    teams: [],
    rcas: null,
    teamleads: [],
    bottombox: [],
    isFetching: false,
    agent_headers,
    rca: {},
    doughnutChartSurveyData: [],
    pieChartCompletedSurveysCount: [],
    rcaTopDriversLabels: {},
    bbState: {
        name: "",
        edit: false,
        toggle: false,
        code1_name: "",
        code2_name: "",
        code1: "",
        code2: "",
        code2_list: [],
        code3_list: [],
    },
    agentCompState: {},
    filtered_agent_data: [],
    chart_data: [],
    selectedMonth: "",
    selectedWeek: "",
    selectedYear: curr_year,
    yearSelection: [],
    agent_chart_data: [],
    surveys_view: [],
    // drivername: number of rcas with the drivername
};

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DATA:
            const {
                surveys,
                csat_rcas,
                agent_skills,
                dsat_code1,
                bb_driver_code2,
                bb_driver_code3,
                csat_accountable_team,
                agents,
                teamleads,
                cba_teams,
                csat_admin,
                csat_access_request,
            } = action.payload;
            return {
                ...state,
                surveys: surveys,
                csat_rcas,
                agent_skills,
                dsat_code1,
                bb_driver_code2,
                bb_driver_code3,
                csat_accountable_team,
                agents,
                teamleads,
                cba_teams,
                csat_admin,
                csat_access_request,
            };
            break;
        case LOADING_TOGGLE:
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        case GET_USERS:
            return {
                ...state,
                cba_users: action.payload,
            };
        case GET_ACCESS_REQUEST:
            return {
                ...state,
                csat_access_request: action.payload,
            };
        case REQUEST_ACCESS:
            return {
                ...state,
                csat_access_request: [
                    ...state.csat_access_request,
                    action.payload,
                ],
            };
        case DELETE_REQUEST_ACCESS:
            return {
                ...state,
                csat_access_request: state.csat_access_request.filter(
                    (req) => req.id != action.payload.id
                ),
            };
        case COLLAPSE_COMPONENT:
            return {
                ...state,
                collapse_component: action.payload,
            };
        case REQ_ERROR:
            return {
                ...state,
                req_error: [action.payload, ...state.req_error],
            };
        case CLEAR_UPLOAD_DETAILS:
            return {
                ...state,
                req_error: [],
                success_uploads: [],
            };
        case ADD_CBA_TEAMS:
            return {
                ...state,
                // cba_teams: [action.payload, ...state.cba_teams],
                cba_teams: !state.cba_teams
                    .map(({ id }) => id)
                    .includes(action.payload.id)
                    ? [action.payload, ...state.cba_teams]
                    : state.cba_teams,
                agent_skills: !state.agent_skills
                    .map(({ id }) => id)
                    .includes(action.payload.agent_skill.id)
                    ? [action.payload.agent_skill, ...state.agent_skills]
                    : state.agent_skills,
            };
        case GET_CBA_TEAMS:
            return {
                ...state,
                cba_teams: action.payload,
            };
        case GET_CSAT_ADMIN:
            return {
                ...state,
                csat_admin: action.payload,
            };
        case REMOVE_CSAT_ADMIN:
            return {
                ...state,
                csat_admin: state.csat_admin.filter(
                    (admin) => admin.id != action.payload.id
                ),
            };
        case DELETE_AGENT_SKILL:
            return {
                ...state,
                agent_skills: state.agent_skills.filter(
                    (skill) => skill.id != action.payload.id
                ),
            };
        case ADD_AGENT_SKILL:
            return {
                ...state,
                agent_skills: !state.agent_skills
                    .map(({ name }) => name)
                    .includes(action.payload.name)
                    ? [action.payload, ...state.agent_skills]
                    : state.agent_skills,
            };
        case ADD_CSAT_ADMIN:
            return {
                ...state,
                csat_admin: !state.csat_admin
                    .map(({ user }) => user.username)
                    .includes(action.payload.user.username)
                    ? [action.payload, ...state.csat_admin]
                    : state.csat_admin,
            };
        case GET_ADMIN:
            return {
                ...state,
                csat_admin: action.payload,
            };
        case EDIT_CBA_TEAMS:
            return {
                ...state,
                cba_teams: state.cba_teams.map((team) =>
                    team.id === action.payload.id ? action.payload : team
                ),
                agents: updateAgentsTeam(state.agents, action.payload),
                csat_rcas: updateRcaAgentsTeam(state.csat_rcas, action.payload),
            };
        case DELETE_CBA_TEAMS:
            return {
                ...state,
                cba_teams: state.cba_teams.filter(
                    (team) => team.id !== action.payload.id
                ),
                agent_skills: state.agent_skills.filter(
                    (item) => item.id !== action.payload.agent_skill.id
                ),
                agents: state.agents.map((agent) => ({
                    ...agent,
                    teams: agent.teams.filter(
                        (team) => team.id !== action.payload.id
                    ),
                })),
                csat_rcas: state.csat_rcas.filter((rca) => ({
                    ...rca,
                    agent: {
                        ...rca.agent,
                        teams: rca.agent.teams.filter(
                            (team) => team.id !== action.payload.id
                        ),
                    },
                })),
            };
        case GET_COMPLETED_SURVEY_VIEW:
        case GET_ALL_SURVEY_VIEW:
            return {
                ...state,
                surveys_view: state.surveys,
            };
        case GET_COMPLETED_SURVEY_VIEW:
            return {
                ...state,
                surveys_view: state.surveys.filter(
                    (survey) => survey.completed === true
                ),
            };
        case GET_BOTTOMBOX_SURVEY_VIEW:
            return {
                ...state,
                surveys_view: state.surveys.filter(
                    (survey) =>
                        survey.bottombox === 1 && survey.completed === false
                ),
            };
        case GET_TOPBOX_SURVEY_VIEW:
            return {
                ...state,
                surveys_view: state.surveys.filter(
                    (survey) =>
                        survey.bottombox === 0 && survey.completed === false
                ),
            };
        case COLLAPSE_DASHBOARD_VIEW:
            return {
                ...state,
                dashboard_view_collapse: !state.dashboard_view_collapse,
            };
        case COLLAPSE_SURVEY_VIEW:
            return {
                ...state,
                survey_view_collapse: !state.survey_view_collapse,
            };
        case COLLAPSE_BOTTOMBOX_DRIVER_VIEW:
            return {
                ...state,
                bottombox_view_collapse: !state.bottombox_view_collapse,
            };
        case COLLAPSE_AGENT_VIEW:
            return {
                ...state,
                agent_view_collapse: !state.agent_view_collapse,
            };
        case UPDATE_SELECTED_YEAR:
            return {
                ...state,
                selectedWeek: action.payload,
            };
        case UPDATE_SELECTED_WEEK:
            return {
                ...state,
                selectedWeek: action.payload,
            };
        case UPDATE_SELECTED_MONTH:
            return {
                ...state,
                selectedMonth: action.payload,
            };
        case UPDATE_CHART_DATA:
            return {
                ...state,
                chart_data: action.payload,
            };
        case UPDATE_AGENT_CHART_DATA:
            return {
                ...state,
                agent_chart_data: action.payload,
            };
        case UPDATE_BOTTOMBOX_DRIVER_STATE:
            return {
                ...state,
                bbState: { ...state.bbState, ...action.payload },
            };
        case UPDATE_AGENTS_COMPONENT_STATE:
            return {
                ...state,
                agentCompState: { ...state.agentCompState, ...action.payload },
            };
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: !state.isFetching,
            };
        case FETCHING:
            return {
                ...state,
                isFetching: true,
            };
        case STOP_FETCHING:
            return {
                ...state,
                isFetching: false,
            };
        case GET_SURVEYS:
            return {
                ...state,
                surveys: action.payload,
                bottombox: action.payload.filter(
                    (item) => item.bottombox == 1 && !item.rca
                ),
                isFetching: false,
            };
        case GET_AGENTS:
            return {
                ...state,
                agents: action.payload,
                isFetching: false,
            };
        case GET_RCAS:
            return {
                ...state,

                rcas: action.payload,
                isFetching: false,
            };
        case DELETE_SURVEY:
            return {
                ...state,
                surveys: state.surveys.filter(
                    (item) => action.payload != item.reference_number
                ),
                surveys_view: state.surveys_view.filter(
                    (item) => action.payload != item.reference_number
                ),
                bottombox: state.bottombox.filter(
                    (item) => action.payload != item.reference_number
                ),
                rcas: state.rcas.filter(
                    (item) => action.payload != item.surveyed_ticket
                ),
                isFetching: false,
            };
        case CREATE_CSAT_RCA:
            return {
                ...state,
                csat_rcas: [action.payload, ...state.csat_rcas],
                // isFetching: false
            };
        case ADD_SURVEY:
            return {
                ...state,
                surveys: [action.payload, ...state.surveys],
                success_uploads: [action.payload, ...state.success_uploads],
                csat_rcas: [
                    action.payload.rca,
                    ...(state.csat_rcas ? state.csat_rcas : null),
                ],
                req_error: state.req_error.filter(
                    (err) =>
                        action.payload.reference_number !== err.reference_number
                ),
                agent_skills: !state.agent_skills
                    .map(({ name }) => name)
                    .includes(action.payload.scope)
                    ? [
                          ...action.payload.rca.agent.teams.map(
                              ({ agent_skill }) => agent_skill
                          ),
                          ...state.agent_skills,
                      ]
                    : state.agent_skills,
                agents: !state.agents
                    .map(({ operator_lan_id }) => operator_lan_id)
                    .includes(action.payload.rca.agent.operator_lan_id)
                    ? [action.payload.rca.agent, ...state.agents]
                    : state.agents,
                cba_teams: !state.cba_teams
                    .map(({ agent_skill }) => agent_skill.name)
                    .includes(action.payload.scope)
                    ? [
                          ...action.payload.rca.agent.teams.map((team) => team),
                          ...state.cba_teams,
                      ]
                    : state.cba_teams,
            };
        case UPDATE_SURVEY:
            return {
                ...state,
                surveys: state.surveys.map((item) =>
                    action.payload.reference_number === item.reference_number
                        ? action.payload
                        : item
                ),
                csat_rcas: state.csat_rcas.map((rca) =>
                    rca.id === action.payload.rca.id ? action.payload.rca : rca
                ),
                success_uploads: [action.payload, ...state.success_uploads],
            };
        case ADD_FAILED_SURVEY:
            return {
                ...state,
                upload_failed_surveys: [
                    action.payload,
                    ...state.upload_failed_surveys,
                ],
                // isFetching: false
            };
        case GET_BOTTOMBOX:
            return {
                ...state,
                bottombox: [
                    ...(action.payload.bottombox == 1 && [action.payload]),
                    ...state.bottombox,
                ],
                // isFetching: false
            };
        case GET_SURVEY:
            return {
                ...state,
                survey: action.payload,
            };
        case REMOVE_SURVEY:
            return {
                ...state,
                survey: action.payload,
                agent: {},
            };
        case GET_AGENT:
            return {
                ...state,
                agent: action.payload,
                filtered_agent_data: state.surveys.filter(
                    (survey) =>
                        survey.operator_lan_id ===
                        action.payload.operator_lan_id
                ),

                agent_chart_data: get_data(
                    state.surveys
                        .map((survey) => {
                            let x = state.rcas.filter(
                                (rca) =>
                                    rca.surveyed_ticket ===
                                    survey.reference_number
                            )[0];
                            return { ...survey, ...x };
                        })
                        .filter(
                            (data) =>
                                new Date(data.date_issued).getFullYear() ===
                                curr_year
                        )
                        .filter(
                            (survey) =>
                                survey.operator_lan_id ===
                                action.payload.operator_lan_id
                        )
                        .filter(
                            (data) =>
                                new Date(data.date_issued).getFullYear() ===
                                curr_year
                        )
                ),
                selectedMonth: "",
            };
        case GET_SKILLS:
            return {
                ...state,
                agent_skills: action.payload,
                isFetching: false,
            };
        case GET_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: action.payload,
                isFetching: false,
            };
        case DELETE_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: state.dsat_code1.filter(
                    (item) => action.payload.id != item.id
                ),
                isFetching: false,
            };

        case UPDATE_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: state.dsat_code1.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case DELETE_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: state.bb_driver_code2.filter(
                    (item) => action.payload.id != item.id
                ),
                isFetching: false,
            };
        case DELETE_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: state.bb_driver_code3.filter(
                    (item) => action.payload.id != item.id
                ),
                isFetching: false,
            };
        case UPDATE_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: state.bb_driver_code2.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                isFetching: false,
            };
        case UPDATE_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: state.bb_driver_code3.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                isFetching: false,
            };
        case GET_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: action.payload,
                isFetching: false,
            };
        case GET_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: action.payload,
                isFetching: false,
            };
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
                isFetching: false,
            };
        case ADD_CSAT_ACCOUNTABLE_TEAM:
            return {
                ...state,
                csat_accountable_team: [
                    action.payload,
                    ...state.csat_accountable_team,
                ],
                isFetching: false,
            };
        case EDIT_CSAT_ACCOUNTABLE_TEAM:
            return {
                ...state,
                csat_accountable_team: state.csat_accountable_team.map((team) =>
                    team.name === action.payload.old.name
                        ? action.payload.new
                        : team
                ),
                isFetching: false,
            };
        case DELETE_CSAT_ACCOUNTABLE_TEAM:
            return {
                ...state,
                csat_accountable_team: state.csat_accountable_team.filter(
                    (team) => team.name !== action.payload.name
                ),
                isFetching: false,
            };
        case ADD_RCA:
            return {
                ...state,
                rcas: [action.payload, ...state.rcas],
                bottombox: state.bottombox.filter(
                    (item) =>
                        action.payload.surveyed_ticket != item.reference_number
                ),
                pieChartCompletedSurveysCount: state.pieChartCompletedSurveysCount.map(
                    (val, index, arr) => (index == 0 ? val + 1 : val)
                ),
                isFetching: false,
            };
        case ADD_SKILL:
            return {
                ...state,
                agent_skills: [action.payload, ...state.agent_skills],
                isFetching: false,
            };
        case GET_TEAMLEADS:
            return {
                ...state,
                teamleads: action.payload,
            };
        case EDIT_TEAMLEAD:
            return {
                ...state,
                // teamleads: [action.payload, ...state.teamleads],
                teamleads: state.teamleads.map((lead) =>
                    lead.id === action.payload.id ? action.payload : lead
                ),
                isFetching: false,
            };
        case DELETE_TEAMLEAD:
            return {
                ...state,
                // teamleads: [action.payload, ...state.teamleads],
                teamleads: state.teamleads.filter(
                    (lead) => lead.id != action.payload.id
                ),
                isFetching: false,
            };
        case ADD_TEAMLEAD:
            return {
                ...state,
                // teamleads: [action.payload, ...state.teamleads],
                teamleads: !state.teamleads
                    .map(({ user }) => user.username)
                    .includes(action.payload.user.username)
                    ? [action.payload, ...state.teamleads]
                    : state.teamleads,
                isFetching: false,
            };
        case ADD_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: [action.payload, ...state.dsat_code1],
                isFetching: false,
            };
        case ADD_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: [action.payload, ...state.bb_driver_code2],
                isFetching: false,
            };
        case ADD_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: [action.payload, ...state.bb_driver_code3],
                isFetching: false,
            };

        case UPDATE_RCA:
            return {
                ...state,
                csat_rcas: state.csat_rcas.map((rca) =>
                    rca.id === action.payload.id ? action.payload : rca
                ),
                isFetching: false,
            };
        case DELETE_RCA:
            return {
                ...state,
                rcas: state.rcas.filter((item) => action.payload.id != item.id),
                bottombox: [action.payload, ...state.bottombox],
                pieChartCompletedSurveysCount: state.pieChartCompletedSurveysCount.map(
                    (val, index, arr) => (index == 0 ? val - 1 : val)
                ),

                isFetching: false,
            };
        case UPDATE_AGENT:
            return {
                ...state,
                agents: state.agents.map((agent) =>
                    agent.operator_lan_id == action.payload.operator_lan_id
                        ? action.payload
                        : agent
                ),
                // agent: { ...action.payload },
                isFetching: false,
            };
        case ADD_AGENT:
            return {
                ...state,
                agents: [action.payload, ...state.agents],
                isFetching: false,
            };
        case GET_RCA:
            return {
                ...state,
                rca: state.rcas.find((rca) => {
                    return action.payload == rca.surveyed_ticket;
                }),
            };
        case REMOVE_RCA:
            return {
                ...state,
                rca: {},
            };
        default:
            return state;
    }
};

let updateAgentsTeam = (agents, newTeam) =>
    agents.map((agent) => ({
        ...agent,
        teams: agent.teams.map(({ id }) => id).includes(newTeam.id)
            ? agent.teams.map((team) =>
                  team.id === newTeam.id ? newTeam : team
              )
            : agent.teams,
    }));

let updateRcaAgentsTeam = (rcas, newTeam) =>
    rcas.map((rca) => ({
        ...rca,
        agent: {
            ...rca.agent,
            teams: rca.agent.teams.map(({ id }) => id).includes(newTeam.id)
                ? rca.agent.teams.map((team) =>
                      team.id === newTeam.id ? newTeam : team
                  )
                : rca.agent.teams,
        },
    }));

export default surveyReducer;
