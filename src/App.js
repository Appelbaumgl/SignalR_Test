import React, { Component } from 'react';
import './App.css';
const signalR = require("@aspnet/signalr");

class App extends Component {

  //Called after the component is mounted.
  componentDidMount() {
    //Sets up the SignalR connection
    var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44352/hub").build();

    //Called whenever an appointment update is recieved from the API.
    connection.on("AppointmentUpdate", function (message) {
      console.log("Appointment", message);
    });

    //Called whenever a service tech update is recieved from the API.
    connection.on("ServiceTechUpdate", function (message) {
      console.log("ServiceTech", message);
    });

    //Called whenever a company update is recieved from the API.
    connection.on("CompanyUpdate", function (message) {
      console.log("Company", message);
    });
      
    //Starts the connection and adds the connection to a group after the connection is established.
    //Replace the Guid string with any valid appointment Guid.  This would be replaced by the Guid in the url path when that is implemented.
    connection.start().then(() => {
      connection.invoke("AddToGroup", "1e42bb0d-fa2d-4981-925f-f83c43d0c48f").catch(err => console.error(err.toString()));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          SignalR Test <br/>
          Open the Dev Console
        </header>
      </div>
    );
  }
}

export default App;
