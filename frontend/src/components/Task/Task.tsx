import React from 'react';
import './Task.css';
import { TaskModel } from '../../models/Task.model';
import { Button, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface TaskComponentInputProps {
    task?: TaskModel;
}

export const TaskComponent: React.SFC<TaskComponentInputProps> = (props) => {
    return (
        <div className="task-details">
            <Header as="h2">Task # {props.task?.taskId}</Header>
            <Header as="h3">Source: {props.task?.source}</Header>
            <Header as="h3">Destination: {props.task?.destination}</Header>
            <Header as="h3">Size: {props.task?.totalSize}</Header>
            <Header as="h3">Files: {props.task?.totalNumberOfChecks}</Header>

            <Link to={`/task/${props.task?.taskId}`}>
                <Button icon labelPosition='right' floated="right">
                    More Details
                <Icon name='chevron right' />
                </Button>
            </Link>
            <br></br>
        </div>
    );

};
export default TaskComponent;