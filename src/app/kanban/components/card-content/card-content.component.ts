import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubTaskInterface, TaskInterface } from '../../types/kanban.interface';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit {
  @Input() task?: TaskInterface;
  @Output() cardId = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
  }

  getCompletedSubtasksCount(subtasks: SubTaskInterface[]): number {
    return subtasks.filter(subtask => subtask.completed).length;
  }

  sendCardId(cardId: number) {
    this.cardId.emit(cardId);
  }

}
