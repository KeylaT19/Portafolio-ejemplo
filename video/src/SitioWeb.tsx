import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, Easing} from 'remotion';
import {c, fuente, s} from './tema';
import {Barrido, Celular, Cursor, Escena, EtiquetaPaso, Folio, Fondo, Laptop, Logo, TextoCinetico, useEntrada, useTramo} from './componentes/base';
import {ChatCaos} from './ui/movil';
import {ClipFondo, MonitorVerde, PantallaReal, Ventana} from './componentes/clips';

/*
 * Video del sitio (guion A, 1:45). Sin voz: música y textos.
 * Toda pantalla del sistema que aparece es una grabación o captura real (public/sistema/).
 * Lo único dibujado es el chat de WhatsApp del inicio, que no es parte del sistema.
 */

export type PropsSitio = {
	/** Pista dentro de public/audio/. Vacío = sin audio. */
	musica?: string;
	/** Segundo de la pista en que arranca el video (alinea el remate final con el cierre). */
	inicioMusica?: number;
};

type Plano = {id: string; dur: number; Contenido: React.FC};

// Fuentes reales: grabaciones sin la barra del navegador (1376×606) y capturas.
const G1 = {src: 'sistema/g1.mp4', ancho: 1376, alto: 606, video: true}; // instalaciones → detalle
const G2 = {src: 'sistema/g2.mp4', ancho: 1376, alto: 606, video: true}; // dashboard
const INCIDENCIAS = {src: 'sistema/incidencias.png', ancho: 1156, alto: 584};
const NUEVA_OT = {src: 'sistema/nueva-ot.png', ancho: 1211, alto: 578};
const UBICACION = {src: 'sistema/ubicacion.png', ancho: 1052, alto: 549};
const CALENDARIO = {src: 'sistema/calendario.png', ancho: 1147, alto: 578};
const OT_MOVIL = {src: 'sistema/ot-movil.png', ancho: 490, alto: 591};

// ───────────────────────── Piezas de composición ─────────────────────────

const DisenoPaso: React.FC<{
	numero?: number;
	etiqueta: string;
	titular: string;
	resaltar?: string[];
	bajada?: string;
	children: React.ReactNode;
	lado?: 'izq' | 'der';
	extra?: React.ReactNode;
}> = ({numero, etiqueta, titular, resaltar, bajada, children, lado = 'izq', extra}) => {
	const v = useEntrada(4, {damping: 15, mass: 0.9});
	const texto = (
		<div style={{width: 540, flexShrink: 0}}>
			<EtiquetaPaso numero={numero} texto={etiqueta} />
			<div style={{height: 30}} />
			<TextoCinetico texto={titular} tam={66} resaltar={resaltar} retraso={8} />
			{bajada && (
				<>
					<div style={{height: 24}} />
					<TextoCinetico texto={bajada} tam={30} peso={400} color={c.tintaInversaSuave} retraso={24} paso={1} />
				</>
			)}
			{extra && <div style={{marginTop: 36}}>{extra}</div>}
		</div>
	);
	const disp = <div style={{transform: `translateX(${(1 - v) * (lado === 'izq' ? 300 : -300)}px)`, opacity: v}}>{children}</div>;
	return (
		<Fondo>
			<AbsoluteFill style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 70, padding: '0 70px'}}>
				{lado === 'izq' ? (
					<>
						{texto}
						{disp}
					</>
				) : (
					<>
						{disp}
						{texto}
					</>
				)}
			</AbsoluteFill>
		</Fondo>
	);
};

/** Texto sobre clip: etiqueta + titular en el tercio inferior izquierdo. */
const TextoSobreClip: React.FC<{etiqueta?: string; titular: string; resaltar?: string[]; retraso?: number; tam?: number}> = ({
	etiqueta,
	titular,
	resaltar,
	retraso = 6,
	tam = 76,
}) => (
	<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 110px 110px'}}>
		<AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(0,20,52,.88) 0%, rgba(0,20,52,.45) 38%, transparent 62%)'}} />
		<div style={{position: 'relative'}}>
			{etiqueta && (
				<>
					<EtiquetaPaso texto={etiqueta} retraso={retraso} />
					<div style={{height: 26}} />
				</>
			)}
			<TextoCinetico texto={titular} tam={tam} resaltar={resaltar} retraso={retraso + 6} ancho={1500} />
		</div>
	</AbsoluteFill>
);

