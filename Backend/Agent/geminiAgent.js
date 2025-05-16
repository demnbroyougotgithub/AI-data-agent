const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

async function geminiAgent(question, db) {
  try {
    // Step 1: Authenticate using service account credentials
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/generative-language'],
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Step 2: Prepare the Gemini request
    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
You are a SQL expert. Convert the following natural language question into a PostgreSQL SQL query.
Return only the SQL query without explanation or formatting:

"${question}"
              `.trim(),
            },
          ],
        },
      ],
    };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      },
    });

    // Step 3: Extract the SQL query
    let sqlQuery = response.data.candidates[0].content.parts[0].text.trim();

// Remove markdown code fences if present
if (sqlQuery.startsWith("```")) {
  sqlQuery = sqlQuery.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();
}


    console.log('Generated SQL:', sqlQuery);

    // Step 4: Execute the SQL query on your PostgreSQL database
    const result = await db.query(sqlQuery);

    return {
      query: sqlQuery,
      result: result.rows,
    };
  } catch (error) {
    console.error('Gemini or DB Error:', error.response?.data || error.message);
    return {
      error: 'Failed to generate or execute SQL.',
    };
  }
}

module.exports = geminiAgent;
