const CreateTopicModal = ({ 
    isOpen, 
    newTopic, 
    onTopicChange, 
    onSubmit, 
    onCancel 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Create New Topic</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Topic name"
                        value={newTopic.name}
                        onChange={(e) => onTopicChange({ ...newTopic, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Description (optional)"
                        value={newTopic.description}
                        onChange={(e) => onTopicChange({ ...newTopic, description: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <input
                            type="color"
                            value={newTopic.color}
                            onChange={(e) => onTopicChange({ ...newTopic, color: e.target.value })}
                            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                    </div>
                </div>
                <div className="flex space-x-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

window.CreateTopicModal = CreateTopicModal;