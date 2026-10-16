import React from 'react';
import {interpolate, useCurrentFrame, Easing, spring, useVideoConfig} from 'remotion';
import {c, fuente, mono} from '../tema';
import {Avatar, FolioMini, FotoEquipo, Icono, Insignia, QR} from './piezas';
import {CLIENTE, INSTALACION, OT, PERSONAS, ZONAS} from './datos';

const lim = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const t = (f: number, a: number, b: number) =>
	interpolate(f, [a, b], [0, 1], {...lim, easing: Easing.inOut(Easing.cubic)});

const MENU = [
	{n: 'tablero', t: 'Tablero'},
	{n: 'ubicacion', t: 'Ubicaciones'},
	{n: 'activo', t: 'Activos'},
	{n: 'incidencia', t: 'Incidencias'},
	{n: 'orden', t: 'Órdenes de trabajo'},
	{n: 'calendario', t: 'Calendario'},
	{n: 'registro', t: 'Registros'},
	{n: 'equipos', t: 'Equipos'},
];

/** Armazón de la app de escritorio: menú lateral marino + barra superior. */
export const AppEscritorio: React.FC<{activo: string; titulo: string; children: React.ReactNode; busqueda?: string}> = ({
	activo,
	titulo,
	children,
	busqueda,
}) => (
	<div style={{width: 1440, height: 900, display: 'flex', fontFamily: fuente, background: c.fondoPagina, color: c.tinta}}>
		<div style={{width: 250, background: c.oscuro, color: '#fff', padding: '26px 16px', display: 'flex', flexDirection: 'column', gap: 6}}>
			<div style={{fontWeight: 800, fontSize: 26, letterSpacing: '-0.02em', padding: '0 12px 22px'}}>
				<span style={{color: c.acento}}>GC</span> GMAO
			</div>
			{MENU.map((m) => (
				<div
					key={m.t}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '12px 14px',
						borderRadius: 10,
						fontSize: 16,
						fontWeight: m.t === activo ? 600 : 400,
						background: m.t === activo ? 'rgba(56,189,248,.16)' : 'transparent',
						color: m.t === activo ? '#fff' : c.tintaInversaSuave,
						borderLeft: m.t === activo ? `4px solid ${c.acento}` : '4px solid transparent',
					}}
				>
					<Icono n={m.n} tam={20} />
					{m.t}
				</div>
			))}
			<div style={{marginTop: 'auto', fontSize: 13, color: c.tintaInversaSuave, padding: '0 12px'}}>{CLIENTE}</div>
		</div>
		<div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
			<div style={{height: 76, background: '#fff', borderBottom: `1px solid ${c.borde}`, display: 'flex', alignItems: 'center', padding: '0 32px', gap: 24}}>
				<div style={{fontSize: 24, fontWeight: 700}}>{titulo}</div>
				<div
					style={{
						marginLeft: 'auto',
						width: 380,
						height: 44,
						borderRadius: 10,
						border: `1.5px solid ${busqueda ? c.marca : c.borde}`,
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						padding: '0 14px',
						color: c.tintaSuave,
						fontSize: 15,
						background: c.fondoPagina,
					}}
				>
					<Icono n="buscar" tam={18} />
					{busqueda ? <span style={{fontFamily: mono, color: c.tinta}}>{busqueda}</span> : 'Buscar por folio o nombre…'}
				</div>
				<Icono n="campana" tam={22} color={c.tintaSuave} />
				<Avatar ini={PERSONAS.supervisora.ini} color={PERSONAS.supervisora.color} />
			</div>
			<div style={{flex: 1, padding: 32, position: 'relative', overflow: 'hidden'}}>{children}</div>
		</div>
	</div>
);

const Tarjeta: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
	<div style={{background: '#fff', borderRadius: 16, border: `1px solid ${c.borde}`, boxShadow: '0 1px 3px rgba(16,24,40,.08)', padding: 24, ...style}}>
		{children}
	</div>
);

