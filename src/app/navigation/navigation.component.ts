import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  sharePage() {
    // OPen share menu of the browser when the share button is clicked
    navigator
      .share({
        title: 'Note Page',
        text: 'Check out this note page',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
}
