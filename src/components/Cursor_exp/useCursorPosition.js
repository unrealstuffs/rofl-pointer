import { useState, useEffect } from "react"

export function useCursorPosition() {
	const [position, setPosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const updateCursor = e => {
			setPosition({ x: e.clientX, y: e.clientY })
		}

		document.addEventListener("mousemove", updateCursor)
		return () => {
			document.removeEventListener("mousemove", updateCursor)
		}
	}, [])

	return position
}
