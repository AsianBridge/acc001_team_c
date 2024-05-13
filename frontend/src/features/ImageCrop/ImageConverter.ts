export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
    console.log("Converted image to Base64");
  });
}

export async function sendImageToServer(base64: string) {
  const url = import.meta.env.VITE_BACKEND_ENDPOINT;
  if (!url) {
    throw new Error("Server URL not defined in environment variables");
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: base64 }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log(response);

  return response.json();
}
