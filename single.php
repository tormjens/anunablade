@extends('layouts.base')

@section('content')

	@wpposts
		@include('partials.title')
		@include('content.single')
	@wpempty
		@include('content.404')
	@wpend

@endsection