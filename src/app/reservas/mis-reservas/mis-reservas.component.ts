import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Reserva } from 'src/app/interface/reserva';
import { ConfirmMessageService } from 'src/app/utils/confirmMessage';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnInit {
  dataSource: any[] = []; 
  displayedColumns: string[] = ['id', 'space', 'start_time', 'end_time', 'description'];

  constructor(
    private crudService: CrudService,
    private confirmMessageService: ConfirmMessageService,
    private router: Router,
    private userService: UserService

  ) {
    this.crudService.model = 'reservations';
  }

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.crudService.index().pipe(
      tap((data: Reserva[]) => {
        this.dataSource = data;
      }),
      catchError((error: any) => {
        console.log(error);
        this.confirmMessageService.errorMessage('Error al cargar reservas');
        return of([]);
      })
    ).subscribe();
  }

  // cargarReservas(): void {
  //   this.crudService.index().pipe(
  //     catchError((error) => {
  //       console.log(error);
  //       this.confirmMessageService.errorMessage('Error al cargar reservas');
  //       return of([]);
  //     }),
  //     tap((response) => {
  //       console.log(response);
  //       this.dataSource = response;
  //     })
  //   )
  //     .subscribe();
  // }

  crearEspacio(): void {
    this.router.navigate(['/reservas/create']);
  }

  editarEspacio(espacio: Reserva): void {
    this.router.navigate(['/reservas/edit', espacio.id]);
  }

  detallesEspacio(espacio: number): void {
    this.router.navigate(['/reservas/details', espacio]);
  }

  aplicarFiltros() { }

  tienePermiso(): boolean {
    return this.userService.getUserPermissions();
  }

  eliminarEspacio(id: number): void {
    this.confirmMessageService.showConfirm('Inactivo', 'Espacio').then((result) => {
      if (result) {
        this.crudService.delete(id).pipe(
          tap(() => {
            this.confirmMessageService.successMessage('Reserva eliminada con éxito');
            this.cargarReservas();
          }),
          catchError((error) => {
            this.confirmMessageService.errorMessage('Error al eliminar la reserva');
            return of(null);
          })
        ).subscribe();
      }
    });
  }
}

// cargarReservas() {
//   this.reservaService.index().pipe(
//     tap((data: Reserva[]) => {
//       this.reservas = data;
//     }),
//     catchError((error: any) => {
//       console.log(error);
//       this.confirmMessageService.errorMessage('Error al cargar reservas');
//       return of([]);
//     })
//   ).subscribe();
// }

// modificarReserva(reserva: Reserva) {
//   // Implementar lógica para modificar reserva
// }

// cancelarReserva(reservaId: number) {
//   this.reservaService.delete(reservaId).pipe(
//     tap(() => {
//       this.confirmMessageService.successMessage('Reserva cancelada con éxito');
//       this.cargarReservas();
//     }),
//     catchError((error: any) => {
//       this.confirmMessageService.errorMessage('Error al cancelar la reserva');
//       return of(null);
//     })
//   ).subscribe();
// }
// }