const folderId = "1bPq1dxyxU4L3ScAhpo8cx94AFhREcyge";
const apiKey = process.env.GOOGLE_API_KEY;
export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=${apiKey}`
      );
      console.log(response);
      const data = await response.json();

      // Map over the files to create direct links
      const images = data.files.map(file => ({
        name: file.name,
        url: `https://drive.google.com/uc?export=view&id=${file.id}`,
      }));

      // Send the images as JSON response
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']); // Specify allowed methods
    res.status(405).end(`Method ${req.method} Not Allowed`); // Respond with 405
  }
}