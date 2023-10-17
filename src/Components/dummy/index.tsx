import React from 'react'

type CustomImageProps = {} & React.ImgHTMLAttributes<HTMLImageElement>

const CustomImage = ({...props}: CustomImageProps) => {


    return <img {...props} />
}

export default CustomImage