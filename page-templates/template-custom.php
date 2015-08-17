{{-- Template Name: Custom Template --}}
@extends('templates.layouts.base')

@section('content')

	@wpposts
		@include('templates.content.page')
	@wpempty
		@include('templates.content.404')
	@wpend

@endsection