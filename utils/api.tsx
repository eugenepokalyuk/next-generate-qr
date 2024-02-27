export const generateQR = async (url: string, prompt: string) => {
    const payload = {
        "qr_code_data": url,
        "text_prompt": prompt
    };
    const response: any = await fetch("https://api.gooey.ai/v2/art-qr-code/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_GOOEY_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(response.status);
    }

    const result = await response.json();
    return result.output.output_images[0];
}