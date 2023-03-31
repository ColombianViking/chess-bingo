import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription, take, tap } from 'rxjs';

export type Achievement = {
  title: string;
  description: string;
  url?: string | undefined;
  difficulty: number;
  identifier: string;
  opening?: boolean
};

@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  achievementList: Achievement[] = [];
  achievementData: Observable<Achievement[]>;
  dataReady: boolean = false;

  seededRandom: () => number = Math.random;
  openingList: Achievement[] = [];

  constructor(private http: HttpClient) {
    this.achievementData = this.http.get<Achievement[]>('assets/achievements.json').pipe(take(1))
  
    
  
    this.achievementData.subscribe(achievements => {
      this.dataReady = true;
      this.openingList = achievements.filter(a => a.opening);
      this.achievementList = achievements.filter(a => a.opening == undefined )
    });
  }

  private mulberry32(a:number) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  private cyrb128(str : string) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
  }

  private getRandomOpening(): Achievement {
    let shuffled = this.openingList.slice(),
      i = this.openingList.length,
      temp,
      index;
    while (i--) {
      index = Math.floor((i + 1) * this.seededRandom());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled[0];
  }


  private getRandomSubArray(size: number): Achievement[] {
    let shuffled = this.achievementList.slice(),
      i = this.achievementList.length,
      temp,
      index;
    while (i--) {
      index = Math.floor((i + 1) * this.seededRandom());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }

  getRandomAchievments(seed?: string): Achievement[] {

    if (seed !== undefined) {
      let hash = this.cyrb128(seed)
      this.seededRandom = this.mulberry32(hash[0])
    }

    return this.getRandomSubArray(25);
  }

  getAllAchievments(): Achievement[] {
    return this.achievementList;
  }

  getRandomAchievement(level: number, seed: string): Achievement {
    return this.getRandomAchievments(seed).find(a => a.difficulty == level) 
            ?? this.getRandomSubArray(50).find(a => a.difficulty == level)!!
  }

  getOpening(seed: string): Achievement {
    if (seed !== undefined) {
      let hash = this.cyrb128(seed)
      this.seededRandom = this.mulberry32(hash[0])
    }

    return this.getRandomOpening()
  }
}
