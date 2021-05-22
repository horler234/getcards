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
