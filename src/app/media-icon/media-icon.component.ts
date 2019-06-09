import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-media-icon',
  templateUrl: './media-icon.component.html',
  styleUrls: ['./media-icon.component.scss']
})
export class MediaIconComponent implements OnInit {

  @Input() link: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

}
