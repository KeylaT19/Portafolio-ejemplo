import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
	Easing,
} from 'remotion';
import {c, fuente, gradPortada, gradCierre, mono} from '../tema';

/** Resorte de entrada (0 → 1) a partir de un retraso en frames. */
export const useEntrada = (retraso = 0, config = {damping: 14, mass: 0.7}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({frame: frame - retraso, fps, config});
};

/** Avance lineal con easing entre dos frames. */
export const useTramo = (desde: number, hasta: number, easing = Easing.inOut(Easing.cubic)) => {
	const frame = useCurrentFrame();
	return interpolate(frame, [desde, hasta], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing,
	});
};

/** Fondo de marca: degradado de portada, trama de puntos y halos que respiran. */
export const Fondo: React.FC<{variante?: 'portada' | 'cierre' | 'claro'; children?: React.ReactNode}> = ({
	variante = 'portada',
	children,
}) => {
	const frame = useCurrentFrame();
	const deriva = Math.sin(frame / 60) * 40;
	const claro = variante === 'claro';
	return (
		<AbsoluteFill
			style={{
				background: claro ? c.fondoPagina : variante === 'cierre' ? gradCierre : gradPortada,
				overflow: 'hidden',
				fontFamily: fuente,
			}}
		>
			<AbsoluteFill
				style={{
					backgroundImage: claro
						? 'radial-gradient(rgba(15,86,179,.10) 1.5px, transparent 1.5px)'
						: 'radial-gradient(rgba(255,255,255,.09) 1.5px, transparent 1.5px)',
					backgroundSize: '28px 28px',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					width: 900,
					height: 900,
					borderRadius: '50%',
					left: -250 + deriva,
					bottom: -450,
					background: claro
						? 'radial-gradient(circle, rgba(56,189,248,.16), transparent 65%)'
						: 'radial-gradient(circle, rgba(56,189,248,.22), transparent 65%)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					width: 700,
					height: 700,
					borderRadius: '50%',
					right: -200 - deriva,
					top: -300,
					background: claro
						? 'radial-gradient(circle, rgba(15,86,179,.12), transparent 65%)'
						: 'radial-gradient(circle, rgba(27,95,196,.45), transparent 65%)',
				}}
			/>
			{children}
		</AbsoluteFill>
	);
};

/** Titular que entra palabra por palabra con resorte. */
export const TextoCinetico: React.FC<{
	texto: string;
	retraso?: number;
	tam?: number;
	color?: string;
	resaltar?: string[];
	peso?: number;
	alinear?: 'left' | 'center';
	paso?: number;
	ancho?: number;
}> = ({texto, retraso = 0, tam = 72, color = c.tintaInversa, resaltar = [], peso = 700, alinear = 'left', paso = 3, ancho}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const palabras = texto.split(' ');
	return (
		<div
			style={{
				fontFamily: fuente,
				fontSize: tam,
				fontWeight: peso,
				lineHeight: 1.12,
				letterSpacing: '-0.02em',
				color,
				textAlign: alinear,
				maxWidth: ancho,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: alinear === 'center' ? 'center' : 'flex-start',
				gap: `0 ${tam * 0.26}px`,
			}}
		>
			{palabras.map((p, i) => {
				const v = spring({frame: frame - retraso - i * paso, fps, config: {damping: 13, mass: 0.6}});
				const limpio = p.replace(/[.,¿?¡!:]/g, '');
				const marcado = resaltar.includes(limpio);
				return (
					<span key={i} style={{display: 'inline-block', overflow: 'hidden', paddingBottom: tam * 0.12}}>
						<span
							style={{
								display: 'inline-block',
								transform: `translateY(${(1 - v) * 110}%) rotate(${(1 - v) * 6}deg)`,
								opacity: v,
								color: marcado ? c.acento : undefined,
							}}
						>
							{p}
						</span>
					</span>
				);
			})}
		</div>
	);
};

/** Píldora de paso: «PASO 1 · Organiza». */
export const EtiquetaPaso: React.FC<{numero?: number; texto: string; retraso?: number; claro?: boolean; solido?: boolean}> = ({
	numero,
	texto,
	retraso = 0,
	claro = false,
	solido = false,
}) => {
	const v = useEntrada(retraso);
	return (
		<div
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 18,
				padding: '12px 28px 12px 12px',
				borderRadius: 999,
				// solido: fondo de marca opaco, para que se lea sobre tomas claras.
				background: solido ? c.marca : claro ? c.marcaTenue : 'rgba(56,189,248,.14)',
				border: `1.5px solid ${solido ? c.acento : claro ? 'rgba(15,86,179,.25)' : 'rgba(56,189,248,.45)'}`,
				boxShadow: solido ? '0 8px 24px rgba(0,20,52,.35)' : undefined,
				transform: `translateX(${(1 - v) * -60}px) scale(${0.85 + v * 0.15})`,
				opacity: v,
				fontFamily: fuente,
			}}
		>
			{numero !== undefined && (
				<span
					style={{
						width: 52,
						height: 52,
						borderRadius: '50%',
						background: claro ? c.marca : c.acento,
						color: claro ? '#fff' : c.oscuro,
						display: 'grid',
						placeItems: 'center',
						fontWeight: 800,
						fontSize: 28,
					}}
				>
					{numero}
				</span>
			)}
			<span
				style={{
					fontSize: 30,
					fontWeight: 600,
					letterSpacing: '0.04em',
					textTransform: 'uppercase',
					color: solido ? '#fff' : claro ? c.marca : c.acento,
					paddingLeft: numero === undefined ? 16 : 0,
				}}
			>
				{texto}
			</span>
		</div>
	);
};

