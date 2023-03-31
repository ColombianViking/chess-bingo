import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { Observable, of, tap } from 'rxjs';
import {
  Achievement,
  AchievementService,
} from '../service/achievement.service';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.scss'],
})
export class BingoBoardComponent implements OnInit {

  @ViewChild('screen', { static: true }) screen: any;
  @ViewChild('teamname') teaminput: any;

  achievements: Achievement[] = [];
  constructor(
    private achievementService: AchievementService,
    private captureService: NgxCaptureService
  ) {
  }

  rerollAchievements() {
    let teamname = this.teaminput.nativeElement.value;
    teamname = teamname == "" ? undefined : teamname
    this.achievements = this.achievementService.getRandomAchievments(teamname);
    this.achievements[12] = this.achievementService.getOpening(teamname)
  }

  totalDifficulty(): number {
    return this.achievements.reduce(
      (total, current) => total + current.difficulty,
      0
    );
  }

  ngOnInit() {
    this.achievements = this.achievementService.getRandomAchievments();
  }

  saveScreenshot(): void {
    this.captureService
      .getImage(this.screen.nativeElement, true)
      .pipe(tap((img) => console.log(img)))
      .subscribe(
        b64 => {
        let a  = document.createElement('a');
        let teamname = this.teaminput.nativeElement.value;
        a.href = b64;
        a.download = `bingo-board-${teamname}.png`;
        a.click();
        }
      );
  }
}
