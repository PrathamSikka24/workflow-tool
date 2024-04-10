import { Octokit } from "octokit";

const octokit = new Octokit({ 
    auth: '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',
});

(async () => {
    await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: "github",
        repo: "docs",
        per_page: 2
    });
})();

(async () => {
    await octokit.rest.issues.listForRepo({
        owner: "github",
        repo: "docs",
        per_page: 2
      });
      
})
  