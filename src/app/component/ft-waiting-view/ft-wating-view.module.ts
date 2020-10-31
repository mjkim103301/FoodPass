import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FtImgComponentModule } from '../ft-img/ft-img.module';
import { TagDistComponent } from '../tag-dist/tag-dist.component';
import { FtImgComponent } from '../ft-img/ft-img.component';
import { TagWaitingComponent } from '../tag-waiting/tag-waiting.component';
import { FtWaitingViewComponent } from './ft-waiting-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FtImgComponentModule
    ], 
    exports: [
        FtWaitingViewComponent
    ],
    declarations: [
        TagDistComponent,
       
        FtWaitingViewComponent
      
    ],
})
export class FtWatingViewComponentModule {}
  