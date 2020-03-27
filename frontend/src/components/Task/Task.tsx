import React from 'react';
import './Task.css';
import { TaskModel } from '../../models/Task.model';

interface TaskComponentInputProps {
    task?: TaskModel;
}

export const TaskComponent: React.SFC<TaskComponentInputProps> = (props) => {
    return (
        <div>
            <div className="task-details">
                <h2>Task # {props.task?.taskId}</h2>
                <h3>Source: {props.task?.source}</h3>
                <h3>Destination: {props.task?.destination}</h3>
                <h3>Size: {props.task?.totalSize}</h3>
                <h3>Files: {props.task?.totalNumberOfChecks}</h3>
            </div>
        </div>
    )

};

export default TaskComponent;