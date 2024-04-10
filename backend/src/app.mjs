import express from 'express';
import { Octokit } from '@octokit/rest'; // Ensure this matches the export from @octokit/rest
import axios from 'axios';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3001;

// Body parser middleware to handle JSON payloads
app.use(express.json());
app.use(cookieParser());

app.post('/create-repo', async (req, res) => {
  const authToken = req.cookies.githubToken;
  if (!authToken) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  try {
    // Initialize Octokit with the OAuth token
    const octokit = new Octokit({ auth: authToken });

    // Specify the name of the repository
    const repoName = 'Hello-World-Repo'; // This could also come from the user

    // Create the repository
    const repo = await createRepository(octokit, repoName);

    // Create the README file in the repository
    const readme = await createReadme(octokit, repoName);

    res.status(200).json({
      message: 'Repository and README created successfully',
      repoUrl: repo.html_url,
      readmeUrl: readme.content.html_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating repository or README',
      error: serializeError(error),
    });
  }
});

app.get('/auth/github', (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = encodeURIComponent('http://localhost:3000/github/callback');
  const scopes = encodeURIComponent('repo user');
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`);
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

async function createRepository(octokitInstance, name) {
  const response = await octokitInstance.rest.repos.createForAuthenticatedUser({
    name,
    auto_init: false // We'll create the README manually
  });
  return response.data;
}

app.get('/github/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Code query parameter is missing.');
  }

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: 'fd229ea37853a885cb64', // Consider moving these to environment variables
      client_secret: '34907a1a848e3b3f3a0f0c78eb257954d6e05bef',
      code,
    }, { headers: { Accept: 'application/json' } });

    const accessToken = response.data.access_token;

    // Set the access token in a secure, HTTP-only cookie
    res.cookie('githubToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Redirect to a route that triggers the repository creation
    res.redirect('/create-repo'); // This should match the expected behavior of the frontend or further processing
  } catch (error) {
    console.error('Error exchanging the code for an access token', error);
    if (!res.headersSent) {
      res.status(500).send('Authentication failed');
    }
  }
});


async function createReadme(octokitInstance, repoName) {
  const content = `# ${repoName}\n\nHello World`;
  const response = await octokitInstance.rest.repos.createOrUpdateFileContents({
    owner: 'PrathamSikka24',
    repo: repoName,
    path: 'README.md',
    message: 'Initial commit with README',
    content: Buffer.from(content).toString('base64'),
  });
  return response.data;
}

function serializeError(error) {
  return Object.getOwnPropertyNames(error).reduce((errorMap, key) => {
    errorMap[key] = error[key];
    return errorMap;
  }, {});
}

// No need to export these functions if they are not used elsewhere