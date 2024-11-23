import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireService } from '../../services/fire.service';
@Component({
  selector: 'app-view-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-favorite.component.html',
  styleUrl: './view-favorite.component.css'
})
export class ViewFavoriteComponent {
  fireS = inject(FireService)

  id = input.required<string>();

  $state: WritableSignal<any> = signal({
    data: null,
    loading: true,
    error: null
  })
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.$state.update(state => {
      return { ...state, loading: true }
    });

    let request = this.fireS.getRecipesById(this.id());
    request?.subscribe({
      next: (data: any) => {
        this.$state.update(state => {
          return { ...state, loading: false, data: data }
        });
      },
      error: (error: any) => {
        this.$state.update(state => {
          return { ...state, loading: false, data: [], error: error }
        });
      }
    })
  }
}