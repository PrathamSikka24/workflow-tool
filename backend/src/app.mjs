import express from 'express';
import { Octokit } from '@octokit/rest'; // Ensure correct import for using GitHub's REST API
import axios from 'axios'; // For making HTTP requests
const app = express();
const port = 3000;

app.use(express.json());

app.post('/start-auth', (req, res) => {
  const { clientId, clientSecret } = req.body;

  if (!clientId || !clientSecret) {
    return res.status(400).send('Client ID and Client Secret are required.');
  }

  
  app.get('/github/callback', async (req, res) => {
    const { code } = req.query;
    // clientId and clientSecret should ideally not be hard-coded here but obtained securely
    const clientId = "34daa77abe5743f4cb2a";
    const clientSecret ="2458037144a2a0909495eb4c520905af59f33d1a";
    try {
        const githubResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
        }, {
            headers: { Accept: 'application/json' },
        });

        const accessToken = githubResponse.data.access_token;
        
        // Log the accessToken here, within the same scope
        console.log('Access token:', accessToken);

        res.send("Authentication successful, you can close this window.");
    } catch (error) {
        console.error('Failed to exchange code for token:', error);
        res.status(500).send('Authentication failed');
    }
});

  // IMPORTANT: This example simplifies the flow. In a real application, ensure secure handling of client credentials.

  const redirectUri = encodeURIComponent("http://localhost:3000/github/callback");
  const scopes = encodeURIComponent("repo,admin:org,admin:public_key,admin:repo_hook,admin:org_hook,gist,user,delete_repo,write:packages,read:packages,delete:packages,admin:gpg_key,workflow");

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;

  // Send the GitHub authorization URL back to the client for redirection
  res.json({ authUrl });
});
async function fetchUserRepos(accessToken) {
  const octokit = new Octokit({ auth: accessToken }); // Ensure this matches the token format
  try {
      const response = await octokit.rest.repos.listForAuthenticatedUser({});
      return response.data; // This should be an array of repositories
  } catch (error) {
      console.error("Error fetching repositories:", error);
      throw error; // Handle or propagate error as needed
  }
}

app.post('/get-repos', async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) {
      return res.status(400).send('Access token is required');
  }
  
  try {
      const repos = await fetchUserRepos(accessToken);
      res.json(repos);
  } catch (error) {
      res.status(500).send("Failed to fetch repositories");
  }
});

app.post('/list-issues', async (req, res) => {
  const { accessToken, owner, repo } = req.body;

  if (!accessToken || !owner || !repo) {
      return res.status(400).send('Access token, owner, and repo are required.');
  }
  
  try {
      const octokit = new Octokit({ auth: accessToken });
      const response = await octokit.rest.issues.listForRepo({
          owner,
          repo,
          state: 'all', // This line can be adjusted to 'open' or 'closed' as needed
      });
      res.json(response.data); // Sends the list of issues back to the client
  } catch (error) {
      console.error("Error listing issues for repository:", error);
      res.status(500).send("Failed to list issues for the selected repository.");
  }
});

app.post('/create-cards-for-issues', async (req, res) => {
  const { accessToken, owner, repo, columnId } = req.body;

  if (!accessToken || !owner || !repo || !columnId) {
    return res.status(400).send('Access token, owner, repo, and columnId are required.');
  }
  
  try {
    const octokit = new Octokit({ auth: accessToken });
    const issuesResponse = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'open',
    });

    for (const issue of issuesResponse.data) {
      await octokit.rest.projects.createCard({
        column_id: columnId,
        content_url: issue.url,
      });
    }

    res.send(`${issuesResponse.data.length} issue cards created.`);
  } catch (error) {
    console.error("Error processing request:", error);
    // Forward the status code from GitHub's API if available
    const statusCode = error.status || 500;
    const message = error.response?.data.message || "Failed to create issue cards.";
    res.status(statusCode).send(message);
  }
});




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
