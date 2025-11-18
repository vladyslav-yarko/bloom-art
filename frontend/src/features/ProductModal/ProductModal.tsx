"use client"

import { useContext } from "react";
import { useEffect } from "react";

import { HomeContext } from "@/context/HomeContext";
import ImageComponent from "@/ui/ImageComponent";
import CloseIcon from "@/ui/CloseIcon";
import ButtonPrimary from "@/ui/ButtonPrimary";
import { Item } from "@/types/home";


export default function ProductModal() {
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

    if (!selectedProduct) {
        return null
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
		}
	}

    return (
			<div
				className='fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm'
				onClick={onClose}
			>
				<div
					className='grid grid-cols-1 justify-items-center gap-y-3 bg-background dark:bg-background-dark p-7 rounded-2xl
				shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark lg:mt-10
				w-60 md:w-70 lg:w-80'
					onClick={e => e.stopPropagation()}
				>
					<div className='w-8 md:w-12 lg:w-14 mb-4 transition hover:rotate-90'>
						<CloseIcon onClick={onClose} />
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

					{selectedProduct?.description && <p>{selectedProduct.description}</p>}

					{selectedProduct?.available >= 1 ? (
						<h2>✅ Available</h2>
					) : (
						<h2>❌ Not Available</h2>
					)}

					{selectedProduct.available >= 1 ? (
						<div className="w-30 md:w-35 lg:w-40" onClick={(e) => {
							addToCart(selectedProduct)
							e.stopPropagation()
						}}>
							<ButtonPrimary>
								<h2>Add to cart</h2>
							</ButtonPrimary>
						</div>
					) : null}
				</div>
			</div>
		)
    };
