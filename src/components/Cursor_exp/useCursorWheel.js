import { useEffect } from "react"
import { useStore } from "../../store/store"

export function useCursorWheel() {
	const bgScale = useStore(state => state.bgScale)
	const setBgScale = useStore(state => state.setBgScale)
	const bgPosition = useStore(state => state.bgPosition)
	const setBgPosition = useStore(state => state.setBgPosition)

	useEffect(() => {
		const handleWheel = e => {
			e.preventDefault()

			const scaleFactor = 1.05
			const newScale = e.deltaY < 0 ? bgScale * scaleFactor : bgScale / scaleFactor
			const clampedScale = Math.max(0.1, Math.min(newScale, 3))

			const rect = document.body.getBoundingClientRect()
			const cursorX = e.clientX - rect.left
			const cursorY = e.clientY - rect.top

			// Определяем координаты курсора относительно текущего изображения
			const relX = (cursorX - bgPosition.x) / bgScale
			const relY = (cursorY - bgPosition.y) / bgScale

			// Новые координаты позиции фона после масштабирования
			const newX = cursorX - relX * clampedScale
			const newY = cursorY - relY * clampedScale

			setBgScale(clampedScale)
			setBgPosition({ x: newX, y: newY })
		}

		document.addEventListener("wheel", handleWheel, { passive: false })
		return () => {
			document.removeEventListener("wheel", handleWheel)
		}
	}, [bgScale, bgPosition, setBgScale, setBgPosition])
}
