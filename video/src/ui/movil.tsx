import React from 'react';
import {interpolate, useCurrentFrame, Easing} from 'remotion';
import {c, fuente, mono} from '../tema';
import {BarraEstado} from '../componentes/base';
import {Avatar, FolioMini, FotoEquipo, Icono, Insignia} from './piezas';
import {OT, PERSONAS} from './datos';

const lim = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const t = (f: number, a: number, b: number) =>
	interpolate(f, [a, b], [0, 1], {...lim, easing: Easing.inOut(Easing.cubic)});

/** Toma 1 · Chat de trabajo ficticio con fotos y mensajes sueltos; scroll de búsqueda. */
export const ChatCaos: React.FC<{velocidad?: number}> = ({velocidad = 1}) => {
	const f = useCurrentFrame();
	const mensajes: {yo?: boolean; t?: string; foto?: 'fuga' | 'bomba' | 'caldera' | 'clima' | 'caminadora'; doc?: string; quien?: string}[] = [
		{quien: 'Jorge mtto', t: '¿Alguien ya revisó la bomba?'},
		{quien: 'Ana recepción', foto: 'fuga'},
		{yo: true, t: 'Creo que sí, el martes'},
		{quien: 'Jorge mtto', t: '¿Cuál martes? 😅'},
		{quien: 'Proveedor alberca', doc: 'reporte_final_v2 (1).xlsx'},
		{quien: 'Ana recepción', t: 'Otra vez gotea'},
		{quien: 'Jorge mtto', foto: 'bomba'},
		{yo: true, t: 'Pásame la foto de cuando quedó'},
		{quien: 'Proveedor alberca', t: 'Te la mandé por el otro chat'},
		{quien: 'Ana recepción', foto: 'caldera'},
		{quien: 'Jorge mtto', t: '¿Dónde quedó la firma?'},
		{yo: true, t: 'Espérame, está en el chat…'},
		{quien: 'Ana recepción', foto: 'clima'},
		{quien: 'Jorge mtto', t: 'No la encuentro'},
	];
	// Scroll hacia arriba con tirones, como buscando.
	const scroll = interpolate(f * velocidad, [0, 40, 55, 100, 115, 170, 210], [0, 520, 470, 1150, 1080, 1700, 1760], {...lim, easing: Easing.out(Easing.cubic)});
	return (
		<div style={{width: 390, height: 844, background: '#efe7de', fontFamily: fuente, position: 'relative', overflow: 'hidden'}}>
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, background: '#075e54', color: '#fff'}}>
				<BarraEstado oscura />
				<div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '6px 16px 14px'}}>
					<div style={{width: 40, height: 40, borderRadius: '50%', background: '#cfd8dc', display: 'grid', placeItems: 'center', color: '#075e54', fontWeight: 700}}>MT</div>
					<div>
						<div style={{fontWeight: 600, fontSize: 17}}>Mantenimiento Club 🔧</div>
						<div style={{fontSize: 13, opacity: 0.8}}>Jorge, Ana, Proveedor alberca, tú</div>
					</div>
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 70,
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
					padding: '0 12px',
					transform: `translateY(${scroll}px)`,
				}}
			>
				{[...mensajes, ...mensajes].map((m, i) => (
					<div
						key={i}
						style={{
							alignSelf: m.yo ? 'flex-end' : 'flex-start',
							maxWidth: 270,
							background: m.yo ? '#d9fdd3' : '#fff',
							borderRadius: 12,
							padding: m.foto ? 5 : '8px 12px',
							boxShadow: '0 1px 1px rgba(0,0,0,.12)',
							fontSize: 16,
							color: c.tinta,
						}}
					>
						{!m.yo && m.quien && <div style={{fontSize: 13, fontWeight: 600, color: ['#1f7a8c', '#a96200', '#7b2cbf'][i % 3], padding: m.foto ? '3px 7px 5px' : 0}}>{m.quien}</div>}
						{m.foto && <FotoEquipo tipo={m.foto} ancho={240} alto={170} radio={9} />}
						{m.doc && (
							<div style={{display: 'flex', alignItems: 'center', gap: 10, background: '#f0f2f5', borderRadius: 8, padding: 10, fontSize: 14}}>
								<div style={{width: 34, height: 40, background: '#1d6f42', borderRadius: 4, color: '#fff', fontSize: 11, display: 'grid', placeItems: 'center', fontWeight: 700}}>XLS</div>
								{m.doc}
							</div>
						)}
						{m.t}
						<div style={{fontSize: 11, color: '#667781', textAlign: 'right', marginTop: 2}}>{`${9 + (i % 9)}:${(i * 7) % 60 < 10 ? '0' : ''}${(i * 7) % 60}`}</div>
					</div>
				))}
			</div>
			<div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, background: '#f0f2f5', display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', zIndex: 10}}>
				<div style={{flex: 1, height: 44, borderRadius: 22, background: '#fff', color: '#8696a0', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 16}}>Mensaje</div>
				<div style={{width: 44, height: 44, borderRadius: '50%', background: '#00a884'}} />
			</div>
		</div>
	);
};

