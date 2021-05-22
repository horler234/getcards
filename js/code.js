/**
 * This js file handles the interaction between the project and github graphql API
 */

fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer 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",
  },
  body: JSON.stringify({
    query: `
        query { 
            user(login: "horler234") { 
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
    /**
     * pass the converted data to the updateUI function to interact  with the DOM
     */
    updateUI(data);
  })
  .catch((err) => console.log(err));
