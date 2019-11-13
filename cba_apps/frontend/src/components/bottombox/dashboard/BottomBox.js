import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import SurveyContent from "./SurveyContent";
import DatatablePage from "../upload-data/survey-data-table/DatatablePage";
import RCATable from "./RCATable";
import AgentsTable from "./AgentsTable";
import SideBar from "../../SideBar";
import Dashboard from "./Dashboard";
import BottomboxDrivers from "../components/BottomboxDrivers";
import AgentsComponent from "../components/AgentsComponent";

import { Spinner, Fade, Row, Col } from "reactstrap";

import {
  getAgents,
  getSurveys,
  getSkills,
  getDsatCode1,
  getBBDriverCode2,
  getBBDriverCode3,
  removeSurvey,
  getTeams,
  getRcas,
  getAllData2
} from "../../../actions/surveyActions";

class BottomBox extends Component {
  render() {
    return (
      <Fragment>
        {this.props.isFetching ? (
          <Spinner
            style={{
              width: "3rem",
              height: "3rem",
              top: "50%",
              left: "50%",
              position: "fixed"
            }}
          />
        ) : (
          <div>
            <Fade>
              <div className="sidebar-main">
                <SideBar />
              </div>
            </Fade>
            <div className="main">
              <div className="section">
                <Fade>
                  <AgentsComponent />
                </Fade>
              </div>
              <div className="section">
                <Fade>
                  <BottomboxDrivers />
                </Fade>
              </div>
              <div className="section">
                <Fade>
                  <Dashboard />
                </Fade>
              </div>

              <Fade>
                <div className="section section-c">
                  <DatatablePage />
                </div>
              </Fade>
              <Row>
                <Col>
                  <Fade>
                    <div className="section">
                      <RCATable />
                    </div>
                  </Fade>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  surveys: state.surveys.surveys,
  isFetching: state.surveys.isFetching,
  bottombox: state.surveys.bottombox,
  agents: state.surveys.agents,
  rcas: state.surveys.rcas
});

export default connect(mapStateToProps, {
  getSurveys,
  getSkills,
  getDsatCode1,
  getBBDriverCode2,
  getBBDriverCode3,
  removeSurvey,
  getTeams,
  getRcas,
  getAgents,
  getAllData2
})(BottomBox);
