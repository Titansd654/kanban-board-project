import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ColumnInterface, KanbanBoardInterface, TaskInterface } from '../../types/kanban.interface';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { kanbanSelector } from '../../store/selectors';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column-content',
  templateUrl: './column-content.component.html',
  styleUrls: ['./column-content.component.scss']
})
export class ColumnContentComponent implements OnInit, OnDestroy {
  @Input() columnContent?: ColumnInterface;
  @Output() cardId = new EventEmitter<number>();
 

  kanbanBoards$: Observable<KanbanBoardInterface>;
  kanbanSubscription: Subscription = new Subscription();
  columns: ColumnInterface[] = [];
  tasks: TaskInterface[] = [];
  colores = 'blue';

  constructor(
    private store: Store<AppStateInterface>,
  ) {
    this.kanbanBoards$ = this.store.pipe(select(kanbanSelector));
  }
  ngOnDestroy(): void {
    this.kanbanSubscription.unsubscribe()
  }

  ngOnInit(): void {
    if(this.kanbanBoards$)
      this.kanbanSubscription = this.kanbanBoards$.subscribe((kanbanBoards) => {
        if(kanbanBoards.boards[0] && kanbanBoards.boards[0].columns.length > 0) {
          this.tasks = kanbanBoards.boards[0].tasks.filter((task) => task.status === this.columnContent?.id);
          //const maxId = Math.max(...this.columns[0].tasks.map(task => task.id));
          //console.log('el max', maxId + 1);
        }
      });
  }

  sendCardId(cardId: number) {
    this.cardId.emit(cardId);
  }
  
  drop(event: CdkDragDrop<TaskInterface[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
