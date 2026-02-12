import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				destination: resolve(__dirname, "destination.html"),
				crew: resolve(__dirname, "crew.html"),
				technology: resolve(__dirname, "technology.html"),
				designSystem: resolve(__dirname, "design-system.html"),
				notFound: resolve(__dirname, "404.html"),
				// Destination sub-pages
				destinationMars: resolve(__dirname, "destination-mars.html"),
				destinationEuropa: resolve(__dirname, "destination-europa.html"),
				destinationTitan: resolve(__dirname, "destination-titan.html"),
				// Crew sub-pages
				crewPilot: resolve(__dirname, "crew-pilot.html"),
				crewEngineer: resolve(__dirname, "crew-engineer.html"),
				crewSpecialist: resolve(__dirname, "crew-specialist.html"),
				// Technology sub-pages
				technologyVehicle: resolve(__dirname, "technology-vehicle.html"),
				technologySpaceport: resolve(__dirname, "technology-spaceport.html"),
				technologyCapsule: resolve(__dirname, "technology-capsule.html"),
			},
		},
	},
	plugins: [],
})
