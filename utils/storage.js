// Storage utilities for localStorage operations
const STORAGE_KEYS = {
    TOPICS: 'flashlearn_topics',
    STATS: 'flashlearn_stats'
};

const DEFAULT_STATS = {
    studied: 0,
    correct: 0,
    streak: 0
};

const loadTopics = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.TOPICS);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error loading topics:', error);
        return [];
    }
};

const saveTopics = (topics) => {
    try {
        localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
    } catch (error) {
        console.error('Error saving topics:', error);
    }
};

const loadStats = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.STATS);
        return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch (error) {
        console.error('Error loading stats:', error);
        return DEFAULT_STATS;
    }
};

const saveStats = (stats) => {
    try {
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (error) {
        console.error('Error saving stats:', error);
    }
};

window.Storage = {
    loadTopics,
    saveTopics,
    loadStats,
    saveStats
};