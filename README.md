# AnunaBlade

AnunaBlade is based on Anunastart, but has some adjustments and improvements for even better workflow.

Gromf is a WordPress starter theme based on [Roots](https://github.com/roots/roots) 7.0, using [Foundation](http://foundation.zurb.com) & [Gulp](http://gulpjs.com) instead of Bootstrap & Grunt.

## Requirements
| Prerequisite    | How to check         | How to install
| --------------- | -------------------- | ------------- |
| PHP >= 5.4.x    | `php -v`             | [php.net](http://php.net/manual/en/install.php) |
| NPM 2.11.1      | `npm -v`             | [npmjs.com](https://www.npmjs.com/) |
| gulp >= 3.8.11  | `gulp -v`            | `npm install -g gulp` |
| Bower >= 1.3.12 | `bower -v`           | `npm install -g bower` |
| Composer        | `composer --version` | [getcomposer.org](http://getcomposer.org) |

## Gulp / Elixir

To limit the need to stop and start Gulp to add bower-scripts and other stuff that is needed on all page requests, we've added a simpler method.

Add your scripts within the `vendors.json` file and they magically become part of your scripts.js file (if you've booted gulp of course).

We also use somehting called Elixir, which was created by the folks behind Laravel. It simplifies the task running process, and gives it a much cleaner syntax.

### Compile all
```
gulp
```

### Prepare for production
```
gulp --production
```

### To watch the files and livereload the browser
```
gulp watch
```

## DOM Based Router

Roots has this thing they call DOM Based routing. In Anunastart you can route your stuff in the same way, except we are using this awesome jQuery-plugin called [jquery-dom-router](https://github.com/tormjens/jquery-dom-router).

It's kind of exactly the same, only it responds to live changes of classes on your `<body>`-tag and the syntax is way sexier. Check it out!

## Blade

Blade is the template language of the excellent Laravel framework. Anunablade bases all of its templates on it, thanks to [Blade for Wordpress](https://github.com/tormjens/wp-blade).

## Getting Started

1. Install Composer dependencies: `composer install`
2. Install NPM packages: `[sudo] npm install`
3. Install Bower dependencies: `bower install`
4. Run Gulp for the first time: `gulp` (For more options see the above explaination)

