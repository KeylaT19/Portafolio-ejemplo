// Datos ficticios de la demo (guion: «Club Deportivo Las Palmas»). Nunca un cliente real.
export const CLIENTE = 'Club Deportivo Las Palmas';
export const INSTALACION = {folio: 'UB001', nombre: 'Sede Las Palmas'};

export const ZONAS = [
	{folio: 'ZN001', nombre: 'Alberca', equipos: [
		{folio: 'AC001', nombre: 'Bomba de filtrado 1'},
		{folio: 'AC002', nombre: 'Filtro de arena'},
		{folio: 'AC003', nombre: 'Clorador automático'},
	]},
	{folio: 'ZN002', nombre: 'Gimnasio', equipos: [
		{folio: 'AC004', nombre: 'Caminadora 01'},
		{folio: 'AC005', nombre: 'Minisplit 24 000 BTU'},
	]},
	{folio: 'ZN003', nombre: 'Canchas', equipos: [{folio: 'AC006', nombre: 'Luminarias cancha 1'}]},
	{folio: 'ZN004', nombre: 'Vestidores', equipos: [{folio: 'AC007', nombre: 'Calentador de paso'}]},
	{folio: 'ZN005', nombre: 'Casa de máquinas', equipos: [
		{folio: 'AC008', nombre: 'Caldera principal'},
		{folio: 'AC009', nombre: 'Tablero eléctrico general'},
	]},
];

export const PERSONAS = {
	supervisora: {nombre: 'Laura Méndez', rol: 'Supervisora', ini: 'LM', color: '#0f56b3'},
	tecnico: {nombre: 'Carlos Ruiz', rol: 'Técnico', ini: 'CR', color: '#0e7490'},
	recepcion: {nombre: 'Ana Torres', rol: 'Recepción', ini: 'AT', color: '#a96200'},
};

export const OT = 'OT20260001';
