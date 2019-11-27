import React from 'react';
import logo from './logo.svg';
//import './App.sass';
// import 'bulma/css/bulma.css'
import './App.css';
import Panel from './Panel';
import Dropdown from './Dropdown';

import { SURVEY_LIST, ASSIGNED_LIST } from "./constants";



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      whichEmployeeIsSelected: "employee1", // by default 
      currentSurveyList: [],
      currentAssignedList: [],
      employees: [
        {
          employee1: {
            surveyList: ["Survey1", "Survey2", "Survey3"],
            assignedList: []
          }
        },
        {
          employee2: {
            surveyList: ["Survey1", "Survey3"],
            assignedList: ["Survey2"]
          }
        },
        {
          employee3: {
            surveyList: ["Survey3"],
            assignedList: ["Survey1", "Survey2"]
          }
        }
      ]
    }

    this.addSurvey = this.addSurvey.bind(this);
    this.removeSurvey = this.removeSurvey.bind(this);
    this.getLists = this.getLists.bind(this);
  }

  getLists(whichEmployeeIsSelected) {
    let surveyArray = [], assignedArray = [];

    this.state.employees.forEach((eachEmployee, index) => {
      for (let employeeName in eachEmployee) {
        for (let employeeName in eachEmployee) {
          if (employeeName === whichEmployeeIsSelected) {
            surveyArray = eachEmployee[employeeName][SURVEY_LIST];
            assignedArray = eachEmployee[employeeName][ASSIGNED_LIST];
          }
        }
      }
      console.log(surveyArray, +"\n", assignedArray);
    })
    this.setState({
      currentSurveyList: surveyArray,
      currentAssignedList: assignedArray,
      whichEmployeeIsSelected
    })
  }

  addSurvey(whichSurvey, whichEmployee) {
    let newObj = [];
    newObj = this.state.employees;
    newObj.forEach((eachEmployee) => {
      for (let employeeName in eachEmployee) {
        console.log(employeeName + ": ");
        if (employeeName === whichEmployee) {
          let index = eachEmployee[employeeName][SURVEY_LIST].indexOf(whichSurvey);
          if (index !== -1)
            eachEmployee[employeeName][SURVEY_LIST].splice(index, 1);

          eachEmployee[employeeName][ASSIGNED_LIST].push(whichSurvey);
        }
        for (let eachList in eachEmployee[employeeName])
          console.log(eachList + ":" + eachEmployee[employeeName][eachList])
      }

    })
    this.setState({
      employees: newObj
    })
  }

  removeSurvey(whichSurvey, whichEmployee) {
    let newObj = [];
    newObj = this.state.employees;
    newObj.forEach((eachEmployee) => {
      for (let employeeName in eachEmployee) {
        console.log(employeeName + ": ");
        if (employeeName === whichEmployee) {
          let index = eachEmployee[employeeName][ASSIGNED_LIST].indexOf(whichSurvey);
          if (index !== -1)
            eachEmployee[employeeName][ASSIGNED_LIST].splice(index, 1);

          eachEmployee[employeeName][SURVEY_LIST].push(whichSurvey);
        }
        for (let eachList in eachEmployee[employeeName])
          console.log(eachList + ":" + eachEmployee[employeeName][eachList])
      }

    })
    this.setState({
      employees: newObj
    })
  }

  componentWillMount() {
    this.getLists("employee1");
  }

  render() {
    return (
      <div>
        <div>Select Employee</div>
        {/* <Dropdown /> */}
        <select onChange={(e) => this.getLists(e.target.value)}>
          <option>employee1</option>
          <option>employee2</option>
          <option>employee3</option>
        </select>

        <div className="surveys-container">
          <div className="each-survey-container">
            <span>Survey List</span>
            <Panel hasRemoveButton={false} addSurvey={this.addSurvey} list={this.state.currentSurveyList} whichEmployeeIsSelected={this.state.whichEmployeeIsSelected} />
          </div>
          <div className="each-survey-container">
            <span>Assigned Surveys</span>
            <Panel hasRemoveButton={true} addSurvey={() => { console.log("TODO") }} removeSurvey={this.removeSurvey} list={this.state.currentAssignedList} whichEmployeeIsSelected={this.state.whichEmployeeIsSelected} />
          </div>
        </div>
        <button class="button is-primary submit-button">Done</button>

      </div>
    );
  }

}

export default App;