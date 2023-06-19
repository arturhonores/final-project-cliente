import { MdErrorOutline } from "react-icons/md"

const AlertErrors = ({ message }) => {
    return (
        <p className="text-xs w-full text-center text-red-500"><MdErrorOutline className="inline text-sm align-bottom" /><span>{message}</span></p>
    )
}
export default AlertErrors