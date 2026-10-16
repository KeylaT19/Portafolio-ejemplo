import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, Easing} from 'remotion';
import {c, fuente, s} from './tema';
import {
	Barrido,
	Celular,
	Cursor,
	Escena,
	EtiquetaPaso,
	Folio,
	Fondo,
	Laptop,
	Logo,
	TextoCinetico,
	useEntrada,
	useTramo,
} from './componentes/base';
import {PantallaArbol, PantallaCalendario, PantallaFicha, PantallaIncidenciaOT, PantallaTablero, PantallaValidacion} from './ui/escritorio';
import {ChatCaos, EjecucionOT, IncidenciaMovil, NotificacionWA} from './ui/movil';
import {OT} from './ui/datos';
import {ClipFondo, MonitorVerde} from './componentes/clips';

export type PropsSitio = {
	/** Pista dentro de public/audio/. Vacío = sin audio. */
	musica?: string;
	/** Segundo de la pista en que arranca el video (alinea el remate final con el cierre). */
	inicioMusica?: number;
};

type Linea = {t: string; de: number; a: number};
type Plano = {
	id: string;
	dur: number; // segundos
	// Texto de locución del guion; el corte final va sin voz, pero sirve para subtítulos .vtt.
	locucion: Linea[]; // segundos relativos al plano
	rotulo: string;
	Contenido: React.FC;
};

// ───────────────────────── Planos del Guion A ─────────────────────────

const Plano1: React.FC = () => {
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
					<TextoCinetico texto="¿Dónde está la evidencia?" tam={104} resaltar={['evidencia']} retraso={10} ancho={900} />
					<div style={{height: 30}} />
					<TextoCinetico texto="Fotos sueltas, chats, un Excel y un “creo que ya se hizo”." tam={40} peso={400} color={c.tintaInversaSuave} retraso={60} paso={2} ancho={820} />
				</div>
			</AbsoluteFill>
		</Fondo>
	);
};

const Plano2: React.FC = () => {
	const v = useEntrada(0, {damping: 16, mass: 0.9});
	return (
		<Fondo>
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 70}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 34, opacity: v}}>
					<Logo ancho={260} variante="claro" />
					<div style={{width: 2, height: 70, background: 'rgba(255,255,255,.25)'}} />
					<TextoCinetico texto="Todo en un solo lugar" tam={66} resaltar={['solo', 'lugar']} retraso={6} />
				</div>
				<div style={{marginTop: 46, transform: `translateY(${(1 - v) * 260}px) scale(${0.85 + v * 0.15})`}}>
					<Laptop ancho={1120} rotX={8 - v * 8}>
						<PantallaTablero retraso={10} />
					</Laptop>
				</div>
			</AbsoluteFill>
		</Fondo>
	);
};

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
		<div style={{width: 560, flexShrink: 0}}>
			<EtiquetaPaso numero={numero} texto={etiqueta} />
			<div style={{height: 30}} />
			<TextoCinetico texto={titular} tam={70} resaltar={resaltar} retraso={8} />
			{bajada && (
				<>
					<div style={{height: 24}} />
					<TextoCinetico texto={bajada} tam={32} peso={400} color={c.tintaInversaSuave} retraso={24} paso={1} />
				</>
			)}
			{extra && <div style={{marginTop: 36}}>{extra}</div>}
		</div>
	);
	const disp = (
		<div style={{transform: `translateX(${(1 - v) * (lado === 'izq' ? 300 : -300)}px)`, opacity: v}}>{children}</div>
	);
	return (
		<Fondo>
			<AbsoluteFill style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 80, padding: '0 90px 60px'}}>
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

const Plano3: React.FC = () => (
	<DisenoPaso numero={1} etiqueta="Paso 1 — Organiza" titular="Tu club por instalaciones, zonas y equipos." resaltar={['zonas', 'equipos']} bajada="Cada equipo con su ficha, sus fotos y su código QR.">
		<Laptop ancho={1100} rotY={-10}>
			<PantallaArbol seleccion={150} />
			<Cursor
				puntos={[
					{f: 0, x: 900, y: 600},
					{f: 8, x: 420, y: 153, clic: true},
					{f: 30, x: 420, y: 153},
					{f: 48, x: 440, y: 211, clic: true},
					{f: 120, x: 440, y: 211},
					{f: 146, x: 520, y: 269, clic: true},
					{f: 200, x: 800, y: 400},
				]}
			/>
		</Laptop>
	</DisenoPaso>
);

