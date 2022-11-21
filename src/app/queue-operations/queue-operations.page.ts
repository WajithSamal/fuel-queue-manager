import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-queue-operations',
  templateUrl: './queue-operations.page.html',
  styleUrls: ['./queue-operations.page.scss'],
})
export class QueueOperationsPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,) {
  }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }
}
