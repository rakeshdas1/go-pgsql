import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { TaskDetailsComponent } from '../TaskDetails/TaskDetails'
import TasksOverviewComponent from '../OverviewPage/OverviewPage'
const RootPage = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={TaskDetailsComponent} path="/task/:taskId" />
                <Route component={TasksOverviewComponent} path="/" />
            </Switch>
        </BrowserRouter>
    )
}

export default RootPage;