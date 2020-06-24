import React from "react";
import { useState, useEffect } from "react";
import { TaskModel } from "../../models/Task.model";
import { getLastRunTask, getNTasks } from "../../api/rcloneApi";
import TaskComponent from "../Task/Task";
import RecentTasksComponent from "../RecentTasks/RecentTasks";
import { Divider, Header, Icon } from "semantic-ui-react";

export const TasksOverviewComponent = () => {
    const [latestTask, setLatestTask] = useState<TaskModel>();
    const [recentTasks, setRecentTasks] = useState<TaskModel[]>();
    useEffect(() => {
        getNTasks(5)
            .then(data => {
                setRecentTasks(data);
            })
    }, []);

    useEffect(() => {
        getLastRunTask()
            .then(data => {
                setLatestTask(data);
            });
    }, []);
    return (
        <div className="task-page">
            <Header as="h2">Last run task: </Header>
            <TaskComponent task={latestTask}></TaskComponent>
            <br/>
            <Divider horizontal>
                <Header as="h4">
                    <Icon name='clock' />
                    Recent Tasks
                </Header>
            </Divider>
            <RecentTasksComponent recentTasks={recentTasks}></RecentTasksComponent>
        </div>
    )
}
export default TasksOverviewComponent;