const CabeceraApp: React.FC<{titulo: string; sub?: string}> = ({titulo, sub}) => (
	<div style={{background: c.oscuro, color: '#fff', paddingBottom: 16}}>
		<BarraEstado oscura />
		<div style={{padding: '4px 22px 0'}}>
			<div style={{fontSize: 13, color: c.acento, fontWeight: 600, letterSpacing: '.06em'}}>GC GMAO</div>
			<div style={{fontSize: 22, fontWeight: 700}}>{titulo}</div>
			{sub && <div style={{fontSize: 14, color: c.tintaInversaSuave, marginTop: 2}}>{sub}</div>}
		</div>
	</div>
);

const Campo: React.FC<{etiqueta: string; children: React.ReactNode; activo?: boolean}> = ({etiqueta, children, activo}) => (
	<div style={{marginBottom: 14}}>
		<div style={{fontSize: 13, color: c.tintaSuave, marginBottom: 5, fontWeight: 500}}>{etiqueta}</div>
		<div style={{minHeight: 48, borderRadius: 12, border: `1.5px solid ${activo ? c.marca : c.borde}`, background: '#fff', display: 'flex', alignItems: 'center', padding: '10px 14px', fontSize: 16, gap: 10}}>{children}</div>
	</div>
);

const Escribir: React.FC<{texto: string; desde: number; cps?: number}> = ({texto, desde, cps = 1.4}) => {
	const f = useCurrentFrame();
	const n = Math.max(0, Math.min(texto.length, Math.floor((f - desde) * cps)));
	const cursor = f >= desde && n < texto.length && Math.floor(f / 8) % 2 === 0;
	return (
		<span>
			{texto.slice(0, n)}
			{cursor && <span style={{color: c.marca}}>|</span>}
		</span>
	);
};

