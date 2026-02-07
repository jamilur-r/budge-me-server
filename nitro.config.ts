import { defineNitroConfig } from "nitropack/config"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dir = dirname(fileURLToPath(import.meta.url))

// https://nitro.build/config
export default defineNitroConfig({
	compatibilityDate: "latest",
	srcDir: "server",
	imports: false,
	alias: {
		server: join(__dir, "server"),
	},
})
