'use client'

import { Heading } from '@/components/ui/Heading'

import styles from '../Store.module.scss'

import { MainStatistics } from './main-statistics/MainStatistics'
import { MiddleStatistics } from './middle-statistics/MiddleStatistics'

export function Statistics() {
	return (
		<div className={styles.wrapper}>
			<Heading title='Статистика' />
			<MainStatistics />
			<MiddleStatistics />
		</div>
	)
}