/** Toma 2 · Tablero con tarjetas de OT por estado, cumplimiento y top de equipos. */
export const PantallaTablero: React.FC<{retraso?: number; alertaRegistro?: boolean}> = ({retraso = 0, alertaRegistro}) => {
	const f = useCurrentFrame() - retraso;
	const {fps} = useVideoConfig();
	const estados = [
		{t: 'Abiertas', v: 18, col: c.abierta},
		{t: 'En proceso', v: 7, col: c.proceso},
		{t: 'Finalizadas', v: 5, col: c.finalizada},
		{t: 'Cerradas', v: 142, col: c.cerrada},
	];
	const cumplimiento = Math.round(82 * t(f, 10, 45));
	const barras = [
		{n: 'Bomba de filtrado 1', v: 9},
		{n: 'Minisplit gimnasio', v: 7},
		{n: 'Calentador vestidores', v: 5},
		{n: 'Caminadora 01', v: 4},
		{n: 'Luminarias cancha 1', v: 3},
	];
	const meses = [62, 70, 68, 75, 79, 82];
	return (
		<AppEscritorio activo="Tablero" titulo="Tablero">
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20}}>
				{estados.map((e, i) => {
					const v = spring({frame: f - i * 4, fps, config: {damping: 14}});
					return (
						<Tarjeta key={e.t} style={{transform: `translateY(${(1 - v) * 30}px)`, opacity: v, borderTop: `5px solid ${e.col}`}}>
							<div style={{fontSize: 15, color: c.tintaSuave}}>OT {e.t.toLowerCase()}</div>
							<div style={{fontSize: 48, fontWeight: 700, color: e.col, lineHeight: 1.15}}>{Math.round(e.v * t(f, 4 + i * 4, 30 + i * 4))}</div>
						</Tarjeta>
					);
				})}
			</div>
			<div style={{display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20, marginTop: 20}}>
				<Tarjeta style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<div style={{alignSelf: 'flex-start', fontWeight: 600, fontSize: 17}}>Cumplimiento del preventivo</div>
					<svg width="260" height="260" viewBox="0 0 120 120" style={{marginTop: 10}}>
						<circle cx="60" cy="60" r="48" fill="none" stroke={c.suave} strokeWidth="14" />
						<circle
							cx="60"
							cy="60"
							r="48"
							fill="none"
							stroke={c.cerrada}
							strokeWidth="14"
							strokeLinecap="round"
							strokeDasharray={`${(cumplimiento / 100) * 301.6} 301.6`}
							transform="rotate(-90 60 60)"
						/>
						<text x="60" y="66" textAnchor="middle" fontFamily={fuente} fontWeight="700" fontSize="24" fill={c.tinta}>
							{cumplimiento}%
						</text>
					</svg>
					<div style={{display: 'flex', alignItems: 'flex-end', gap: 10, height: 90, marginTop: 14}}>
						{meses.map((m, i) => (
							<div key={i} style={{width: 34, height: m * t(f, 14 + i * 3, 40 + i * 3), background: i === meses.length - 1 ? c.marca : c.marcaTenue, borderRadius: 6}} />
						))}
					</div>
				</Tarjeta>
				<Tarjeta>
					<div style={{fontWeight: 600, fontSize: 17, marginBottom: 18}}>Top de equipos con más incidencias</div>
					{barras.map((b, i) => (
						<div key={b.n} style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18}}>
							<div style={{width: 230, fontSize: 15, color: c.tintaSuave}}>{b.n}</div>
							<div style={{flex: 1, height: 22, background: c.suave, borderRadius: 6, overflow: 'hidden'}}>
								<div style={{width: `${(b.v / 10) * 100 * t(f, 12 + i * 4, 42 + i * 4)}%`, height: '100%', background: i === 0 ? c.marca : '#7aa6dd', borderRadius: 6}} />
							</div>
							<div style={{width: 24, fontWeight: 600}}>{b.v}</div>
						</div>
					))}
					{alertaRegistro && (
						<div
							style={{
								marginTop: 6,
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								padding: '12px 16px',
								borderRadius: 12,
								background: '#fbeaea',
								color: c.critico,
								fontWeight: 600,
								fontSize: 15,
								opacity: t(f, 30, 40),
							}}
						>
							<Icono n="registro" tam={20} /> Registro fuera de rango · Cloro libre 0.4 ppm · Alberca
						</div>
					)}
				</Tarjeta>
			</div>
		</AppEscritorio>
	);
};

