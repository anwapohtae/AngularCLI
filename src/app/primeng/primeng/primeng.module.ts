import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

const PrimengComponent = [
  ButtonModule,
]

@NgModule({
  imports: [PrimengComponent],
  exports: [PrimengComponent]
})
export class PrimengModule { }
