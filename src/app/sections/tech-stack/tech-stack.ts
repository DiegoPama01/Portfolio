import { Component } from '@angular/core';

type TechItem = { icon: string; label: string, color:string };

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss',
})
export class TechStack {
  tech: TechItem[] = [
    { icon: 'icons/angular.svg', label: 'Angular' , color: '#dd0031' },
    { icon: 'icons/typescript.svg', label: 'TypeScript' , color: '#3178c6' },
    { icon: 'icons/mysql.svg', label: 'MySQL' , color: '#00758f' },
    { icon: 'icons/php.svg', label: 'PHP' , color: '#4f5b93' },
    { icon: 'icons/laravel.svg', label: 'Laravel' , color: '#f0535a' },
  ];
}
