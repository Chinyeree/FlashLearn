// Spaced repetition algorithm
const calculateNextReview = (difficulty, streak) => {
    const intervals = [1, 3, 7, 14, 30, 90]; // days
    const index = Math.min(streak, intervals.length - 1);
    const baseInterval = intervals[index];
    const multiplier = difficulty === 'easy' ? 1.5 : difficulty === 'hard' ? 0.8 : 1;
    return Date.now() + (baseInterval * multiplier * 24 * 60 * 60 * 1000);
};

const getDueCardsCount = (topic) => {
    return topic.cards.filter(card => card.nextReview <= Date.now()).length;
};

const getTopicProgress = (topic) => {
    if (topic.cards.length === 0) return 0;
    const masteredCards = topic.cards.filter(card => card.streak >= 3).length;
    return (masteredCards / topic.cards.length) * 100;
};

const getDueCards = (topic) => {
    return topic.cards.filter(card => card.nextReview <= Date.now());
};

window.SpacedRepetition = {
    calculateNextReview,
    getDueCardsCount,
    getTopicProgress,
    getDueCards
};