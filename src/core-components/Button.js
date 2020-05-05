/**
 * Wrapper component for flag image
 *
 * @param {object} props - all the properties we would like to pass to the flag image tag including:
 *      @param {string} name - the flag file name
 *      @param {number} width - the flag image width
 *      @param {number} height - the flag image height
 *      @param {string} [className] - a class to place on flag image element
 */
import LoadingDots from './LoadingDots'

const Button = ({ text, onClick, className, isLoading, disabled }) => {

    return (
        <div disabled={disabled}
            className={`${className} button truncate `}
            onClick={onClick}
        >
            <span className={`${isLoading ? 'text-hidden' : ''}`}>{text}</span>
            {isLoading && <LoadingDots />}
        </div>
    );
}

export default Button;
