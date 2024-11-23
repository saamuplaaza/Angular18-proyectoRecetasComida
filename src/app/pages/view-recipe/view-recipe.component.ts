import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FireService } from '../../services/fire.service';
@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  apiS = inject(ApiService);

  id = input.required<string>();

  fireS = inject(FireService)

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

    let request = this.apiS.getRecipeById(this.id());
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