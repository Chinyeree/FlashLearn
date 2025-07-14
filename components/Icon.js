const { useEffect } = React;

// Icons component
const Icon = ({ name, size = 24, className = "" }) => {
    useEffect(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, []);

    return React.createElement('i', {
        'data-lucide': name,
        className: className,
        style: { width: size, height: size }
    });
};

window.Icon = Icon;