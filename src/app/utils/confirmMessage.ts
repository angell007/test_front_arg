import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConfirmMessageService {
 
  constructor(private toastr: ToastrService) {}

  showConfirm(status: string, model: string): Promise<boolean> {
    let articulo = model.endsWith('a') ? 'La' : 'El';
    return new Promise((resolve) => {
      this.toastr.info(
        status === 'Inactivo' ? `${articulo} ${model} se Inactivará!` : `${articulo} ${model} se activará`,
        '¿Estás seguro? click aquí',
        {
          closeButton: true,
          timeOut: 0,
          extendedTimeOut: 0,
          disableTimeOut: true,
          tapToDismiss: false,
          enableHtml: true,
        }
      ).onTap.subscribe(() => resolve(true));
    });
  }

  showConfirmCancel(model: string): Promise<boolean> {
  return new Promise((resolve) => {
    this.toastr.warning(
      `Se dispone a cancelar una ${model}`,
      '¿Está seguro?',
      {
        closeButton: true,
        timeOut: 0,
        extendedTimeOut: 0,
        disableTimeOut: true,
        tapToDismiss: false,
      }
    ).onTap.subscribe(() => resolve(true));
  });
}

  showConfirmCancelWithoutMessage(status: string, model: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.toastr.warning(
        `Estás a un paso de ${status} esta ${model}!`,
        '¿Estás seguro?',
        {
          closeButton: true,
          timeOut: 0,
          extendedTimeOut: 0,
          disableTimeOut: true,
          tapToDismiss: false,
        }
      ).onTap.subscribe(() => resolve(true));
    });
  }

  showErrorWithDetails(title: string, errors: string[]): void {
    const errorList = errors.map(error => `<li>${error}</li>`).join('');
    this.toastr.error(
      `<ul>${errorList}</ul>`,
      title,
      {
        enableHtml: true,
        closeButton: true,
        timeOut: 0,
        extendedTimeOut: 0,
        disableTimeOut: true,
        tapToDismiss: false,
      }
    );
  }

  deleteAllAlerts() {
        this.toastr.clear();
  }

  successMessage(
    status: string = 'Operación exitosa',
    message: string = 'Felicidades, Operación realizada correctamente.',
    model: string = ''
  ): void {
    this.toastr.success(message, status);
  }

  errorMessage(
    status: string = 'Ooops',
    model: string = ''
  ): void {
    this.toastr.error('Se han registrado errores, operación no realizada', status);
  }

  warningMessage(
    status: string = 'Ooops',
    text: string = 'Verifique los datos',
    model: string = ''
  ): void {
    this.toastr.warning(text, status);
  }
}