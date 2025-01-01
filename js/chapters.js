// Manga data structure
const mangaData = {
    1: {
        title: "ليبوشي ماري",
        description: "الممثلة المشهورة ماري في فندق الحب",
        image: "https://files.fm/thumb_show.php?i=ahwabp4haa",
        chapters: [
            { id: 1, title: "ون شوت" }
        ]
    },
    2: {
        title: "another manga 2",
        description: "Description for another manga 2.",
        image: "img/my-new-family-treats-me-well-cover_upscayl_8x_realesrgan-x4plus.png",
        chapters: [
            { id: 1, title: "Chapter 1" },
            { id: 2, title: "Chapter 2" }
        ]
    },
    3: {
        title: "another manga 3",
        description: "Description for another manga 3.",
        image: "img/my-new-family-treats-me-well-cover_upscayl_8x_realesrgan-x4plus.png",
        chapters: [
            { id: 1, title: "Chapter 1" },
            { id: 2, title: "Chapter 2" }
        ]
    }
};

// Function to navigate to next chapter
function goToNextChapter() {
    const urlParams = new URLSearchParams(window.location.search);
    let coverId = parseInt(urlParams.get('cover'));
    let chapterId = parseInt(urlParams.get('chapter'));
    
    // Get total chapters from mangaData
    const manga = mangaData[coverId];
    const totalChapters = manga ? manga.chapters.length : 0;
    
    if (chapterId < totalChapters) {
        chapterId++;
        window.location.href = `chapters.html?cover=${coverId}&chapter=${chapterId}`;
    } else {
        // Redirect to manga detail page when there are no more chapters
        window.location.href = `mangaDetail.html?cover=${coverId}`;
    }
}

// Function to navigate to previous chapter
function goToPreviousChapter() {
    const urlParams = new URLSearchParams(window.location.search);
    let coverId = parseInt(urlParams.get('cover'));
    let chapterId = parseInt(urlParams.get('chapter'));
    
    if (chapterId > 1) {
        chapterId--;
        window.location.href = `chapters.html?cover=${coverId}&chapter=${chapterId}`;
    } else {
        alert("This is the first chapter!");
    }
}

// Add event listeners to navigation buttons
document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.getElementById('next-chapter-btn');
    const prevButton = document.getElementById('prev-chapter-btn');
    
    if (nextButton) {
        nextButton.addEventListener('click', goToNextChapter);
    }
    if (prevButton) {
        prevButton.addEventListener('click', goToPreviousChapter);
    }
});
