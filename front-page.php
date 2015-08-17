@extends('layouts.base')

@section('content')

	@wpposts
		@include('content.index')
	@wpempty
		@include('content.404')
	@wpend

@endsection