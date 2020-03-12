import {
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
    ADD_TEAM,
    GET_RCAS,
    GET_BOTTOMBOX,
    GET_AGENTS,
    STOP_FETCHING,
    GET_ALL_DATA,
    UPDATE_SURVEY,
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
    GET_ALL_SURVEY_VIEW
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
    "team_lead"
];

// var now = new Date();
// var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// var lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
// console.log(lastSunday);

let curr = new Date();

let curr_year = curr.getFullYear();

const getMonth = givenDate => {
    let date = new Date(givenDate);

    let monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;
    let longName = monthName(date); // "July"

    return longName;
};

let get_data = filtered_list => {
    let curr = new Date();

    let curr_year = curr.getFullYear();
    let curr_month = curr.getMonth() + 1;

    let monthRangeInt = Array.from(new Array(curr_month), (x, i) => i + 1);

    // filter data per month
    let surveyCountPerMonth = monthRangeInt.map(month => {
        let filteredSurveyPerMonth = filtered_list.filter(
            survey =>
                new Date(survey.date_issued).getMonth() + 1 == month &&
                new Date(survey.date_issued).getFullYear() == curr_year
        );

        let monthName = new Intl.DateTimeFormat("en-US", { month: "short" })
            .format;
        let name = monthName(new Date(`${curr_year}-${month}-01`));

        return {
            [name]: filteredSurveyPerMonth
        };
    });

    return surveyCountPerMonth;
};

