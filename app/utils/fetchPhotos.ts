const accessKey = 'oWcfyA6YfUrEzMFDXpD7KK0qYCCbzCiUWlKKVzZMucc'; 


async function getData() {
  try {
    const response = await fetch('https://api.unsplash.com/photos', {
      method: 'GET',
      headers: {
        'Authorization': `Client-ID ${accessKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  

    
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
}




export default async function getPhotos() {
      const data = await getData()
      return data

}
