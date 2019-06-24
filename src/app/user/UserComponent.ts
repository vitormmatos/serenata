import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConfigComponent } from '../config/config.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
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

  constructor(private config: ConfigComponent) { }
  ngOnInit() {
    // Load albums
    this.loadUsers();
  }
  loadUsers() {
    this.config.getConfigResponse();
  }
}
