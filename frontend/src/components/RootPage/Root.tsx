import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { TaskDetailsComponent } from '../TaskDetails/TaskDetails'
import TasksOverviewComponent from '../OverviewPage/OverviewPage'
import { TransfersPageComponent } from '../TransfersPage/TransfersPage'
import { Header } from 'semantic-ui-react'
const RootPage = () => {
    return (
        <BrowserRouter>
            <Header as="h1">RClone Web App</Header>
            <Switch>
                {/* <Route component={TaskDetailsComponent} path="/task/:taskId" />
                <Route component={TasksOverviewComponent} path="/" /> */}
                <Route component={TransfersPageComponent} path={"/transfers"}/>
            </Switch>
        </BrowserRouter>
    )
}

export default RootPage;