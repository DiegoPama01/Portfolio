import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../pages/projects/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly projects: Project[] = [
  ];

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return of(this.projects.find((p) => p.id === id));
  }
}
