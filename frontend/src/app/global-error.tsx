'use client'

import ErrorState from '@/ui/ErrorState'
import ButtonPrimary from '@/ui/ButtonPrimary'


interface Props {
	error: Error & { digest?: string }
	reset: () => void
}



export default function ErrorPage({ error, reset }: Props) {

	const reload = () => {
		window.location.reload()
	}

	return (
		<div>
			<div className='error'>
				<ErrorState className='errorIcon' />
				<h2>An error occured</h2>
			</div>
			<div className='flex justify-center'>
				<div className='errorButton'>
					<ButtonPrimary onClick={() => reload()}>
						<h2>Try again</h2>
					</ButtonPrimary>
				</div>
			</div>
		</div>
	)
}
