document.addEventListener('DOMContentLoaded', function() {
    const chaptersContainer = document.getElementById('chapters-container');
    
    if (!chaptersContainer) {
        console.error('Chapters container not found');
        return;
    }

    const showMoreButton = document.createElement('button');
    console.log('Show more button created');
    showMoreButton.id = 'show-more-button';
    showMoreButton.className = 'show-more-button';
    showMoreButton.innerText = 'Show More';
    
    // Insert button after chapters container
    chaptersContainer.parentNode.insertBefore(showMoreButton, chaptersContainer.nextSibling);

    // Function to toggle chapters visibility
    function toggleChapters() {
        const chapters = chaptersContainer.querySelectorAll('.chapter-button');
        const isExpanded = showMoreButton.dataset.expanded === 'true';
        
        chapters.forEach((chapter, index) => {
            if (index >= 10) {
                chapter.style.display = isExpanded ? 'none' : 'block';
            }
        });

        showMoreButton.innerText = isExpanded ? 'Show More' : 'Show Less';
        showMoreButton.dataset.expanded = !isExpanded;
    }

    // Initial setup - hide chapters beyond first 10
    function initShowMore() {
        const chapters = chaptersContainer.querySelectorAll('.chapter-button');
        if (chapters.length > 10) {
            chapters.forEach((chapter, index) => {
                if (index >= 10) {
                    chapter.style.display = 'none';
                }
            });
            showMoreButton.style.display = 'block';
        } else {
            showMoreButton.style.display = 'none';
        }
    }

    // Event listener for button click
    showMoreButton.addEventListener('click', toggleChapters);

    // Initialize on page load
    initShowMore();
});