/** Chip con folio en tipografía monoespaciada. */
export const Folio: React.FC<{texto: string; retraso?: number; tam?: number; oscuro?: boolean}> = ({
	texto,
	retraso = 0,
	tam = 44,
	oscuro = true,
}) => {
	const v = useEntrada(retraso, {damping: 10, mass: 0.6});
	return (
		<div
			style={{
				display: 'inline-block',
				fontFamily: mono,
				fontWeight: 500,
				fontSize: tam,
				padding: `${tam * 0.25}px ${tam * 0.5}px`,
				borderRadius: 14,
				color: oscuro ? '#fff' : c.marca,
				background: oscuro ? 'rgba(255,255,255,.08)' : c.marcaTenue,
				border: `2px solid ${oscuro ? c.acento : c.marca}`,
				boxShadow: oscuro ? '0 0 40px rgba(56,189,248,.35)' : 'none',
				transform: `scale(${v})`,
				opacity: v,
			}}
		>
			{texto}
		</div>
	);
};

/** Marco de laptop con perspectiva. El contenido se dibuja a 1440×900 y se escala. */
export const Laptop: React.FC<{
	children: React.ReactNode;
	ancho?: number;
	rotY?: number;
	rotX?: number;
	zoom?: number;
	origenZoom?: string;
}> = ({children, ancho = 1280, rotY = 0, rotX = 0, zoom = 1, origenZoom = '50% 50%'}) => {
	const escala = (ancho - 36) / 1440;
	const altoPantalla = 900 * escala;
	return (
		<div style={{perspective: 2400, width: ancho}}>
			<div style={{transform: `rotateY(${rotY}deg) rotateX(${rotX}deg)`, transformStyle: 'preserve-3d'}}>
				<div
					style={{
						background: '#0b1220',
						borderRadius: 26,
						padding: 18,
						boxShadow: '0 40px 90px rgba(0,10,30,.55), 0 0 0 2px rgba(255,255,255,.08) inset',
					}}
				>
					<div
						style={{
							width: ancho - 36,
							height: altoPantalla,
							overflow: 'hidden',
							borderRadius: 10,
							background: c.fondoPagina,
							position: 'relative',
						}}
					>
						<div
							style={{
								width: 1440,
								height: 900,
								transform: `scale(${escala * zoom})`,
								transformOrigin: zoom === 1 ? '0 0' : origenZoom,
								position: 'absolute',
								left: zoom === 1 ? 0 : (ancho - 36 - 1440) / 2,
								top: zoom === 1 ? 0 : (altoPantalla - 900) / 2,
							}}
						>
							{children}
						</div>
					</div>
				</div>
				<div
					style={{
						height: 22,
						margin: '0 -60px',
						background: 'linear-gradient(#cfd8e3, #8d9aab)',
						borderRadius: '0 0 30px 30px',
						boxShadow: '0 30px 60px rgba(0,10,30,.45)',
					}}
				/>
			</div>
		</div>
	);
};

/** Marco de celular. El contenido se dibuja a 390×844. */
export const Celular: React.FC<{children: React.ReactNode; escala?: number; rot?: number}> = ({
	children,
	escala = 1,
	rot = 0,
}) => (
	<div
		style={{
			width: 390 + 28,
			height: 844 + 28,
			padding: 14,
			borderRadius: 64,
			background: 'linear-gradient(145deg, #1f2937, #0b1220)',
			boxShadow: '0 50px 100px rgba(0,10,30,.6), 0 0 0 2px rgba(255,255,255,.12) inset',
			transform: `scale(${escala}) rotate(${rot}deg)`,
			position: 'relative',
		}}
	>
		<div
			style={{
				width: 390,
				height: 844,
				borderRadius: 50,
				overflow: 'hidden',
				background: '#fff',
				position: 'relative',
			}}
		>
			{children}
			<div
				style={{
					position: 'absolute',
					top: 11,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 120,
					height: 34,
					borderRadius: 20,
					background: '#000',
					zIndex: 50,
				}}
			/>
		</div>
	</div>
);

/** Barra de estado del celular. */
export const BarraEstado: React.FC<{oscura?: boolean}> = ({oscura}) => (
	<div
		style={{
			height: 54,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '8px 32px 0',
			fontFamily: fuente,
			fontWeight: 600,
			fontSize: 16,
			color: oscura ? '#fff' : c.tinta,
		}}
	>
		<span>9:41</span>
		<span style={{letterSpacing: 2}}>▮▮▮ ◔</span>
	</div>
);

