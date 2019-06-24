import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConfigComponent } from '../config/config.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ConfigComponent]
})

export class UserComponent implements OnInit {
  users: User[];
  naipes = [
    { value: 1, viewValue: 'Soprano' },
    { value: 2, viewValue: 'Contralto' },
    { value: 3, viewValue: 'Tenor' },
    { value: 4, viewValue: 'Baixo' },
  ];
//   private model = new User(0, '', '', '', '', '', 0);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private userService: ConfigComponent) { }
  ngOnInit() {
    // Load albums
    this.loadUsers();
  }

  loadUsers() {
    this.userService.showConfig();
  }
  // loadUsers() {
  //     this.
  //         // Get all albums from API
  //          userService.getUsers()
  //                            .subscribe(
  //                                users => users = users, // Bind to view
  //                                 err => {
  //                                     // Log errors if any
  //                                     console.log(err);
  //                                 });
  //     }

  // submitUser() {
  //         console.log(this.model);
  //         // Subscribe to observable
  //         this.userService.addUser(this.model).subscribe(
  //                                 () => {
  //                                    // empty object
  //                                     this.model = new User(0, '', '', '', '', '', 0);
  //                                     // reload album list
  //                                     this.loadUsers();
  //                                 },
  //                                 err => {
  //                                     // Log errors if any
  //                                     console.log(err);
  //                                 });
  //   }

  //   deleteUser(user: User) {
  //           console.log(user);
  //           // Subscribe to observable
  //           this.userService.deleteUser(user.username).subscribe(
  //                                   () => {
  //                                       this.loadUsers();
  //                                   },
  //                                   err => {
  //                                       console.log(err);
  //                                   });
  //     }
}
