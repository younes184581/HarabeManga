document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const coversPerPage = 10;

    // Local data array
    const mangaCovers = [
        { id: 1, image: 'https://files.fm/thumb_show.php?i=ahwabp4haa', name: "ليبوشي ماري", latestChapter: 'One Shot' },
        { id: 2, image: 'img/my-new-family-treats-me-well-cover_upscayl_8x_realesrgan-x4plus.png', name: "another manga 2", latestChapter: 'Chapter 20' },
    ];

    // Function to load covers
    function loadCovers(page) {
        const startIndex = (page - 1) * coversPerPage;
        const endIndex = startIndex + coversPerPage;
        const resultCovers = mangaCovers.slice(startIndex, endIndex);

        const coverRow = document.getElementById('cover-row');
        coverRow.innerHTML = '';
        resultCovers.forEach(cover => {
            const coverLink = document.createElement('a');
            coverLink.href = `mangaDetail.html?mangaId=${cover.id}`;
            
            const img = document.createElement('img');
            img.src = cover.image;
            img.alt = `${cover.name} Cover`;
            img.className = 'cover';

            const details = document.createElement('div');
            details.className = 'cover-details';
            details.innerHTML = `<p>${cover.name}</p><p>${cover.latestChapter}</p>`;

            coverLink.appendChild(img);
            coverLink.appendChild(details);
            coverRow.appendChild(coverLink);
        });

        document.getElementById('page-info').textContent = `صفحة ${page}`;
    }

    // Load initial covers
    loadCovers(currentPage);

    // Pagination buttons
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadCovers(currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(mangaCovers.length / coversPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadCovers(currentPage);
        }
    });
});
