"use client"

import { useContext } from "react";
import { useEffect } from "react";

import { HomeContext } from "@/context/HomeContext";
import ImageComponent from "@/ui/ImageComponent";


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
				<div className='bg-background dark:bg-background-dark p-10 rounded-2xl
				shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark' onClick={e => e.stopPropagation()}>
					<button
						className='modal-close'
						onClick={onClose}
						aria-label='Close modal'
					>
						✕
					</button>

					<ImageComponent
						src={`data:image/jpeg;base64,${productBase64}`}
						alt='perfume'
						className='relative w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 overflow-hidden rounded-lg'
					/>

					<div className='modal-info'>
						<div className='modal-header'>
							<h1 className='modal-title'>{selectedProduct?.title}</h1>
							<div className='modal-price'>
								{selectedProduct?.price} {selectedProduct?.currency}
							</div>
						</div>

						{selectedProduct?.description && (
							<div className='modal-full-description'>
								{selectedProduct.description}
							</div>
						)}
						
						<div className='modal-availability'>
							{selectedProduct?.available >= 1 ? (
								<span className='availability-badge available'>
									✅ Available
								</span>
							) : (
								<span className='availability-badge unavailable'>
									❌ Not Available
								</span>
							)}
						</div>
						
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
			</div>
		)
    };
