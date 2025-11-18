import { useTranslations } from "next-intl"


export default function CartTitle() {
    const t = useTranslations('CartPage.CartTitle')

    return (
			<div className='cartTitle'>
				<h1>✨ ArtStudia ✨</h1>
				<p>{t('description')}</p>
			</div>
		)
}
