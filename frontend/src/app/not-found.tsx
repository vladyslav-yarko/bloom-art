import Link from 'next/link'

import NotFoundIcon from "@/ui/NotFoundIcon"
import ButtonPrimary from "@/ui/ButtonPrimary"
// import LinkComponent from "@/ui/LinkComponent"


export default function NotFoundPage() {

	return (
		<div>
			<div className='flex justify-center items-center'>
				<NotFoundIcon className='notFoundIcon' />
				<h2>Page not found</h2>
			</div>
			<div className='flex justify-center items-center'>
				<div className='notFoundButton'>
					<ButtonPrimary>
						<h2 className='w-full h-full'>
							<Link
								href={'/en'}
								className='flex items-center justify-center w-full h-full'
							>
								Return to home
							</Link>
							{/* <LinkComponent title='' link='/' /> */}
						</h2>
					</ButtonPrimary>
				</div>
			</div>
		</div>
	)
}
