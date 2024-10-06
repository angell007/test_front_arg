import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ConfirmMessageService } from '../../utils/confirmMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFilterFn } from '@angular/material/datepicker';
import { catchError, tap, of } from 'rxjs';



@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss']
})
export class ReservaFormComponent implements OnInit {
  reservaForm!: FormGroup;
  espacioId: any;
minDate: any;

 

  constructor(
    private fb: FormBuilder,
    private reservaService: CrudService,
    private confirmMessageService: ConfirmMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reservaService.model = 'reservations';
    this.route.queryParams.subscribe(params => {
      this.espacioId = params['espacioId'];
    });
  }

  ngOnInit() {
    this.reservaForm = this.fb.group({
      description: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      space_id: [this.espacioId, Validators.required],
    });
  }

  dateFilter: DateFilterFn<any> = (date: Date | null): boolean => {
    const currentDate = new Date();
    return date !== null && date >= currentDate;
  };

  onSubmit() {
    if (this.reservaForm.valid) {
      this.reservaService.register(this.reservaForm.value).pipe(
        tap(response => {
          this.confirmMessageService.successMessage('Reserva creada con éxito');
          this.reservaForm.reset();
          this.router.navigate(['reservas/mis-reservas']);
        }),
        catchError((error: any) => {
          if (error.status === 422 && error.error && error.error.errors) {
            const errorMessages = Object.values(error.error.errors).flat() as string[];
            this.confirmMessageService.showErrorWithDetails('Error al crear la reserva', errorMessages);
          } else {
            this.confirmMessageService.errorMessage('Error al crear la reserva');
          }
          return of(null);
        })
      ).subscribe();
    }
  }
}