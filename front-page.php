@extends('layouts.base')

@section('content')

	@wpposts
		@include('partials.title')
		@include('content.index')
	@wpempty
		@include('content.404')
	@wpend
@endsection

@scripts(array('bower_components/fastclick/lib/fastclick.js'))

