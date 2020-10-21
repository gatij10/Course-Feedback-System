import React from 'react';
import { Route, Switch } from 'react-router-dom';
import homepage from './pages/homepage/homepage'
import feedback from './pages/feedback/feedback'
import login from './pages/login/login'
import score from './pages/score/score'
import selectrole from './pages/selectrole/selectrole'
import studentreg from './pages/studentregistration/studentreg'
import teacherreg from './pages/teacherregistration/teacherreg'



class Routes extends React.Component {
    render(){
        return(
            <Switch>
            <Route exact path="/" component={homepage}></Route>
            <Route exact path='/feedback' component={feedback}></Route>
            <Route exact path='/login' component={login}></Route>
            <Route exact path='/score' component={score}></Route>
            <Route exact path='/selectrole' component={selectrole}></Route>
            <Route exact path='/studreg' component={studentreg}></Route>
            <Route exact path='/teachreg' component={teacherreg}></Route>
            </Switch>
        )
        
    }
}

export default Routes;