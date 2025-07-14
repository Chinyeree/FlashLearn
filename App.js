const { useState, useEffect } = React;

const FlashLearn = () => {
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showCreateTopic, setShowCreateTopic] = useState(false);
    const [showCreateCard, setShowCreateCard] = useState(false);
    const [studyMode, setStudyMode] = useState(false);
    const [newTopic, setNewTopic] = useState({ name: '', description: '', color: '#667eea' });
    const [newCard, setNewCard] = useState({ front: '', back: '' });
    const [stats, setStats] = useState({ studied: 0, correct: 0, streak: 0 });

    // Initialize data
    useEffect(() => {
        const savedTopics = Storage.loadTopics();
        const savedStats = Storage.loadStats();
        setTopics(savedTopics);
        setStats(savedStats);
    }, []);

    // Save to storage
    useEffect(() => {
        Storage.saveTopics(topics);
    }, [topics]);

    useEffect(() => {
        Storage.saveStats(stats);
    }, [stats]);

    const createTopic = () => {
        if (!newTopic.name.trim()) return;
        const topic = {
            id: Date.now(),
            name: newTopic.name,
            description: newTopic.description,
            color: newTopic.color,
            cards: [],
            created: Date.now()
        };
        setTopics([...topics, topic]);
        setNewTopic({ name: '', description: '', color: '#667eea' });
        setShowCreateTopic(false);
    };

    const createCard = () => {
        if (!newCard.front.trim() || !newCard.back.trim()) return;
        const card = {
            id: Date.now(),
            front: newCard.front,
            back: newCard.back,
            difficulty: 'medium',
            streak: 0,
            lastReviewed: null,
            nextReview: Date.now(),
            created: Date.now()
        };
        const updatedTopics = topics.map(topic => 
            topic.id === currentTopic.id 
                ? { ...topic, cards: [...topic.cards, card] }
                : topic
        );
        setTopics(updatedTopics);
        setCurrentTopic({ ...currentTopic, cards: [...currentTopic.cards, card] });
        setNewCard({ front: '', back: '' });
        setShowCreateCard(false);
    };

    const startStudy = (topic) => {
        const dueCards = SpacedRepetition.getDueCards(topic);
        if (dueCards.length === 0) {
            alert('No cards due for review!');
            return;
        }
        setCurrentTopic(topic);
        setCurrentCard(dueCards[0]);
        setCardIndex(0);
        setStudyMode(true);
        setIsFlipped(false);
    };

    const handleCardAnswer = (difficulty) => {
        if (!currentCard) return;

        const newStreak = difficulty === 'easy' ? currentCard.streak + 1 : 
                        difficulty === 'medium' ? currentCard.streak + 1 : 
                        Math.max(0, currentCard.streak - 1);

        const updatedCard = {
            ...currentCard,
            difficulty,
            streak: newStreak,
            lastReviewed: Date.now(),
            nextReview: SpacedRepetition.calculateNextReview(difficulty, newStreak)
        };

        const updatedTopics = topics.map(topic => 
            topic.id === currentTopic.id 
                ? { ...topic, cards: topic.cards.map(card => 
                    card.id === currentCard.id ? updatedCard : card
                  )}
                : topic
        );

        setTopics(updatedTopics);
        setStats(prev => ({
            studied: prev.studied + 1,
            correct: prev.correct + (difficulty !== 'hard' ? 1 : 0),
            streak: difficulty !== 'hard' ? prev.streak + 1 : 0
        }));

        // Move to next card
        const dueCards = SpacedRepetition.getDueCards(currentTopic);
        if (cardIndex + 1 < dueCards.length) {
            setCurrentCard(dueCards[cardIndex + 1]);
            setCardIndex(cardIndex + 1);
            setIsFlipped(false);
        } else {
            setStudyMode(false);
            setCurrentCard(null);
            alert('Study session complete! 🎉');
        }
    };

    const handleAddCard = (topic) => {
        setCurrentTopic(topic);
        setShowCreateCard(true);
    };

    if (studyMode && currentCard) {
        return (
            <StudyMode
                currentTopic={currentTopic}
                currentCard={currentCard}
                cardIndex={cardIndex}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(true)}
                onAnswer={handleCardAnswer}
                onExit={() => setStudyMode(false)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-6xl mx-auto p-6">
                <StatsCards stats={stats} />

                {/* Topics Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Your Topics</h2>
                    <button
                        onClick={() => setShowCreateTopic(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                    >
                        <Icon name="plus" size={20} className="mr-2" />
                        New Topic
                    </button>
                </div>

                {topics.length === 0 ? (
                    <div className="text-center py-12">
                        <Icon name="book" size={64} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">No topics yet. Create your first topic to get started!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topics.map(topic => (
                            <TopicCard
                                key={topic.id}
                                topic={topic}
                                onStudy={startStudy}
                                onAddCard={handleAddCard}
                            />
                        ))}
                    </div>
                )}
            </div>

            <CreateTopicModal
                isOpen={showCreateTopic}
                newTopic={newTopic}
                onTopicChange={setNewTopic}
                onSubmit={createTopic}
                onCancel={() => setShowCreateTopic(false)}
            />

            <CreateCardModal
                isOpen={showCreateCard}
                newCard={newCard}
                onCardChange={setNewCard}
                onSubmit={createCard}
                onCancel={() => setShowCreateCard(false)}
            />
        </div>
    );
};

ReactDOM.render(<FlashLearn />, document.getElementById('root'));