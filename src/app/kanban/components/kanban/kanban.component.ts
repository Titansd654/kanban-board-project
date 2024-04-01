import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { KanbanBoardInterface } from '../../types/kanban.interface';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {

  // kanbanBoard: KanbanBoardInterface = {
  //   boards: [
  //     {
  //       id: 1,
  //       name: "Platform Launch",
  //       columns: [
  //         {
  //           id: 1,
  //           title: 'TODO',
  //           order: 1, 
  //           iconColor: 'blue',
  //           tasks: [
  //             {
  //               id: 1,
  //               title: 'Build UI for onboarding flow',
  //               description: 'Create login page with email and password fields',
  //               status: 1,
  //               order: 1, 
  //               subTasks: []
  //             },
  //             {
  //               id: 2,
  //               title: 'Design landing page',
  //               description: 'Create mockups for landing page layout',
  //               status: 1,
  //               order: 2, 
  //               subTasks: [
  //                 { id: 1, title: 'Design hero section', completed: false },
  //                 { id: 2, title: 'Create call-to-action button', completed: false }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           id: 2,
  //           title: 'DOING',
  //           order: 2, 
  //           iconColor: 'purple',
  //           tasks: [
  //             {
  //               id: 3,
  //               title: 'Develop API endpoints',
  //               description: 'Implement RESTful API for data retrieval',
  //               status: 2,
  //               order: 1, 
  //               subTasks: [
  //                 { id: 1, title: 'Define API routes', completed: false },
  //                 { id: 2, title: 'Implement authentication middleware', completed: true }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           id: 3,
  //           title: 'DONE',
  //           order: 3, 
  //           iconColor: 'green',
  //           tasks: [
  //             {
  //               id: 4,
  //               title: 'Refactor codebase',
  //               description: 'Cleanup code and improve code quality',
  //               status: 3,
  //               order: 1, 
  //               subTasks: []
  //             }
  //           ]
  //         }
  //       ]
  //     }, //board Platform Launch
  //     {
  //       id: 2,
  //       name: "Marketing Plan",
  //       columns: [
  //         {
  //           id: 1,
  //           title: 'TODO',
  //           order: 1, 
  //           iconColor: 'blue',
  //           tasks: [
  //             {
  //               id: 1,
  //               title: 'Build UI for onboarding flow',
  //               description: 'Create login page with email and password fields',
  //               status: 1,
  //               order: 1, 
  //               subTasks: []
  //             },
  //             {
  //               id: 2,
  //               title: 'Design landing page',
  //               description: 'Create mockups for landing page layout',
  //               status: 1,
  //               order: 2, 
  //               subTasks: [
  //                 { id: 1, title: 'Design hero section', completed: false },
  //                 { id: 2, title: 'Create call-to-action button', completed: false }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           id: 2,
  //           title: 'DOING',
  //           order: 2, 
  //           iconColor: 'purple',
  //           tasks: [
  //             {
  //               id: 3,
  //               title: 'Develop API endpoints',
  //               description: 'Implement RESTful API for data retrieval',
  //               status: 2,
  //               order: 1, 
  //               subTasks: [
  //                 { id: 1, title: 'Define API routes', completed: false },
  //                 { id: 2, title: 'Implement authentication middleware', completed: true }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           id: 3,
  //           title: 'DONE',
  //           order: 3, 
  //           iconColor: 'green',
  //           tasks: [
  //             {
  //               id: 4,
  //               title: 'Refactor codebase',
  //               description: 'Cleanup code and improve code quality',
  //               status: 3,
  //               order: 1, 
  //               subTasks: []
  //             }
  //           ]
  //         }
  //       ]
  //     } //board Marketing Plan

  //   ]
  // };

  kanbanBoard: KanbanBoardInterface = {
    boards: [
      {
        id: 1,
        name: "Platform Launch",
        columns: [
          { id: 1, title: 'TODO', order: 1, iconColor: 'blue', },
          { id: 2, title: 'DOING', order: 2, iconColor: 'purple', },
          { id: 3, title: 'DONE', order: 3, iconColor: 'green', }
        ],
        tasks: [
          {
            id: 1,
            title: 'Build UI for onboarding flow',
            description: 'Create login page with email and password fields',
            status: 1,
            order: 1, 
            subTasks: []
          },
          {
            id: 2,
            title: 'Design landing page',
            description: 'Create mockups for landing page layout',
            status: 1,
            order: 2, 
            subTasks: [
              { id: 1, title: 'Design hero section', completed: false },
              { id: 2, title: 'Create call-to-action button', completed: false }
            ]
          },
          {
            id: 3,
            title: 'Develop API endpoints',
            description: 'Implement RESTful API for data retrieval',
            status: 2,
            order: 1, 
            subTasks: [
              { id: 1, title: 'Define API routes', completed: false },
              { id: 2, title: 'Implement authentication middleware', completed: true }
            ]
          },
          {
            id: 4,
            title: 'Refactor codebase',
            description: 'Cleanup code and improve code quality',
            status: 3,
            order: 1, 
            subTasks: []
          },
        ],


      }, //board Platform Launch
      {
        id: 2,
        name: "Marketing Plan",
        columns: [
          { id: 1, title: 'TODO', order: 1, iconColor: 'blue', },
          { id: 2, title: 'DOING', order: 2, iconColor: 'purple', },
          { id: 3, title: 'DONE', order: 3, iconColor: 'green', },
        ],
        tasks: [
          {
            id: 1,
            title: 'Build UI for onboarding flow',
            description: 'Create login page with email and password fields',
            status: 1,
            order: 1, 
            subTasks: []
          },
          {
            id: 2,
            title: 'Design landing page',
            description: 'Create mockups for landing page layout',
            status: 1,
            order: 2, 
            subTasks: [
              { id: 1, title: 'Design hero section', completed: false },
              { id: 2, title: 'Create call-to-action button', completed: false }
            ]
          },
          {
            id: 3,
            title: 'Develop API endpoints',
            description: 'Implement RESTful API for data retrieval',
            status: 2,
            order: 1, 
            subTasks: [
              { id: 1, title: 'Define API routes', completed: false },
              { id: 2, title: 'Implement authentication middleware', completed: true }
            ]
          },
          {
            id: 4,
            title: 'Refactor codebase',
            description: 'Cleanup code and improve code quality',
            status: 3,
            order: 1, 
            subTasks: []
          },
        ]

      } //board Marketing Plan

    ]
  };

  isDarkTheme: boolean = false;
  drawer_opened: boolean = true;

  constructor( private store: Store<AppStateInterface>) {
    const kanbanBoardString = localStorage.getItem('kanbanDB');
    if (kanbanBoardString) {
      this.kanbanBoard = JSON.parse(kanbanBoardString);
    } else {
      localStorage.setItem('kanbanDB', JSON.stringify(this.kanbanBoard));
    }
  }

  getThemeMode(isDarkTheme: boolean) {
    this.isDarkTheme = isDarkTheme;
  }

  hideSidebar(isHidden: boolean){
    this.drawer_opened = isHidden;
  }

  displaySidebar(isDisplayed: boolean){
    this.drawer_opened = isDisplayed;
  }

}
