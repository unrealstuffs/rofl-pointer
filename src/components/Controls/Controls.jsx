import { useRef } from "react"
import { useStore } from "../../store/store"
import cls from "./Conrols.module.scss"

const Controls = () => {
	const fileInputRef = useRef(null)
	const setBgImage = useStore(state => state.setBgImage)
	const setBgPosition = useStore(state => state.setBgPosition)
	const setBgScale = useStore(state => state.setBgScale)
	const toggleReflect = useStore(state => state.toggleReflect)

	const handleButtonClick = () => {
		fileInputRef.current && fileInputRef.current.click()
	}

	const handleImageUpload = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setBgImage(reader.result)
				setBgScale(1)
				setBgPosition({ x: 0, y: 0 })
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className={cls.controls}>
			<div className={cls.buttons}>
				<button onClick={handleButtonClick}>Загрузить</button>
				<input ref={fileInputRef} id='fileInput' type='file' accept='image/*' onChange={handleImageUpload} />
				<button onClick={toggleReflect}>Отразить</button>
			</div>
		</div>
	)
}

export default Controls
