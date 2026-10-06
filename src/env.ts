import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_ENVIRONMENT: {
		public: true,
		description: 'Deployment environment: "prod", "test" or "pub". Defaults to test options.',
		schema: (value) => value
	}
});
