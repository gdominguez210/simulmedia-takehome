const Image = ({ width, height, altText }) => {
    return <img src={`https://placehold.co/${width}x${height}`} alt={altText} width={width} height={height} />
}

export default Image;