import { useStore } from "../../store/store"
import cls from "./Controls.module.scss"
import { useRef, useState } from "react"

import FullScreen from "../../assets/full_screen.svg"
import FullScreenExit from "../../assets/full_screen_exit.svg"
import Upload from "../../assets/upload.svg"
import Switch from "../../assets/switch.svg"
import Github from "../../assets/github.svg"

const Controls = () => {
	const cursorSize = useStore(state => state.cursorSize)
	const setCursorSize = useStore(state => state.setCursorSize)
	const [isFullScreen, setIsFullscreen] = useState(false)
	const fullscreenRef = useStore(state => state.fullscreenRef)
	const setBgImage = useStore(state => state.setBgImage)
	const fileInputRef = useRef(null)
	const setBgPosition = useStore(state => state.setBgPosition)
	const setBgScale = useStore(state => state.setBgScale)
	const toggleReflect = useStore(state => state.toggleReflect)

	const toggleFullscreen = () => {
		if (fullscreenRef) {
			if (!document.fullscreenElement) {
				fullscreenRef.current.requestFullscreen().then(() => setIsFullscreen(true))
			} else {
				document.exitFullscreen().then(() => setIsFullscreen(false))
			}
		}
	}

	const handleUploadClick = () => {
		fileInputRef.current && fileInputRef.current.click()
	}

	const handleImageUpload = e => {
		console.log(e)
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setBgImage(reader.result)
				setBgScale(0.5)
				setBgPosition({ x: 0, y: 0 })
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className={cls.controls}>
			<div className={cls.buttons}>
				<button onClick={handleUploadClick}>
					<img src={Upload} alt='Upload' />
				</button>
				<input ref={fileInputRef} id='fileInput' type='file' accept='image/*' onChange={handleImageUpload} />
				<button>
					<img src={Switch} alt='Switch' onClick={toggleReflect} />
				</button>
				<button onClick={toggleFullscreen}>
					<img src={isFullScreen ? FullScreenExit : FullScreen} alt='FullScreen' />
				</button>
				<button
					onClick={() => {
						window.open("https://github.com/unrealstuffs/rofl-pointer", "_blank")
					}}
				>
					<img src={Github} alt='Github' />
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
			<div className={cls.hints}>
				<p>ЛКМ:</p>
				<p>тык</p>
				<p>ПКМ:</p>
				<p>перемещение</p>
				<p>Колесо:</p>
				<p>масштаб</p>
				<p>Ctrl + W: </p>
				<p>прикол</p>
			</div>
			<div className={cls.version}>v.{import.meta.env.VITE_APP_VERSION}</div>
		</div>
	)
}

export default Controls
