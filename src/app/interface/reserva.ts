import { Espacio } from "./espacio";
import { User } from "../models/users.model";
export interface Reserva {
  id: number;
  nombreEvento: string;
  fechaInicio: Date;
  fechaFin: Date;
  espacioId: number;
  espacio: Espacio;
  usuarioId: number;
  usuario: User;
}