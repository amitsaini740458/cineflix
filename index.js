  // Fetch data from the server
fetch('https://jade-itchy-dragonfly.cyclic.app/page/1')
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


