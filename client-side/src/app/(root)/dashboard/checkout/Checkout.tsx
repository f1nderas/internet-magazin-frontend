'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
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

import { useCart } from '@/hooks/useCart'
import { useCheckout } from '@/hooks/useCheckout'

import { formatPrice } from '@/utils/string/format-price'

import styles from './Checkout.module.scss'

interface ICheckoutForm {
	phone: string
	address: string
	comment: string
}

export default function Checkout() {
	const router = useRouter()
	const { items, total } = useCart()
	const { createPayment, isLoadingCreate } = useCheckout()

	const form = useForm<ICheckoutForm>({
		mode: 'onChange',
		defaultValues: {
			phone: '',
			address: '',
			comment: ''
		}
	})

	const isPhoneValid = useMemo(() => {
		const phoneRegex = /^(\+7|7|8)?\d{10}$/
		return phoneRegex.test(form.getValues('phone'))
	}, [form.watch('phone')])

	const isFormValid = isPhoneValid && form.watch('address').trim() !== ''

	const onSubmit: SubmitHandler<ICheckoutForm> = data => {
		if (isFormValid) {
			createPayment({ ...data })
		}
	}

	return (
		<div className={styles.wrapper}>
			<h2 className='text-4xl font-bold mb-6  text-center'>
				<div className='uppercase'>внимание!</div> Доставка
				осуществляется только по городу Тверь с 8:00 до 20:00
			</h2>
			<h2 className='text-2xl font-semibold mb-6'>Ваши товары</h2>
			<div className='space-y-4'>
				{items.map(item => (
					<Card
						key={item.product.id}
						className='flex items-center space-x-4 p-4'
					>
						<Image
							src={item.product.images[0]}
							alt={item.product.title}
							width={100}
							height={100}
							className='rounded-md'
						/>
						<div className='flex-grow'>
							<h3 className='text-lg font-medium'>
								{item.product.title}
							</h3>
							<p className='text-muted-foreground'>
								{formatPrice(item.product.price)} x{' '}
								{item.quantity}
							</p>
						</div>
					</Card>
				))}
			</div>

			<div className='mt-6 text-xl font-semibold'>
				Итого к оплате: {formatPrice(total)}
			</div>

			<div className='mt-8'>
				<h2 className='text-xl font-semibold mb-4'>
					Информация для доставки
				</h2>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						{/* Phone */}
						<FormField
							control={form.control}
							name='phone'
							rules={{
								required: 'Введите номер телефона',
								validate: () =>
									isPhoneValid ||
									'Введите корректный номер телефона'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Телефон</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Введите ваш телефон'
											disabled={isLoadingCreate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Address */}
						<FormField
							control={form.control}
							name='address'
							rules={{
								required: 'Введите адрес доставки'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Адрес доставки</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Введите ваш адрес'
											disabled={isLoadingCreate}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Comment */}
						<FormField
							control={form.control}
							name='comment'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Комментарий к заказу (необязательно)
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Введите комментарий к заказу'
											disabled={isLoadingCreate}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							variant='primary'
							disabled={!isFormValid || isLoadingCreate}
							className='w-full py-2 text-lg mt-6'
						>
							Оплатить
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
