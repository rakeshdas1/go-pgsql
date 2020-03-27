import React from 'react';
import { TaskModel } from "../../models/Task.model";

interface RecentTasksComponentProps {
    recentTasks?: TaskModel[];
}

export const RecentTasksComponent: React.SFC<RecentTasksComponentProps> = (props) => {
    return (
        <div>Recent tasks</div>
    );
};
export default RecentTasksComponent;