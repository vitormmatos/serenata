import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs-compat/Observable';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/catch';
import 'rxjs-compat/add/observable/throw';
import {User} from '../user/user.model';

@Injectable()
export class HttpService {
constructor(private http: Http) { }
  private usersUrl = 'localhost:3000/usuarios';

  // getUsers(): Observable<Object> {
  //   return this.http.get(this.usersUrl);
  // }
// Fetch all existing users
  getUsers(): Observable<User[]> {
// ...using get request;

    return this.http.get(this.usersUrl)
      // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
        // ...errors if any
        .catch((error: any) => Observable.throwError(error.json().error || 'Server error'));
}


//      getUser(key: string): Observable<User> {
// // ...using get request
//          return this.http.get(this.usersUrl + key)
//           // ...and calling .json() on the response to return data
//             .map((res: Response) => res.json())
//             // ...errors if any
//             .catch((error: any) => Observable.throwError(error.json().error || 'Server error'));
//      }

     // Add a new user
    addUser(body: Object): Observable<Object> {
        // let bodyString = JSON.stringify(body) // Stringify payload

         // ... Set content type as text in order not to trigger preflight OPTIONS request
        const headers = new Headers({ 'Content-Type': 'text/plain' });

        // Create a request option
        const options  = new RequestOptions({ headers });

        return this.http.post(this.usersUrl, body) // ...using post request
                         .map((res: Response) => res) // ...and returning data
                         .catch((error: any) => Observable.throwError(error || 'Server error')); // ...errors if any
    }

    deleteUser(key: string): Observable<Object> {

      // ... Set content type as text in order not to trigger preflight OPTIONS request
      const headers = new Headers({ 'Content-Type': 'text/plain' });

      // Create a request option
      const options = new RequestOptions({ headers });

      return this.http.delete(this.usersUrl + key) // ...using post request
                       .map((res: Response) => res) // ...and returning data
                       .catch((error: any) => Observable.throwError(error || 'Server error')); // ...errors if any
     }
}
