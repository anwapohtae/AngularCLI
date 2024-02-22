import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';

const PrimengComponent = [
  CommonModule,
  ButtonModule,
  ToolbarModule,
  InputGroupModule,
  InputGroupAddonModule,
  InputTextModule,
  InputMaskModule,
  ToastModule,
  TooltipModule,
  OverlayPanelModule,
  DropdownModule,
  DialogModule,
  MenuModule,
  AutoCompleteModule
]

@NgModule({
  imports: [PrimengComponent],
  exports: [PrimengComponent]
})
export class PrimengModule { }
