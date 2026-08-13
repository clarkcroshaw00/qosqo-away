export default async function handler(req, res) {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: 'Visible',
            checkbox: { equals: true },
          },
          sorts: [{ property: 'Order', direction: 'ascending' }],
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }
    const data = await response.json();
    const photos = data.results.map((page) => {
      const props = page.properties;
      const imageFile = props.Image?.files?.[0];
      const imageUrl = imageFile
        ? (imageFile.type === 'external' ? imageFile.external.url : imageFile.file.url)
        : null;
      const caption =
  props.Caption?.rich_text?.[0]?.plain_text ||
  props.Caption?.title?.[0]?.plain_text ||
  '';
      return {
        id: page.id,
        imageUrl,
        caption,
        order: props.Order?.number ?? 0,
      };
    }).filter((photo) => photo.imageUrl);
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    res.status(200).json(photos);
  } catch (error) {
    console.error('Gallery fetch failed:', error);
    res.status(500).json({ error: 'Failed to load gallery' });
  }
}
