import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import News from "./News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = ()=> {
  const pageSize = 5;

    return (
      <div>
        <Router>
          <Navbar />

          <Switch>
            <Route exact strict path="/">
              <News key='general' pageSize={pageSize} country="in" category="general" />
            </Route>
            <Route exact strict path="/business">
              <News key='business' pageSize={pageSize} country="in" category="business" />
            </Route>
            <Route exact strict path="/entertainment">
              <News key='entertainment' pageSize={pageSize} country="in" category="entertainment" />
            </Route>
            <Route exact strict path="/general">
              <News key='general' pageSize={pageSize} country="in" category="general" />
            </Route>
            <Route exact strict path="/health">
              <News key='health' pageSize={pageSize} country="in" category="health" />
            </Route>
            <Route exact strict path="/science">
              <News key='science' pageSize={pageSize} country="in" category="science" />
            </Route>
            <Route exact strict path="/sports">
              <News key='sports' pageSize={pageSize} country="in" category="sports" />
            </Route>
            <Route exact strict path="/technology">
              <News key='technology' pageSize={pageSize} country="in" category="technology" />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
}
 export default App;