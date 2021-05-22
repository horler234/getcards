fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { 
      "Content-Type": "application/json",
      Authorization: "token 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"
    },
  body: JSON.stringify({
    query: `
        query { 
            viewer { 
              login
              name
              bio
              avatarUrl
              repositories(last: 20) {
                nodes {
                  name
                  isPrivate
                  description
                  forkCount
                  updatedAt
                  primaryLanguage{
                    name
                    color
                  }
                }
              }
            }
          }
        `,
  }),
})
  .then((res) => res.json())
  .then((data) => {
      updateUI(data);
      console.log(data)
    });
