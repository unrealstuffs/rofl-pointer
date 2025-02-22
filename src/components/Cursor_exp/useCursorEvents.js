import { useState, useEffect, useRef } from "react"
import { useStore } from "../../store/store"
import clickSound from "../../assets/tuck.wav"
import soundLoop from "../../assets/ebuchaya_ukazka.wav"

export function useCursorEvents() {
	const bgPosition = useStore(state => state.bgPosition)
	const setBgPosition = useStore(state => state.setBgPosition)
	const isDrag = useStore(state => state.isDrag)

	const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
	const [initialBgPosition, setInitialBgPosition] = useState(bgPosition)
	const [mouseDown, setMouseDown] = useState(false)
	const [isCursorReversed, setIsCursorReversed] = useState(false)
	const [rotation, setRotation] = useState(0)

	const loopAudioRef = useRef(null)

	useEffect(() => {
		loopAudioRef.current = new Audio(soundLoop)
		loopAudioRef.current.loop = true
	}, [])

	const handleMouseUp = () => {
		setMouseDown(false)
		setRotation(0)
		loopAudioRef.current?.pause()
		loopAudioRef.current.currentTime = 0
	}

	// Обновляем позицию бэкграунда при перемещении курсора с зажатой кнопкой (drag)
	useEffect(() => {
		const updateCursor = e => {
			if (mouseDown && isDrag) {
				const dx = e.clientX - dragStart.x
				const dy = e.clientY - dragStart.y
				setBgPosition({ x: initialBgPosition.x + dx, y: initialBgPosition.y + dy })
			}
		}

		const handleMouseDown = e => {
			if (e.button === 0) {
				new Audio(clickSound).play()
				setMouseDown(true)
				if (isDrag) {
					setDragStart({ x: e.clientX, y: e.clientY })
					setInitialBgPosition(bgPosition)
				}
				setRotation(isCursorReversed ? -10 : 10)
				loopAudioRef.current?.play()
			}
			if (e.button === 2) {
				setIsCursorReversed(prev => !prev)
			}
		}

		document.addEventListener("mousemove", updateCursor)
		document.addEventListener("mousedown", handleMouseDown)
		document.addEventListener("mouseup", handleMouseUp)

		return () => {
			document.removeEventListener("mousemove", updateCursor)
			document.removeEventListener("mousedown", handleMouseDown)
			document.removeEventListener("mouseup", handleMouseUp)
		}
	}, [mouseDown, isDrag, dragStart, initialBgPosition, bgPosition, setBgPosition, isCursorReversed])

	// Предотвращаем стандартное контекстное меню
	useEffect(() => {
		const handleContextMenu = e => {
			e.preventDefault()
		}
		document.addEventListener("contextmenu", handleContextMenu)
		return () => {
			document.removeEventListener("contextmenu", handleContextMenu)
		}
	}, [])

	return { isCursorReversed, rotation, mouseDown }
}
