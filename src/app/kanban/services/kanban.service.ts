import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, delay, map, of } from 'rxjs';
import { BoardInterface, KanbanBoardInterface, TaskInterface } from '../types/kanban.interface';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { kanbanSelector } from '../store/selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Injectable({
  providedIn: 'root'
})
export class KanbanService implements OnDestroy {
  kanbanSubscription: Subscription = new Subscription();
  
  kanbanBoards$: Observable<KanbanBoardInterface>;

  constructor(private store: Store<AppStateInterface>) { 
    this.kanbanBoards$ = this.store.pipe(untilDestroyed(this), select(kanbanSelector));
  }
  ngOnDestroy(): void {
    this.kanbanSubscription.unsubscribe()
  }

  getBoards(): Observable<KanbanBoardInterface> {
    const kanbanBoard: KanbanBoardInterface = JSON.parse(String(localStorage.getItem('kanbanDB')));
    
    return of(kanbanBoard).pipe(delay(2000));
  }

  saveTask(payload: TaskInterface): Observable<BoardInterface[]> {

    let updatedBoards: BoardInterface[] = [];
    const newTask: TaskInterface = payload;

   this.kanbanSubscription = this.kanbanBoards$.subscribe(
      (kanbanBoards => {
        if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
          updatedBoards = kanbanBoards.boards.map(board => ({ ...board }));
          const boardIndex = updatedBoards.findIndex(board => board.id === 1);

          if (boardIndex !== -1) {
            // Copiamos la board actual y agregamos la nueva tarea
            const updatedBoard = { ...updatedBoards[boardIndex] };
            //updatedBoard.tasks.push(newTask);
            updatedBoard.tasks = [...updatedBoard.tasks, newTask];
      
            // Actualizamos la board en el arreglo de boards
            updatedBoards[boardIndex] = updatedBoard;
          }
        }
      })
    );
    return of(updatedBoards);

  }

  // getMaxTaskId(): Observable<number> {
  //   return this.kanbanBoards$.pipe(
  //     map(kanbanBoards => {
  //       if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
  //         const firstColumnTasks = kanbanBoards.boards[0].columns[0].tasks;
  //         if (firstColumnTasks.length > 0) {
  //           return Math.max(...firstColumnTasks.map(task => task.id));
  //         }
  //       }
  //       return 0; // Default value if no tasks are found
  //     })
  //   );
  // }

  getMaxTaskId(columnId: number): Observable<number> {
    return this.kanbanBoards$.pipe(
      map(kanbanBoards => {
        let maxId = 0; // Inicializamos el máximo id
        if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
          const tasks = kanbanBoards.boards[0].tasks;
          // Si hay tareas en la columna actual
          if (tasks.length > 0) {
            // Calculamos el máximo id entre las tareas de la columna actual
            maxId = Math.max(...tasks.map(task => task.id));
          }
        }
        return maxId; // Devolvemos el máximo id encontrado
      })
    );
  }

  // getMaxTaskId(columnId: number): Observable<number> {
  //   return this.kanbanBoards$.pipe(
  //     map(kanbanBoards => {
  //       let maxId = 0; // Inicializamos el máximo id
  
  //       if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
  //         // Buscamos la columna con el columnId dado en cualquier board
  //         const column = kanbanBoards.boards.flatMap(board => board.columns)
  //           .find(column => column.id === columnId);
  
  //         if (column) { // Verificamos si encontramos la columna
  //           // Obtenemos las tareas de la columna actual
  //           const tasks = kanbanBoards.boards.flatMap(board => board.tasks)
  //             .filter(task => task.status === columnId);
  //           // Si hay tareas en la columna actual
  //           if (tasks.length > 0) {
  //             // Calculamos el máximo id entre las tareas de la columna actual
  //             maxId = Math.max(...tasks.map(task => task.id));
  //           }
  //         }
  //       }
  //       return maxId; // Devolvemos el máximo id encontrado
  //     })
  //   );
  // }

  // getMaxTaskOrder(columnId: number): Observable<number> {
  //   return this.kanbanBoards$.pipe(
  //     map(kanbanBoards => {
  //       let maxOrder = 0; // Inicializamos el máximo order
  
  //       if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
  //         // Buscamos el índice de la columna con el columnId dado
  //         const columnIndex = kanbanBoards.boards[0].columns.findIndex(column => column.id === columnId);
  
  //         if (columnIndex !== -1) { // Verificamos si encontramos la columna
  //           // Obtenemos las tareas de la columna actual
  //           const tasks = kanbanBoards.boards[0].columns[columnIndex].tasks;
  //           // Si hay tareas en la columna actual
  //           if (tasks.length > 0) {
  //             // Calculamos el máximo id entre las tareas de la columna actual
  //             maxOrder = Math.max(...tasks.map(task => task.order));
  //           }
  //         }
  //       }
  //       return maxOrder; // Devolvemos el máximo id encontrado
  //     })
  //   );
  // }

  // getMaxTaskOrder(): Observable<number> {
  //   return this.kanbanBoards$.pipe(
  //     map(kanbanBoards => {
  //       if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
  //         const firstColumnTasks = kanbanBoards.boards[0].columns[0].tasks;
  //         if (firstColumnTasks.length > 0) {
  //           return Math.max(...firstColumnTasks.map(task => task.order));
  //         }
  //       }
  //       return 0; // Default value if no tasks are found
  //     })
  //   );
  // }

  getMaxTaskOrder(columnId: number): Observable<number> {
    return this.kanbanBoards$.pipe(
      map(kanbanBoards => {
        let maxOrder = 0; // Inicializamos el máximo order
  
        if (kanbanBoards && kanbanBoards.boards && kanbanBoards.boards.length > 0) {
          // Buscamos la columna con el columnId dado en cualquier board
          const column = kanbanBoards.boards.flatMap(board => board.columns)
            .find(column => column.id === columnId);
  
          if (column) { // Verificamos si encontramos la columna
            // Obtenemos las tareas de la columna actual
            const tasks = kanbanBoards.boards.flatMap(board => board.tasks)
              .filter(task => task.status === columnId);
            // Si hay tareas en la columna actual
            if (tasks.length > 0) {
              // Calculamos el máximo order entre las tareas de la columna actual
              maxOrder = Math.max(...tasks.map(task => task.order));
            }
          }
        }
        return maxOrder; // Devolvemos el máximo order encontrado
      })
    );
  }

}