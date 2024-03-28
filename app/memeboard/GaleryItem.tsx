import React from 'react';
import { copyImageToClipboard } from 'copy-image-clipboard'; // Import the function
import { toast } from 'sonner';

interface GalleryItemProps {
    image: {
        id: number;
        src: string;
        name: string;
    };
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image }) => {
    // Function to handle image copy
    const handleCopyToClipboard = async () => {
        try {
            await copyImageToClipboard(image.src);
            toast.success('Image copied to clipboard!'); // Provide feedback using toast
        } catch (error) {
            console.error('Failed to copy image:', error);
            toast.error('Failed to copy image to clipboard.'); // Error feedback using toast
        }
    };

    const shareImageOnTwitter = async () => {
        const tweetText = "The hat stays on! - $DWH @thedevwifhat cooking.";
        const twitterBaseUrl = "https://twitter.com/intent/tweet";
        const twitterShareUrl = `${twitterBaseUrl}?text=${tweetText}`;

        // Open the Twitter share URL in a new tab/window
        window.open(twitterShareUrl, '_blank');
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-900 p-2 border border-white border-opacity-50 rounded-xl">
            <img src={image.src} alt={image.name} className="w-full h-full object-cover rounded-2xl" />
            <div className="w-full flex flex-row items-center justify-between gap-4">
                <button
                    className='w-1/2 flex flex-row items-center justify-center gap-2 border border-white rounded-xl py-2 bg-white bg-opacity-0 hover:bg-opacity-10'
                    onClick={handleCopyToClipboard}
                >
                    Copy
                    {/* SVG for Copy Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                </button>
                <button
                    onClick={shareImageOnTwitter}
                    className='w-1/2 border border-white rounded-xl py-2 bg-white bg-opacity-0 hover:bg-opacity-10'>
                    Share on X
                </button>
            </div>
        </div>
    );
};

export default GalleryItem;