import React, { useState } from 'react';
import { TaskModel } from "../../models/Task.model";
import { TaskComponent } from '../Task/Task';
import { Accordion, AccordionTitleProps } from 'semantic-ui-react';

interface RecentTasksComponentProps {
    recentTasks?: TaskModel[];
}

export const RecentTasksComponent: React.SFC<RecentTasksComponentProps> = (props) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const recentTasks = props.recentTasks;
    const handleClick = (e:React.MouseEvent, titleProps:AccordionTitleProps) => {
        const index = Number(titleProps.index);
        const newIndex:number = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    }
    const listItems = recentTasks?.map(task => {
        return (
            <Accordion fluid styled key={task.taskId}>
                <Accordion.Title
                    active={activeIndex===0}
                    index={0}
                    onClick={handleClick}
                >{task.taskId}</Accordion.Title>
                <Accordion.Content active={activeIndex===0}>
                    <TaskComponent task={task}></TaskComponent>
                </Accordion.Content>
            </Accordion>
            );

    })
    return (
        <div>
            {listItems}
        </div>
    );
};
export default RecentTasksComponent;