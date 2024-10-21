import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { rootActions } from '@/store/root-actions'

export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
