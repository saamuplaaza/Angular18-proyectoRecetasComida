import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  @Input() isDeleteOpen = false;
  @Input() id = "";
  @Output() onCloseDelete = new EventEmitter<any>();

  fb = inject(FormBuilder); // Injectar la libreria que permite crear formularios
  recipeForm!: FormGroup; // Donde almacenamos el puntero al formulario
  fire = inject(FireService)

  constructor() {
    this.recipeForm = this.fb.group({
      strMeal: new FormControl('', [Validators.required, Validators.minLength(3)]),
      strInstructions: new FormControl(''),
    })
  }

  closeModalDelete() {
    history.back();
  }
  // Escucha cambios en el historial del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onCloseDelete.emit("Me cierro");
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModalDelete();
    }
  }

  async createRecipe() {
    if (this.recipeForm.invalid)
      return;
    try {
      let recipe = await this.fire.createRecipe(this.recipeForm.value);
      this.recipeForm.reset();
      this.closeModalDelete();
    } catch (err) {
      alert("Error al crear la receta" + err)
    }
  }

  onDeleteRecipe(id: string) {
    this.fire.deleteRecipe(id);
    this.closeModalDelete();
  }
}