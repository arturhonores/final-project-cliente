import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';

const Dropdown = ({ options, selected, onSelectedChange, avatar }) => {
    const { user } = useContext(AuthContext)

    const [open, setOpen] = useState(false);

    const renderedOptions = options.map((option) => {
        if (option === selected) {
            return null;
        }

        return (
            <div
                key={option}
                className="text-black py-2 px-4 block cursor-pointer hover:bg-gray-200"
                onClick={() => onSelectedChange(option)}
            >
                {option}
            </div>
        );
    });

    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" onClick={() => setOpen(!open)} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {selected}
                    <img src={user.avatar} className='w-10 aspect-square object-cover rounded-full' alt="" />
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm0 14a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 17z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${open ? 'block' : 'hidden'}`}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {renderedOptions}
                </div>
            </div>
        </div>
    )
}

export default Dropdown