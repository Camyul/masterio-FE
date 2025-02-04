import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'msr-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  userId: string = '';
  private readonly unsubscribe$ = new Subject<void>();
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService
      .getCurrentUserId()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: { userId: string }) => {
        this.userId = data.userId;
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
