document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault();
        clean();
    }
});