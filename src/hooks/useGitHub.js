import { useState, useEffect, useCallback, useRef } from 'react';
import githubService from '../services/githubService';

// Custom hook for managing GitHub data
export const useGitHubData = (username) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasAttempted = useRef(false);

  const fetchGitHubData = useCallback(async () => {
    if (!username || hasAttempted.current) {
      setLoading(false);
      // Dados fictícios temporários para desenvolvimento durante rate limiting
      if (username === 'marioleme') {
        setData({
          profile: { login: 'marioleme', public_repos: 8, followers: 25, following: 15 },
          totalRepos: 8,
          ownRepos: 6,
          totalStars: 45,
          totalForks: 12,
          totalWatchers: 28,
          followers: 25,
          following: 15,
          languages: {
            'JavaScript': 45000,
            'Python': 32000,
            'TypeScript': 28000,
            'HTML': 22000,
            'CSS': 18000,
            'Java': 15000
          },
          topRepositories: [
            { name: 'portfolio-pessoal', stargazers_count: 15, language: 'JavaScript', description: 'Meu portfolio pessoal desenvolvido com React' },
            { name: 'sistema-gestao', stargazers_count: 12, language: 'Python', description: 'Sistema de gestão empresarial' },
            { name: 'app-mobile', stargazers_count: 8, language: 'TypeScript', description: 'Aplicativo mobile com React Native' },
            { name: 'api-rest', stargazers_count: 10, language: 'Java', description: 'API REST para microserviços' }
          ],
          recentActivity: [],
          contributionDates: [],
          joinedDate: '2020-03-15T00:00:00Z',
          lastActive: new Date().toISOString()
        });
      }
      return;
    }

    try {
      hasAttempted.current = true;
      setLoading(true);
      setError(null);
      const githubStats = await githubService.getUserStats(username);
      setData(githubStats);
    } catch (err) {
      console.warn('Error fetching GitHub data:', err);
      // Handle rate limiting gracefully
      if (err.response?.status === 403) {
        setError('GitHub API rate limit reached. Displaying cached data.');
      } else if (err.response?.status === 404) {
        setError('GitHub user not found.');
      } else {
        setError('Unable to fetch GitHub data. Please try again later.');
      }
      
      // Set minimal fallback data if no error data is available
      if (!data) {
        setData({
          profile: { login: username, public_repos: 0, followers: 0, following: 0 },
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
        });
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (username && !hasAttempted.current) {
      fetchGitHubData();
    }
  }, [username, fetchGitHubData]);

  const refresh = useCallback(() => {
    hasAttempted.current = false;
    githubService.clearCache();
    fetchGitHubData();
  }, [fetchGitHubData]);

  return { 
    data, 
    loading, 
    error, 
    refresh 
  };
};

// Hook for specific repository data
export const useRepositoryData = (username, repoName) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      if (!username || !repoName) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const repoData = await githubService.getRepositoryWithStats(username, repoName);
        setData(repoData);
      } catch (err) {
        console.error('Error fetching repository data:', err);
        setError(err.message || 'Failed to fetch repository data');
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [username, repoName]);

  return { data, loading, error };
};

// Hook for multiple repositories
export const useRepositories = (username, count = 6) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasAttempted = useRef(false);

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!username || hasAttempted.current) {
        setLoading(false);
        // Dados fictícios temporários para desenvolvimento durante rate limiting
        if (username === 'marioleme') {
          setData([
            {
              id: 1,
              name: 'portfolio-pessoal',
              description: 'Portfolio pessoal desenvolvido com React, Vite e Framer Motion',
              language: 'JavaScript',
              stargazers_count: 15,
              forks_count: 3,
              updated_at: '2024-08-20T10:30:00Z',
              html_url: 'https://github.com/marioleme/portfolio-pessoal',
              homepage: 'https://marioleme-portfolio.vercel.app',
              clone_url: 'https://github.com/marioleme/portfolio-pessoal.git'
            },
            {
              id: 2,
              name: 'sistema-gestao',
              description: 'Sistema de gestão empresarial com Python e Django',
              language: 'Python',
              stargazers_count: 12,
              forks_count: 5,
              updated_at: '2024-08-15T14:20:00Z',
              html_url: 'https://github.com/marioleme/sistema-gestao',
              homepage: '',
              clone_url: 'https://github.com/marioleme/sistema-gestao.git'
            },
            {
              id: 3,
              name: 'app-mobile',
              description: 'Aplicativo mobile desenvolvido com React Native e TypeScript',
              language: 'TypeScript',
              stargazers_count: 8,
              forks_count: 2,
              updated_at: '2024-08-10T09:15:00Z',
              html_url: 'https://github.com/marioleme/app-mobile',
              homepage: '',
              clone_url: 'https://github.com/marioleme/app-mobile.git'
            },
            {
              id: 4,
              name: 'api-rest',
              description: 'API REST para microserviços desenvolvida com Java Spring Boot',
              language: 'Java',
              stargazers_count: 10,
              forks_count: 4,
              updated_at: '2024-08-05T16:45:00Z',
              html_url: 'https://github.com/marioleme/api-rest',
              homepage: '',
              clone_url: 'https://github.com/marioleme/api-rest.git'
            }
          ]);
        }
        return;
      }

      try {
        hasAttempted.current = true;
        setLoading(true);
        setError(null);
        const repos = await githubService.getRepositories(username, 1, count);
        setData(repos);
      } catch (err) {
        console.warn('Error fetching repositories:', err);
        // Handle rate limiting gracefully
        if (err.response?.status === 403) {
          setError('GitHub API rate limit reached. Displaying cached repositories.');
        } else if (err.response?.status === 404) {
          setError('GitHub user not found.');
        } else {
          setError('Unable to fetch repositories. Please try again later.');
        }
        
        // Keep existing data if any, or set empty array
        if (!data || data.length === 0) {
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (username && !hasAttempted.current) {
      fetchRepositories();
    }
  }, [username, count]);

  return { data, loading, error };
};