import { Info } from 'lucide-react'
import React, { FC } from 'react'

import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'

const ContactInfoModal: FC = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Info size={30} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Список адресов</DialogTitle>
					<DialogDescription>
						<ul className='space-y-4'>
							<li>
								<p className='font-medium'>Ул. Красина 46</p>
								<p>пн-вс 8:00 - 20:00</p>
							</li>
							<li>
								<p className='font-medium'>
									Ул. Хрустальная 12
								</p>
								<p>пн-чт 8:00 - 20:00</p>
								<p>пт, сб 8:00 - 21:00</p>
							</li>
							<li>
								<p className='font-medium'>
									Ул. Маяковского 31
								</p>
								<p>пн-чт 8:00 - 20:00</p>
								<p>пт, сб 8:00 - 21:00</p>
							</li>
							<li>
								<p className='font-medium'>
									Ул. Академика Туполева 113а
								</p>
								<p>пн-чт 8:00 - 20:00</p>
								<p>пт, сб 8:00 - 21:00</p>
							</li>
							<li>
								<p className='font-medium'>Ул. Горького 124а</p>
								<p>Круглосуточно</p>
							</li>
						</ul>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Закрыть</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ContactInfoModal