/** Partes consecutivas dentro de un plano, con barrido entre ellas. */
const Tramos: React.FC<{partes: {seg: number; el: React.ReactNode}[]}> = ({partes}) => {
	let desde = 0;
	return (
		<AbsoluteFill>
			{partes.map((p, i) => {
				const ini = desde;
				const dur = s(p.seg);
				desde += dur;
				return (
					<React.Fragment key={i}>
						<Sequence from={ini} durationInFrames={dur}>
							{p.el}
						</Sequence>
						{i > 0 && <Barrido en={ini} />}
					</React.Fragment>
				);
			})}
		</AbsoluteFill>
	);
};

const Clip: React.FC<{archivo: string; desde: number; etiqueta?: string; titular: string; resaltar?: string[]}> = ({archivo, desde, ...t}) => (
	<ClipFondo archivo={archivo} desde={desde} empuje={0.1}>
		<TextoSobreClip {...t} />
	</ClipFondo>
);

/** Monitor con pantalla verde (toma de Envato) + texto inferior. */
const PlanoMonitor: React.FC<{desde: number; titular: string; resaltar: string[]; etiqueta?: string; logo?: boolean; children: React.ReactNode}> = ({
	desde,
	titular,
	resaltar,
	etiqueta,
	logo,
	children,
}) => {
	const v = useEntrada(18, {damping: 14, mass: 0.7});
	return (
		<AbsoluteFill>
			<MonitorVerde desde={desde}>{children}</MonitorVerde>
			<AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(0,20,52,.92) 0%, rgba(0,20,52,.5) 22%, transparent 40%)'}} />
			<div style={{position: 'absolute', left: 110, bottom: 80, display: 'flex', alignItems: 'center', gap: 36}}>
				{logo && (
					<div style={{opacity: v, transform: `scale(${0.7 + v * 0.3})`, background: 'rgba(255,255,255,.96)', borderRadius: 18, padding: '10px 22px'}}>
						<Logo ancho={230} variante="color" />
					</div>
				)}
				<div>
					{etiqueta && (
						<>
							<EtiquetaPaso texto={etiqueta} retraso={10} />
							<div style={{height: 18}} />
						</>
					)}
					<TextoCinetico texto={titular} tam={64} resaltar={resaltar} retraso={22} ancho={1300} />
				</div>
			</div>
		</AbsoluteFill>
	);
};

