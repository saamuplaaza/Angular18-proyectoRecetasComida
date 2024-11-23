import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  api = inject(ApiService);
  router = inject(Router)

  // No hace falta ponerle el $, pero se pone por convención
  $state: WritableSignal<any> = signal({
    type: 'category',
    loading: false,
    error: false,
    data: [],
  });

  @Input()
  set type(type: string) {
    // 1. Analizar el valor
    // 2. Llamar al servicio

    // Hemos recibido un cambio en la ruta
    this.$state.update((state) => ({ ...state, loading: true, type: type }));

    let request: Observable<any>;

    switch (type) {
      case 'nationality':
        request = this.api.getNationalities();
        break;
      default:
        request = this.api.getCategories();
    }
    request.subscribe(
      (data: any) => {
        this.$state.update((state) => ({
          ...state,
          loading: false,
          error: false,
          data: data.map((m: any) => {
            return type == 'category' ? ({ name: m.strCategory }) : ({ name: m.strArea })
          }),
        }));

      },
      (err) => {
        this.$state.update((state) => ({
          ...state,
          loading: false,
          error: err,
          data: [],
        }));
      }
    );
  }

  ngOnInit() { }

  listRecipe(ingredient: string) {
    // Ir a la pagina /recipe/tipo/ingredient
    this.router.navigate(['recipes', this.$state().type, ingredient])
  }
}
