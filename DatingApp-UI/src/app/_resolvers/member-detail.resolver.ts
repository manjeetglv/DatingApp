import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../_models/User";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertify.service";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class MemberDetailResolver implements Resolve<User>{
  constructor(private userService: UserService,
              private router: Router,
              private alertifyService: AlertifyService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    return this.userService.getUser(route.params['id']).pipe(
      catchError(err => {
        this.alertifyService.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }

}
