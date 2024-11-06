type Date = {
    date: string;
}

export function formatDate(date: Date['date']) {
    const fecha = new Date(date);

    return new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'long',
        timeZone: 'UTC'
    }).format(fecha)
}

export function formatDuration(duracion: number) {
    const hours = Math.floor(duracion / 60);
    const minutes = duracion % 60;

    const horas = hours > 0 ? `${hours}h` : '';
    const minutos = minutes > 0 ? `${minutes}min` : '';

    return `${horas} ${minutos}`.trim();
}