"use client"

import { useContext } from "react";
import { useEffect } from "react";

import { HomeContext } from "@/context/HomeContext";
import ImageComponent from "@/ui/ImageComponent";
import CloseIcon from "@/ui/CloseIcon";


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

    return (
			<div className='fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm' onClick={onClose}>
				<div className='grid grid-cols-1 justify-items-center gap-y-3 bg-background dark:bg-background-dark p-7 rounded-2xl
				shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark' onClick={e => e.stopPropagation()}>
					<div className="w-8 md:w-12 lg:w-14 mb-4 transition hover:rotate-90">
						<CloseIcon onClick={onClose}/>
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
						<p>
							{selectedProduct.description}
						</p>
					)}

					{selectedProduct?.available >= 1 ? (
						<h2>
							✅ Available
						</h2>
					) : (
						<h2>
							❌ Not Available
						</h2>
					)}
						
					{/* {product.available >= 1 ? (
						<button
							className='modal-btn modal-btn-primary'
							onClick={handleAddToCart}
						>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='currentColor'
							>
								<path d='M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z' />
							</svg>
							Add to Cart
						</button>
					) : (
						<button className='modal-btn modal-btn-secondary' disabled>
							Out of Stock
						</button>
					)} */}
				</div>
			</div>
		)
    };
