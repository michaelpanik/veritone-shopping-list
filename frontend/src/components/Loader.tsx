type LoaderProps = {
    style?: any
}

const Loader: React.FC<LoaderProps> = ({ style }) => {
    return (
        <div style={{
            borderRadius: '100%', width: '75px', height: '75px', border: '3px solid #4D81B7',
            animation: 'spin 2s linear infinite',
            borderTop: '3px solid #fff',
            ...style
        }}></div>
    )
}

export default Loader