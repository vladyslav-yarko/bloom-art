import HomeProductCard from "@/features/HomeProductCard"
import ProductModal from "@/features/ProductModal/ProductModal"
import { Item } from "@/types/home"


const fetchPerfumes = async () => {
    const res = await fetch(`${process.env.API_URL}/perfumes`)
    const data = await res.json()
    return data
}


export default async function HomePage() {
    const perfumes = await fetchPerfumes()

    return (
        <div className="shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark rounded-lg bg-card dark:bg-card-dark">
            <div className="flex flex-col text-center mb-8 p-4">
                <h1>✨ ArtStudia ✨</h1>
                <p>Where creativity meets craftsmanship. Explore handcrafted paintings, aromatic perfumes, and unique artisan treasures - each piece tells a story, each creation carries a soul.</p>
            </div>
            {perfumes.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 p-8 justify-items-center gap-y-10">
                    {perfumes.map((element: Item, index: number): React.ReactNode => (
                        <HomeProductCard 
                            item={element} 
                            key={index}
                        />
                    ))}
                </div>
            )}
            <ProductModal/>
        </div>
    )
}
