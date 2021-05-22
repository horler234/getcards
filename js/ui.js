const bioHTML = document.querySelector(".main-description"); // description content
const repoList = document.querySelector("ul.repositories-list"); // repositories list list

/**
 *
 * @param {number} monthVal
 * @returns String value of respective month
 */
const convertMonth = (monthVal) => {
  switch (monthVal) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";

    default:
      return "";
      console.error("Invalid month value");
      s;
  }
};

/**
 *
 * @param {date} timestamp raw time data gotten from the API
 * @returns String which is the converted time data
 */
const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = convertMonth(date.getMonth());
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

/**
 *
 * @param {object} data gotten from github graphql API
 * updateUI retrieves the data and updates the html content of the DOM
 */
const updateUI = (data) => {
  bioHTML.textContent = data.data.user.bio;

  const sortedRepoList = data.data.user.repositories.nodes.reverse();

  sortedRepoList.forEach((repo) => {
    repoList.innerHTML += `
      <li>
        <div class="repository-detail">
            <div class="repositories-title-wrapper">
                <h3>
                    <a href="#">${repo.name}</a>
                    ${repo.isPrivate ? "<span>Private</span>" : ""}
                </h3>
            </div>

            <div class="repo-desc">
            ${repo.description ? `<span>${repo.description}</span>` : ""}
            </div>

            <div class="repo-description">
            ${
              repo.primaryLanguage
                ? `
                <span class="language">
                    <span class="language-color" style="background-color: ${repo.primaryLanguage.color}"></span>
            ${repo.primaryLanguage.name}
                </span>`
                : ""
            }
                
                <a href="#">
                    <svg
                    aria-label="fork"
                    class="octicon octicon-repo-forked"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    role="img"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        ></path>
                    </svg>
                    ${repo.forkCount}
                </a>

                <span class="update-time">Updated on ${formatDate(
                  repo.updatedAt
                )}</span>
            </div>
        </div>

        <div class="star-button-wrapper">
            <button>
                <svg
                class="octicon octicon-star mr-1"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
                >
                    <path
                    fill-rule="evenodd"
                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                    ></path>
                </svg>
                Star
            </button>
        </div>
    </li>
      `;
  });
};
