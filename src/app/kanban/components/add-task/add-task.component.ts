import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {OverlayContainer} from '@angular/cdk/overlay';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KanbanService } from '../../services/kanban.service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as KanbanActions from '../../store/actions';
import { TaskInterface } from '../../types/kanban.interface';
import { Subscription } from 'rxjs';

interface Status {
  id: number,
  title: string,
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy{
  kanbanSubscription: Subscription = new Subscription();
 

  taskForm: FormGroup;
  maxTaskId: number = 0;
  maxTaskOrder: number = 0;
  

  statuses: Status[] = [
    { id: 1, title: 'TODO' },
    { id: 2, title: 'DOING' },
    { id: 3, title: 'DONE' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private _fb: FormBuilder,
    private overlayContainer: OverlayContainer,
    private kanbanService: KanbanService,
    private store: Store<AppStateInterface>,
  ) {
    this.taskForm = this._fb.group({
      title: '',
      description: '',
      status: 1,
      id: 0,
      order: 0,
      subTasks: this._fb.array([
        this._fb.group({
          id: 1, 
          title: '',
          completed: false,
        })
      ]),
    });
  }
  ngOnDestroy(): void {
    this.kanbanSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.removeThemeIfExist();
    if (this.data && this.data.setThemeColor) {
      this.overlayContainer.getContainerElement().classList.add(this.data.setThemeColor);
    }
  }

  removeThemeIfExist() {
    this.overlayContainer.getContainerElement().classList.forEach((value: any, key: number) => {
      if(value === "theme-dark")
      this.overlayContainer.getContainerElement().classList.remove(value);
    });
  }

  getsubtasks(): AbstractControl[] {
    return (<FormArray> this.taskForm.get('subTasks')).controls;
  }

  addNewSubtask() {
    const subtasksArray = this.taskForm.get('subTasks') as FormArray;
    if (subtasksArray) {
      const newSubtask = this._fb.group({
        id: subtasksArray.controls.length + 1,
        title: '',
        completed: false,
      });
      subtasksArray.push(newSubtask);
    }
  }

  removeTask(index: any) {
    (this.taskForm.get('subTasks') as FormArray).removeAt(index);
  }

  onFormSubmit() {
    const statusId = this.taskForm.get('status')?.value;
    
   this.kanbanSubscription = this.kanbanService.getMaxTaskId(statusId).subscribe(maxId => {
      this.maxTaskId = maxId;
    });

    this.kanbanSubscription = this.kanbanService.getMaxTaskOrder(statusId).subscribe(maxOrder => {
      this.maxTaskOrder = maxOrder;
    });

    this.taskForm.patchValue({ id: this.maxTaskId + 1 });
    this.taskForm.patchValue({ order: this.maxTaskOrder + 1 });

    const formPayload: TaskInterface = this.taskForm.value;
    this.store.dispatch(KanbanActions.addTaskAction({ payload: formPayload }));
    this.closeDialog();
  }

  closeDialog() : void{
    this.dialogRef.close();
  }

  
   
  
}
