"use client"

import { useContext, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { HomeContext } from "@/context/HomeContext";
import ImageComponent from "@/ui/ImageComponent";
import CloseIcon from "@/ui/CloseIcon";
import ButtonPrimary from "@/ui/ButtonPrimary";
import { Item } from "@/types/home";
import FlashMessage from '@/ui/FlashMessage';


export default function ProductModal() {
	const t = useTranslations("HomePage.ProductModal")

	const [ cartAction, setCartAction ] = useState<boolean>(false)
	const [ cartAdded, setCartAdded ] = useState<boolean>(false)

    const context = useContext(HomeContext)
    if (!context) throw new Error("HomeContext used outside provider")
    const { selectedProduct, productBase64, setSelectedPerfume } = context

    const onClose = () => {
        setSelectedPerfume(null, null, true)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

	const showFlashMessage = () => {
		setCartAction(true)
		setTimeout(() => {
			setCartAction(false)
		}, 3000)
	}

	function addToCart(item: Item) {
		const cartKey = process.env.NEXT_PUBLIC_CART_KEY ?? ''
		type Cart = {
			perfumes: Record<string, Item>
		}
		let cartData: Cart
		const stored = localStorage.getItem(cartKey)
		if (!stored) {
			cartData = { perfumes: {} }
		} else {
			try {
				cartData = JSON.parse(stored) as Cart
			} catch {
				cartData = { perfumes: {} }
			}
		}
		if (!(item.id in cartData.perfumes)) {
			cartData.perfumes[item.id] = item
			localStorage.setItem(cartKey, JSON.stringify(cartData))
			setCartAdded(true)
		} else {
			setCartAdded(false)
		}
	}

    return (
			<>
				{cartAction ? (
					<FlashMessage
						isSuccessful={cartAdded}
						text={
							cartAdded
								? t('FlashMessage.cartSuccess')
								: t('FlashMessage.cartError')
						}
					/>
				) : null}

				{!selectedProduct ? null : (
					<div
						className='fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm'
						onClick={onClose}
					>
						<div
							className='grid grid-cols-1 justify-items-center gap-y-3 bg-background dark:bg-background-dark p-7 rounded-2xl
				        shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark active:shadow active:shadow-accent dark:active:shadow-accent-dark lg:mt-10				w-60 md:w-70 lg:w-80'
							onClick={e => e.stopPropagation()}
						>
							          <div className='w-8 md:w-12 lg:w-14 mb-4 transition hover:rotate-90 hover:scale-110 active:rotate-90 active:scale-110'>								<CloseIcon onClick={onClose} />
							</div>

							<ImageComponent
								src={`data:image/jpeg;base64,${productBase64}`}
								alt='perfume'
								className='relative w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 overflow-hidden rounded-lg'
							/>

							<h1 className='modal-title'>{selectedProduct?.title}</h1>
							<h2 className='modal-price'>
								{selectedProduct?.price} {selectedProduct?.currency}
							</h2>

							{selectedProduct?.description && (
								<p>{selectedProduct.description}</p>
							)}

							{selectedProduct?.available >= 1 ? (
								<h2>✅ {t('Info.available')}</h2>
							) : (
								<h2>❌ {t('Info.notAvailable')}</h2>
							)}

							{selectedProduct.available >= 1 ? (
								<div
									className='w-30 md:w-35 lg:w-40'
									onClick={e => {
										addToCart(selectedProduct)
										showFlashMessage()
										onClose()
									}}
								>
									<ButtonPrimary disabled={cartAdded}>
										<h2>{t('Buttons.cart')}</h2>
									</ButtonPrimary>
								</div>
							) : null}
						</div>
					</div>
				)}
			</>
		)
    };
