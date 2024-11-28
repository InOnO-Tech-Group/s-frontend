import React from 'react'

const Button = ({ title }) => {
    return (
        <button
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {title}
        </button>
    )
}

export default Button
