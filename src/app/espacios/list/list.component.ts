import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { ConfirmMessageService } from '../../utils/confirmMessage';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface Espacio {
  id: number;
  name: string;
  description: string;
  capacity: number;
  type: string;
}

@Component({
  selector: 'app-espacios-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EspaciosListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'type', 'description', 'capacity', 'acciones'];
  dataSource: Espacio[] = [];
  startDate: any;
  endDate: any;
  capacity: any;
  busquedaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private confirmMessageService: ConfirmMessageService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.crudService.model = 'spaces';
    this.cargarEspacios();
    this.busquedaForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      capacity: [''],
      type: ['']
    });
  }

  cargarEspacios(): void {
    this.crudService.index().pipe(
      catchError((error) => {
        console.log(error);
        this.confirmMessageService.errorMessage('Error al cargar espacios');
        return of([]);
      }),
      tap((response) => {
        console.log(response);
        this.dataSource = response;
      })
    )
      .subscribe();
  }

  crearEspacio(): void {
    this.router.navigate(['/espacios/create']);
  }

  editarEspacio(espacio: Espacio): void {
    this.router.navigate(['/espacios/edit', espacio.id]);
  }

  detallesEspacio(espacio: number): void {
    this.router.navigate(['/espacios/details', espacio]);
  }

  buscarEspacios(): void {
    if (this.busquedaForm.valid) {
      const formValue = this.busquedaForm.value;
      const filtros = {
        startDate: formValue.startDate ? new Date(formValue.startDate).toISOString() : null,
        endDate: formValue.endDate ? new Date(formValue.endDate).toISOString() : null,
        capacity: formValue.capacity,
        type: formValue.type
      };
      console.log('Filtros:', filtros);
      this.crudService.index(filtros).pipe(
        catchError((error) => {
          console.log(error);
          this.confirmMessageService.errorMessage('Error al cargar espacios');
          return of([]);
        }),
        tap((response) => {
          this.dataSource = response;
        })
      ).subscribe();
    } else {
      console.log('El formulario no es válido');
    }
  }

  tienePermiso(): boolean {
    return this.userService.getUserPermissions();
  }

  eliminarEspacio(id: number): void {
    this.confirmMessageService.showConfirm('Inactivo', 'Espacio').then((result) => {

      if (result) {
        this.confirmMessageService.deleteAllAlerts();
        this.crudService.delete(id).pipe(
          tap(() => {
            this.confirmMessageService.successMessage('Espacio eliminado con éxito');
            this.cargarEspacios();
          }),
          catchError((error) => {
            this.confirmMessageService.errorMessage('Error al eliminar el espacio');
            return of(null);
          })
        ).subscribe();
      }
    });
  }
}