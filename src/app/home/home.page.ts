import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  colors: string[] = ['Red', 'Green', 'Blue'];

  outMsg: any;
  turnRecords: any;

  firstColour: any; 
  secondColour: any; 
  thirdColour: any; 
  fourthColour: any;

  gameWonAlertShown: boolean = false;
  gameLostAlertShown: boolean = false;

  constructor(private node: NodeService) {}

  submitGuess() {

    const guessArray = [
      this.firstColour, 
      this.secondColour, 
      this.thirdColour, 
      this.fourthColour
    ];

    this.node.guess(guessArray).subscribe({
      next: (v : any) => { 
        console.log(v),
        this.turnRecords = v.turnRecords;
      },
      error: (e) => { 
        console.error(e),
        this.outMsg = e.message; },
      complete: () => console.info('Complete')
    });
  }

  countOccurrences(arr: string[], target: string): string {
    const count = arr.filter(item => item === target).length;
    
    if (target === 'Black' && count === 4) {
      if (!this.gameWonAlertShown) {
        alert('Game Won!');
        this.gameWonAlertShown = true; // Set flag to true to indicate alert has been shown
      }
    } else if (this.turnRecords.length >= 10) {
      if (!this.gameLostAlertShown) {
        alert('Game Lost');
        this.gameLostAlertShown = true; // Set flag to true to indicate alert has been shown
      }
    }
  
    return count.toString();
  }
}
