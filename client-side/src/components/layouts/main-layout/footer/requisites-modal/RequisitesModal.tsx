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

const RequisitesModal: FC = () => {
	return (
		<Dialog>
			<DialogTrigger className='text-primary hover:text-primary/75'>
				О нас
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Реквизиты компании</DialogTitle>
					<DialogDescription>
						<ul className='space-y-4 text-left'>
							<li>
								<span className='font-medium'>
									ИП Гаджиева С.А.
								</span>
							</li>
							<li>
								<span className='font-medium'>Юр. адрес:</span>{' '}
								г. Тверь, ул. Хромова д 22 кв 80
							</li>
							<li>
								<span className='font-medium'>
									Адрес для корреспонденции:
								</span>{' '}
								г. Тверь, ул. Хромова д 22 кв 80
							</li>
							<li>
								<span className='font-medium'>ИНН:</span>{' '}
								690100271801
							</li>
							<li>
								<span className='font-medium'>ОГРНИП:</span>{' '}
								321774600404552
							</li>
							<li>
								<span className='font-medium'>ОКТМО:</span>{' '}
								45324000
							</li>
							<li>
								<span className='font-medium'>ОКВЭД:</span>{' '}
								47.91
							</li>
							<li>
								<span className='font-medium'>ОКФС:</span> 16
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

export default RequisitesModal
