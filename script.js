const githubUsername = "TusharNegi19";
const profileImage = document.getElementById('profileImage');
const usernameElement = document.getElementById('username');
const bioElement = document.getElementById('bio');
const locationElement = document.getElementById('location');
const twitterLinkElement = document.getElementById('twitterLink');
const githubLinkElement = document.getElementById('githubLink');
const repositoriesElement = document.getElementById('repositories');
const currentPageSpan = document.getElementById('currentPage');
let currentPage = 1;

// Fetch user data
fetch(`https://api.github.com/users/${githubUsername}`)
    .then(response => response.json())
    .then(user => {
        profileImage.src = user.avatar_url || 'placeholder-image.jpg';
        usernameElement.textContent = user.login;
        bioElement.textContent = user.bio || 'No bio available.';
        locationElement.textContent = user.location || 'Location not specified.';
        twitterLinkElement.textContent = user.twitter_username ? `@${user.twitter_username}` : 'N/A';
        twitterLinkElement.href = `https://twitter.com/${user.twitter_username}`;
        githubLinkElement.href = user.html_url;

        // Fetch user repositories
        fetchUserRepositories();
    })
    .catch(error => console.error('Error fetching user data:', error));

function fetchUserRepositories() {
    const perPage = 6;
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?page=${currentPage}&per_page=${perPage}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(repositories => displayRepositories(repositories))
        .catch(error => console.error('Error fetching repositories:', error));
}

function displayRepositories(repositories) {
    repositoriesElement.innerHTML = '';

    repositories.forEach(repo => {
        const repoBox = document.createElement('div');
        repoBox.classList.add('repo-box');

        const titleElement = document.createElement('div');
        titleElement.classList.add('repo-title');
        titleElement.textContent = repo.name;

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('repo-description');
        descriptionElement.textContent = repo.description || 'No description available.';

        const topicsElement = document.createElement('div');
        topicsElement.classList.add('repo-topics');
        topicsElement.textContent = `Topics: ${repo.topics.join(', ') || 'No topics specified.'}`;

        repoBox.appendChild(titleElement);
        repoBox.appendChild(descriptionElement);
        repoBox.appendChild(topicsElement);

        repositoriesElement.appendChild(repoBox);
    });

    updatePagination();
}

function changePage(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next') {
        currentPage++;
    }

    fetchUserRepositories();
}

function updatePagination() {
    currentPageSpan.textContent = currentPage;
}