const Plano4: React.FC = () => (
	<DisenoPaso
		lado="der"
		etiqueta="Ficha del activo"
		titular="Un identificador que cualquiera puede citar."
		resaltar={['identificador']}
		bajada="Marca, modelo, garantía y ubicación en el mapa."
		extra={<Folio texto="AC001 · QR · Mapa" retraso={40} />}
	>
		<Laptop ancho={1080} rotY={10}>
			<PantallaFicha mapaEn={135} />
			<Cursor
				puntos={[
					{f: 0, x: 900, y: 500},
					{f: 30, x: 700, y: 400},
					{f: 110, x: 760, y: 420},
					{f: 132, x: 405, y: 150, clic: true},
					{f: 200, x: 560, y: 380},
				]}
			/>
		</Laptop>
	</DisenoPaso>
);

const Plano5: React.FC = () => (
	<DisenoPaso numero={2} etiqueta="Paso 2 — Reporta" titular="Quien detecta la falla, la reporta con foto." resaltar={['foto']} bajada="Desde donde esté, en su celular.">
		<Celular escala={0.98} rot={3}>
			<IncidenciaMovil prioridadEn={72} fotoEn={132} guardarEn={205} />
			<Cursor
				mano
				puntos={[
					{f: 0, x: 300, y: 700},
					{f: 50, x: 260, y: 520},
					{f: 70, x: 240, y: 350, clic: true},
					{f: 100, x: 240, y: 350},
					{f: 128, x: 73, y: 463, clic: true},
					{f: 170, x: 140, y: 520},
					{f: 202, x: 195, y: 570, clic: true},
					{f: 260, x: 320, y: 700},
				]}
			/>
		</Celular>
	</DisenoPaso>
);

const Plano6: React.FC = () => (
	<DisenoPaso
		lado="der"
		etiqueta="Del reporte a la orden"
		titular="El supervisor la convierte en orden, la asigna y le pone fecha."
		resaltar={['orden']}
		extra={
			<Sequence from={205} layout="none">
				<Folio texto={OT} tam={56} />
			</Sequence>
		}
	>
		<Laptop ancho={1080} rotY={10}>
			<PantallaIncidenciaOT convertirEn={60} folioEn={200} />
			<Cursor
				puntos={[
					{f: 0, x: 700, y: 600},
					{f: 56, x: 1160, y: 198, clic: true},
					{f: 75, x: 1160, y: 230},
					{f: 88, x: 1100, y: 400, clic: true},
					{f: 100, x: 1100, y: 400},
					{f: 113, x: 1100, y: 482, clic: true},
					{f: 200, x: 1250, y: 600},
				]}
			/>
		</Laptop>
	</DisenoPaso>
);

// K comprime los tiempos para que quepa después de la toma de campo.
const Plano7: React.FC<{k?: number}> = ({k = 1}) => (
	<DisenoPaso numero={undefined} etiqueta="El técnico la ejecuta" titular="Marca sus tareas, captura lecturas, sube la foto y firma." resaltar={['foto', 'firma']} extra={<Sequence from={Math.round(300 * k)} layout="none"><Folio texto="Evidencia + firma" tam={44} /></Sequence>}>
		<Celular escala={0.98} rot={-3}>
			<EjecucionOT tareasEn={40 * k} lecturaEn={120 * k} fotoEn={200 * k} firmaEn={260 * k} finalizarEn={345 * k} />
			<Cursor
				mano
				puntos={[
					{f: 0 * k, x: 300, y: 700},
					{f: 38 * k, x: 45, y: 244, clic: true},
					{f: 50 * k, x: 45, y: 288, clic: true},
					{f: 62 * k, x: 45, y: 332, clic: true},
					{f: 100 * k, x: 150, y: 430},
					{f: 118 * k, x: 150, y: 487, clic: true},
					{f: 170 * k, x: 220, y: 420},
					{f: 198 * k, x: 267, y: 337, clic: true},
					{f: 240 * k, x: 40, y: 520},
					{f: 260 * k, x: 40, y: 520},
					{f: 270 * k, x: 90, y: 492},
					{f: 278 * k, x: 140, y: 540},
					{f: 285 * k, x: 200, y: 495},
					{f: 292 * k, x: 320, y: 525},
					{f: 320 * k, x: 200, y: 600},
					{f: 342 * k, x: 195, y: 635, clic: true},
					{f: 400 * k, x: 320, y: 760},
				]}
			/>
		</Celular>
	</DisenoPaso>
);

