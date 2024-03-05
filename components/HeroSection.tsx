"use client";

// import { generateQR } from '@/utils/api';
import { MouseEvent, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const generateBackground = async (url: string, prompt: string) => {
    // return generateQR(url, prompt);
    const response = await fetch("/api/generateQR", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ qr_code_data: url, text_prompt: prompt }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetchGPT QR code. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.imageUrl;
};

export default function HeroSection() {
    const [url, setUrl] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');
    const [qrCode, setQrCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!url.trim()) {
            toast.error('Please enter a URL.');
            return;
        }

        setIsLoading(true);
        try {
            const qrImageUrl = await generateBackground(url, prompt);
            setQrCode(qrImageUrl);
            toast.success('Success! Your QR and background are ready!');
        } catch (error) {
            toast.error('Failed to generate QR code.');
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleShareClick = async () => {
        if (!qrCode) {
            toast.error('No QR Code available to share.');
            return;
        }
        try {
            await navigator.clipboard.writeText(qrCode);
            toast.success('QR Code URL copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy QR Code URL:', err);
            toast.error('Failed to copy QR Code URL.');
        }
    };

    const handleDownloadClick = () => {
        if (!qrCode) {
            toast.error('No QR Code to download. Please generate one first.');
            return;
        }
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = 'QRCode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="flex justify-center items-center flex-col w-full lg:p-0 p-4">
            <article className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 m-4">
                <div>
                    <h2 className="text-[48px] font-[700] leading-[110%] mb-4">Generate a QR Code</h2>
                    <form>
                        <div className="mb-4 space-y-2">
                            <p>Site URL or some text</p>
                            <Input
                                type="text"
                                placeholder="Enter your site URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <p>Enter the URL you want your QR code to link to.</p>
                        </div>

                        <div className="mb-4 space-y-2">
                            <p>Prompt</p>
                            <Textarea
                                placeholder="Enter your prompt, like the vast desert, space and uninhabited planets or bushy oceans"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            ></Textarea>
                            <p>Describe the background scene for your QR code.</p>
                        </div>

                        <div>
                            <Button
                                onClick={handleGenerateClick}
                            >
                                Generate
                            </Button>
                        </div>
                    </form>
                </div>

                <div className='flex flex-col items-center justify-center mt-8 md:mt-0'>
                    <h2 className="text-[48px] font-[700] leading-[110%] mb-4">Your QR Code</h2>

                    <div className="w-[300px] h-[300px] bg-[#27272a] flex items-center justify-center rounded-xl md:p-4">
                        <div className="w-[300px] h-[300px] bg-[#27272a] flex items-center justify-center rounded-xl md:p-4">
                            {isLoading ? (
                                <div>
                                    <img src='images/icons/running-cat.gif' alt="" className='w-[150px] h-auto' />
                                </div>
                            ) : qrCode ? (
                                <img src={qrCode} alt="Generated QR Code" />
                            ) : (
                                <p>Your generated QR will appear here.</p>
                            )}
                        </div>
                    </div>

                    <div className='mt-4 space-x-2'>
                        {qrCode && (
                            <>
                                <Button
                                    onClick={handleDownloadClick}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        width="24"
                                        fill='white'
                                        className='mr-1'
                                    >
                                        <path
                                            d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                                    </svg>
                                    Download
                                </Button>

                                <Button
                                    onClick={handleShareClick}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        width="24"
                                        fill='white'
                                        className='mr-1'
                                    >
                                        <path
                                            d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
                                    </svg>
                                    Share
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </article>
        </section>
    );
}