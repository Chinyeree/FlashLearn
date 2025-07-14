const StudyMode = ({ 
    currentTopic, 
    currentCard, 
    cardIndex, 
    isFlipped, 
    onFlip, 
    onAnswer, 
    onExit 
}) => {
    const dueCards = SpacedRepetition.getDueCards(currentTopic);

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-white text-3xl font-bold mb-2">{currentTopic.name}</h1>
                    <p className="text-white/80">Card {cardIndex + 1} of {dueCards.length}</p>
                </div>

                <div className={`flip-card h-96 mb-8 ${isFlipped ? 'flipped' : ''}`}>
                    <div className="flip-card-inner">
                        <div className="flip-card-front bg-white card-shadow">
                            <div className="text-center">
                                <Icon name="help-circle" size={48} className="text-gray-400 mb-4 mx-auto" />
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Question</h2>
                                <p className="text-lg text-gray-600">{currentCard.front}</p>
                            </div>
                        </div>
                        <div className="flip-card-back bg-blue-50 card-shadow">
                            <div className="text-center">
                                <Icon name="lightbulb" size={48} className="text-blue-500 mb-4 mx-auto" />
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Answer</h2>
                                <p className="text-lg text-gray-600">{currentCard.back}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    {!isFlipped ? (
                        <button
                            onClick={onFlip}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors card-shadow"
                        >
                            Show Answer
                        </button>
                    ) : (
                        <div className="space-x-4">
                            <button
                                onClick={() => onAnswer('hard')}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                            >
                                Hard
                            </button>
                            <button
                                onClick={() => onAnswer('medium')}
                                className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                            >
                                Medium
                            </button>
                            <button
                                onClick={() => onAnswer('easy')}
                                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                            >
                                Easy
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={onExit}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        Exit Study Mode
                    </button>
                </div>
            </div>
        </div>
    );
};

window.StudyMode = StudyMode;