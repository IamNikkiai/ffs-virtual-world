exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.error('Missing GHL credentials');
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing GHL credentials' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { firstName, email, tag } = body;

  if (!firstName || !email || !tag) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  const payload = {
    locationId: GHL_LOCATION_ID,
    firstName,
    email,
    tags: ['ffs-world-visitor', tag]
  };

  try {
    const res = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('GHL API error:', JSON.stringify(data));
      return { statusCode: 500, body: JSON.stringify({ error: 'GHL API error', detail: data }) };
    }

    const isNew = data.contact?.dateAdded ? true : false;
    console.log(`Contact upserted. ID: ${data.contact?.id} | Tag: ${tag}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, contactId: data.contact?.id })
    };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Unexpected error', detail: err.message }) };
  }
};