/** Vista móvil real (captura) en un marco de celular con la proporción de la captura. */
const MovilReal: React.FC<{src: string; ancho: number; alto: number; escala: number; rot?: number; recorrido?: number}> = ({src, ancho, alto, escala, rot = 0, recorrido = 0}) => {
	const f = useCurrentFrame();
	const v = useEntrada(0, {damping: 14, mass: 0.8});
	const sube = interpolate(f, [20, 150], [0, recorrido], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
	return (
		<div
			style={{
				padding: 16,
				borderRadius: 54,
				background: 'linear-gradient(145deg, #1f2937, #0b1220)',
				boxShadow: '0 50px 100px rgba(0,10,30,.6), 0 0 0 2px rgba(255,255,255,.12) inset',
				transform: `rotate(${rot}deg) translateY(${(1 - v) * 200}px)`,
				opacity: v,
			}}
		>
			<div style={{width: ancho * escala, height: alto * escala, borderRadius: 40, overflow: 'hidden', background: '#fff'}}>
				<Img src={staticFile(src)} style={{width: ancho * escala, height: alto * escala, transform: `translateY(${-sube}px)`}} />
			</div>
		</div>
	);
};

const v = (f: number, x: number, y: number, w: number): Ventana => ({f, x, y, w});

// ───────────────────────── Planos ─────────────────────────

const ChatPlano: React.FC = () => {
	const sacude = Math.sin(useCurrentFrame() * 1.3) * 1.2;
	return (
		<Fondo variante="cierre">
			<AbsoluteFill style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 150px', gap: 120}}>
				<div style={{transform: `rotate(${sacude - 4}deg)`}}>
					<Celular escala={0.98}>
						<ChatCaos />
					</Celular>
				</div>
				<div style={{flex: 1}}>
					<EtiquetaPaso texto="El problema" />
					<div style={{height: 34}} />
					<TextoCinetico texto="¿Dónde está la evidencia?" tam={104} resaltar={['evidencia']} retraso={6} ancho={900} />
				</div>
			</AbsoluteFill>
		</Fondo>
	);
};

const P1Caos: React.FC = () => (
	<Tramos
		partes={[
			{seg: 3, el: <Clip archivo="manos-laptop-celular.mp4" desde={0.5} titular="Fotos sueltas. Chats. Un Excel." resaltar={['Excel']} />},
			{seg: 4, el: <ChatPlano />},
		]}
	/>
);

const P2Reveal: React.FC = () => (
	<PlanoMonitor desde={0} titular="Todo tu mantenimiento en un solo lugar." resaltar={['solo', 'lugar']} logo>
		<PantallaReal {...G2} desde={0.3} ventanas={[v(0, 0, 0, 970), v(70, 0, 0, 970), v(150, 406, 0, 970)]} />
	</PlanoMonitor>
);

const P3Organiza: React.FC = () => (
	<DisenoPaso numero={1} etiqueta="Paso 1 — Organiza" titular="Tus instalaciones, zonas y activos." resaltar={['zonas', 'activos']} bajada="Cada uno con su historial de incidencias y órdenes.">
		<Laptop ancho={1180} rotY={-8}>
			<Tramos
				partes={[
					{seg: 6.8, el: <PantallaReal {...G1} desde={0.5} ventanas={[v(0, 0, 0, 970), v(204, 406, 0, 970)]} />},
					{seg: 5.2, el: <PantallaReal {...G1} desde={17.2} ventanas={[v(0, 120, 0, 970), v(156, 300, 0, 970)]} />},
				]}
			/>
		</Laptop>
	</DisenoPaso>
);

const P4Detalle: React.FC = () => (
	<DisenoPaso
		lado="der"
		etiqueta="Todo con folio"
		titular="Zonas, activos, registros y archivos en un clic."
		resaltar={['clic']}
		extra={
			<Sequence from={s(3)} layout="none">
				<Folio texto="UB001 · AC007 · QR" tam={40} />
			</Sequence>
		}
	>
		<Laptop ancho={1180} rotY={8}>
			<Tramos
				partes={[
					{seg: 2.4, el: <PantallaReal {...G1} desde={22.4} ventanas={[v(0, 200, 0, 970)]} />},
					{seg: 5.6, el: <PantallaReal {...UBICACION} ventanas={[v(0, 0, 0, 878), v(168, 120, 0, 878)]} />},
				]}
			/>
		</Laptop>
	</DisenoPaso>
);

const P5Reporta: React.FC = () => (
	<Tramos
		partes={[
			{seg: 3.5, el: <Clip archivo="tecnico-alberca.mp4" desde={0.3} etiqueta="Paso 2 — Reporta" titular="¿Una falla en la alberca?" resaltar={['alberca']} />},
			{
				seg: 8.5,
				el: (
					<DisenoPaso numero={2} etiqueta="Paso 2 — Reporta" titular="Cada falla queda reportada." resaltar={['reportada']} bajada="Pendientes, abiertas y cerradas, con su importancia.">
						<Laptop ancho={1180} rotY={-8}>
							<PantallaReal {...INCIDENCIAS} ventanas={[v(0, 0, 0, 934), v(240, 222, 0, 934)]}>
								<Cursor
									puntos={[
										{f: 0, x: 900, y: 700},
										{f: 60, x: 250, y: 270, clic: true},
										{f: 120, x: 600, y: 470},
										{f: 200, x: 1180, y: 520},
									]}
								/>
							</PantallaReal>
						</Laptop>
					</DisenoPaso>
				),
			},
		]}
	/>
);

const P6Orden: React.FC = () => (
	<DisenoPaso
		lado="der"
		etiqueta="Del reporte a la orden"
		titular="Se vuelve orden de trabajo, con su ubicación."
		resaltar={['orden']}
		bajada="Instalación, zona o activo: tú eliges el destino."
		extra={
			<Sequence from={s(6)} layout="none">
				<Folio texto="Nace con folio" tam={44} />
			</Sequence>
		}
	>
		<Laptop ancho={1180} rotY={8}>
			<PantallaReal {...NUEVA_OT} ventanas={[v(0, 60, 0, 1000), v(150, 143, 0, 925)]}>
				<Cursor
					puntos={[
						{f: 0, x: 1200, y: 800},
						{f: 50, x: 716, y: 439, clic: true},
						{f: 120, x: 600, y: 560},
						{f: 200, x: 778, y: 713, clic: true},
						{f: 300, x: 1000, y: 820},
					]}
				/>
			</PantallaReal>
		</Laptop>
	</DisenoPaso>
);

const P7Campo: React.FC = () => (
	<Tramos
		partes={[
			{seg: 4, el: <Clip archivo="tecnico-celular.mov" desde={1} etiqueta="En campo" titular="El técnico ve sus órdenes en el celular." resaltar={['celular']} />},
			{
				seg: 6,
				el: (
					<DisenoPaso numero={undefined} etiqueta="Desde el celular" titular="Inicia, pausa y finaliza cada orden." resaltar={['finaliza']} bajada="Sin papeles ni chats de por medio.">
						<MovilReal {...OT_MOVIL} escala={1.32} rot={-3} />
					</DisenoPaso>
				),
			},
			{seg: 4, el: <Clip archivo="tecnico-laptop-planta.mp4" desde={3} titular="En la alberca, en planta o en oficina." resaltar={['oficina']} />},
		]}
	/>
);

const P8Seguimiento: React.FC = () => (
	<PlanoMonitor desde={5} etiqueta="Seguimiento" titular="Cada orden, su estado y quién la atiende." resaltar={['estado']}>
		<PantallaReal {...G2} desde={10.5} velocidad={0.75} ventanas={[v(0, 0, 0, 970), v(240, 300, 0, 970)]} />
	</PlanoMonitor>
);

const P9Programa: React.FC = () => (
	<DisenoPaso numero={3} etiqueta="Paso 3 — Programa" titular="Lo que se repite, se programa." resaltar={['programa']} bajada="Vista por semana, mes, trimestre, semestre o año.">
		<Laptop ancho={1180} rotY={-8}>
			<PantallaReal {...CALENDARIO} ventanas={[v(0, 0, 0, 925), v(150, 222, 0, 925), v(300, 222, 0, 700)]}>
				<Cursor
					puntos={[
						{f: 0, x: 900, y: 750},
						{f: 90, x: 780, y: 220},
						{f: 200, x: 1150, y: 230},
						{f: 300, x: 1000, y: 500},
					]}
				/>
			</PantallaReal>
		</Laptop>
	</DisenoPaso>
);

const P10WhatsApp: React.FC = () => (
	<Tramos
		partes={[
			{seg: 3, el: <Clip archivo="manos-laptop-celular.mp4" desde={3.2} titular="Tu equipo sigue en WhatsApp." resaltar={['WhatsApp']} />},
			{
				seg: 5,
				el: (
					<DisenoPaso lado="der" etiqueta="WhatsApp sí. Caos no." titular="El historial vive aquí." resaltar={['historial']} bajada="Indicadores, gráficas y registros al día.">
						<Laptop ancho={1180} rotY={8}>
							<PantallaReal {...G2} desde={6.5} ventanas={[v(0, 200, 0, 970)]} />
						</Laptop>
					</DisenoPaso>
				),
			},
		]}
	/>
);

const Montaje: React.FC = () => {
	const tomas = [
		{a: 'tecnico-alberca.mp4', d: 4},
		{a: 'tecnico-laptop-planta.mp4', d: 6},
		{a: 'tecnico-celular.mov', d: 5},
	];
	const parte = s(0.9);
	return (
		<AbsoluteFill>
			{tomas.map((t, i) => (
				<Sequence key={t.a} from={i * parte} durationInFrames={parte}>
					<ClipFondo archivo={t.a} desde={t.d} empuje={0.15} />
				</Sequence>
			))}
			<AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,20,52,.78) 0%, rgba(0,20,52,.55) 60%, rgba(0,20,52,.35) 100%)'}} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<TextoCinetico texto="Tu equipo. Tus activos. Con evidencia." tam={88} resaltar={['evidencia']} alinear="center" retraso={2} paso={4} ancho={1500} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const PlanoLogo: React.FC = () => {
	const f = useCurrentFrame();
	const logo = useEntrada(0, {damping: 12, mass: 0.8});
	const boton = useEntrada(40, {damping: 10, mass: 0.7});
	const pulso = 1 + Math.max(0, Math.sin((f - 60) / 9)) * 0.04 * (f > 60 ? 1 : 0);
	const brillo = interpolate((f - 70) % 70, [0, 30], [-30, 130], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
	const fsg = useTramo(90, 110);
	return (
		<Fondo variante="cierre">
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
				<div style={{transform: `scale(${0.6 + logo * 0.4})`, opacity: logo}}>
					<Logo ancho={560} variante="claro" />
				</div>
				<div style={{height: 30}} />
				<TextoCinetico texto="Ordena el mantenimiento de tu club." tam={72} resaltar={['mantenimiento']} alinear="center" retraso={14} ancho={1400} />
				<div style={{height: 54}} />
				<div
					style={{
						transform: `scale(${boton * pulso})`,
						opacity: boton,
						position: 'relative',
						overflow: 'hidden',
						background: c.marca,
						color: '#fff',
						fontFamily: fuente,
						fontWeight: 700,
						fontSize: 42,
						padding: '26px 64px',
						borderRadius: 16,
						boxShadow: `0 0 0 6px rgba(56,189,248,.25), 0 24px 48px rgba(0,27,68,.45)`,
						display: 'flex',
						alignItems: 'center',
						gap: 20,
					}}
				>
					Elegir plan y activar cuenta
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
						<path d="M5 12h14M13 6l6 6-6 6" />
					</svg>
					<div style={{position: 'absolute', top: 0, bottom: 0, width: 120, left: `${brillo}%`, background: 'linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent)', transform: 'skewX(-20deg)'}} />
				</div>
			</AbsoluteFill>
			<div style={{position: 'absolute', bottom: 50, right: 70, opacity: fsg, display: 'flex', alignItems: 'center', gap: 16, color: c.tintaInversaSuave, fontFamily: fuente, fontSize: 18}}>
				Un producto de
				<Img src={staticFile('marca/fsg-logo-blanco.png')} style={{height: 40}} />
			</div>
		</Fondo>
	);
};


const P11Cierre: React.FC = () => <Tramos partes={[{seg: 2.7, el: <Montaje />}, {seg: 6.3, el: <PlanoLogo />}]} />;

export const PLANOS: Plano[] = [
	{id: 'caos', dur: 7, Contenido: P1Caos},
	{id: 'tablero', dur: 7, Contenido: P2Reveal},
	{id: 'organiza', dur: 12, Contenido: P3Organiza},
	{id: 'detalle', dur: 8, Contenido: P4Detalle},
	{id: 'reporta', dur: 12, Contenido: P5Reporta},
	{id: 'orden', dur: 10, Contenido: P6Orden},
	{id: 'campo', dur: 14, Contenido: P7Campo},
	{id: 'seguimiento', dur: 8, Contenido: P8Seguimiento},
	{id: 'programa', dur: 10, Contenido: P9Programa},
	{id: 'whatsapp', dur: 8, Contenido: P10WhatsApp},
	{id: 'cierre', dur: 9, Contenido: P11Cierre},
];

export const DURACION_SITIO = PLANOS.reduce((a, p) => a + s(p.dur), 0);

export const SitioWeb: React.FC<PropsSitio> = ({musica, inicioMusica = 0}) => {
	let desde = 0;
	const cortes: number[] = [];
	return (
		<AbsoluteFill style={{background: c.oscuro}}>
			{PLANOS.map((p, i) => {
				const dur = s(p.dur);
				const inicio = desde;
				desde += dur;
				if (i > 0) cortes.push(inicio);
				return (
					<Sequence key={p.id} from={inicio} durationInFrames={dur} name={p.id}>
						<Escena dur={dur} sinSalida={i === PLANOS.length - 1}>
							<p.Contenido />
						</Escena>
					</Sequence>
				);
			})}
			{cortes.map((f) => (
				<Barrido key={f} en={f} />
			))}
			{musica && (
				<Audio
					src={staticFile(`audio/${musica}`)}
					startFrom={s(inicioMusica)}
					volume={(f) => interpolate(f, [0, 8, DURACION_SITIO - 10, DURACION_SITIO], [0, 0.9, 0.9, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
				/>
			)}
		</AbsoluteFill>
	);
};
