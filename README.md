# MovieBoy1-show
MovieBoy1-show is a lightweight and user-friendly movie search application that utilizes the OMDb API. It enables users to search for movies, view their posters, titles, release years, and types, and access additional details with a single click. The app features a playful design, highlighted by a Ninja Turtle GIF logo that restarts its animation upon page reload.

## Key Features

- **Movie Search:** Effortlessly search for movies by title using the OMDb API.
- **Responsive Design:** Optimized for seamless use on both desktop and mobile devices.
- **Dynamic Results:** Instantly displays search results with movie posters, titles, release years, and types.
- **Details Button:** Provides a convenient way to access more in-depth information about each movie.
- **Animated Logo:** Includes a Ninja Turtle GIF logo that adds a fun, dynamic touch to the interface.

## Technologies

- **HTML5:** Provides a semantic and well-structured foundation.
- **CSS3:** Ensures a visually appealing and responsive design.
- **JavaScript:** Powers interactivity and dynamic content updates.
- **OMDb API:** Supplies comprehensive movie data for the application.

## Project Structure

- **Assets:** Contains images and other media files.
- **src:** Includes the main JavaScript file (`index.js`).
- **index.html:** The entry point of the application.
- **style.css:** Defines the styling for the app.


## Setup & Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:OumaMichael/Movie-search-app.git
    cd MovieBoy1-show
    ```

2. **Configure OMDb API Key:**

    - Sign up for a free API key from [OMDb API](http://www.omdbapi.com/).
    - Open `script.js` and update the API key variable with your own key.

3. **Run the Application:**

    - Open `index.html` in your web browser to run the app.
    - Alternatively, use a live server (e.g., the VS Code Live Server extension) for a better development experience.

## How It Works

- **GIF Animation Restart:** The JavaScript code ensures the Ninja Turtle GIF animation restarts on every page load.

- **Movie Search Functionality:** The app listens for a search form submission, sends a request to the OMDb API with the user's query, and dynamically displays the search results.

## Customization

- **Styling:** Modify `style.css` to update the visual design, colors, fonts, or layout.
- **Functionality:** Enhance `script.js` with additional features, such as pagination, sorting, or filtering of search results.
- **Logo:** Replace the Ninja Turtle GIF (`ninja-turtle.gif`) with another animated logo or image if desired.

## Contributing

Contributions are welcome! If you find any bugs or have ideas for improvements, please fork the repository and submit a pull request.

## Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for providing movie data.
- The developers and communities who contributed to the open source libraries and resources used in this project.
