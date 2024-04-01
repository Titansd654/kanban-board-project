import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './components/kanban/kanban.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ColumnContentComponent } from './components/column-content/column-content.component';
import { CardContentComponent } from './components/card-content/card-content.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { KanbanEffects } from './store/effects';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { StrikethDirective } from './directives/striketh.directive';
import { AppIconColorDirective } from './directives/app-icon-color.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive'


@NgModule({
  declarations: [
    KanbanComponent,
    MainContentComponent,
    SidebarComponent,
    ColumnContentComponent,
    CardContentComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    StrikethDirective,
    AppIconColorDirective,
    AutoFocusDirective,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    StoreModule.forFeature('kanban', reducers),
    EffectsModule.forFeature([KanbanEffects]),
    

  ],
  exports: [
    KanbanComponent
  ]
})
export class KanbanModule { }
