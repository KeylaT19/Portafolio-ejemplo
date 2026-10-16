import React from 'react';
import {Composition} from 'remotion';
import {FPS} from './tema';
import {DURACION_SITIO, SitioWeb} from './SitioWeb';

export const RemotionRoot: React.FC = () => (
	<>
		<Composition
			id="SitioWeb"
			component={SitioWeb}
			durationInFrames={DURACION_SITIO}
			fps={FPS}
			width={1920}
			height={1080}
			defaultProps={{mudo: false}}
		/>
		<Composition
			id="SitioWebMudo"
			component={SitioWeb}
			durationInFrames={DURACION_SITIO}
			fps={FPS}
			width={1920}
			height={1080}
			defaultProps={{mudo: true}}
		/>
	</>
);