const Plano8: React.FC = () => (
	<DisenoPaso lado="der" etiqueta="Validación del supervisor" titular="Y no se cierra sola: el supervisor valida o rechaza." resaltar={['valida']}>
		<Laptop ancho={1080} rotY={10}>
			<PantallaValidacion validarEn={120} />
			<Cursor
				puntos={[
					{f: 0, x: 700, y: 600},
					{f: 60, x: 900, y: 300},
					{f: 116, x: 1250, y: 195, clic: true},
					{f: 200, x: 1100, y: 450},
				]}
			/>
		</Laptop>
	</DisenoPaso>
);

const Plano9: React.FC = () => (
	<DisenoPaso numero={3} etiqueta="Paso 3 — Programa" titular="Lo que se repite, se programa." resaltar={['programa']} bajada="El sistema genera las órdenes solo.">
		<Laptop ancho={1100} rotY={-10}>
			<PantallaCalendario arrastrarEn={70} anualEn={205} />
			<Cursor
				puntos={[
					{f: 0, x: 800, y: 700},
					{f: 60, x: 360, y: 484, clic: true},
					{f: 70, x: 360, y: 484},
					{f: 90, x: 518, y: 484},
					{f: 130, x: 700, y: 400},
					{f: 200, x: 1368, y: 130, clic: true},
					{f: 280, x: 1100, y: 500},
				]}
			/>
		</Laptop>
	</DisenoPaso>
);

const Plano10: React.FC = () => {
	const v = useEntrada(0);
	const v2 = useEntrada(30);
	return (
		<Fondo>
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 60}}>
				<TextoCinetico texto="WhatsApp sí. Caos no." tam={84} resaltar={['sí']} alinear="center" retraso={4} />
				<div style={{display: 'flex', alignItems: 'center', gap: 70, marginTop: 40}}>
					<div style={{transform: `translateY(${(1 - v) * 200}px)`, opacity: v}}>
						<Celular escala={0.82}>
							<NotificacionWA llegaEn={14} />
						</Celular>
					</div>
					<div style={{transform: `translateX(${(1 - v2) * 300}px)`, opacity: v2}}>
						<Laptop ancho={1000}>
							<PantallaTablero retraso={40} />
						</Laptop>
					</div>
				</div>
			</AbsoluteFill>
		</Fondo>
	);
};

const Plano11: React.FC = () => {
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

// ───────────────────── Tomas reales (Envato) ─────────────────────

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
			<TextoCinetico texto={titular} tam={tam} resaltar={resaltar} retraso={retraso + 6} ancho={1400} />
		</div>
	</AbsoluteFill>
);

/** Toma de clip seguida de la pantalla del sistema dentro del mismo plano. */
const ClipLuego: React.FC<{seg: number; clip: React.ReactNode; children: React.ReactNode}> = ({seg, clip, children}) => {
	const corte = s(seg);
	return (
		<AbsoluteFill>
			<Sequence durationInFrames={corte}>{clip}</Sequence>
			<Sequence from={corte}>{children}</Sequence>
			<Barrido en={corte} />
		</AbsoluteFill>
	);
};

