"use client"
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

interface ImageWithFallbackProps extends ImageProps {
    fallback?: ImageProps['src']
}

export const fallbackImage = "/images/default.png"

const ImageWithFallback = ({
    fallback = fallbackImage,
    alt,
    src,
    ...props
}: ImageWithFallbackProps) => {

    const [error, setError] = useState<React.SyntheticEvent<HTMLImageElement, Event> | null>(null)

    useEffect(() => {
        setError(null)
    }, [src])

    return (
        <Image
            alt={alt}
            onError={setError}
            src={error ? fallback : src}
            {...props}
        />
    )
}

export default ImageWithFallback