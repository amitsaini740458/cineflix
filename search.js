// Extract query parameter from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('query');

// Construct fetch URL
const fetchUrl = `https://jade-itchy-dragonfly.cyclic.app/search/${query}`;

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
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