const PlanoCaos: React.FC = () => (
	<ClipLuego
		seg={3}
		clip={
			<ClipFondo archivo="manos-laptop-celular.mp4" desde={0.5} empuje={0.1}>
				<TextoSobreClip titular="Fotos sueltas. Chats. Un Excel." resaltar={['Excel']} />
			</ClipFondo>
		}
	>
		<Plano1 />
	</ClipLuego>
);

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
					<TextoCinetico texto={titular} tam={66} resaltar={resaltar} retraso={22} ancho={1300} />
				</div>
			</div>
		</AbsoluteFill>
	);
};

const PlanoReveal: React.FC = () => (
	<PlanoMonitor desde={0} titular="Todo tu mantenimiento en un solo lugar." resaltar={['solo', 'lugar']} logo>
		<PantallaTablero retraso={6} />
	</PlanoMonitor>
);

const PlanoAlberca: React.FC = () => (
	<ClipLuego
		seg={3.5}
		clip={
			<ClipFondo archivo="tecnico-alberca.mp4" desde={0.3} empuje={0.1}>
				<TextoSobreClip etiqueta="Paso 2 — Reporta" titular="¿Una falla en la alberca?" resaltar={['alberca']} />
			</ClipFondo>
		}
	>
		<Plano5 />
	</ClipLuego>
);

const PlanoCampo: React.FC = () => (
	<ClipLuego
		seg={3}
		clip={
			<ClipFondo archivo="tecnico-celular.mov" desde={1} empuje={0.1}>
				<TextoSobreClip etiqueta="En campo" titular="El técnico recibe su orden en el celular." resaltar={['celular']} />
			</ClipFondo>
		}
	>
		<Plano7 k={0.76} />
	</ClipLuego>
);

const PlanoValidacionVerde: React.FC = () => {
	return (
		<PlanoMonitor desde={5} etiqueta="Validación del supervisor" titular="No se cierra sola: el supervisor valida." resaltar={['valida']}>
			<PantallaValidacion validarEn={95} />
			<Cursor
				puntos={[
					{f: 0, x: 700, y: 600},
					{f: 50, x: 900, y: 300},
					{f: 92, x: 1250, y: 195, clic: true},
					{f: 200, x: 1100, y: 450},
				]}
			/>
		</PlanoMonitor>
	);
};

const PlanoWhatsApp: React.FC = () => (
	<ClipLuego
		seg={3}
		clip={
			<ClipFondo archivo="manos-laptop-celular.mp4" desde={3.2} empuje={0.12}>
				<TextoSobreClip titular="Avisos por WhatsApp a cada responsable." resaltar={['WhatsApp']} />
			</ClipFondo>
		}
	>
		<Plano10 />
	</ClipLuego>
);

const PlanoCierre: React.FC = () => {
	const tomas = [
		{a: 'tecnico-alberca.mp4', d: 4},
		{a: 'tecnico-laptop-planta.mp4', d: 6},
		{a: 'tecnico-celular.mov', d: 5},
	];
	const parte = s(0.9);
	return (
		<ClipLuego
			seg={2.7}
			clip={
				<AbsoluteFill>
					{tomas.map((t, i) => (
						<Sequence key={t.a} from={i * parte} durationInFrames={parte}>
							<ClipFondo archivo={t.a} desde={t.d} empuje={0.15} />
						</Sequence>
					))}
					<AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,20,52,.78) 0%, rgba(0,20,52,.55) 60%, rgba(0,20,52,.35) 100%)'}} />
					<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
						<TextoCinetico texto="Tu equipo. Tus equipos. Con evidencia." tam={88} resaltar={['evidencia']} alinear="center" retraso={2} paso={4} ancho={1500} />
					</AbsoluteFill>
				</AbsoluteFill>
			}
		>
			<Plano11 />
		</ClipLuego>
	);
};