/** Puntero animado entre puntos, con onda de clic. */
export type PuntoCursor = {f: number; x: number; y: number; clic?: boolean};
export const Cursor: React.FC<{puntos: PuntoCursor[]; mano?: boolean}> = ({puntos, mano}) => {
	const frame = useCurrentFrame();
	const fs = puntos.map((p) => p.f);
	const x = interpolate(frame, fs, puntos.map((p) => p.x), {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	const y = interpolate(frame, fs, puntos.map((p) => p.y), {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	const clics = puntos.filter((p) => p.clic);
	const ultimoClic = [...clics].reverse().find((p) => frame >= p.f);
	const tClic = ultimoClic ? frame - ultimoClic.f : 999;
	const onda = interpolate(tClic, [0, 14], [0, 1], {extrapolateRight: 'clamp'});
	const presion = tClic < 6 ? 0.85 : 1;
	return (
		<div style={{position: 'absolute', left: x, top: y, zIndex: 100, pointerEvents: 'none'}}>
			{tClic < 14 && (
				<div
					style={{
						position: 'absolute',
						left: -40 * onda,
						top: -40 * onda,
						width: 80 * onda,
						height: 80 * onda,
						borderRadius: '50%',
						border: `4px solid ${c.acento}`,
						opacity: 1 - onda,
					}}
				/>
			)}
			{mano ? (
				<div
					style={{
						width: 56,
						height: 56,
						marginLeft: -28,
						marginTop: -28,
						borderRadius: '50%',
						background: 'rgba(255,255,255,.55)',
						border: '3px solid rgba(16,24,40,.35)',
						transform: `scale(${presion})`,
						boxShadow: '0 6px 20px rgba(0,0,0,.25)',
					}}
				/>
			) : (
				<svg width="44" height="44" viewBox="0 0 24 24" style={{transform: `scale(${presion})`, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.35))'}}>
					<circle cx="5" cy="4" r="9" fill="rgba(56,189,248,.28)" />
					<path d="M4 2 L4 19 L8.5 14.8 L11.5 21.5 L14.2 20.3 L11.3 13.8 L17.5 13.8 Z" fill="#fff" stroke="#101828" strokeWidth="1.4" strokeLinejoin="round" />
				</svg>
			)}
		</div>
	);
};

/** Subtítulo quemado (locución) en la franja inferior. */
export const Subtitulo: React.FC<{texto: string; inicio: number; fin: number; tam?: number; abajo?: number}> = ({
	texto,
	inicio,
	fin,
	tam = 40,
	abajo = 56,
}) => {
	const frame = useCurrentFrame();
	if (frame < inicio || frame > fin) return null;
	const op = interpolate(frame, [inicio, inicio + 5, fin - 5, fin], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				bottom: abajo,
				display: 'flex',
				justifyContent: 'center',
				opacity: op,
				zIndex: 200,
				padding: '0 80px',
			}}
		>
			<div
				style={{
					fontFamily: fuente,
					fontWeight: 500,
					fontSize: tam,
					lineHeight: 1.3,
					color: '#fff',
					background: 'rgba(4,20,45,.82)',
					padding: '12px 30px',
					borderRadius: 14,
					textAlign: 'center',
					maxWidth: 1500,
				}}
			>
				{texto}
			</div>
		</div>
	);
};

/** Destello de corte: barrido cian que tapa el cambio de escena. */
export const Barrido: React.FC<{en: number; duracion?: number}> = ({en, duracion = 10}) => {
	const frame = useCurrentFrame();
	const t = interpolate(frame, [en - duracion / 2, en + duracion / 2], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.quad),
	});
	if (t <= 0 || t >= 1) return null;
	return (
		<AbsoluteFill style={{zIndex: 300, pointerEvents: 'none'}}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					width: '70%',
					left: `${-70 + t * 170}%`,
					background: `linear-gradient(100deg, transparent 0%, ${c.marca} 25%, ${c.acento} 50%, ${c.marca} 75%, transparent 100%)`,
					transform: 'skewX(-12deg)',
				}}
			/>
		</AbsoluteFill>
	);
};

export const Logo: React.FC<{ancho?: number; variante?: 'color' | 'claro' | 'blanco'}> = ({ancho = 420, variante = 'blanco'}) => (
	<Img
		src={staticFile(`marca/gcgmao-logo-${variante}.png`)}
		style={{width: ancho, height: 'auto', display: 'block'}}
	/>
);

/** Escena con entrada/salida suave para que cada corte respire. */
export const Escena: React.FC<{dur: number; children: React.ReactNode; sinSalida?: boolean}> = ({dur, children, sinSalida}) => {
	const frame = useCurrentFrame();
	const entrada = interpolate(frame, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
	const salida = sinSalida ? 1 : interpolate(frame, [dur - 6, dur], [1, 0], {extrapolateLeft: 'clamp'});
	return (
		<AbsoluteFill style={{opacity: Math.min(entrada, salida)}}>{children}</AbsoluteFill>
	);
};
