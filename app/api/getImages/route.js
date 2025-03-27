// app/api/getImages/route.js
const folderId = "1bPq1dxyxU4L3ScAhpo8cx94AFhREcyge"; // Your Google Drive folder ID
const apiKey = process.env.GOOGLE_API_KEY; // Your Google API Key
export async function GET(req) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`
    );

    // Check if the response is okay (status 200)
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();

    // Map over the files to create direct links
    const images = data.files.map(file => ({
      name: file.name,
      url: `https://drive.google.com/uc?export=view&id=${file.id}`,
    }));

    // Return the images as a JSON response
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