/** Toma 6 · Alta de incidencia en la alberca: prioridad alta, foto, guardar. */
export const IncidenciaMovil: React.FC<{prioridadEn: number; fotoEn: number; guardarEn: number}> = ({prioridadEn, fotoEn, guardarEn}) => {
	const f = useCurrentFrame();
	const foto = t(f, fotoEn, fotoEn + 10);
	const ok = t(f, guardarEn + 4, guardarEn + 14);
	return (
		<div style={{width: 390, height: 844, background: c.fondoPagina, fontFamily: fuente, position: 'relative'}}>
			<CabeceraApp titulo="Reportar incidencia" sub="Sede Las Palmas" />
			<div style={{padding: '18px 18px'}}>
				<Campo etiqueta="Ubicación" activo>
					<Icono n="ubicacion" tam={18} color={c.marca} /> Alberca <FolioMini t="ZN001" tam={13} />
				</Campo>
				<Campo etiqueta="¿Qué pasa?" activo={f > 5 && f < prioridadEn}>
					<Escribir texto="Fuga de agua en la bomba de filtrado" desde={6} />
				</Campo>
				<div style={{fontSize: 13, color: c.tintaSuave, marginBottom: 6, fontWeight: 500}}>Prioridad</div>
				<div style={{display: 'flex', gap: 8, marginBottom: 16}}>
					{['Baja', 'Media', 'Alta', 'Urgente'].map((p) => {
						const sel = p === 'Alta' && f >= prioridadEn;
						return (
							<div key={p} style={{flex: 1, textAlign: 'center', padding: '11px 0', borderRadius: 10, fontSize: 14, fontWeight: 600, border: `1.5px solid ${sel ? c.alerta : c.borde}`, background: sel ? '#fdf3e3' : '#fff', color: sel ? c.alerta : c.tintaSuave, transform: `scale(${sel && f < prioridadEn + 5 ? 1.08 : 1})`}}>
								{p}
							</div>
						);
					})}
				</div>
				<div style={{fontSize: 13, color: c.tintaSuave, marginBottom: 6, fontWeight: 500}}>Evidencia (JPG o PNG)</div>
				<div style={{display: 'flex', gap: 10}}>
					<div style={{width: 110, height: 110, borderRadius: 12, border: `2px dashed ${c.bordeFuerte}`, display: 'grid', placeItems: 'center', color: c.marca}}>
						<Icono n="camara" tam={30} />
					</div>
					<div style={{opacity: foto, transform: `scale(${0.6 + foto * 0.4})`}}>
						<FotoEquipo tipo="fuga" ancho={170} alto={110} />
					</div>
				</div>
				<div style={{marginTop: 26, background: c.marca, color: '#fff', textAlign: 'center', padding: '16px 0', borderRadius: 12, fontWeight: 600, fontSize: 17, boxShadow: '0 6px 16px rgba(15,86,179,.28)', transform: `scale(${f >= guardarEn - 3 && f < guardarEn + 3 ? 0.95 : 1})`}}>
					Enviar reporte
				</div>
			</div>
			<div style={{position: 'absolute', left: 18, right: 18, bottom: 40, background: c.cerrada, color: '#fff', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, opacity: ok, transform: `translateY(${(1 - ok) * 40}px)`}}>
				<Icono n="check" tam={22} /> Incidencia enviada al supervisor
			</div>
		</div>
	);
};

