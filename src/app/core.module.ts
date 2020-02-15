import { NgModule } from "@angular/core";
import { ShoppingService } from "./shopping-list/Shopping.service";
import { RecipeService } from "./recipes/Recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "src/logging.service";

@NgModule({
  providers: [
    ShoppingService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
