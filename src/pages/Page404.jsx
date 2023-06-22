import image404 from "../assets/images/page-not-found.svg"

const Page404 = () => {
    return (
        <div className="max-w-7xl px-4 mx-auto h-screen grid items-center">
            <div className="w-full max-w-sm mx-auto min-h-[350px] lg:min-h-[500px] lg:max-w-xl flex">
                <img src={image404} alt="" className="w-full" />
            </div>
        </div>
    )
}
export default Page404