/** Tomas 8–9 · El técnico ejecuta la OT: tareas, lectura, foto de solución, firma, finalizar. */
export const EjecucionOT: React.FC<{tareasEn: number; lecturaEn: number; fotoEn: number; firmaEn: number; finalizarEn: number}> = ({
	tareasEn,
	lecturaEn,
	fotoEn,
	firmaEn,
	finalizarEn,
}) => {
	const f = useCurrentFrame();
	const tareas = ['Cerrar válvulas de paso', 'Cambiar empaque de salida', 'Probar sin fugas 10 min'];
	const desplaz = interpolate(f, [fotoEn - 10, fotoEn + 5], [0, -300], {...lim, easing: Easing.inOut(Easing.cubic)});
	const foto = t(f, fotoEn, fotoEn + 10);
	const firma = t(f, firmaEn, firmaEn + 30);
	const fin = t(f, finalizarEn + 3, finalizarEn + 13);
	return (
		<div style={{width: 390, height: 844, background: c.fondoPagina, fontFamily: fuente, position: 'relative', overflow: 'hidden'}}>
			<div style={{position: 'relative', zIndex: 5}}>
				<CabeceraApp titulo="Fuga en bomba de filtrado" sub={`${OT} · Alberca`} />
			</div>
			<div style={{padding: 18, transform: `translateY(${desplaz}px)`}}>
				<div style={{display: 'flex', gap: 8, marginBottom: 14}}>
					<Insignia t={fin > 0.5 ? 'Finalizada' : 'En proceso'} />
					<Insignia t="Alta" />
				</div>
				<div style={{background: '#fff', borderRadius: 14, border: `1px solid ${c.borde}`, padding: 14, marginBottom: 14}}>
					<div style={{fontWeight: 600, marginBottom: 8}}>Tareas</div>
					{tareas.map((ta, i) => {
						const ok = f >= tareasEn + i * 12;
						return (
							<div key={ta} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', fontSize: 15, color: ok ? c.tintaSuave : c.tinta, textDecoration: ok ? 'line-through' : 'none'}}>
								<div style={{width: 26, height: 26, borderRadius: 7, border: `2px solid ${ok ? c.cerrada : c.bordeFuerte}`, background: ok ? c.cerrada : '#fff', display: 'grid', placeItems: 'center', color: '#fff'}}>
									{ok && <Icono n="check" tam={18} grosor={3} />}
								</div>
								{ta}
							</div>
						);
					})}
				</div>
				<div style={{background: '#fff', borderRadius: 14, border: `1px solid ${f >= lecturaEn && f < fotoEn ? c.marca : c.borde}`, padding: 14, marginBottom: 14}}>
					<div style={{fontWeight: 600, marginBottom: 2}}>Registro · Presión de salida</div>
					<div style={{fontSize: 13, color: c.tintaSuave, marginBottom: 10}}>Rango esperado 1.2 – 1.8 kg/cm²</div>
					<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
						<div style={{flex: 1, height: 46, borderRadius: 10, border: `1.5px solid ${c.borde}`, display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: mono, fontSize: 20}}>
							<Escribir texto="1.5" desde={lecturaEn} cps={0.4} />
						</div>
						<span style={{fontSize: 14, color: c.tintaSuave}}>kg/cm²</span>
						{f > lecturaEn + 10 && <Icono n="check" tam={24} color={c.cerrada} grosor={3} />}
					</div>
				</div>
				<div style={{background: '#fff', borderRadius: 14, border: `1px solid ${c.borde}`, padding: 14, marginBottom: 14}}>
					<div style={{fontWeight: 600, marginBottom: 10}}>Foto de solución</div>
					<div style={{display: 'flex', gap: 10}}>
						<FotoEquipo tipo="fuga" ancho={150} alto={110} />
						<div style={{opacity: foto, transform: `scale(${0.6 + foto * 0.4})`}}>
							<FotoEquipo tipo="reparado" ancho={150} alto={110} />
						</div>
					</div>
					<div style={{display: 'flex', gap: 10, marginTop: 6, fontSize: 12, color: c.tintaSuave}}>
						<span style={{width: 150}}>Antes</span>
						<span>Después</span>
					</div>
				</div>
				<div style={{background: '#fff', borderRadius: 14, border: `1px solid ${f >= firmaEn ? c.marca : c.borde}`, padding: 14, marginBottom: 14}}>
					<div style={{fontWeight: 600, marginBottom: 6}}>Firma del técnico</div>
					<svg width="320" height="100" viewBox="0 0 320 100">
						<path
							d="M10 70 C40 10 60 10 70 60 S110 90 130 40 S170 10 190 60 S240 80 260 40 S300 30 310 50"
							fill="none"
							stroke={c.marcaFuerte}
							strokeWidth="4"
							strokeLinecap="round"
							strokeDasharray="900"
							strokeDashoffset={900 * (1 - firma)}
						/>
						<line x1="10" y1="92" x2="310" y2="92" stroke={c.borde} strokeWidth="2" />
					</svg>
				</div>
				<div style={{background: c.marca, color: '#fff', textAlign: 'center', padding: '15px 0', borderRadius: 12, fontWeight: 600, fontSize: 17, transform: `scale(${f >= finalizarEn - 3 && f < finalizarEn + 3 ? 0.95 : 1})`}}>
					Finalizar orden
				</div>
			</div>
			<div style={{position: 'absolute', left: 18, right: 18, bottom: 40, background: c.finalizada, color: '#fff', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, fontSize: 15, opacity: fin, transform: `translateY(${(1 - fin) * 40}px)`, zIndex: 6}}>
				<Icono n="check" tam={22} /> Enviada a validación del supervisor
			</div>
		</div>
	);
};