export const PLANOS: Plano[] = [
	{
		id: 'caos',
		dur: 7,
		Contenido: PlanoCaos,
		rotulo: '¿Dónde quedó la evidencia?',
		locucion: [
			{t: '¿Dónde está el historial del último mantenimiento?', de: 0.3, a: 3.2},
			{t: 'Si la respuesta es “espérame, está en el chat”…', de: 3.3, a: 5.6},
			{t: '…es que no existe.', de: 5.6, a: 6.9},
		],
	},
	{
		id: 'tablero',
		dur: 7,
		Contenido: PlanoReveal,
		rotulo: 'Todo tu mantenimiento, aquí',
		locucion: [
			{t: 'Esto es GC GMAO.', de: 0.4, a: 2.4},
			{t: 'Un solo lugar para el mantenimiento de tu club.', de: 2.5, a: 6.8},
		],
	},
	{
		id: 'arbol',
		dur: 12,
		Contenido: Plano3,
		rotulo: 'Instalaciones, zonas y equipos',
		locucion: [
			{t: 'Paso 1. Organizas tu club por instalaciones, zonas y equipos.', de: 0.4, a: 6},
			{t: 'Cada equipo con su ficha, sus fotos y su código QR.', de: 6.2, a: 11.6},
		],
	},
	{
		id: 'ficha',
		dur: 8,
		Contenido: Plano4,
		rotulo: 'Cada equipo, su ficha',
		locucion: [
			{t: 'Marca, modelo, garantía, ubicación en el mapa…', de: 0.3, a: 4},
			{t: '…y un identificador que cualquiera puede citar.', de: 4.1, a: 7.8},
		],
	},
	{
		id: 'incidencia',
		dur: 12,
		Contenido: PlanoAlberca,
		rotulo: 'Reporta la falla con foto',
		locucion: [
			{t: 'Paso 2. Quien detecta la falla la reporta con foto,', de: 0.5, a: 6.5},
			{t: 'desde donde esté.', de: 6.6, a: 11.5},
		],
	},
	{
		id: 'orden',
		dur: 10,
		Contenido: Plano6,
		rotulo: 'Se vuelve orden con folio',
		locucion: [
			{t: 'El supervisor la convierte en orden de trabajo,', de: 0.3, a: 3.8},
			{t: 'la asigna y le pone fecha.', de: 3.9, a: 6.6},
			{t: 'Nace con folio.', de: 6.7, a: 9.8},
		],
	},
	{
		id: 'ejecucion',
		dur: 14,
		Contenido: PlanoCampo,
		rotulo: 'Se cierra con evidencia',
		locucion: [
			{t: 'El técnico la ejecuta:', de: 0.4, a: 3},
			{t: 'marca sus tareas, captura lecturas,', de: 3.1, a: 7.5},
			{t: 'sube la foto y firma.', de: 7.6, a: 13.6},
		],
	},
	{
		id: 'validacion',
		dur: 8,
		Contenido: PlanoValidacionVerde,
		rotulo: 'El supervisor valida',
		locucion: [
			{t: 'Y no se cierra sola:', de: 0.4, a: 3.2},
			{t: 'el supervisor valida o rechaza.', de: 3.3, a: 7.8},
		],
	},
	{
		id: 'calendario',
		dur: 10,
		Contenido: Plano9,
		rotulo: 'Lo repetitivo, programado',
		locucion: [
			{t: 'Paso 3. Lo que se repite, se programa.', de: 0.4, a: 5},
			{t: 'El sistema genera las órdenes solo.', de: 5.1, a: 9.8},
		],
	},
	{
		id: 'whatsapp',
		dur: 8,
		Contenido: PlanoWhatsApp,
		rotulo: 'Avisos por WhatsApp, historial aquí',
		locucion: [
			{t: 'Tu equipo sigue en WhatsApp.', de: 0.3, a: 3},
			{t: 'El historial, las órdenes y la evidencia viven aquí.', de: 3.1, a: 7.8},
		],
	},
	{
		id: 'cierre',
		dur: 9,
		Contenido: PlanoCierre,
		rotulo: '',
		locucion: [
			{t: 'Ordena el mantenimiento de tu club.', de: 0.5, a: 4.2},
			{t: 'Elige tu plan y activa tu cuenta hoy.', de: 4.3, a: 8.8},
		],
	},
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
