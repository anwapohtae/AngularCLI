import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';


const PrimengComponent = [
  CommonModule,
  ButtonModule,
  ToolbarModule,
  InputGroupModule,
  InputGroupAddonModule,
  InputTextModule,
  InputMaskModule,
  ToastModule
]

@NgModule({
  imports: [PrimengComponent],
  exports: [PrimengComponent]
})
export class PrimengModule { }