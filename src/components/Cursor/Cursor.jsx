import { useEffect, useRef, useState } from "react"
import { useStore } from "../../store/store"
import cursorImage from "../../assets/default.png"
import clickSound from "../../assets/tuck.wav"
import soundLoop from "../../assets/ebuchaya_ukazka.wav"
import cls from "./Cursor.module.scss"

export default function Cursor() {
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const cursorSize = useStore(state => state.cursorSize)
	const bgPosition = useStore(state => state.bgPosition)
	const setBgPosition = useStore(state => state.setBgPosition)
	const bgScale = useStore(state => state.bgScale)
	const setBgScale = useStore(state => state.setBgScale)
	const isReflect = useStore(state => state.isReflect)

	const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
	const [initialBgPosition, setInitialBgPosition] = useState(bgPosition)
	const [rotation, setRotation] = useState(0)
	const [mouseDown, setMouseDown] = useState(false)

	const loopAudioRef = useRef(null)

	useEffect(() => {
		// Создаём аудио объект для звука цикла
		loopAudioRef.current = new Audio(soundLoop)
		loopAudioRef.current.loop = true
	}, [])

	useEffect(() => {
		const rotateCursor = () => {
			setRotation(10)
		}

		const updateCursor = e => {
			setPosition({ x: e.clientX, y: e.clientY })
			if (mouseDown) {
				const dx = e.clientX - dragStart.x
				const dy = e.clientY - dragStart.y
				setBgPosition({ x: initialBgPosition.x + dx, y: initialBgPosition.y + dy })
			}
		}

		const handleMouseDown = e => {
			if (e.button === 0) {
				const audio = new Audio(clickSound)
				audio.play()

				rotateCursor()
				if (loopAudioRef.current) {
					loopAudioRef.current.play()
				}
			}
			if (e.button === 2) {
				setMouseDown(true)
				setDragStart({ x: e.clientX, y: e.clientY })
				setInitialBgPosition(bgPosition)
			}
		}

		const handleMouseUp = () => {
			setMouseDown(false)
			setRotation(0)
			if (loopAudioRef.current) {
				loopAudioRef.current.pause()
				loopAudioRef.current.currentTime = 0
			}
		}

		const handleContextMenu = e => {
			// Предотвращаем появление стандартного меню
			e.preventDefault()
		}

		document.addEventListener("mousemove", updateCursor)
		document.addEventListener("mousedown", handleMouseDown)
		document.addEventListener("mouseup", handleMouseUp)
		document.addEventListener("contextmenu", handleContextMenu)

		return () => {
			document.removeEventListener("mousemove", updateCursor)
			document.removeEventListener("mousedown", handleMouseDown)
			document.removeEventListener("mouseup", handleMouseUp)
			document.removeEventListener("contextmenu", handleContextMenu)
		}
	}, [mouseDown, dragStart, initialBgPosition, setBgPosition, bgPosition])

	useEffect(() => {
		const handleWheel = e => {
			e.preventDefault()

			const scaleFactor = 1.05 // Коэффициент увеличения
			const newScale = e.deltaY < 0 ? bgScale * scaleFactor : bgScale / scaleFactor
			const clampedScale = Math.max(0.1, Math.min(newScale, 3)) // Ограничение масштаба

			const rect = document.body.getBoundingClientRect() // Размеры экрана
			const cursorX = e.clientX - rect.left
			const cursorY = e.clientY - rect.top

			// Координаты курсора относительно изображения
			const relX = (cursorX - bgPosition.x) / bgScale
			const relY = (cursorY - bgPosition.y) / bgScale

			// Новые координаты после масштабирования
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

	return (
		<div
			className={cls.cursor}
			style={{
				left: isReflect ? position.x - 6 : position.x - cursorSize + 6,
				top: position.y,
				backgroundImage: `url(${cursorImage})`,
				width: `${cursorSize}px`,
				height: `${cursorSize * 1.361}px`,
				transform: `${isReflect ? "scaleX(-1)" : ""} rotate(${rotation}deg)`,
			}}
		/>
	)
}
