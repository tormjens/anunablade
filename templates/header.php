<?php
/**
 * Template for displaying the header
 *
 * @package anunastart
 */
?>
<header class="main-header">
	<div class="row">
		<section class="inner-header small-12 columns">
			<h1 class="site-title">
				<a href="<?php echo esc_url( home_url() ); ?>"><?php bloginfo( 'name' ); ?></a>
			</h1>

			<?php get_template_part('templates/navigation') ?>
		</section>
	</div>
</header> <!-- contain-to-grid -->
