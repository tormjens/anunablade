# AnunaBlade

AnunaBlade is based on Anunastart, but has some adjustments and improvements for even better workflow.

Gromf is a WordPress starter theme based on [Roots](https://github.com/roots/roots) 7.0, using [Foundation](http://foundation.zurb.com) & [Gulp](http://gulpjs.com) instead of Bootstrap & Grunt.

## Gulp

To limit the need to stop and start Gulp to add bower-scripts and other stuff that is needed on all page requests, we've added a simpler method.

Add your scripts within the `vendors.json` file and they magically become part of your scripts.js file (if you've booted gulp of course).

## DOM Based Router

Roots has this thing they call DOM Based routing. In Anunastart you can route your stuff in the same way, except we are using this awesome jQuery-plugin called [jquery-dom-router](https://github.com/tormjens/jquery-dom-router).

It's kind of exactly the same, only it responds to live changes of classes on your `<body>`-tag and the syntax is way sexier. Check it out!

## Blade

Blade is the template language of the excellent Laravel framework. Anunablade bases all of its templates on it, thanks to [Blade for Wordpress](https://github.com/tormjens/wp-blade).

## Elixir

Elixir also stems from Laravel (yes, we love Laravel). It's awesome!




