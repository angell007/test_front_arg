import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { ConfirmMessageService } from '../../utils/confirmMessage';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface Espacio {
  id: number;
  name: string;
  description: string;
  capacity: number;
}

@Component({
  selector: 'app-espacios-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EspaciosListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'capacity', 'acciones'];
  dataSource: Espacio[] = [];

  constructor(
    private crudService: CrudService,
    private confirmMessageService: ConfirmMessageService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.crudService.model = 'spaces';
    this.cargarEspacios();
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

  aplicarFiltros() {}

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