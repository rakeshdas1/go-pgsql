import React, { useState, useEffect } from 'react';
import { TaskModel } from "../../models/Task.model"
import { getFilesForTask, getTask } from '../../api/rcloneApi';
import { Header, Grid, Icon, Popup } from 'semantic-ui-react';
import FileDetailsComponent from './FilesTable';
import './TaskDetails.css';
import { FileModel } from '../../models/File.model';
import { RouteComponentProps } from 'react-router-dom';
interface TaskDetailsComponentRouteParams extends RouteComponentProps<{ taskId: string }>{

}
const socket = new WebSocket('ws://localhost:8010/currentRunningTask');
export const TaskDetailsComponent = (props:TaskDetailsComponentRouteParams) => {
    const [task, setTask] = useState<TaskModel>();
    const [taskFiles, setTaskFiles] = useState<FileModel[]>([]);
    useEffect(() => {
        getTask(Number(props.match.params.taskId))
            .then(data => {
                setTask(data);
                getFilesForTask(100, 0, data.taskId)
                    .then(data => setTaskFiles(data));
                if(data.completed === false) {
                    socket.onmessage = (evt: MessageEvent) => {
                        const data:File = JSON.parse(evt.data);
                        console.log(data); 
                    }
                }
            });
        return () => {
            socket.close();
        }
    }, []);
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
                <Header size='medium' className="dateTimes">
                <Icon name='clock'/>
                    Started task: 
                    <Popup content={startTimeDate.toString()}
                    trigger={<p> {startTimeDate.toLocaleTimeString()}</p>}/>     
                </Header>
                <Header size='medium' className="dateTimes">
                <Icon name='clock'/>
                    Ended task: 
                    <Popup content={endTimeDate.toString()}
                    trigger={<p> {endTimeDate.toLocaleTimeString()}</p>}/>     
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
                        <Header size='medium'><Icon name='folder'/>Source: {task?.source}</Header>
                        <Header size='medium'><Icon name='cloud upload'/>Destination: {task?.destination}</Header>
                        <Header size='medium'><Icon name='file'/>Number of files: {task?.totalNumberOfChecks}</Header>
                        <Header size='medium'><Icon name='database'/>Total Size: {task?.totalSize}</Header>
                        {startAndEndTimeItems(task?.startedAt, task?.endedAt)}
                        <Header size='medium'>File details:</Header>
                        <FileDetailsComponent files={taskFiles}></FileDetailsComponent>
                    </div>
                </Grid.Row>
            </Grid>
        </div>
    )
}