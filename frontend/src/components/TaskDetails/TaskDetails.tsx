import React, { useState, useEffect } from 'react';
import { TaskModel } from "../../models/Task.model"
import { getFilesForTask, getTask } from '../../api/rcloneApi';
import { Header, Grid, Icon, Popup } from 'semantic-ui-react';
import { TaskFilesModel } from '../../models/TaskFiles.model';

export const TaskDetailsComponent = () => {
    const [task, setTask] = useState<TaskModel>();
    const [taskFiles, setTaskFiles] = useState<TaskFilesModel[]>([]);
    useEffect(() => {
        getTask(99)
            .then(data => console.log("task", data))
    }, []);
    useEffect(() => {
        getFilesForTask(104)
            .then(data => console.log(data))
    }, [])
    const epochToLocalTime = (epochTime?: string):Date => {
        let d: Date = new Date(0);
        let epochSeconds:number = Number(epochTime);
        d.setUTCSeconds(epochSeconds);
        return d;
    }
    const startAndEndTimeItems = (startTime?:string, endTime?:string) => {
        const startTimeDate:Date = epochToLocalTime(startTime);
        const endTimeDate:Date = epochToLocalTime(endTime);
        return (
            <div>
                <Header size='medium'>
                    <Popup content={startTimeDate.toLocaleDateString()}
                    trigger={<Icon name='clock'/>}/>
                    Started task: {startTimeDate.toLocaleTimeString()}
                </Header>
                <Header size='medium'>
                    <Popup content={endTimeDate.toLocaleDateString()}
                    trigger={<Icon name='clock'/>}/>
                    Ended task: {endTimeDate.toLocaleTimeString()}
                </Header>
            </div>
        );
    }
    return(
        <div>
            <Header size='huge' textAlign='center'>Task # {task?.taskId}</Header>
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <div>
                        <Header size='medium'><Icon name='folder'/>Source: {task?.source}</Header><br/>
                        <Header size='medium'><Icon name='cloud upload'/>Destination: {task?.destination}</Header>
                        <Header size='medium'><Icon name='file'/>Number of files: {task?.totalNumberOfChecks}</Header>
                        {startAndEndTimeItems(task?.startedAt, task?.endedAt)}
                        
                    </div>
                </Grid.Row>
            </Grid>
        </div>
    )
}