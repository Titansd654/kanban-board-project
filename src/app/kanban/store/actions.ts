import { createAction, props } from "@ngrx/store";
import { BoardInterface, KanbanBoardInterface, TaskInterface } from "../types/kanban.interface";

export const getKanbanBoards = createAction('[Kanban] Get Kanban Boards');
export const getKanbanBoardsSuccess = createAction(
    '[Kanban] Get Kanban Boards Success', 
    props<{ kanban: KanbanBoardInterface }>()
);
export const getKanbanBoardsFailure = createAction(
    '[Kanban] Get Kanban Boards Failure',
    props<{ error: string }>()
);
export const displayVisibilityIcon = createAction('[Kanban] Display Visibility Icon');
export const setDarkTheme = createAction(
    '[Kanban] Set Theme Color',
    props<{ darkTheme: boolean }>()
);
export const addTaskAction = createAction(
    '[Kanban] Add Task Action', 
    props<{ payload: TaskInterface }>()
);
export const addTaskActionSuccess = createAction(
    '[Kanban] Add Task Action Success', 
    props<{ updatedBoards: BoardInterface[] }>()
);
export const updateLocalStorage = createAction('[Kanban] Update Local Storage');




export const updateSubTaskCompletedStatus = createAction(
    '[Kanban] Update Subtask Completed Status',
    props<{ taskId: number, subTaskId: number, completed: boolean }>()
);

export const updateTaskStatus = createAction(
    '[Kanban] Update Task Status Id',
    props<{ taskId: number, statusId: number }>()
);
