# metronome.io v2

This is a bare bones static site using SASS and Bootstrap 4.3.  All SCSS/CSS and JS files are minified and concatenated and Images are optimized  placed in the `dist` folder ready to be referenced.  The working CSS and JS files can be found in the `assets` folder.  Any images placed within the `images` folder will be optimized and placed in the `dist/images` directory ready to be served.  

### Install dependencies:

```bash
npm install
```

Build files are located in the `src` directory with compiled and optimized assets living in the '`src/dist` ready to be served by any HTTP server.

### Development

```bash
gulp watch
```

The site will open in the port 3000.

### Build for Production

```bash
gulp
```



