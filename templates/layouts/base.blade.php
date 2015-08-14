{{-- Base Template File --}}

@include('templates.partials.head')

<body {{ body_class(); }}>

	<a href="#content" class="skip">{{ __( 'Skip to content', 'roots' ) }}</a>

	<!--[if lt IE 8]>
		<div class="alert-box warning">
			{{ __( 'You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'roots' ); }}
		</div>
	<![endif]-->

	<div class="main-wrapper">

		{{ do_action( 'get_header' ) }}
		@include('templates.partials.header')

	  	<div id="content" class="content" role="document">
			<main id="main" class="main" role="main">
			  	@yield('content')
			</main><!-- /.main -->
		</div><!-- /.content -->

  		@include('templates.partials.footer')

  	</div>

  	{{ wp_footer() }}

</body>
</html>