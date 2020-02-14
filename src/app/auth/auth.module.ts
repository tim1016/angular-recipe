import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    CoreModule,
    FormsModule,

    RouterModule.forChild([{ path: "auth", component: AuthComponent }])
  ]
})
export class AuthModule {}
