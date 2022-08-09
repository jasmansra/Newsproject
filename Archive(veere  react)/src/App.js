
import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {



  render() {
    return (
      <div>
          <LoadingBar
        color='blue'
        progress='100'
        height='5px'
        loaderSpeed='1000'
        waitingTime='1000'
        transitionTime='1000'
        
      />
        <Navbar/>
        <Home/>
      </div>
    );
  }
}
