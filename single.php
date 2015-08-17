@extends('layouts.base')

@section('content')

	@wpposts
		@include('content.single')
	@wpempty
		@include('content.404')
	@wpend

@endsection