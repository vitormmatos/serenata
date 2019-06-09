import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() icon: string;
  @Input() text: string;
  @Input() link: string;
  constructor() { }

  ngOnInit() {
  }
}
