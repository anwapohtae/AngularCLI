import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

const MaterailComponent = [
  CommonModule,
  MatMenuModule,
]

@NgModule({
  imports: [MaterailComponent],
  exports: [MaterailComponent]
})
export class MaterialModule { }
