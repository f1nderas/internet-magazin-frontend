import { ImagePlus } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/utils/clsx'

import { Button } from '../../Button'

import styles from './ImageUpload.module.scss'
import { useUpload } from './useUpload'

interface ImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[] | string) => void
	value: string[] | string
	allowMultiple?: boolean
}

export function ImageUpload({
	isDisabled,
	onChange,
	value,
	allowMultiple = true
}: ImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(urls => {
			if (allowMultiple) {
				onChange(urls)
			} else {
				onChange(urls[0] || '')
			}
		})

	const images = Array.isArray(value) ? value : value ? [value] : []

	return (
		<div>
			<div className={styles.image_container}>
				{images.map(url => (
					<div key={url} className={styles.image_wrapper}>
						<Image src={url} alt='Картинка' fill />
					</div>
				))}
			</div>
			<Button
				type='button'
				disabled={isDisabled || isUploading}
				variant='secondary'
				onClick={handleButtonClick}
				className={cn(styles.upload, {
					'mt-4': value.length
				})}
			>
				<ImagePlus />
				{allowMultiple ? 'Загрузить картинки' : 'Загрузить картинку'}
			</Button>
			<input
				type='file'
				multiple={allowMultiple}
				className='hidden'
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={isDisabled}
			/>
		</div>
	)
}