/** OT cerrada abierta desde el celular: foto de solución y firma (reel 0:07). */
export const OTCerradaMovil: React.FC = () => (
	<div style={{width: 390, height: 844, background: c.fondoPagina, fontFamily: fuente}}>
		<CabeceraApp titulo="Fuga en bomba de filtrado" sub={`${OT} · Alberca`} />
		<div style={{padding: 18}}>
			<div style={{display: 'flex', gap: 8, marginBottom: 14}}>
				<Insignia t="Cerrada" />
				<span style={{fontSize: 13, color: c.tintaSuave, alignSelf: 'center'}}>Validada por Laura Méndez</span>
			</div>
			<div style={{background: '#fff', borderRadius: 14, border: `1px solid ${c.borde}`, padding: 14, marginBottom: 14}}>
				<div style={{fontWeight: 600, marginBottom: 10}}>Foto de solución</div>
				<FotoEquipo tipo="reparado" ancho={322} alto={210} />
			</div>
			<div style={{background: '#fff', borderRadius: 14, border: `1px solid ${c.borde}`, padding: 14}}>
				<div style={{fontWeight: 600, marginBottom: 6}}>Firma del técnico</div>
				<svg width="320" height="90" viewBox="0 0 320 100">
					<path d="M10 70 C40 10 60 10 70 60 S110 90 130 40 S170 10 190 60 S240 80 260 40 S300 30 310 50" fill="none" stroke={c.marcaFuerte} strokeWidth="4" strokeLinecap="round" />
				</svg>
				<div style={{fontSize: 13, color: c.tintaSuave}}>Carlos Ruiz · 16 oct 2026 · 11:48</div>
			</div>
		</div>
	</div>
);

/** Toma 14 · Pantalla bloqueada con la notificación de WhatsApp de la asignación. */
export const NotificacionWA: React.FC<{llegaEn?: number}> = ({llegaEn = 10}) => {
	const f = useCurrentFrame();
	const v = t(f, llegaEn, llegaEn + 10);
	return (
		<div style={{width: 390, height: 844, background: 'linear-gradient(170deg, #0f3f86, #001b44 70%)', fontFamily: fuente, position: 'relative', color: '#fff'}}>
			<BarraEstado oscura />
			<div style={{textAlign: 'center', marginTop: 50}}>
				<div style={{fontSize: 18, opacity: 0.85}}>viernes, 16 de octubre</div>
				<div style={{fontSize: 92, fontWeight: 300, lineHeight: 1.1}}>9:41</div>
			</div>
			<div
				style={{
					margin: '40px 14px 0',
					background: 'rgba(255,255,255,.92)',
					color: c.tinta,
					borderRadius: 22,
					padding: 16,
					transform: `translateY(${(1 - v) * -80}px) scale(${0.9 + v * 0.1})`,
					opacity: v,
					boxShadow: '0 20px 40px rgba(0,0,0,.3)',
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: c.tintaSuave, marginBottom: 6}}>
					<div style={{width: 22, height: 22, borderRadius: 6, background: c.whatsapp}} />
					WHATSAPP · ahora
				</div>
				<div style={{fontWeight: 700, fontSize: 16}}>GC GMAO</div>
				<div style={{fontSize: 15, lineHeight: 1.4}}>
					Carlos, se te asignó la orden <b style={{fontFamily: mono}}>{OT}</b>: Fuga en bomba de filtrado · Alberca · Hoy 12:00
				</div>
			</div>
			<div style={{position: 'absolute', bottom: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center', fontSize: 14, opacity: 0.8}}>
				<Avatar ini={PERSONAS.tecnico.ini} color={PERSONAS.tecnico.color} tam={26} /> Celular de Carlos · técnico
			</div>
		</div>
	);
};
