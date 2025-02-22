import { useStore } from "../../store/store"
import cls from "./Hints.module.scss"
import FullScreen from "../../assets/full.svg"
import Close from "../../assets/close.svg"
import Drag from "../../assets/drag.svg"
import { useState } from "react"

const Hints = () => {
	const cursorSize = useStore(state => state.cursorSize)
	const setCursorSize = useStore(state => state.setCursorSize)
	const [, setIsFullscreen] = useState(false)
	const fullscreenRef = useStore(state => state.fullscreenRef)
	const setBgImage = useStore(state => state.setBgImage)
	const toggleDrag = useStore(state => state.toggleDrag)
	const isDrag = useStore(state => state.isDrag)

	const toggleFullscreen = () => {
		if (fullscreenRef) {
			if (!document.fullscreenElement) {
				fullscreenRef.current.requestFullscreen().then(() => setIsFullscreen(true))
			} else {
				document.exitFullscreen().then(() => setIsFullscreen(false))
			}
		}
	}

	const deleteBgImage = () => {
		setBgImage(null)
	}

	const toggleDragMode = () => {
		toggleDrag()
	}

	const isActive = isDrag ? cls.active : ""

	return (
		<div className={cls.hints}>
			<div className={cls.buttons}>
				<button className={isActive} onClick={toggleDragMode}>
					<img src={Drag} alt='Drag' />
				</button>
				<button onClick={toggleFullscreen}>
					<img src={FullScreen} alt='FullScreen' />
				</button>
				<button onClick={deleteBgImage}>
					<img src={Close} alt='Close' />
				</button>
			</div>
			<div className={cls.range}>
				<input
					type='range'
					min='50'
					max='500'
					value={cursorSize}
					onChange={e => {
						e.preventDefault()
						e.stopPropagation()
						setCursorSize(e.target.value)
					}}
				/>
				<p>
					Размер: <span>{cursorSize}</span>
				</p>
			</div>
		</div>
	)
}

export default Hints
