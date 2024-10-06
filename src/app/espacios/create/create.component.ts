import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Espacio } from 'src/app/interface/espacio';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  espacioForm: FormGroup;
  esEdicion: boolean = false;
  espacioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private espacioService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.espacioService.model = 'spaces';
    this.espacioForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.esEdicion = true;
        this.espacioId = +params['id'];
        this.cargarEspacio(this.espacioId);
      }
    });
  }

  cargarEspacio(id: number) {
    this.espacioService.getData(id).pipe(
      tap((espacio: Espacio) => {
        this.espacioForm.patchValue(espacio);
      }),
      catchError((error) => {
        console.error('Error al cargar el espacio', error);
        return of(null);
      })
    ).subscribe();
  }

  guardarEspacio() {
    if (this.espacioForm.valid) {
      const espacioData = this.espacioForm.value;
      espacioData.id = this.espacioId;

      if (this.esEdicion) {
        this.espacioService.update(espacioData).pipe(
          tap(() => {
            this.router.navigate(['/espacios/list']);
          }),
          catchError((error) => {
            console.error('Error al actualizar el espacio', error);
            return of(null);
          })
        ).subscribe();
      } else {
        this.espacioService.register(espacioData).pipe(
          tap(() => {
            this.router.navigate(['/espacios/list']);
          }),
          catchError((error) => {
            console.error('Error al crear el espacio', error);
            return of(null);
          })
        ).subscribe();
      }
    }
  }
}