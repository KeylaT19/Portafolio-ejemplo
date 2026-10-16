// Tokens tomados de sitio/assets/css/tokens.css de la landing 4.1.0 («Operación azul»).
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/ibm-plex-mono/500.css';

export const c = {
	fondoPagina: '#f6f8fb',
	tarjeta: '#ffffff',
	suave: '#eef3f9',
	oscuro: '#002e6b',
	pie: '#04243f',
	borde: '#e2e8f0',
	bordeFuerte: '#c3cedb',
	tinta: '#101828',
	tintaSuave: '#45556c',
	tintaInversa: '#ffffff',
	tintaInversaSuave: '#c9d6ea',
	marca: '#0f56b3',
	marcaFuerte: '#0b4590',
	marcaTenue: '#eaf1fc',
	acento: '#38bdf8',
	whatsapp: '#25d366',
	whatsappFuerte: '#128c4a',
	abierta: '#0f56b3',
	proceso: '#a96200',
	finalizada: '#0e7490',
	cerrada: '#15803d',
	vencida: '#c0392b',
	critico: '#c0392b',
	alerta: '#a96200',
};

export const fuente = '"Poppins", system-ui, sans-serif';
export const mono = '"IBM Plex Mono", ui-monospace, monospace';

export const gradPortada = `radial-gradient(1200px 620px at 85% -10%, rgba(56,189,248,.28), transparent 60%), linear-gradient(135deg, #001b44 0%, #002e6b 45%, #0f56b3 100%)`;
export const gradCierre = `linear-gradient(128deg, #101828 20%, #0f3f86 75%, #1b5fc4 110%)`;

export const FPS = 30;
export const s = (seg: number) => Math.round(seg * FPS);
