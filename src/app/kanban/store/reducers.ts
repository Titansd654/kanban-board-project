import { createReducer, on } from "@ngrx/store";
import { KanbanStateInterface } from "../types/kanbanState.interface";
import * as KanbanActions from './actions';
import { Action } from "rxjs/internal/scheduler/Action";
import { TaskInterface } from "../types/kanban.interface";

export const initialState: KanbanStateInterface = {
    isLoading: false,
    kanban: { boards: [] },
    error: null,
    displayVisibilityIcon: false,
    darkTheme: false,
};

export const reducers = createReducer(
    initialState, 
    on(KanbanActions.getKanbanBoards, (state) => ({ ...state, isLoading: true })),
    on(KanbanActions.getKanbanBoardsSuccess, (state, action) => ({ 
        ...state, 
        isLoading: false,
        kanban: action.kanban,
    })),
    on(KanbanActions.getKanbanBoardsFailure, (state, action) => ({ 
        ...state, 
        isLoading: false,
        error: action.error,
    })),
    on(KanbanActions.displayVisibilityIcon, (state) => ({ ...state, displayVisibilityIcon: !state.displayVisibilityIcon })),
    on(KanbanActions.setDarkTheme, (state, action) => ({
        ...state,
        darkTheme: action.darkTheme,
    })),
    on(KanbanActions.addTaskActionSuccess, (state, action) => ({ 
        ...state, 
        kanban: {
            ...state.kanban,
            boards: action.updatedBoards
        }
    })),
    on(KanbanActions.updateTaskStatus, (state, { taskId, statusId }) => {
        // Encuentra y actualiza la subtask correspondiente
        const updatedBoards = state.kanban.boards.map(board => {
            const updatedTasks = board.tasks.map(task => {
              if (task.id === taskId) {
                return { ...task, status: statusId };
              }
              return task;
            });
            return { ...board, tasks: updatedTasks };
          });
          return { ...state, kanban: { ...state.kanban, boards: updatedBoards }};
      }),
    on(KanbanActions.updateSubTaskCompletedStatus, (state, { taskId, subTaskId, completed }) => {
        const updatedBoards = state.kanban.boards.map(board => {
            const updatedTasks = board.tasks.map(task => {
                if (task.id === taskId) {
                    const updatedSubTasks = task.subTasks.map(subTask => {
                        if (subTask.id === subTaskId) {
                            return { ...subTask, completed: completed };
                        }
                        return subTask;
                    });
                    return { ...task, subTasks: updatedSubTasks };
                }
                return task;
            });
            return { ...board, tasks: updatedTasks };
        });
        return { ...state, kanban: { ...state.kanban, boards: updatedBoards }};
    }),
    on(KanbanActions.updateLocalStorage, (state) => { 
        setTimeout(() => { localStorage.setItem('kanbanDB', JSON.stringify(state.kanban)) }, 500);
        return {
            ...state, 
        };
    }),
    

    //     // const newTask = action.payload;
    //     // // Crear una copia del estado actual
    //     // const updatedKanban = { ...state.kanban };

    //     // // Encontrar la columna a la que se debe agregar la tarea
    //     // const columnIndex = updatedKanban.boards.findIndex(board => 
    //     //     board.columns.some(column => column.tasks.some(task => task.status === newTask.status))
    //     // );

    //     // if (columnIndex !== -1) {
    //     //     // Agregar la nueva tarea a la columna correspondiente
    //     //     const column = updatedKanban.boards[columnIndex].columns.find(column => column.tasks.some(task => task.status === newTask.status));
    //     //     if (column) {
    //     //         column.tasks.push(newTask);
    //     //     }
    //     // }

    //     // return {
    //     //     ...state, 
            
    //     //     kanban: kanbanAux,
    //     // }

    //     const newTask = action.payload;

    //     const primer = state.kanban.boards.filter((board) => board.id === 1);

    //     let tasksprimer = [...primer[0].tasks];

    //     tasksprimer.push(action.payload);
        

    //     const boardsprimer = { ...primer[0], tasks: tasksprimer };
    //     //const boardsprimer = primer[0].tasks.push(newTask);


    // const updatedBoards = state.kanban.boards.map(board => {
        
    //   const updatedTasks = board.tasks.map(task => {
    //     if (task.status === newTask.status) {
            
    //       return { ...task, tasks: newTask };
    //     }
        
    //     return task;
    //   });

    //   // Devolver la tabla con las tareas actualizadas
    //   return { ...board, tasks: updatedTasks };
    // });

    // // Devolver el nuevo estado con el kanban actualizado
    // return {
    //   ...state,
    //   //kanban: { ...state.kanban, boards: updatedBoards }
    // };

    // const newTask: TaskInterface = action.payload;
    // //const updatedBoards = [...state.kanban.boards]; // Copiamos las boards actuales
    // const updatedBoards = state.kanban.boards.map(board => ({ ...board }));

    // // Buscamos la board con id: 1
    // const boardIndex = updatedBoards.findIndex(board => board.id === 1);

    // if (boardIndex !== -1) {
    //   // Copiamos la board actual y agregamos la nueva tarea
    //   const updatedBoard = { ...updatedBoards[boardIndex] };
    //   //updatedBoard.tasks.push(newTask);
    //   updatedBoard.tasks = [...updatedBoard.tasks, newTask];

    //   // Actualizamos la board en el arreglo de boards
    //   updatedBoards[boardIndex] = updatedBoard;
    // }
    
    // return {
    //   ...state,
    //    kanban: {
    //      ...state.kanban,
    //      boards: updatedBoards
    //    }
    // };

    //}),
);