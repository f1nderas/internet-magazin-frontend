import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import styles from './Footer.module.scss'
import RequisitesModal from './requisites-modal/RequisitesModal'

export function Footer() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.footer}>
				<RequisitesModal />
				<div className={styles.help}>
					Если появились вопросы - звоните по телефону
				</div>
				<a
					href='tel:+79201684585'
					className='text-primary hover:text-primary/75'
				>
					+7 920 168-45-85
				</a>
				<a
					href='tel:+74822360229'
					className='text-primary hover:text-primary/75'
				>
					+7(4822)360229
				</a>
				<div>Вальс Цветов &copy; 2024 Все права защищены</div>
			</div>
		</div>
	)
}
