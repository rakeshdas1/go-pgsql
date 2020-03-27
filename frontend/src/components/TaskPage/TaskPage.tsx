import { useState,useEffect } from "react";
import './TaskPage.css'
import { TaskModel } from "../../models/Task.model";
import React from "react";
import { getLastRunTask, getNTasks } from "../../api/rcloneApi";
import TaskComponent from "../Task/Task";

export const TaskPageComponent = () => {
    const [latestTask, setLatestTask] = useState<TaskModel>();
    const [recentTasks, setRecentTasks] = useState<TaskModel[]>();
    useEffect(() => {
        getLastRunTask()
            .then(data => {
                setLatestTask(data);
            });
    }, []);
    useEffect(() => {
        getNTasks(5)
            .then(data => {
                setRecentTasks(data);
            })
    },[])
    return (
        <div className="task-page">
            <TaskComponent task={latestTask}></TaskComponent>
            {recentTasks?.map(task => {
                return <TaskComponent task={task}></TaskComponent>;
            })}
        </div>
    )
}
export default TaskPageComponent;