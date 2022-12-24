import {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

import { IVideoElement } from './video.interface'

export const useVideo = () => {
	const videoRef = useRef<IVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)
	const [volume, setVolume] = useState(1)

	useEffect(() => {
		const currentDuration = videoRef.current?.duration

		if (currentDuration) setVideoTime(currentDuration)
	}, [videoRef.current?.duration])

	/* Play */
	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play()
			setIsPlaying(true)
		} else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	/* forward 10 sec */
	const forward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10
		}
	}
	/* revert 10 sec*/
	const revert = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10
		}
	}
	/* change volume */
	const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current
		if (!video) return

		video.volume = +e.currentTarget.value / 100
		setVolume(+e.currentTarget.value / 100)
	}
	/* mute volume */
	const muteVolume = useCallback(() => {
		const video = videoRef.current

		if (!video) return

		if (volume !== 0) {
			video.volume = 0
			setVolume(0)
		} else {
			video.volume = 1
			setVolume(1)
		}
	}, [volume])

	/* fullscreen */
	const fullscreen = () => {
		const video = videoRef.current

		if (!video) return

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.mozRequestFullscreen) {
			video.mozRequestFullscreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	/* progress bar */

	useEffect(() => {
		const video = videoRef.current

		if (!video) return

		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoTime) * 100)
		}
		/* time code */
		video.addEventListener('timeupdate', updateProgress)

		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTime])

	/* hotkeys - ' ' 'f'  '>'  '<'*/

	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight':
					forward()
					break
				case 'ArrowLeft':
					revert()
					break
				case ' ': {
					e.preventDefault()
					toggleVideo()
					break
				}
				case 'f':
					fullscreen()
					break
				case 'm':
					muteVolume()
					break

				default:
					return
			}
		}

		document.addEventListener('keydown', handleKeydown)
		return () => {
			document.removeEventListener('keydown', handleKeydown)
		}
	}, [toggleVideo])

	return useMemo(
		() => ({
			videoRef,
			actions: {
				fullscreen,
				revert,
				forward,
				toggleVideo,
				changeVolume,
				muteVolume,
				volume,
			},
			video: {
				isPlaying,
				currentTime,
				progress,
				videoTime,
			},
		}),
		[currentTime, progress, isPlaying, videoTime, toggleVideo, changeVolume]
	)
}
