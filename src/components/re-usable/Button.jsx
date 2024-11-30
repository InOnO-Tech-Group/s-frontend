import React from 'react'

const Button = ({ title }) => {
    return (
        <button
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
            {title}
        </button>
    )
}

export default Button
