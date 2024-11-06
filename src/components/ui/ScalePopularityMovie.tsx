import { StarIcon } from '@heroicons/react/24/solid';

type ScalePopularityMovieProps = {
    popularity: number;
}

export default function ScalePopularityMovie({ popularity }: ScalePopularityMovieProps) {
    const stars = (popularity / 10) * 5;
    
    const fullStars = Math.floor(stars);
    const completas = Array.from({ length: fullStars }, (_, index) => index);
    
    const halfStars = stars - fullStars >= 0.5 ? 1 : 0;
    const mitades = Array.from({ length: halfStars }, (_, index) => index);

    return (
        <div className='flex'>
            {completas.map( star => (
                <StarIcon key={star} className="size-5 text-yellow-400" />
            ))}

            {mitades.map( star => (
                <StarIcon key={star} className="size-5 text-yellow-400/50" />
            ))}
        </div>
    )
}