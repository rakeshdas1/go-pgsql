import React from "react";
import { useState, useEffect } from "react";
import { TaskModel } from "../../models/Task.model";
import { getLastRunTask, getNTasks } from "../../api/rcloneApi";
import TaskComponent from "../Task/Task";
import RecentTasksComponent from "../RecentTasks/RecentTasks";

export const TasksOverviewComponent = () => {
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
    }, [])
    return (
            <div className="task-page">
                <h1>Last run task: </h1>
                <TaskComponent task={latestTask}></TaskComponent>
                <hr></hr>
                <h1>Recent tasks run:</h1>
                <RecentTasksComponent recentTasks={recentTasks}></RecentTasksComponent>
            </div>
    )
}
export default TasksOverviewComponent;