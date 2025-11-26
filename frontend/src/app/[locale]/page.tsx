import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

import HomeProductCard from "@/features/HomeProductCard"
import ProductModal from "@/features/ProductModal/ProductModal"
import { Item } from "@/types/home"
import LoadingState from '@/ui/LoadingState'


const fetchPerfumes = async () => {
	try {
		const res = await fetch(`${process.env.API_URL}/api/perfumes/`)
		console.log(res)
		const data = await res.json()
		return data
	} catch (error) {
		console.log(error)
		return []
	}
    
}


export default async function HomePage() {
    const t = await getTranslations("HomePage")

    const perfumes = await fetchPerfumes()

    return (
			<div className='shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark active:shadow active:shadow-accent dark:active:shadow-accent-dark rounded-lg bg-card dark:bg-card-dark'>				<ProductModal />
				<div className='flex flex-col text-center mb-8 p-4'>
					<h1>✨ ArtStudia ✨</h1>
					<p>{t('titleBar.description')}</p>
				</div>
				{perfumes.length > 0 && (
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 md:p-4 lg:p-8 justify-items-center gap-y-10'>
						{perfumes.map(
							(element: Item, index: number): React.ReactNode => (
								<Suspense
									key={index}
									fallback={
										<div className='loadingIconCard'>
											<LoadingState />
										</div>
									}
								>
									<HomeProductCard item={element} />
								</Suspense>
							)
						)}
					</div>
				)}
			</div>
		)
}
