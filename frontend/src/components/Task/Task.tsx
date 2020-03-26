import React, { useState } from 'react';
import './Task.css';
import { getLastRunTask } from '../../api/rcloneApi';
import { TaskModel } from '../../models/Task.model';

export const TaskComponent = () => {
    const [task, setTask] = useState<TaskModel | null>()
    React.useEffect(() => {
        getLastRunTask()
            .then(data => {
                setTask(data);
            });
    }, []);
    return (
        <div>
            <h1>This is a task</h1>
            <div className="task-details">
                <h3>Source: {task?.source}</h3>
                <h3>Destination: {task?.destination}</h3>
                <h3>Size: {task?.totalSize}</h3>
                <h3>Files: {task?.totalNumberOfChecks}</h3>
            </div>
        </div>
    )
};

export default TaskComponent;