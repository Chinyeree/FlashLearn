const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg card-shadow">
                <div className="flex items-center">
                    <Icon name="book-open" size={32} className="text-blue-500 mr-4" />
                    <div>
                        <p className="text-gray-600">Cards Studied</p>
                        <p className="text-2xl font-bold">{stats.studied}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg card-shadow">
                <div className="flex items-center">
                    <Icon name="check-circle" size={32} className="text-green-500 mr-4" />
                    <div>
                        <p className="text-gray-600">Accuracy</p>
                        <p className="text-2xl font-bold">
                            {stats.studied > 0 ? Math.round((stats.correct / stats.studied) * 100) : 0}%
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg card-shadow">
                <div className="flex items-center">
                    <Icon name="zap" size={32} className="text-yellow-500 mr-4" />
                    <div>
                        <p className="text-gray-600">Current Streak</p>
                        <p className="text-2xl font-bold">{stats.streak}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.StatsCards = StatsCards;