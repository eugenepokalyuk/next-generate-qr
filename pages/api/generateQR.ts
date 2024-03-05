import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { qr_code_data, text_prompt } = req.body;
            const response = await fetch("https://api.gooey.ai/v2/art-qr-code/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + process.env.NEXT_PUBLIC_GOOEY_API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "qr_code_data": qr_code_data,
                    "text_prompt": text_prompt
                }),
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            res.status(200).json({ imageUrl: result.output.output_images[0] });
        } catch (error) {
            res.status(500).json({ error: "Ошибка при вызове API" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}