// Extract query parameter from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const currentPage = parseInt(urlParams.get('page')) || 1;

// Construct fetch URL
const fetchUrl = `https://jade-itchy-dragonfly.cyclic.app/page/${currentPage}`;

// Fetch data from the server
fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
        // Compile Handlebars template
        const source = document.getElementById('movie-card-template').innerHTML;
        const template = Handlebars.compile(source);

        // Render the template with the fetched data
        const html = template({ movies: data });

        // Append the rendered HTML to the DOM
        document.querySelector('.movies-grid').innerHTML = html;

        // Generate pagination links
        const paginationLinks = document.getElementById('pagination-links');
        paginationLinks.innerHTML = '';
        let isFirstLink = true;
        for (let i = currentPage + 1; i <= currentPage + 3; i++) {
            if (!isFirstLink) {
                paginationLinks.appendChild(document.createTextNode(' '));
            } else {
                isFirstLink = false;
            }
            if (i === currentPage + 1) {
                const span = document.createElement('span');
                span.textContent = 'Page:';
                paginationLinks.appendChild(span);
            }

            const link = document.createElement('a');
            link.href = `./page.html?page=${i}`;
            link.textContent = i;

            // Append link to pagination links
            paginationLinks.appendChild(link);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
