import { defineConfig } from "vite"
import { readFileSync } from "fs"
import react from "@vitejs/plugin-react"

const vitePluginVersion = () => {
	return {
		name: "vite-plugin-version",
		config() {
			const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))
			return {
				define: {
					"import.meta.env.VITE_APP_VERSION": JSON.stringify(pkg.version),
				},
			}
		},
	}
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), vitePluginVersion()],
	base: "/rofl-pointer/",
})