/** Toma 3 · Árbol de ubicaciones con folios. `abrir` va de 0 a 1. */
export const PantallaArbol: React.FC<{seleccion?: number}> = ({seleccion = 999}) => {
	const f = useCurrentFrame();
	const abrirInst = t(f, 10, 30);
	const abrirZona = t(f, 50, 80);
	const sel = f >= seleccion;
	const fila = (nivel: number, folio: string, nombre: string, icono: string, extra?: React.ReactNode, activo = false, op = 1) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 14,
				padding: '14px 18px',
				paddingLeft: 18 + nivel * 38,
				borderRadius: 12,
				background: activo ? c.marcaTenue : 'transparent',
				border: activo ? `2px solid ${c.marca}` : '2px solid transparent',
				opacity: op,
				fontSize: 18,
			}}
		>
			<Icono n={icono} tam={22} color={c.marca} />
			<span style={{fontWeight: nivel === 0 ? 700 : 500}}>{nombre}</span>
			<FolioMini t={folio} tam={15} />
			<span style={{marginLeft: 'auto'}}>{extra}</span>
		</div>
	);
	return (
		<AppEscritorio activo="Ubicaciones" titulo="Ubicaciones">
			<div style={{display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, height: '100%'}}>
				<Tarjeta style={{padding: 16}}>
					{fila(0, INSTALACION.folio, INSTALACION.nombre, 'ubicacion', <span style={{color: c.tintaSuave, fontSize: 15}}>5 zonas · 14 equipos</span>)}
					<div style={{maxHeight: 700 * abrirInst, overflow: 'hidden'}}>
						{ZONAS.map((z, zi) => (
							<div key={z.folio}>
								{fila(1, z.folio, z.nombre, 'mapa', <span style={{color: c.tintaSuave, fontSize: 15}}>{z.equipos.length} equipos</span>, false, t(f, 12 + zi * 3, 24 + zi * 3))}
								{zi === 0 && (
									<div style={{maxHeight: 220 * abrirZona, overflow: 'hidden'}}>
										{z.equipos.map((e, ei) =>
											<React.Fragment key={e.folio}>
												{fila(2, e.folio, e.nombre, 'activo', null, ei === 0 && sel)}
											</React.Fragment>
										)}
									</div>
								)}
							</div>
						))}
					</div>
				</Tarjeta>
				<Tarjeta style={{opacity: t(f, seleccion, seleccion + 12), transform: `translateX(${(1 - t(f, seleccion, seleccion + 12)) * 40}px)`}}>
					<FotoEquipo tipo="bomba" ancho={460} alto={260} />
					<div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 18}}>
						<div style={{fontSize: 22, fontWeight: 700}}>Bomba de filtrado 1</div>
						<FolioMini t="AC001" tam={16} />
					</div>
					<div style={{color: c.tintaSuave, fontSize: 16, marginTop: 6}}>Alberca · Sede Las Palmas</div>
					<div style={{display: 'flex', gap: 18, marginTop: 20, alignItems: 'center'}}>
						<QR tam={110} />
						<div style={{fontSize: 15, color: c.tintaSuave, lineHeight: 1.6}}>
							Código QR del equipo
							<br />
							<b style={{color: c.marca}}>Imprimir etiqueta</b>
						</div>
					</div>
				</Tarjeta>
			</div>
		</AppEscritorio>
	);
};

