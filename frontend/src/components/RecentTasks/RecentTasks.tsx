import React, { useState } from 'react';
import { TaskModel } from "../../models/Task.model";
import { TaskComponent } from '../Task/Task';
import { Accordion, AccordionTitleProps, AccordionContentProps } from 'semantic-ui-react';

interface RecentTasksComponentProps {
    recentTasks?: TaskModel[];
}

export const RecentTasksComponent: React.SFC<RecentTasksComponentProps> = (props) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const recentTasks = props.recentTasks;
    const handleClick = (e: React.MouseEvent, titleProps: AccordionTitleProps) => {
        const index = Number(titleProps.index);
        const newIndex: number = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    }
    const panels = recentTasks?.map((task: TaskModel, idx: number) => {
        const accContent:AccordionContentProps = <TaskComponent task={task}></TaskComponent>
        return {
            key: `panel-${idx}`,
            title: {
                content: task.taskId,
                icon: 'checkmark',
            },
            content: {content:accContent}
        }
    });
    return (
        <Accordion fluid styled
            activeIndex={activeIndex}
            panels={panels}
            onTitleClick={handleClick}
        >            
        </Accordion>
    );
};
export default RecentTasksComponent;