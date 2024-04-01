import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubTaskInterface, TaskInterface } from '../../types/kanban.interface';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { updateLocalStorage, updateSubTaskCompletedStatus, updateTaskStatus } from '../../store/actions';

interface Status {
  id: number,
  title: string,
}

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  allComplete = false;
  statuses: Status[] = [
    { id: 1, title: 'TODO' },
    { id: 2, title: 'DOING' },
    { id: 3, title: 'DONE' },
  ];
  selected: number;
  taskData: TaskInterface;
  subtaskData: SubTaskInterface[];
  statusIdData: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private overlayContainer: OverlayContainer,
    private store: Store<AppStateInterface>,
  ) 
  {
    this.taskData = this.data.task;
    this.subtaskData = [...this.taskData.subTasks];
    this.statusIdData = this.taskData.status;
    this.selected = this.taskData.status;
  }
  ngOnInit(): void {
    this.removeThemeIfExist();
    
    if (this.data && this.data.setThemeColor) {
      this.overlayContainer.getContainerElement().classList.add(this.data.setThemeColor);
    }
  }

  getCompletedSubtasksCount(subtasks: SubTaskInterface[]): number {
    return subtasks.filter(subtask => subtask.completed).length;
  }

  removeThemeIfExist() {
    this.overlayContainer.getContainerElement().classList.forEach((value: any, key: number) => {
      if(value === "theme-dark")
      this.overlayContainer.getContainerElement().classList.remove(value);
    });
  }

  onCheckboxChange(subtaskId: number, completed: boolean) {
    console.log('Subtask ID:', subtaskId);
    // Aquí puedes realizar más acciones según sea necesario
    this.store.dispatch(updateSubTaskCompletedStatus({ taskId: this.taskData.id, subTaskId: subtaskId, completed: completed }));
    this.store.dispatch(updateLocalStorage());
    const subtaskIndex = this.subtaskData.findIndex(subtask => subtask.id === subtaskId);
    if (subtaskIndex !== -1) {
      this.subtaskData[subtaskIndex] = { ...this.subtaskData[subtaskIndex], completed: completed };
    }
  }

  onStatusChange(statusId: number) {
    // Aquí puedes despachar la acción para actualizar el estado
    this.store.dispatch(updateTaskStatus({ taskId: this.taskData.id, statusId: statusId }));
    this.store.dispatch(updateLocalStorage());
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    // if (this.task.subtasks == null) {
    //   return;
    // }
    // this.task.subtasks.forEach(t => (t.completed = completed));
  }

}
