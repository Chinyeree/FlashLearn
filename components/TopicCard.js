const TopicCard = ({ topic, onStudy, onAddCard }) => {
    const dueCount = SpacedRepetition.getDueCardsCount(topic);
    const progress = SpacedRepetition.getTopicProgress(topic);

    return (
        <div className="bg-white p-6 rounded-lg card-shadow">
            <div className="flex items-center mb-4">
                <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: topic.color }}
                ></div>
                <h3 className="text-xl font-semibold text-gray-800">{topic.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{topic.description}</p>
            
            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="progress-bar h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                    {topic.cards.length} cards
                </span>
                <div className="flex items-center">
                    {dueCount > 0 && (
                        <span className="spaced-repetition-indicator bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                            {dueCount} due
                        </span>
                    )}
                </div>
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={() => onStudy(topic)}
                    disabled={dueCount === 0}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                        dueCount > 0
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <Icon name="play" size={16} className="inline mr-2" />
                    Study
                </button>
                <button
                    onClick={() => onAddCard(topic)}
                    className="flex-1 py-2 px-4 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                    <Icon name="plus" size={16} className="inline mr-2" />
                    Add Card
                </button>
            </div>
        </div>
    );
};

window.TopicCard = TopicCard;