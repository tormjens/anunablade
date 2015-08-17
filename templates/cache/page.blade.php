@extends('layouts.base')

@section('content')

	@wpposts
		@include('content.page')
	@wpempty
		@include('content.404')
	@wpend

@endsection