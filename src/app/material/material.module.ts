import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const MaterailComponent = [
  CommonModule,
  MatMenuModule,
  MatAutocompleteModule
]

@NgModule({
  imports: [MaterailComponent],
  exports: [MaterailComponent]
})
export class MaterialModule { }
