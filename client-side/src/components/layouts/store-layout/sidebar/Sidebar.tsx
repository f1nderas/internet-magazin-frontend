import { Loader } from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

import { UserRole } from '@/shared/types/user.interface'

import { Logo } from '../../main-layout/header/logo/Logo'

import styles from './Sidebar.module.scss'
import { Navigation } from './navigation/Navigation'

export function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<Navigation />
		</div>
	)
}
