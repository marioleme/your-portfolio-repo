import axios from 'axios';

// GitHub API service for fetching user data and repositories
class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Provide fallback data when rate limited
  getFallbackData(key) {
    if (key.startsWith('profile_')) {
      const username = key.split('_')[1];
      return {
        login: username,
        public_repos: 0,
        followers: 0,
        following: 0,
        created_at: '2020-01-01T00:00:00Z',
        updated_at: new Date().toISOString()
      };
    }
    
    if (key.startsWith('repos_')) {
      return [];
    }
    
    if (key.startsWith('stats_')) {
      const username = key.split('_')[1];
      return {
        profile: this.getFallbackData(`profile_${username}`),
        totalRepos: 0,
        ownRepos: 0,
        totalStars: 0,
        totalForks: 0,
        totalWatchers: 0,
        followers: 0,
        following: 0,
        languages: {},
        topRepositories: [],
        recentActivity: [],
        contributionDates: [],
        joinedDate: '2020-01-01T00:00:00Z',
        lastActive: new Date().toISOString()
      };
    }
    
    if (key.startsWith('events_')) {
      return [];
    }
    
    return null;
  }

  // Get cached data or fetch from API
  async getCachedData(key, fetchFunction) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const data = await fetchFunction();
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
      return data;
    } catch (error) {
      console.warn(`GitHub API error for ${key}:`, error.response?.status || error.message);
      
      // Handle rate limiting gracefully
      if (error.response?.status === 403) {
        console.warn('GitHub API rate limit exceeded. Using cached data or providing fallbacks.');
        // Return cached data if available, even if expired
        if (cached) {
          console.info(`Using expired cache for ${key}`);
          return cached.data;
        }
        // Provide minimal fallback data for rate limiting
        return this.getFallbackData(key);
      }
      
      // Return cached data if available for other errors
      if (cached) {
        console.info(`Using cached data due to error for ${key}`);
        return cached.data;
      }
      
      // Only throw error if no cached data is available
      throw error;
    }
  }

  // Get user profile information
  async getProfile(username) {
    return this.getCachedData(`profile_${username}`, async () => {
      const response = await axios.get(`${this.baseURL}/users/${username}`);
      return response.data;
    });
  }

  // Get user repositories with pagination
  async getRepositories(username, page = 1, perPage = 30) {
    return this.getCachedData(`repos_${username}_${page}_${perPage}`, async () => {
      const response = await axios.get(
        `${this.baseURL}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&type=owner`
      );
      return response.data;
    });
  }

  // Get all user repositories (for stats calculation)
  async getAllRepositories(username) {
    return this.getCachedData(`all_repos_${username}`, async () => {
      let allRepos = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const repos = await this.getRepositories(username, page, 100);
        allRepos = [...allRepos, ...repos];
        hasMore = repos.length === 100;
        page++;
        
        // Prevent infinite loops
        if (page > 10) break;
      }

      return allRepos;
    });
  }

  // Get specific repository details
  async getRepository(username, repoName) {
    return this.getCachedData(`repo_${username}_${repoName}`, async () => {
      const response = await axios.get(`${this.baseURL}/repos/${username}/${repoName}`);
      return response.data;
    });
  }

  // Get repository languages
  async getRepositoryLanguages(username, repoName) {
    return this.getCachedData(`languages_${username}_${repoName}`, async () => {
      const response = await axios.get(`${this.baseURL}/repos/${username}/${repoName}/languages`);
      return response.data;
    });
  }

  // Get repository commits (recent)
  async getRepositoryCommits(username, repoName, page = 1, perPage = 10) {
    return this.getCachedData(`commits_${username}_${repoName}_${page}`, async () => {
      const response = await axios.get(
        `${this.baseURL}/repos/${username}/${repoName}/commits?page=${page}&per_page=${perPage}`
      );
      return response.data;
    });
  }

  // Get user events (contributions)
  async getUserEvents(username, page = 1, perPage = 30) {
    return this.getCachedData(`events_${username}_${page}`, async () => {
      const response = await axios.get(
        `${this.baseURL}/users/${username}/events/public?page=${page}&per_page=${perPage}`
      );
      return response.data;
    });
  }

  // Aggregate languages across all repositories
  async aggregateLanguages(username, repos) {
    return this.getCachedData(`agg_languages_${username}`, async () => {
      const languagePromises = repos
        .filter(repo => !repo.fork && repo.language) // Exclude forks and repos without languages
        .slice(0, 20) // Limit to avoid API rate limits
        .map(repo => 
          this.getRepositoryLanguages(username, repo.name).catch(() => ({}))
        );
      
      const languageResults = await Promise.all(languagePromises);
      const aggregated = {};
      
      languageResults.forEach(languages => {
        Object.entries(languages).forEach(([lang, bytes]) => {
          aggregated[lang] = (aggregated[lang] || 0) + bytes;
        });
      });
      
      return aggregated;
    });
  }

  // Get comprehensive user statistics
  async getUserStats(username) {
    return this.getCachedData(`stats_${username}`, async () => {
      const [profile, allRepos, events] = await Promise.all([
        this.getProfile(username),
        this.getAllRepositories(username),
        this.getUserEvents(username, 1, 100)
      ]);

      // Filter out forked repositories for accurate stats
      const ownRepos = allRepos.filter(repo => !repo.fork);

      // Calculate statistics
      const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
      const totalWatchers = ownRepos.reduce((sum, repo) => sum + repo.watchers_count, 0);

      // Get languages
      const languages = await this.aggregateLanguages(username, ownRepos);

      // Calculate contribution streak and activity
      const pushEvents = events.filter(event => event.type === 'PushEvent');
      const contributionDates = [...new Set(
        pushEvents.map(event => event.created_at.split('T')[0])
      )].sort();

      return {
        profile,
        totalRepos: profile.public_repos,
        ownRepos: ownRepos.length,
        totalStars,
        totalForks,
        totalWatchers,
        followers: profile.followers,
        following: profile.following,
        languages,
        topRepositories: ownRepos
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6),
        recentActivity: pushEvents.slice(0, 10),
        contributionDates,
        joinedDate: profile.created_at,
        lastActive: events[0]?.created_at || profile.updated_at
      };
    });
  }

  // Get repository with enhanced data
  async getRepositoryWithStats(username, repoName) {
    return this.getCachedData(`repo_stats_${username}_${repoName}`, async () => {
      const [repo, languages, commits] = await Promise.all([
        this.getRepository(username, repoName),
        this.getRepositoryLanguages(username, repoName).catch(() => ({})),
        this.getRepositoryCommits(username, repoName, 1, 5).catch(() => [])
      ]);

      return {
        ...repo,
        languages,
        recentCommits: commits,
        primaryLanguage: repo.language,
        isActive: commits.length > 0,
        lastCommit: commits[0]?.commit?.author?.date || repo.updated_at
      };
    });
  }

  // Clear cache (useful for forced refresh)
  clearCache() {
    this.cache.clear();
  }

  // Get cache info for debugging
  getCacheInfo() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export singleton instance
export const githubService = new GitHubService();
export default githubService;