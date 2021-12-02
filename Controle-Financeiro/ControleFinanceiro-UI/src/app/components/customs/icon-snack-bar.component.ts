import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: '',
    template: `<mat-icon class="v-align-middle">{{ data?.icon }}</mat-icon>
               <span>{{ data?.message }}</span>`
})

export class IconSnackBarComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}