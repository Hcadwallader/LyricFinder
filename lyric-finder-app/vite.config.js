import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		define: {
			'process.env.REACT_APP_SPOTIFY_CLIENT_ID': JSON.stringify(
				env.REACT_APP_SPOTIFY_CLIENT_ID
			),
			'process.env.REACT_APP_SPOTIFY_CLIENT_SECRET': JSON.stringify(
				env.REACT_APP_SPOTIFY_CLIENT_SECRET
			),
		},
		plugins: [react()],
	};
});
