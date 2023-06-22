const Loader = ({ widthClass = "w-12", heightClass = "h-12" }) => {
    return (
        <div className={`loader ${widthClass} ${heightClass}`}></div>
    )
}
export default Loader