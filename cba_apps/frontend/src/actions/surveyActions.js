import {
	GET_SURVEYS,
	ADD_SURVEY,
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
	GET_BOTTOMBOX
} from './types';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

export const isFetching = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});
};

export const getSurveys = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.get('/api/surveys/').then((res) =>
		dispatch({
			type: GET_SURVEYS,
			payload: res.data
		})
	);
};

export const getRcas = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.get('/api/rca/').then((res) =>
		dispatch({
			type: GET_RCAS,
			payload: res.data
		})
	);
};

export const deleteSurvey = (id) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.delete(`/api/surveys/${id}`).then((res) =>
		dispatch({
			type: DELETE_SURVEY,
			payload: id
		})
	);
};

export const addSurveysBulk = (list_data) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	const post_reqs = list_data.map((data) => {
		axios
			.post('/api/surveys/', data)
			.then((res) => {
				dispatch({
					type: ADD_SURVEY,
					payload: res.data
				});
				dispatch({
					type: GET_BOTTOMBOX,
					payload: res.data
				});
			})
			.catch((err) => console.log(err));
	});
	Promise.all(post_reqs);
};

export const getSurvey = (data) => (dispatch) => {
	dispatch({
		type: GET_SURVEY,
		payload: data
	});
};

export const removeSurvey = () => (dispatch) => {
	dispatch({
		type: REMOVE_SURVEY,
		payload: {}
	});
};

export const getAgentDetails = (lan_id) => (dispatch) => {
	axios.get(`/api/agents/${lan_id}`).then((res) =>
		dispatch({
			type: GET_AGENT,
			payload: res.data
		})
	);
};

export const addSkill = (data) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios
		.post('/api/skills/', data)
		.then((res) =>
			dispatch({
				type: ADD_SKILL,
				payload: res.data
			})
		)
		.catch((err) => console.log(err));
};

export const getSkills = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.get('/api/skills/').then((res) =>
		dispatch({
			type: GET_SKILLS,
			payload: res.data
		})
	);
};

export const getDsatCode1 = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.get('/api/dsat_code1/').then((res) =>
		dispatch({
			type: GET_DSAT_CODE1,
			payload: res.data
		})
	);
};

export const getBBDriverCode2 = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.get('/api/bb_driver_code2/').then((res) =>
		dispatch({
			type: GET_BB_DRIVER_CODE2,
			payload: res.data
		})
	);
};

export const getBBDriverCode3 = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.get('/api/bb_driver_code3/').then((res) =>
		dispatch({
			type: GET_BB_DRIVER_CODE3,
			payload: res.data
		})
	);
};

export const addTeam = (data) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios
		.post('/api/team/', data)
		.then((res) =>
			dispatch({
				type: ADD_TEAM,
				payload: res.data
			})
		)
		.catch((err) => console.log(err));
};

export const getTeams = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.get('/api/team/').then((res) =>
		dispatch({
			type: GET_TEAMS,
			payload: res.data
		})
	);
};

export const addRCA = (rcaData) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.post('/api/rca/', rcaData).then((res) =>
		dispatch({
			type: ADD_RCA,
			payload: res.data
		})
	);
};

export const getTeamLeads = () => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios.get('/api/teamleads/').then((res) =>
		dispatch({
			type: GET_TEAMLEADS,
			payload: res.data
		})
	);
};

export const addTeamLead = (data) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios
		.post('/api/teamleads/', data)
		.then((res) =>
			dispatch({
				type: ADD_TEAMLEAD,
				payload: res.data
			})
		)
		.catch((err) => console.log(err));
};

export const addDsatCode1 = (data) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios
		.post('/api/dsat_code1/', data)
		.then((res) =>
			dispatch({
				type: ADD_DSAT_CODE1,
				payload: res.data
			})
		)
		.catch((err) => console.log(err));
};

export const addBbDriverCode2 = (data) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios
		.post('/api/bb_driver_code2/', data)
		.then((res) =>
			dispatch({
				type: ADD_BB_DRIVER_CODE2,
				payload: res.data
			})
		)
		.catch((err) => console.log(err));
};

export const addBbDriverCode3 = (data) => (dispatch) => {
	dispatch({
		type: FETCHING
	});

	axios
		.post('/api/bb_driver_code3/', data)
		.then((res) =>
			dispatch({
				type: ADD_BB_DRIVER_CODE3,
				payload: res.data
			})
		)
		.catch((err) => console.log(err));
};