const initialState = {
    csat_rca: null,
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
    skills: [],
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
        code3_list: []
    },
    agentCompState: {},
    filtered_agent_data: [],
    chart_data: [],
    selectedMonth: "",
    selectedWeek: "",
    selectedYear: curr_year,
    yearSelection: [],
    agent_chart_data: [],
    surveys_view: []
    // drivername: number of rcas with the drivername
};

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DATA:
            const {
                surveys,
                rcas,
                skills,
                dsat_code1,
                bb_driver_code2,
                bb_driver_code3,
                teams,
                agents,
                teamleads
            } = action.payload;
            return {
                ...state,
                surveys: surveys,
                surveys_view: surveys,
                bottombox: surveys.filter(
                    item => item.bottombox == 1 && !item.rca
                ),
                pieChartCompletedSurveysCount: [
                    surveys.filter(item => item.completed == true).length,
                    surveys.length
                ],
                rcas,
                skills,
                dsat_code1,
                bb_driver_code2,
                bb_driver_code3,
                teams,
                agents,
                teamleads,
                yearSelection: [
                    new Date().getFullYear(),

                    ...new Set(
                        surveys.map(survey =>
                            new Date(survey.date_issued).getFullYear()
                        )
                    )
                ],
                chart_data: get_data(
                    surveys
                        .map(survey => {
                            let x = rcas.filter(
                                rca =>
                                    rca.surveyed_ticket ===
                                    survey.reference_number
                            )[0];
                            return { ...survey, ...x };
                        })
                        .filter(
                            data =>
                                new Date(data.date_issued).getFullYear() ===
                                curr_year
                        )
                )
            };
            break;
        case GET_ALL_SURVEY_VIEW:
            return {
                ...state,
                surveys_view: state.surveys
            };
        case GET_COMPLETED_SURVEY_VIEW:
            return {
                ...state,
                surveys_view: state.surveys.filter(
                    survey => survey.completed === true
                )
            };
        case GET_BOTTOMBOX_SURVEY_VIEW:
            return {
                ...state,
                surveys_view: state.surveys.filter(
                    survey =>
                        survey.bottombox === 1 && survey.completed === false
                )
            };
        case GET_TOPBOX_SURVEY_VIEW:
            return {
                ...state,
                surveys_view: state.surveys.filter(
                    survey =>
                        survey.bottombox === 0 && survey.completed === false
                )
            };
        case COLLAPSE_DASHBOARD_VIEW:
            return {
                ...state,
                dashboard_view_collapse: !state.dashboard_view_collapse
            };
        case COLLAPSE_SURVEY_VIEW:
            return {
                ...state,
                survey_view_collapse: !state.survey_view_collapse
            };
        case COLLAPSE_BOTTOMBOX_DRIVER_VIEW:
            return {
                ...state,
                bottombox_view_collapse: !state.bottombox_view_collapse
            };
        case COLLAPSE_AGENT_VIEW:
            return {
                ...state,
                agent_view_collapse: !state.agent_view_collapse
            };
        case UPDATE_SELECTED_YEAR:
            return {
                ...state,
                selectedWeek: action.payload
            };
        case UPDATE_SELECTED_WEEK:
            return {
                ...state,
                selectedWeek: action.payload
            };
        case UPDATE_SELECTED_MONTH:
            return {
                ...state,
                selectedMonth: action.payload
            };
        case UPDATE_CHART_DATA:
            return {
                ...state,
                chart_data: action.payload
            };
        case UPDATE_AGENT_CHART_DATA:
            return {
                ...state,
                agent_chart_data: action.payload
            };
        case UPDATE_BOTTOMBOX_DRIVER_STATE:
            return {
                ...state,
                bbState: { ...state.bbState, ...action.payload }
            };
        case UPDATE_AGENTS_COMPONENT_STATE:
            return {
                ...state,
                agentCompState: { ...state.agentCompState, ...action.payload }
            };
        case FETCHING:
            return {
                ...state,
                isFetching: true
            };
        case STOP_FETCHING:
            return {
                ...state,
                isFetching: false
            };
        case GET_SURVEYS:
            return {
                ...state,
                surveys: action.payload,
                bottombox: action.payload.filter(
                    item => item.bottombox == 1 && !item.rca
                ),
                isFetching: false
            };
        case GET_AGENTS:
            return {
                ...state,
                agents: action.payload,
                isFetching: false
            };
        case GET_RCAS:
            return {
                ...state,

                rcas: action.payload,
                isFetching: false
            };
        case DELETE_SURVEY:
            return {
                ...state,
                surveys: state.surveys.filter(
                    item => action.payload != item.reference_number
                ),
                surveys_view: state.surveys_view.filter(
                    item => action.payload != item.reference_number
                ),
                bottombox: state.bottombox.filter(
                    item => action.payload != item.reference_number
                ),
                rcas: state.rcas.filter(
                    item => action.payload != item.surveyed_ticket
                ),
                isFetching: false
            };
        case CREATE_CSAT_RCA:
            return {
                ...state,
                csat_rca: [action.payload, ...state.csat_rca]
                // isFetching: false
            };
        case ADD_SURVEY:
            return {
                ...state,
                surveys: [action.payload, ...state.surveys],
                bottombox: [
                    ...(action.payload.bottombox === 1 && [action.payload]),
                    ...state.bottombox
                ],
                surveys_view: [action.payload, ...state.surveys_view]
                // isFetching: false
            };
        case ADD_FAILED_SURVEY:
            return {
                ...state,
                upload_failed_surveys: [
                    action.payload,
                    ...state.upload_failed_surveys
                ]
                // isFetching: false
            };
        case GET_BOTTOMBOX:
            return {
                ...state,
                bottombox: [
                    ...(action.payload.bottombox == 1 && [action.payload]),
                    ...state.bottombox
                ]
                // isFetching: false
            };
        case GET_SURVEY:
            return {
                ...state,
                survey: action.payload
            };
        case REMOVE_SURVEY:
            return {
                ...state,
                survey: action.payload,
                agent: {}
            };
        case GET_AGENT:
            return {
                ...state,
                agent: action.payload,
                filtered_agent_data: state.surveys.filter(
                    survey =>
                        survey.operator_lan_id ===
                        action.payload.operator_lan_id
                ),

                agent_chart_data: get_data(
                    state.surveys
                        .map(survey => {
                            let x = state.rcas.filter(
                                rca =>
                                    rca.surveyed_ticket ===
                                    survey.reference_number
                            )[0];
                            return { ...survey, ...x };
                        })
                        .filter(
                            data =>
                                new Date(data.date_issued).getFullYear() ===
                                curr_year
                        )
                        .filter(
                            survey =>
                                survey.operator_lan_id ===
                                action.payload.operator_lan_id
                        )
                        .filter(
                            data =>
                                new Date(data.date_issued).getFullYear() ===
                                curr_year
                        )
                ),
                selectedMonth: ""
            };
        case GET_SKILLS:
            return {
                ...state,
                skills: action.payload,
                isFetching: false
            };
        case GET_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: action.payload,
                isFetching: false
            };
        case DELETE_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: state.dsat_code1.filter(
                    item => action.payload != item.id
                ),
                isFetching: false
            };

        case UPDATE_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: state.dsat_code1.map(item => {
                    if (item.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
                isFetching: false
            };
        case DELETE_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: state.bb_driver_code2.filter(
                    item => action.payload != item.id
                ),
                isFetching: false
            };
        case DELETE_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: state.bb_driver_code3.filter(
                    item => action.payload != item.id
                ),
                isFetching: false
            };
        case UPDATE_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: state.bb_driver_code2.map(item => {
                    if (item.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
                isFetching: false
            };
        case UPDATE_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: state.bb_driver_code3.map(item => {
                    if (item.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
                isFetching: false
            };
        case GET_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: action.payload,
                isFetching: false
            };
        case GET_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: action.payload,
                isFetching: false
            };
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
                isFetching: false
            };
        case ADD_TEAM:
            return {
                ...state,
                teams: [action.payload, ...state.teams],
                isFetching: false
            };
        case ADD_RCA:
            return {
                ...state,
                rcas: [action.payload, ...state.rcas],
                bottombox: state.bottombox.filter(
                    item =>
                        action.payload.surveyed_ticket != item.reference_number
                ),
                pieChartCompletedSurveysCount: state.pieChartCompletedSurveysCount.map(
                    (val, index, arr) => (index == 0 ? val + 1 : val)
                ),
                isFetching: false
            };
        case ADD_SKILL:
            return {
                ...state,
                skills: [action.payload, ...state.skills],
                isFetching: false
            };
        case GET_TEAMLEADS:
            return {
                ...state,
                teamleads: action.payload,
                isFetching: false
            };
        case ADD_TEAMLEAD:
            return {
                ...state,
                teamleads: [action.payload, ...state.teamleads],
                isFetching: false
            };
        case ADD_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: [action.payload, ...state.dsat_code1],
                isFetching: false
            };
        case ADD_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: [action.payload, ...state.bb_driver_code2],
                isFetching: false
            };
        case ADD_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: [action.payload, ...state.bb_driver_code3],
                isFetching: false
            };
        case UPDATE_SURVEY:
            return {
                ...state,
                surveys_view: [
                    action.payload,
                    ...state.surveys_view.filter(
                        survey =>
                            survey.reference_number !==
                            action.payload.reference_number
                    )
                ],
                surveys: [
                    action.payload,
                    ...state.surveys.filter(
                        survey =>
                            survey.reference_number !==
                            action.payload.reference_number
                    )
                ],

                isFetching: false
            };
        case UPDATE_RCA:
            return {
                ...state,
                rcas: state.rcas.map(rca => {
                    if (rca.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return rca;
                    }
                }),
                isFetching: false
            };
        case DELETE_RCA:
            return {
                ...state,
                rcas: state.rcas.filter(item => action.payload.id != item.id),
                bottombox: [action.payload, ...state.bottombox],
                pieChartCompletedSurveysCount: state.pieChartCompletedSurveysCount.map(
                    (val, index, arr) => (index == 0 ? val - 1 : val)
                ),

                isFetching: false
            };
        case UPDATE_AGENT:
            return {
                ...state,
                agents: state.agents.map(agent => {
                    if (
                        agent.operator_lan_id == action.payload.operator_lan_id
                    ) {
                        return action.payload;
                    } else {
                        return agent;
                    }
                }),
                agent: { ...action.payload },
                isFetching: false
            };
        case ADD_AGENT:
            return {
                ...state,
                agents: [action.payload, ...state.agents],
                isFetching: false
            };
        case GET_RCA:
            return {
                ...state,
                rca: state.rcas.find(rca => {
                    return action.payload == rca.surveyed_ticket;
                })
            };
        case REMOVE_RCA:
            return {
                ...state,
                rca: {}
            };
        default:
            return state;
    }
};

export default surveyReducer;
