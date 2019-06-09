import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public facebookLink = 'https://www.facebook.com/serenatadenatalbsb/';
  public facebookIcon = '../../assets/glyphicons-social-31-facebook@3x.png';
  public youtubeLink = 'https://www.youtube.com/channel/UCpeulprR35OFK5MzhDizvbQ/';
  public youtubeIcon = '../../assets/glyphicons-social-23-youtube@3x.png';
  public instagramLink = 'https://www.instagram.com/serenatadenatalbrasilia/';
  public instagramIcon = '../../assets/glyphicons-social-33-instagram@3x.png';
  public githubLink = 'https://github.com/vitormmatos/serenata';
  public githubIcon = '../../assets/glyphicons-social-22-github@3x.png';

  public homeIcon = 'home';
  public homeText = 'Página Inicial';
  public homeLink = 'home';
  public imageIcon = 'collections';
  public imageText = 'Galeria';
  public imageLink = 'galeria';
  public musicIcon = 'music_note';
  public musicText = 'Partituras';
  public musicLink = 'partituras';
  public infoIcon = 'info';
  public infoText = 'Info';
  public infoLink = 'info';

  constructor() { }

  ngOnInit() {
  }

}
