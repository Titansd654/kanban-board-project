export interface SubTaskInterface {
    id: number;
    title: string;
    completed: boolean;
}

export interface TaskInterface {
    id: number;
    title: string;
    description: string;
    status: number;
    order: number;
    subTasks: SubTaskInterface[];
}

export interface ColumnInterface {
    id: number;
    title: string;
    order: number;
    iconColor: string;
}

export interface BoardInterface {
    id: number;
    name: string;
    columns: ColumnInterface[];
    tasks: TaskInterface[];
}

export interface KanbanBoardInterface {
    boards: BoardInterface[];
}
