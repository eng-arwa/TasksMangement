import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ListTasksComponent } from './tasks/components/list-tasks/list-tasks.component';
import { TasksModule } from './tasks/tasks.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule,
    MaterialModule,
    TasksModule
  ],

})
export class LayoutModule { }
