import { Espacio } from "./espacio";
// import { Usuario } from "./usuario";

export interface Reserva {
  id: number;
  nombreEvento: string;
  fechaInicio: Date;
  fechaFin: Date;
  espacioId: number;
  espacio: Espacio;
  usuarioId: number;
  // usuario: Usuario;
}