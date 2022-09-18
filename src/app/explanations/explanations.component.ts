import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from '../service/achievement.service';

@Component({
  selector: 'app-explanations',
  templateUrl: './explanations.component.html',
  styleUrls: ['./explanations.component.scss']
})
export class ExplanationsComponent implements OnInit {

  difficulties = ['easy','medium','hard']

  @Input () achievements: Achievement[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
