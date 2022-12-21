import cn from 'classnames'
import { FC, useRef, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { useOnClickOutside } from '@/hooks/useOutside'

import MaterialIcon from '../MaterialIcon'

import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder'
import styles from './VideoPlayer.module.scss'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.interface'

const VideoPlayer: FC<IVideoPlayer> = ({ slug, videoSource }) => {
	const [show, setIsShow] = useState(false)

	const inputRef = useRef<HTMLButtonElement>(null)

	const { actions, video, videoRef } = useVideo()

	const { user } = useAuth()

	useOnClickOutside(inputRef, () => setIsShow(false))

	return (
		<div
			className={cn(styles.wrapper, {
				'h-96': !user,
			})}
		>
			{user ? (
				<>
					<video
						ref={videoRef}
						src={`${videoSource}#t=8`}
						className={styles.video}
						preload="metadata"
						onClick={actions.toggleVideo}
					/>

					<div className={styles.progressBarContainer}>
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.progressBar}
						/>
					</div>

					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name="MdHistory" />
							</button>
							<button
								onClick={actions.toggleVideo}
								className={styles.playButton}
							>
								<MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/>
							</button>
							<button onClick={actions.forward}>
								<MaterialIcon name="MdUpdate" />
							</button>

							<button onClick={() => setIsShow(!show)} ref={inputRef}>
								<MaterialIcon
									name={
										actions.volume === 0
											? 'MdOutlineVolumeOff'
											: 'MdOutlineVolumeUp'
									}
								/>

								<input
									type="range"
									onChange={(e) => actions.changeVolume(e)}
									className={cn(styles.inputVolume, {
										[styles.inputVolume_active]: show,
									})}
								/>
							</button>

							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										':' +
										('0' + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{Math.floor(video.videoTime / 60) +
										':' +
										('0' + Math.floor(video.videoTime % 60)).slice(-2)}
								</p>
							</div>
						</div>
						<div>
							<button onClick={actions.fullscreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	)
}
export default VideoPlayer
