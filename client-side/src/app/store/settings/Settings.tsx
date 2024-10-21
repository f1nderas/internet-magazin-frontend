'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Textarea } from '@/components/ui/Textarea'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'

import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'

import { IStoreEdit } from '@/shared/types/store.interface'

import styles from '../Store.module.scss'

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore()

	const form = useForm<IStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || '',
			deliveryPrice: store?.deliveryPrice || 300,
			minOrderPrice: store?.minOrderPrice || 1000
		}
	})

	const onSubmit: SubmitHandler<IStoreEdit> = data => {
		data.deliveryPrice = Number(data.deliveryPrice)
		data.minOrderPrice = Number(data.minOrderPrice)
		updateStore(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading
					title='Настройки'
					description='Управление настройками магазина'
				/>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: 'Название обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input
											placeholder='Название магазина'
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Описание магазина'
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='deliveryPrice'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цена доставки</FormLabel>
								<FormControl>
									<Input
										placeholder='Цена доставки'
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='minOrderPrice'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Минимальная цена заказа</FormLabel>
								<FormControl>
									<Input
										placeholder='Минимальная цена заказа'
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant='primary' disabled={isLoadingUpdate}>
						Сохранить
					</Button>
				</form>
			</Form>
		</div>
	)
}
