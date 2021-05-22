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
