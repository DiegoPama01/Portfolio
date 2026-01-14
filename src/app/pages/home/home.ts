import { Component } from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { TechStack } from '../../sections/tech-stack/tech-stack';
import { Cta } from '../../sections/cta/cta';

@Component({
  selector: 'app-home',
  imports: [Hero, TechStack, Cta],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
