import {addHours, addMinutes, format, isAfter, isBefore, parse, parseISO} from "date-fns";
import { es } from "date-fns/locale";

export const dateTextWithCreatedUser = (date: Date) => {
  return format(date, "dd MMMM yyyy 'a las' hh:mm a", { locale: es });
};

export const dateText = (fechaString: string): string => {
  if (!fechaString) return "---";
  const fecha = parseISO(fechaString);

  return format(fecha, "dd/MM/yyyy", { locale: es });
};

export const formatHourWithSeconds = (horaString: string): string => {
  const hora = parse(horaString, "HH:mm:ss", new Date());
  return format(hora, "hh:mm a", { locale: es });
};

export const formatHour = (horaString: string): string => {
  if (!horaString) return "---";
  const horaSinMilisegundos = horaString;
  const hora = parse(horaSinMilisegundos, "HH:mm:ss", new Date());

  return format(hora, "hh:mm a", { locale: es });
};

export const dateTextWithHour = (fechaString: string): string => {
  if (!fechaString) return "---";
  const fecha = parseISO(fechaString);
  return format(fecha, "dd MMMM yyyy 'a las' hh:mm a", { locale: es });
};

export const extractDayText = (fechaString: string): string => {
  const fecha = parseISO(fechaString);
  return format(fecha, "EEEE", { locale: es });
};

export const extractDayNumber = (fechaString: string): string => {
  const fecha = parseISO(fechaString);
  return format(fecha, "d", { locale: es });
};

export const extractMonthText = (fechaString: string): string => {
  const fecha = parseISO(fechaString);
  return format(fecha, "MMMM", { locale: es });
};

// export const extr

// siguientes 7 dias de la semana

export const next7Days = (fechaString: string) => {
  const today = parseISO(fechaString);
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    return nextDay;
  });

  return next7Days;
};

export const addDays = (fechaString: string, days: number) => {
  const fecha = parseISO(fechaString);
  const newDate = new Date(fecha);
  newDate.setDate(fecha.getDate() + days);
  return newDate;
};

// hour -> 11:00:00.000000

export const formatHourSchedule = (horaString: string): string => {
  if (!horaString) return "---";
  const hora = parse(horaString, "HH:mm:ss.SSSSSS", new Date());
  return format(hora, "hh:mm a", { locale: es });
};

export const formatHourScheduleByApi = (horaString: string): string => {
  if (!horaString) return "---";
  const hora = parse(horaString, "HH:mm:ss.SSSSSS", new Date());
  return format(hora, "hh:mm", { locale: es });
};

//transforma la fecha a formato yyyy-MM-dd
export const dateToApi = (fecha: Date | string): string => {
  if (typeof fecha === "string") {
    fecha = new Date(fecha);
  }
  return format(fecha, "yyyy-MM-dd", { locale: es });
};

//array dcon id, name de meses
export const months = [
  { id: 1, name: "Enero" },
  { id: 2, name: "Febrero" },
  { id: 3, name: "Marzo" },
  { id: 4, name: "Abril" },
  { id: 5, name: "Mayo" },
  { id: 6, name: "Junio" },
  { id: 7, name: "Julio" },
  { id: 8, name: "Agosto" },
  { id: 9, name: "Septiembre" },
  { id: 10, name: "Octubre" },
  { id: 11, name: "Noviembre" },
  { id: 12, name: "Diciembre" },
];

// enviar id del mes y retornar la fecha inicial y final del mes
export const getDatesByMonth = (month: number, year: number) => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  return { firstDay, lastDay };
};

//array con los años
export const years = Array.from({ length: 10 }, (_, i) => {
  return new Date().getFullYear() + i;
});

export const formatSectionDate = (fechaString: string): string => {
  if (!fechaString) return "---";

  const fechaUtc = parseISO(fechaString);

  // Ajuste manual para UTC-5 (por ejemplo, Lima, Perú)
  const offsetHoras = +5; // Cambia según tu zona horaria
  const fechaLocal = new Date(fechaUtc.getTime() + offsetHoras * 60 * 60 * 1000);

  // Formatear la fecha y las horas
  const fechaFormateada = format(fechaLocal, "d/M/yyyy", { locale: es });
  const horaInicio = format(fechaLocal, "HH:mm");

  // Calcular la hora de fin sumando 1.5 horas (90 minutos)
  const fechaFin = new Date(fechaLocal.getTime() + 1.5 * 60 * 60 * 1000);
  const horaFin = format(fechaFin, "HH:mm");

  return `Realizada el ${fechaFormateada} | ${horaInicio}-${horaFin} hrs`;
};

export const isCurrentTimeBetweenSection = (fechaString: string): boolean => {
  if (!fechaString) return false;

  const fechaUtc = parseISO(fechaString);
  // console.log(fechaUtc);

  // Ajuste manual para UTC-5 (por ejemplo, Lima, Perú)
  const offsetHoras = +5; // Cambia según tu zona horaria
  const fechaLocal = new Date(fechaUtc.getTime() + offsetHoras * 60 * 60 * 1000);

  // Hora de inicio, restando 15 minutos para aumentar el rango
  const horaInicio = fechaLocal.getTime() - 15 * 60 * 1000;

  // Hora de fin (1.5 horas después del inicio), sumando 15 minutos al final
  const horaFin = new Date(fechaLocal.getTime() + 1.5 * 60 * 60 * 1000).getTime() + 15 * 60 * 1000;

  // Hora actual en la zona horaria local
  const horaActual = new Date().getTime();

  // Validar si la hora actual está entre la hora de inicio y la hora de fin
  return horaActual >= horaInicio && horaActual <= horaFin;
};

export const isDatePassed = (fechaString: string): boolean => {
  const fecha = parseISO(fechaString); // Convertir la fecha string a un objeto Date
  const fechaConAjuste = addHours(fecha, 5); // Añadir 5 horas a la fecha proporcionada
  const currentDate = new Date(); // Fecha actual
  return isBefore(fechaConAjuste, currentDate); // La fecha ajustada ha pasado si es antes de la fecha actual
};
