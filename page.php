@extends('layouts.base')

@section('content')

	@wpposts
		@include('partials.title')
		@include('content.page')
	@wpempty
		@include('content.404')
	@wpend

@endsection