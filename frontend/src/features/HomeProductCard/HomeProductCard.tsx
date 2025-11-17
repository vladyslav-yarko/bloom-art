"use client"

import { useContext } from "react"

import { HomeContext } from "@/context/HomeContext"
import ImageComponent from "@/ui/ImageComponent"
import { toBase64 } from "@/lib/img"
import { Item } from "@/types/home"


interface Props {
	item: Item
}


export default function HomeProductCard({ item }: Props) {
    const context = useContext(HomeContext)
    if (!context) throw new Error("HomeContext used outside provider")
    const { setSelectedPerfume } = context

    const base64Str = toBase64(item.picture)

    return (
        <div className='grid gird-cols-1 gap-y-1.5 shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark rounded-lg p-10 bg-background dark:bg-background-dark cursor-pointer' key={item.title + '_pc'}
            onClick={() => setSelectedPerfume(item, base64Str, false)}>
            <ImageComponent src={`data:image/jpeg;base64,${base64Str}`} alt="perfume" className="relative w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 overflow-hidden rounded-lg"/>
            <h2 className='product-title'>{item.title}</h2>
            <p className='product-description'>
                {item.description}
            </p>
            <div className='product-price'>{item.price} {item.currency}</div>
            <div className='availability-status'>
                {item.available >= 1 ? (
                    <span className='availability-badge available'>
                        ✅ Available
                    </span>
                ) : (
                    <span className='availability-badge unavailable'>
                        ❌ Not Available
                    </span>
                )}
            </div>
            
            {/* {item.available >= 1 ? (
                <button 
                    className='add-to-cart-btn' 
                    onClick={(e) => {
                        if (!loadCartId()) createCart()
                        e.stopPropagation();
                        import('../../../utils/cart').then(({ addToCart }) => addToCart(item.id));
                    }}
                    style={{ marginTop: 'auto' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                    </svg>
                    Add to Cart
                </button>
            ) : (
                <button 
                    className='add-to-cart-btn unavailable-btn' 
                    disabled
                    style={{ marginTop: 'auto' }}
                >
                    Out of Stock
                </button>
            )} */}
        </div>
    );
}