/** Toma 4–5 · Ficha del activo con galería y, al final, el mapa con pines. */
export const PantallaFicha: React.FC<{mapaEn?: number}> = ({mapaEn = 999}) => {
	const f = useCurrentFrame();
	const m = t(f, mapaEn, mapaEn + 14);
	const carrusel = interpolate(f, [20, 60], [0, -236], {...lim, easing: Easing.inOut(Easing.cubic)});
	const datos = [
		['Marca', 'Pentair'],
		['Modelo', 'WhisperFlo 2 HP'],
		['Garantía', 'Vigente · mar 2027'],
		['Ubicación', 'Alberca · Casa de bombas'],
	];
	const pines = [
		{x: 230, y: 210, t: 'AC001', on: true},
		{x: 420, y: 140, t: 'AC004'},
		{x: 560, y: 300, t: 'AC006'},
		{x: 320, y: 380, t: 'AC007'},
		{x: 700, y: 180, t: 'AC008'},
	];
	return (
		<AppEscritorio activo="Activos" titulo="Bomba de filtrado 1">
			<div style={{display: 'flex', gap: 10, marginBottom: 20}}>
				{['Ficha', 'Mapa', 'Documentos', 'Historial'].map((p) => {
					const act = (p === 'Mapa') === f >= mapaEn;
					return (
						<div key={p} style={{padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 16, background: act && (p === 'Ficha' || p === 'Mapa') ? c.marca : '#fff', color: act && (p === 'Ficha' || p === 'Mapa') ? '#fff' : c.tintaSuave, border: `1px solid ${c.borde}`}}>
							{p}
						</div>
					);
				})}
				<div style={{marginLeft: 'auto'}}>
					<FolioMini t="AC001" tam={20} />
				</div>
			</div>
			<div style={{position: 'relative', height: 720}}>
				<div style={{position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, opacity: 1 - m}}>
					<Tarjeta style={{overflow: 'hidden'}}>
						<div style={{fontWeight: 600, marginBottom: 14}}>Galería · 4 fotos</div>
						<div style={{display: 'flex', gap: 16, transform: `translateX(${carrusel}px)`}}>
							<FotoEquipo tipo="bomba" ancho={460} alto={330} />
							<FotoEquipo tipo="reparado" ancho={220} alto={330} />
							<FotoEquipo tipo="fuga" ancho={220} alto={330} />
						</div>
						<div style={{display: 'flex', gap: 8, marginTop: 16}}>
							{[0, 1, 2, 3].map((i) => (
								<div key={i} style={{width: i === (f > 40 ? 1 : 0) ? 28 : 10, height: 10, borderRadius: 5, background: i === (f > 40 ? 1 : 0) ? c.marca : c.borde}} />
							))}
						</div>
					</Tarjeta>
					<Tarjeta>
						<div style={{fontWeight: 600, marginBottom: 12}}>Datos del equipo</div>
						{datos.map(([k, v], i) => (
							<div key={k} style={{display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${c.borde}`, fontSize: 18, opacity: t(f, 4 + i * 4, 14 + i * 4)}}>
								<span style={{color: c.tintaSuave}}>{k}</span>
								<span style={{fontWeight: 600}}>{v}</span>
							</div>
						))}
						<div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 24}}>
							<QR tam={120} />
							<div>
								<div style={{fontSize: 14, color: c.tintaSuave}}>Identificador</div>
								<div style={{fontFamily: mono, fontSize: 34, color: c.marca, fontWeight: 500}}>AC001</div>
							</div>
						</div>
					</Tarjeta>
				</div>
				<Tarjeta style={{position: 'absolute', inset: 0, opacity: m, padding: 0, overflow: 'hidden', background: '#e8eef5'}}>
					<svg width="100%" height="100%" viewBox="0 0 1100 720" preserveAspectRatio="xMidYMid slice">
						<rect width="1100" height="720" fill="#e7eef4" />
						<rect x="120" y="120" width="300" height="200" rx="18" fill="#bfe3f5" stroke="#8cc8e6" strokeWidth="3" />
						<text x="270" y="300" textAnchor="middle" fontFamily={fuente} fontSize="18" fill="#3b6f8f">Alberca</text>
						<rect x="460" y="80" width="200" height="130" rx="14" fill="#dfe6ee" stroke="#c3cedb" strokeWidth="3" />
						<text x="560" y="200" textAnchor="middle" fontFamily={fuente} fontSize="18" fill={c.tintaSuave}>Gimnasio</text>
						<rect x="480" y="250" width="320" height="200" rx="14" fill="#d5ead9" stroke="#a8d1b3" strokeWidth="3" />
						<text x="640" y="440" textAnchor="middle" fontFamily={fuente} fontSize="18" fill="#3f7a52">Canchas</text>
						<rect x="200" y="350" width="220" height="120" rx="14" fill="#efe7dc" stroke="#d9c9b2" strokeWidth="3" />
						<text x="310" y="460" textAnchor="middle" fontFamily={fuente} fontSize="18" fill="#7a6447">Vestidores</text>
						<rect x="640" y="110" width="140" height="110" rx="14" fill="#e6dede" stroke="#cdbcbc" strokeWidth="3" />
						<path d="M0 560 H1100" stroke="#fff" strokeWidth="26" />
						<path d="M900 0 V720" stroke="#fff" strokeWidth="22" />
					</svg>
					{pines.map((p, i) => {
						const v = t(f, mapaEn + 8 + i * 3, mapaEn + 16 + i * 3);
						return (
							<div key={p.t} style={{position: 'absolute', left: p.x * 1.02, top: p.y * 1.0 - 46 * v, opacity: v, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
								<div style={{fontFamily: mono, fontSize: 14, background: p.on ? c.marca : '#fff', color: p.on ? '#fff' : c.marca, padding: '3px 8px', borderRadius: 6, boxShadow: '0 4px 10px rgba(0,0,0,.15)', marginBottom: 4}}>{p.t}</div>
								<svg width="34" height="44" viewBox="0 0 24 32">
									<path d="M12 31s10-11 10-19A10 10 0 0 0 2 12c0 8 10 19 10 19z" fill={p.on ? c.marca : '#5b8fd1'} />
									<circle cx="12" cy="12" r="4" fill="#fff" />
								</svg>
							</div>
						);
					})}
				</Tarjeta>
			</div>
		</AppEscritorio>
	);
};

/** Toma 7 · Incidencia abierta y conversión a OT (responsable individual + fecha). */
export const PantallaIncidenciaOT: React.FC<{convertirEn: number; folioEn: number}> = ({convertirEn, folioEn}) => {
	const f = useCurrentFrame();
	const modal = t(f, convertirEn, convertirEn + 10);
	const resp = t(f, convertirEn + 30, convertirEn + 40);
	const fecha = t(f, convertirEn + 55, convertirEn + 65);
	const creada = t(f, folioEn, folioEn + 10);
	return (
		<AppEscritorio activo="Incidencias" titulo="Incidencia · Fuga en bomba de filtrado">
			<div style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24}}>
				<Tarjeta>
					<div style={{display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14}}>
						<Insignia t="Alta" tam={15} />
						<span style={{color: c.tintaSuave, fontSize: 15}}>Reportada por Ana Torres · hace 2 min</span>
					</div>
					<div style={{fontSize: 26, fontWeight: 700, marginBottom: 8}}>Fuga de agua en bomba de filtrado</div>
					<div style={{fontSize: 17, color: c.tintaSuave, lineHeight: 1.5, marginBottom: 20}}>Se ve agua acumulada debajo de la bomba de la alberca, junto a la conexión de salida.</div>
					<div style={{display: 'flex', gap: 14}}>
						<FotoEquipo tipo="fuga" ancho={300} alto={200} />
						<FotoEquipo tipo="bomba" ancho={200} alto={200} />
					</div>
					<div style={{display: 'flex', gap: 10, marginTop: 20, alignItems: 'center', fontSize: 16}}>
						<Icono n="activo" tam={20} color={c.marca} /> Bomba de filtrado 1 <FolioMini t="AC001" />
					</div>
				</Tarjeta>
				<div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
					<Tarjeta>
						<div style={{fontWeight: 600, marginBottom: 14}}>Acciones</div>
						<div
							style={{
								background: c.marca,
								color: '#fff',
								fontWeight: 600,
								fontSize: 18,
								padding: '16px 20px',
								borderRadius: 10,
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								boxShadow: '0 6px 16px rgba(15,86,179,.28)',
								transform: `scale(${f >= convertirEn - 3 && f < convertirEn + 3 ? 0.96 : 1})`,
							}}
						>
							<Icono n="orden" tam={22} /> Convertir en orden de trabajo
						</div>
					</Tarjeta>
					<Tarjeta style={{opacity: modal, transform: `translateY(${(1 - modal) * 30}px)`, border: `2px solid ${c.marca}`}}>
						<div style={{fontWeight: 700, fontSize: 20, marginBottom: 18}}>Nueva orden de trabajo</div>
						<div style={{fontSize: 14, color: c.tintaSuave, marginBottom: 6}}>Responsable</div>
						<div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${resp ? c.marca : c.borde}`, marginBottom: 16, fontSize: 17}}>
							<div style={{opacity: resp, display: 'flex', alignItems: 'center', gap: 12}}>
								<Avatar ini={PERSONAS.tecnico.ini} color={PERSONAS.tecnico.color} tam={32} /> {PERSONAS.tecnico.nombre} · Técnico
							</div>
						</div>
						<div style={{fontSize: 14, color: c.tintaSuave, marginBottom: 6}}>Fecha programada</div>
						<div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${fecha ? c.marca : c.borde}`, fontSize: 17}}>
							<Icono n="calendario" tam={20} color={c.marca} />
							<span style={{opacity: fecha}}>Hoy · 16 oct 2026 · 12:00</span>
						</div>
						<div style={{marginTop: 20, display: 'flex', alignItems: 'center', gap: 14, opacity: creada, transform: `scale(${0.8 + creada * 0.2})`, transformOrigin: 'left center'}}>
							<Insignia t="Abierta" tam={15} />
							<span style={{fontFamily: mono, fontSize: 30, color: c.marca, fontWeight: 500}}>{OT}</span>
						</div>
					</Tarjeta>
				</div>
			</div>
		</AppEscritorio>
	);
};

/** Toma 10 · Lista de OT finalizadas; el supervisor valida una y pasa a Cerrada. */
export const PantallaValidacion: React.FC<{validarEn: number}> = ({validarEn}) => {
	const f = useCurrentFrame();
	const v = t(f, validarEn, validarEn + 12);
	const filas = [
		{ot: OT, n: 'Fuga en bomba de filtrado', z: 'Alberca', p: PERSONAS.tecnico},
		{ot: 'OT20260002', n: 'Cambio de filtro minisplit', z: 'Gimnasio', p: PERSONAS.tecnico},
		{ot: 'OT20260003', n: 'Revisión luminarias', z: 'Canchas', p: PERSONAS.tecnico},
	];
	return (
		<AppEscritorio activo="Órdenes de trabajo" titulo="Órdenes por validar">
			<Tarjeta style={{padding: 0, overflow: 'hidden'}}>
				<div style={{display: 'grid', gridTemplateColumns: '180px 1fr 160px 220px 180px 170px', padding: '16px 24px', background: c.suave, fontSize: 14, fontWeight: 600, color: c.tintaSuave}}>
					<span>Folio</span>
					<span>Orden</span>
					<span>Zona</span>
					<span>Responsable</span>
					<span>Estado</span>
					<span />
				</div>
				{filas.map((r, i) => {
					const esta = i === 0;
					return (
						<div
							key={r.ot}
							style={{
								display: 'grid',
								gridTemplateColumns: '180px 1fr 160px 220px 180px 170px',
								alignItems: 'center',
								padding: '22px 24px',
								borderTop: `1px solid ${c.borde}`,
								fontSize: 17,
								background: esta ? `rgba(21,128,61,${0.08 * v})` : '#fff',
							}}
						>
							<FolioMini t={r.ot} tam={15} />
							<span style={{fontWeight: 600}}>{r.n}</span>
							<span style={{color: c.tintaSuave}}>{r.z}</span>
							<span style={{display: 'flex', alignItems: 'center', gap: 10}}>
								<Avatar ini={r.p.ini} color={r.p.color} tam={30} /> {r.p.nombre}
							</span>
							<span>{esta && v > 0.5 ? <Insignia t="Cerrada" /> : <Insignia t="Finalizada" />}</span>
							<span>
								{esta && v < 0.5 ? (
									<span style={{display: 'inline-flex', gap: 8}}>
										<span style={{padding: '8px 14px', borderRadius: 8, background: c.cerrada, color: '#fff', fontWeight: 600, fontSize: 15, transform: `scale(${f >= validarEn - 4 && f < validarEn + 2 ? 0.94 : 1})`}}>Validar</span>
										<span style={{padding: '8px 12px', borderRadius: 8, border: `1px solid ${c.borde}`, fontSize: 15, color: c.tintaSuave}}>Rechazar</span>
									</span>
								) : esta ? (
									<span style={{color: c.cerrada, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6}}>
										<Icono n="check" tam={20} /> Validada
									</span>
								) : null}
							</span>
						</div>
					);
				})}
			</Tarjeta>
			<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24}}>
				<Tarjeta>
					<div style={{fontWeight: 600, marginBottom: 12}}>Evidencia · {OT}</div>
					<div style={{display: 'flex', gap: 14}}>
						<FotoEquipo tipo="fuga" ancho={200} alto={140} />
						<FotoEquipo tipo="reparado" ancho={200} alto={140} />
					</div>
				</Tarjeta>
				<Tarjeta>
					<div style={{fontWeight: 600, marginBottom: 12}}>Firma del técnico</div>
					<svg width="320" height="120" viewBox="0 0 320 120">
						<path d="M10 80 C40 20 60 20 70 70 S110 100 130 50 S170 20 190 70 S240 90 260 50 S300 40 310 60" fill="none" stroke={c.marcaFuerte} strokeWidth="4" strokeLinecap="round" />
					</svg>
					<div style={{fontSize: 14, color: c.tintaSuave}}>Carlos Ruiz · 16 oct 2026 · 11:48</div>
				</Tarjeta>
			</div>
		</AppEscritorio>
	);
};

/** Toma 12 · Calendario mensual; se arrastra una OT y se cambia a vista anual. */
export const PantallaCalendario: React.FC<{arrastrarEn: number; anualEn: number}> = ({arrastrarEn, anualEn}) => {
	const f = useCurrentFrame();
	const arr = t(f, arrastrarEn, arrastrarEn + 20);
	const anual = t(f, anualEn, anualEn + 12);
	const eventos: {d: number; t: string; col: string}[] = [
		{d: 2, t: 'Retrolavado filtro', col: c.marca},
		{d: 5, t: 'Revisión caldera', col: c.finalizada},
		{d: 7, t: 'Cloro y pH', col: c.marca},
		{d: 9, t: 'Retrolavado filtro', col: c.marca},
		{d: 12, t: 'Limpieza minisplit', col: c.proceso},
		{d: 14, t: 'Cloro y pH', col: c.marca},
		{d: 16, t: 'Retrolavado filtro', col: c.marca},
		{d: 19, t: 'Luminarias canchas', col: c.cerrada},
		{d: 21, t: 'Cloro y pH', col: c.marca},
		{d: 23, t: 'Retrolavado filtro', col: c.marca},
		{d: 26, t: 'Revisión caldera', col: c.finalizada},
		{d: 28, t: 'Cloro y pH', col: c.marca},
		{d: 30, t: 'Retrolavado filtro', col: c.marca},
	];
	// La celda 1 de octubre 2026 cae en jueves (índice 3, semana inicia lunes).
	const inicio = 3;
	const celda = (d: number) => ({col: (inicio + d - 1) % 7, fil: Math.floor((inicio + d - 1) / 7)});
	const anchoC = 1110 / 7;
	const altoC = 118;
	const origen = celda(12);
	const destino = celda(13);
	return (
		<AppEscritorio activo="Calendario" titulo="Calendario de órdenes">
			<div style={{display: 'flex', gap: 10, marginBottom: 18, alignItems: 'center'}}>
				<div style={{fontSize: 22, fontWeight: 700}}>{anual > 0.5 ? '2026' : 'Octubre 2026'}</div>
				<div style={{marginLeft: 'auto', display: 'flex', background: '#fff', border: `1px solid ${c.borde}`, borderRadius: 10, overflow: 'hidden'}}>
					{['Semana', 'Mes', 'Año'].map((v) => {
						const act = anual > 0.5 ? v === 'Año' : v === 'Mes';
						return (
							<div key={v} style={{padding: '9px 20px', fontWeight: 600, fontSize: 15, background: act ? c.marca : 'transparent', color: act ? '#fff' : c.tintaSuave}}>
								{v}
							</div>
						);
					})}
				</div>
			</div>
			<div style={{position: 'relative', height: 730}}>
				<div style={{position: 'absolute', inset: 0, opacity: 1 - anual, transform: `scale(${1 - anual * 0.08})`}}>
					<div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', fontSize: 14, fontWeight: 600, color: c.tintaSuave, marginBottom: 8}}>
						{['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
							<div key={d} style={{paddingLeft: 10}}>{d}</div>
						))}
					</div>
					<div style={{position: 'relative', width: 1110, height: altoC * 5, background: '#fff', borderRadius: 14, border: `1px solid ${c.borde}`, overflow: 'hidden'}}>
						{Array.from({length: 35}).map((_, i) => {
							const d = i - inicio + 1;
							return (
								<div key={i} style={{position: 'absolute', left: (i % 7) * anchoC, top: Math.floor(i / 7) * altoC, width: anchoC, height: altoC, borderRight: `1px solid ${c.borde}`, borderBottom: `1px solid ${c.borde}`, padding: 8, fontSize: 14, color: d === 16 ? c.marca : c.tintaSuave, fontWeight: d === 16 ? 700 : 400, background: d < 1 || d > 31 ? c.fondoPagina : 'transparent'}}>
									{d >= 1 && d <= 31 ? d : ''}
								</div>
							);
						})}
						{eventos.map((e, i) => {
							const p = celda(e.d);
							const mueve = e.d === 12;
							const x = mueve ? interpolate(arr, [0, 1], [origen.col * anchoC, destino.col * anchoC]) : p.col * anchoC;
							const y = mueve ? interpolate(arr, [0, 1], [origen.fil * altoC, destino.fil * altoC]) : p.fil * altoC;
							const levant = mueve && arr > 0 && arr < 1;
							return (
								<div
									key={i}
									style={{
										position: 'absolute',
										left: x + 8,
										top: y + 36 - (levant ? 6 : 0),
										width: anchoC - 16,
										padding: '7px 9px',
										borderRadius: 8,
										background: e.col,
										color: '#fff',
										fontSize: 13,
										fontWeight: 600,
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										boxShadow: levant ? '0 14px 28px rgba(0,0,0,.25)' : 'none',
										transform: levant ? 'rotate(-2deg) scale(1.06)' : 'none',
										opacity: t(f, i * 1.5, i * 1.5 + 8),
										zIndex: mueve ? 5 : 1,
									}}
								>
									{e.t}
								</div>
							);
						})}
					</div>
				</div>
				<div style={{position: 'absolute', inset: 0, opacity: anual, transform: `scale(${0.92 + anual * 0.08})`, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16}}>
					{['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((m, mi) => (
						<div key={m} style={{background: '#fff', borderRadius: 12, border: `1px solid ${mi === 9 ? c.marca : c.borde}`, padding: 14}}>
							<div style={{fontWeight: 700, marginBottom: 8, color: mi === 9 ? c.marca : c.tinta}}>{m}</div>
							<div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4}}>
								{Array.from({length: 30}).map((_, d) => (
									<div key={d} style={{height: 14, borderRadius: 3, background: d % 7 === 1 || d % 7 === 4 ? (mi >= 9 ? '#7aa6dd' : c.marca) : c.suave}} />
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</AppEscritorio>
	);
};
