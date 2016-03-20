<?php
$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
$context['title'] = single_cat_title('', false);

Timber::render('archive.twig', $context);
