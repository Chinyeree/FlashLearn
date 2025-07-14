const CreateCardModal = ({ 
    isOpen, 
    newCard, 
    onCardChange, 
    onSubmit, 
    onCancel 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Add New Card</h3>
                <div className="space-y-4">
                    <textarea
                        placeholder="Front side (Question)"
                        value={newCard.front}
                        onChange={(e) => onCardChange({ ...newCard, front: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                    <textarea
                        placeholder="Back side (Answer)"
                        value={newCard.back}
                        onChange={(e) => onCardChange({ ...newCard, back: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
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
                        Add Card
                    </button>
                </div>
            </div>
        </div>
    );
};

window.CreateCardModal = CreateCardModal;