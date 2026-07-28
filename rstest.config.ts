import { defineConfig } from "@rstest/core";

// https://rstest.rs/config/
export default defineConfig({
	pool: "forks",
	clearMocks: true,
	globals: true,
	reporters: ["verbose"],
	coverage: {
		provider: "v8",
		reporters: ["text"],
	},
	exclude: ["**/__fixtures__/**"],
});
